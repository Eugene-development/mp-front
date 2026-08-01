/**
 * Стор Yandex SmartCaptcha (невидимый режим).
 *
 * Архитектура:
 *  - виджет рендерится один раз в SmartCaptchaWidget.svelte (invisible: true);
 *  - проверка НЕ запускается на первой активности посетителя: иначе Яндекс
 *    показывает всплывающий челлендж на произвольной странице, вне контекста
 *    формы (посетитель не понимает, что от него хотят, и просто закрывает его
 *    кликом мимо). Вместо этого капча взводится (arm()) в момент, когда
 *    посетитель подошёл к форме: открыл модалку заявки или сфокусировался на
 *    первом поле. К моменту сабмита токен обычно уже получен — сабмит мгновенный,
 *    а если Яндекс всё же показал челлендж, он выглядит уместно.
 *  - полученный токен отправляется на бэкенд для серверной верификации (mp-auth).
 *
 * Важно: токен одноразовый и имеет срок жизни (~несколько минут). После сабмита
 * формы или при ошибке вызывайте reset(), чтобы можно было пройти проверку снова.
 *
 * @see https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha
 */
import type { CaptchaTokenResult } from './types';

/** Sitekey из env. Без него стор работает в «выключенном» режиме (fail-open). */
export const SITE_KEY: string | undefined = import.meta.env.VITE_SMARTCAPTCHA_SITE_KEY;

export type CaptchaStatus = 'idle' | 'loading' | 'success' | 'error';

/** Сколько ждать готовности виджета при сабмите, прежде чем сдаться (мс). */
const READY_TIMEOUT_MS = 4000;

/** Причина, по которой токен получить невозможно (виджет недоступен). */
export const WIDGET_UNAVAILABLE = 'widget-unavailable';

/** Глобальный объект виджета Яндекса. */
declare global {
	interface Window {
		smartCaptcha?: {
			render: (
				container: HTMLElement | string,
				props: {
					sitekey: string;
					invisible?: boolean;
					callback?: (token: string) => void;
					'error-callback'?: (error: unknown) => void;
					'challenge-visible'?: () => void;
					'challenge-hidden'?: () => void;
					shieldPosition?: string;
					hideShield?: boolean;
				}
			) => string;
			execute: (widgetId?: string) => void;
			reset: (widgetId?: string) => void;
			getToken: (widgetId?: string) => string;
			destroy: (widgetId?: string) => void;
		};
	}
}

/**
 * Кросс-браузерный «запусти, когда поток свободен».
 *
 * Chromium/Android: requestIdleCallback выполнит колбэк в простое (после
 * открытия/анимации модалки). Safari (macOS/iOS) requestIdleCallback по умолчанию
 * НЕ поддерживает — там ждём два кадра отрисовки (двойной rAF гарантирует, что
 * вставка и первый paint уже произошли), затем короткий макротаск, чтобы
 * transition успел завершиться. Только после этого запускаем execute(): его
 * proof-of-work блокирует главный поток и заморозил бы анимацию модалки.
 */
function scheduleWhenIdle(cb: () => void): void {
	if (typeof window === 'undefined') return;
	if (typeof window.requestIdleCallback === 'function') {
		window.requestIdleCallback(cb, { timeout: 2000 });
		return;
	}
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			setTimeout(cb, 300);
		});
	});
}

class SmartCaptchaStore {
	/** Текущий токен. null — проверка не пройдена. */
	token = $state<string | null>(null);

	/** Состояние проверки. */
	status = $state<CaptchaStatus>('idle');

	/** Виджет отрендерен и готов к execute(). */
	ready = $state(false);

	/**
	 * Виджет принципиально недоступен: не задан sitekey либо captcha.js не
	 * загрузился (ad-block, сбой CDN). Формы в этом случае идут по fail-open —
	 * см. requireToken(). Серверная сторона такие заявки принимает под жёстким
	 * лимитом по IP (mp-auth: SmartCaptchaService::allowWithoutToken).
	 */
	unavailable = $state(!SITE_KEY);

	/** Внутреннее: id виджета, возвращаемое render(). */
	private widgetId: string | null = null;

	/** Внутреннее: резолвер текущего execute()-промиса. */
	private pendingResolve: ((res: CaptchaTokenResult) => void) | null = null;

	/**
	 * Внутреннее: текущая проверка. Нужна, чтобы arm() (фоновое взведение) и
	 * сабмит формы не запускали execute() виджета дважды: второй вызов забирал бы
	 * себе колбэк, и первый промис висел бы неразрешённым. Оба ждут один результат.
	 */
	private inflight: Promise<CaptchaTokenResult> | null = null;

	/** Внутреннее: те, кто ждёт готовности виджета (см. waitReady). */
	private readyWaiters: Array<() => void> = [];

