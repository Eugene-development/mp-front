/**
 * Защита клик-целей вовлечения (cta_click_*) от накрутки ботами — БЕЗ капчи.
 *
 * Три слоя поверх проверки isTrusted в guardedClick (которая отсекает синтетические
 * el.click()/dispatchEvent):
 *
 * 1. Поведенческий бюджет (humanity): цель засчитывается, только если посетитель
 *    «проявил себя» — подвигал мышью/прокрутил/нажал клавишу ИЛИ провёл на
 *    странице >= MIN_DWELL_MS. Бот, кликающий CTA в момент load без активности,
 *    отсекается. Реальный человек почти всегда успевает пошевелить курсором до
 *    клика, поэтому ложных пропусков минимум.
 *
 * 2. Клиентский rate-limit (дешёвый первый фильтр): не больше MAX_PER_WINDOW
 *    клик-целей за окно WINDOW_MS в sessionStorage. Снижает лишние запросы к
 *    серверу и отсекает наивных ботов.
 *
 * 3. Серверный гейт (основная защита): перед reachGoal спрашиваем сервер
 *    /track/engagement. Бот-ферма, гоняющая реальную страницу в браузерах,
 *    вынуждена ходить туда и упирается в per-session/per-IP лимиты (см.
 *    EngagementTrackingController). reachGoal уходит ТОЛЬКО на 200 от сервера;
 *    на 429 цель подавляется. При сетевой ошибке/недоступности API — fail-open
 *    (шлём reachGoal), чтобы сбои сети и ad-block не теряли цели реальных людей:
 *    бот это обойдёт вызовом reachGoal напрямую, но массовую накрутку с реальной
 *    страницы гейт всё равно режет.
 *
 * Гейтится только отправка цели. Открытие модалки и звонок происходят как обычно.
 *
 * Конверсионные цели (*_submit) используют reachGoal напрямую — они защищены
 * капчей и серверной валидацией формы и через этот гейт не проходят.
 */
import { reachGoal } from './metrika';

/** API mp-auth (тем же env, что и формы заявок). */
const AUTH_API_URL =
	(import.meta.env.VITE_AUTH_API_URL as string | undefined) || 'http://localhost:8001/api';

/** Минимальное время на странице (мс) до учёта клик-цели. */
const MIN_DWELL_MS = 800;
/** Максимум клик-целей за скользящее окно (клиентский фильтр). */
const MAX_PER_WINDOW = 10;
/** Длина скользящего окна (мс). */
const WINDOW_MS = 60_000;
/** Срок жизни кеша nonce на клиенте (мс) — меньше серверного TTL (30 мин). */
const NONCE_TTL_MS = 25 * 60 * 1000;
const STORE_KEY = 'mp_engrate_v1';

/** Набран ли поведенческий бюджет. */
let primed = false;
let started = false;

/** Кеш nonce и текущий in-flight запрос выдачи. */
let nonce: string | null = null;
let nonceExpiresAt = 0;
let noncePromise: Promise<string | null> | null = null;

/**
 * Запускает трекинг человеческого присутствия. Один раз на клиенте (onMount
 * корневого layout). Возвращает функцию очистки. Идемпотентно (безопасно при HMR).
 */
export function startEngagementGuard(): () => void {
	if (started || typeof window === 'undefined') return () => {};
	started = true;

	const markPrimed = () => {
		primed = true;
	};

	const onSignal = (event: Event) => {
		if (event.isTrusted === false) return; // синтетика ботов — игнорируем
		markPrimed();
	};
	const signals = ['mousemove', 'scroll', 'touchmove', 'keydown'];
	for (const type of signals) {
		window.addEventListener(type, onSignal, { passive: true });
	}

	const dwellTimer = window.setTimeout(markPrimed, MIN_DWELL_MS);

	return () => {
		for (const type of signals) {
			window.removeEventListener(type, onSignal);
		}
		window.clearTimeout(dwellTimer);
	};
}

/**
 * Отправляет клик-цель сквозь три слоя (humanity → клиентский лимит → сервер).
 * Асинхронна (серверный раунд-трип); вызывающей стороне ждать не нужно.
 */
export async function guardedGoal(name: string, params?: Record<string, unknown>): Promise<void> {
	if (!primed) return; // поведенческий бюджет не набран
	if (!takeToken()) return; // клиентский rate-limit

	const token = await getNonce();
	if (!token) {
		// Nonce получить не удалось (API недоступен/ad-block) — fail-open.
		reachGoal(name, params);
		return;
	}

	try {
		const res = await fetch(`${AUTH_API_URL}/track/engagement`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ goal: name, token })
		});

		if (res.status === 429) {
			return; // сервер указал подавить цель — не шлём reachGoal
		}
		if (!res.ok) {
			// 422 (невалидный/просроченный nonce) — сбросим кеш, в следующий раз
			// перевыпустим; цель сейчас учитываем (fail-open).
			nonce = null;
		}
		reachGoal(name, params);
	} catch {
		// Сетевой сбой — fail-open, чтобы не терять цели реальных пользователей.
		reachGoal(name, params);
	}
}

/** Возвращает актуальный nonce (лениво, с кешированием и слиянием запросов). */
function getNonce(): Promise<string | null> {
	if (nonce && Date.now() < nonceExpiresAt) return Promise.resolve(nonce);
	if (!noncePromise) {
		noncePromise = fetchNonce().finally(() => {
			noncePromise = null; // следующий промах запустит новый запрос
		});
	}
	return noncePromise;
}

async function fetchNonce(): Promise<string | null> {
	try {
		const res = await fetch(`${AUTH_API_URL}/track/nonce`, {
			method: 'POST',
			headers: { Accept: 'application/json' }
		});
		if (!res.ok) return null;
		const data = (await res.json()) as { token?: string };
		if (!data.token) return null;
		nonce = data.token;
		nonceExpiresAt = Date.now() + NONCE_TTL_MS;
		return nonce;
	} catch {
		return null;
	}
}

// --- клиентский rate limiter: скользящее окно в sessionStorage ------------

function takeToken(): boolean {
	const now = Date.now();
	const recent = load().filter((t) => now - t < WINDOW_MS);
	if (recent.length >= MAX_PER_WINDOW) {
		save(recent);
		return false;
	}
	recent.push(now);
	save(recent);
	return true;
}

function load(): number[] {
	if (typeof sessionStorage === 'undefined') return [];
	try {
		const raw = sessionStorage.getItem(STORE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'number') : [];
	} catch {
		return [];
	}
}

function save(ts: number[]): void {
	if (typeof sessionStorage === 'undefined') return;
	try {
		sessionStorage.setItem(STORE_KEY, JSON.stringify(ts));
	} catch {
		/* приватный режим / переполнение квоты — молча игнорируем */
	}
}
