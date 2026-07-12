/**
 * Захват UTM-меток рекламного трафика (Яндекс Директ и др.).
 *
 * Проблема: UTM-параметры есть только в URL посадочной страницы. Если посетитель
 * уходит на другую страницу (каталог, контакты) и отправляет заявку оттуда —
 * window.location.href уже не содержит UTM, и атрибуция рекламного клика теряется.
 *
 * Решение: при первом заходе с UTM сохраняем их в localStorage и отдаём формам
 * при отправке заявки. Окно атрибуции — 30 дней (стандарт last-click для B2B);
 * при повторном заходе с новой рекламной ссылкой — перезаписываем.
 */

const STORAGE_KEY = 'mp_utm_v1';
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 дней

/** UTM-поля, которые имеет смысл пробрасывать в заявку. */
export const UTM_FIELDS = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_campaign_id',
	'utm_content',
	'utm_term'
];

function isBrowser() {
	return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/** Прочитать UTM из query текущего URL (null, если их нет). */
function readUrlUtm() {
	if (!isBrowser()) return null;
	const params = new URLSearchParams(window.location.search);
	const found = {};
	let hasAny = false;
	for (const key of UTM_FIELDS) {
		const val = params.get(key);
		if (val) {
			found[key] = val;
			hasAny = true;
		}
	}
	return hasAny ? found : null;
}

/**
 * Вызвать один раз при загрузке приложения (см. +layout.svelte → onMount).
 * Если в URL есть UTM — перезаписываем хранилище (новый рекламный клик).
 */
export function captureUtm() {
	if (!isBrowser()) return;
	const fromUrl = readUrlUtm();
	if (!fromUrl) return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: fromUrl, ts: Date.now() }));
	} catch {
		// localStorage недоступен (приватный режим / квота) — тихо игнорируем.
	}
}

/**
 * Сохранённые UTM для отправки с заявкой или null, если их нет / устарели.
 */
export function getStoredUtm() {
	if (!isBrowser()) return null;
	let raw;
	try {
		raw = window.localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== 'object' || !parsed.v) return null;
		if (typeof parsed.ts === 'number' && Date.now() - parsed.ts > TTL_MS) {
			// Просрочено — чистим, чтобы не приписывать заявку старому клику.
			try {
				window.localStorage.removeItem(STORAGE_KEY);
			} catch {
				/* noop */
			}
			return null;
		}
		return parsed.v;
	} catch {
		return null;
	}
}
