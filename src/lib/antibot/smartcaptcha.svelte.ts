/**
 * Стор Yandex SmartCaptcha (невидимый режим).
 *
 * Архитектура (Вариант 2 из ТЗ):
 *  - виджет рендерится один раз в SmartCaptchaWidget.svelte (invisible: true);
 *  - после первого живого пользовательского сигнала (см. useHumanSignal) вызывается
 *    execute() — Яндекса оценивает поведение и, если всё ок, сразу отдаёт токен
 *    без визуального челленджа. Подозрительным посетителям показывается челлендж.
 *  - полученный токен гейтит сабмит форм (кнопка disabled, пока токена нет) и
 *    отправляется на бэкенд для серверной верификации (см. mp-auth).
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

class SmartCaptchaStore {
	/** Текущий токен. null — проверка не пройдена. Реактивно (гейтит кнопку сабмита). */
	token = $state<string | null>(null);

	/** Состояние проверки. */
	status = $state<CaptchaStatus>('idle');

	/** Виджет отрендерен и готов к execute(). */
	ready = $state(false);

	/** Внутреннее: id виджета, возвращаемое render(). */
	private widgetId: string | null = null;

	/** Внутреннее: резолвер текущего execute()-промиса. */
	private pendingResolve: ((res: CaptchaTokenResult) => void) | null = null;

	/** Регистрирует id отрендеренного виджета (вызывается из SmartCaptchaWidget). */
	registerWidget(widgetId: string): void {
		this.widgetId = widgetId;
		this.ready = true;
	}

	/**
	 * Запускает проверку посетителя. Возвращает промис с токеном.
	 * Поведение зависит от оценки Яндекса: «хороший» посетитель получает токен
	 * без челленджа, «подозрительный» — видит всплывающий челлендж.
	 *
	 * Если виджет не готов (скрипт не загрузился / нет sitekey) — fail-open:
	 * возвращаем null, чтобы не блокировать легитимных юзеров при сбое инфра.
	 */
	execute(): Promise<CaptchaTokenResult> {
		if (typeof window === 'undefined' || !window.smartCaptcha || this.widgetId === null) {
			return Promise.resolve({ token: null, error: 'widget-not-ready' });
		}

		// Если токен уже есть — переиспользуем (не тратим лишний челлендж).
		if (this.token) {
			return Promise.resolve({ token: this.token });
		}

		this.status = 'loading';
		return new Promise<CaptchaTokenResult>((resolve) => {
			this.pendingResolve = resolve;
			window.smartCaptcha!.execute(this.widgetId!);
		});
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
}

/** Синглтон. */
export const captcha = new SmartCaptchaStore();