	/** Регистрирует id отрендеренного виджета (вызывается из SmartCaptchaWidget). */
	registerWidget(widgetId: string): void {
		this.widgetId = widgetId;
		this.ready = true;
		this.unavailable = false;
		const waiters = this.readyWaiters;
		this.readyWaiters = [];
		for (const resolve of waiters) resolve();
	}

	/**
	 * Помечает виджет недоступным (скрипт не загрузился / render упал).
	 * Разблокирует всех, кто ждёт готовности, — они уйдут по fail-open.
	 */
	markUnavailable(): void {
		this.unavailable = true;
		const waiters = this.readyWaiters;
		this.readyWaiters = [];
		for (const resolve of waiters) resolve();
	}

	/**
	 * Взводит проверку заранее, в фоне: вызывается когда посетитель подошёл к
	 * форме (открыл модалку / сфокусировался на первом поле). Не блокирует UI —
	 * execute() уходит в простой главного потока. Идемпотентно: повторные вызовы
	 * при наличии токена или уже идущей проверке ничего не делают.
	 */
	arm(): void {
		if (this.unavailable || this.token || this.inflight) return;
		scheduleWhenIdle(() => {
			if (this.token || this.inflight) return;
			void this.execute();
		});
	}

	/**
	 * Запускает проверку посетителя. Возвращает промис с токеном.
	 * Поведение зависит от оценки Яндекса: «хороший» посетитель получает токен
	 * без челленджа, «подозрительный» — видит всплывающий челлендж.
	 *
	 * Если виджет ещё не отрендерен (captcha.js грузится), ждём его готовности
	 * до READY_TIMEOUT_MS — иначе сабмит проваливался бы у тех, кто нажал кнопку
	 * раньше, чем загрузился скрипт капчи.
	 */
	execute(): Promise<CaptchaTokenResult> {
		if (typeof window === 'undefined') {
			return Promise.resolve({ token: null, error: WIDGET_UNAVAILABLE });
		}

		// Если токен уже есть — переиспользуем (не тратим лишний челлендж).
		if (this.token) {
			return Promise.resolve({ token: this.token });
		}

		// Проверка уже идёт (взведена через arm()) — отдаём её результат.
		if (this.inflight) return this.inflight;

		this.inflight = this.runExecute().finally(() => {
			this.inflight = null;
		});

		return this.inflight;
	}

	/** Внутреннее: одна проверка от готовности виджета до колбэка Яндекса. */
	private async runExecute(): Promise<CaptchaTokenResult> {
		if (this.widgetId === null) {
			await this.waitReady();
		}

		if (!window.smartCaptcha || this.widgetId === null) {
			this.markUnavailable();
			return { token: null, error: WIDGET_UNAVAILABLE };
		}

		this.status = 'loading';
		return new Promise<CaptchaTokenResult>((resolve) => {
			this.pendingResolve = resolve;
			window.smartCaptcha!.execute(this.widgetId!);
		});
	}

	/**
	 * Нужен ли токен для сабмита формы.
	 *
	 * true  — виджет работает, значит токен обязателен (fail-closed: без него
	 *         форму не отправляем, это и есть защита от ботов).
	 * false — виджета нет вовсе (нет ключа / скрипт заблокирован). Блокировать
	 *         сабмит бессмысленно: пострадают только живые люди с ad-block.
	 */
	requireToken(): boolean {
		return !this.unavailable;
	}

	/** Колбэк успешной проверки — вызывается виджетом с токеном. */
	handleCallback(token: string): void {
		this.token = token;
		this.status = 'success';
		this.pendingResolve?.({ token });
		this.pendingResolve = null;
	}

	/** Колбэк ошибки проверки. */
	handleError(error: unknown): void {
		this.token = null;
		this.status = 'error';
		this.pendingResolve?.({ token: null, error: String(error ?? 'captcha-error') });
		this.pendingResolve = null;
	}

	/**
	 * Сбрасывает виджет — токен аннулируется, можно пройти проверку заново.
	 * Вызывайте после отправки формы (успех/ошибка), т.к. токен одноразовый.
	 */
	reset(): void {
		this.token = null;
		this.status = 'idle';
		if (typeof window !== 'undefined' && window.smartCaptcha && this.widgetId !== null) {
			window.smartCaptcha.reset(this.widgetId);
		}
	}

	/** Внутренний id виджета (для компонента-виджета). */
	getWidgetId(): string | null {
		return this.widgetId;
	}

	/** Ждёт готовности виджета (или таймаута/недоступности). */
	private waitReady(): Promise<void> {
		if (this.widgetId !== null || this.unavailable) return Promise.resolve();

		return new Promise<void>((resolve) => {
			let settled = false;
			const done = () => {
				if (settled) return;
				settled = true;
				resolve();
			};
			this.readyWaiters.push(done);
			setTimeout(done, READY_TIMEOUT_MS);
		});
	}
}

/** Синглтон. */
export const captcha = new SmartCaptchaStore();
