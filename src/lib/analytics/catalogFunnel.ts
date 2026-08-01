/**
 * Составная цель «интерес к канистрам» — вся логика на клиенте.
 *
 * В Метрике это ОДНА цель с одним именем (CATALOG_INTEREST_GOAL). Три шага
 * последовательности проверяются здесь, в JS; цель отправляется только когда
 * посетитель прошёл все шаги ПО ПОРЯДКУ:
 *
 *   1. переход на /catalog именно с главной страницы;
 *   2. любой скролл вниз по странице каталога;
 *   3. навигация по карусели любой категории ИЛИ клик по фото канистры.
 *
 * Шаги вне порядка игнорируются: скролл до шага 1 или клик по карусели без
 * скролла цель не двигают. Это позволяет обойтись без составной цели в
 * интерфейсе Метрики — достаточно одной цели типа «JavaScript-событие».
 *
 * Отправка идёт через guardedGoal (антибот-гейт, как у остальных клик-целей),
 * поэтому имя цели должно быть в ALLOWED_GOALS в mp-auth
 * (EngagementTrackingController).
 */
import { guardedGoal } from '$lib/antibot/engagementGuard.svelte';

/** Имя цели в интерфейсе Метрики. */
export const CATALOG_INTEREST_GOAL = 'catalog_kanistry_interest';

/** Ключ защиты от повторной отправки в рамках одной сессии браузера. */
const SENT_KEY = 'mp_catalog_funnel_sent_v1';

/** Пройденные шаги: 0 — ничего, 1 — пришёл с главной, 2 — проскроллил, 3 — цель. */
let step = 0;

/**
 * Сбрасывает прогресс. Вызывается при каждом входе на страницу каталога:
 * состояние модуля живёт дольше компонента (модуль — синглтон на весь SPA).
 */
export function resetCatalogFunnel(): void {
	step = 0;
}

/** Шаг 1: посетитель пришёл на каталог с главной. */
export function markArrivedFromHome(): void {
	if (step === 0) step = 1;
}

/** Шаг 2: скролл вниз. Учитывается только после шага 1. */
export function markScrolledDown(): void {
	if (step === 1) step = 2;
}

/** Шаг 3: взаимодействие с каруселью категории. Учитывается только после шага 2. */
export function markSliderEngaged(): void {
	if (step !== 2) return;
	step = 3;
	complete();
}

/** Отправляет цель один раз за сессию. */
function complete(): void {
	if (alreadySent()) return;
	markSent();
	guardedGoal(CATALOG_INTEREST_GOAL);
}

function alreadySent(): boolean {
	if (typeof sessionStorage === 'undefined') return false;
	try {
		return sessionStorage.getItem(SENT_KEY) === '1';
	} catch {
		return false;
	}
}

function markSent(): void {
	if (typeof sessionStorage === 'undefined') return;
	try {
		sessionStorage.setItem(SENT_KEY, '1');
	} catch {
		/* приватный режим / переполнение квоты — молча игнорируем */
	}
}
