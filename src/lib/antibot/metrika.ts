/**
 * Ленивый загрузчик Яндекс.Метрики.
 *
 * ВАЖНО: Метрика здесь НЕ инициализируется автоматически при загрузке страницы.
 * Раньше инициализация висела в app.html и срабатывала для каждого визита —
 * включая ботов, что искажало метрики Директа (показатели отказов, время на сайте).
 *
 * Теперь `init()` вызывается только после прохождения поведенческого барьера
 * (см. trust.svelte.ts). Пока барьер не пройден — tag.js не грузится и счётчик
 * не растёт, поэтому боты не фиксируются системой как полноценные визиты.
 *
 * `reachGoal` безопасно вызывать в любой момент: если init ещё не было, цель
 * буферизуется и будет отправлена сразу после инициализации.
 */

const FALLBACK_YM_ID = 109634916;

/** ID счётчика из env (VITE_YM_ID) с фоллбэком на продакшен-счётчик. */
export const YM_ID: number = Number(import.meta.env.VITE_YM_ID) || FALLBACK_YM_ID;

/** URL тега Метрики. */
const TAG_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`;

let initialized = false;
let initPromise: Promise<void> | null = null;

/** Цели, вызванные до init — будут отправлены после инициализации. */
const pendingGoals: Array<[string, Record<string, unknown>?]> = [];

/**
 * Устанавливает глобальный заглушки-обработчик `window.ym` и вставляет tag.js.
 * Идемпотентно: повторные вызовы возвращают тот же Promise.
 *
 * @see https://yandex.ru/support/metrica/code/counter-initialize.html
 */
export function init(): Promise<void> {
	if (initPromise) return initPromise;

	initPromise = new Promise<void>((resolve) => {
		if (typeof window === 'undefined' || typeof document === 'undefined') {
			resolve();
			return;
		}

		// Заглушка-очередь: вызовы ym(...) до загрузки tag.js копятся и выполнятся позже.
		// Это «родной» паттерн сниппета Метрики.
		window.ym =
			window.ym ||
			function (...args: unknown[]) {
				// @ts-expect-error — Метрика использует鸭子 typing: .a — массив накопленных вызовов
				(window.ym!.a = window.ym!.a || []).push(args);
			};

		// Защита от повторной вставки тега (например, при HMR в dev).
		const alreadyInjected = Array.from(document.scripts).some((s) => s.src === TAG_SRC);
		if (!alreadyInjected) {
			const script = document.createElement('script');
			script.async = true;
			script.src = TAG_SRC;
			document.head.appendChild(script);
		}

		// Инициализация счётчика. Параметры соответствуют прежнему сниппету из app.html.
		window.ym(YM_ID, 'init', {
			clickmap: true,
			trackLinks: true,
			accurateTrackBounce: true,
			webvisor: true
		});

		initialized = true;

		// Flush буфера целей, накопленных до init.
		flushPending();

		resolve();
	});

	return initPromise;
}

/** true, если Метрика уже была инициализирована. */
export function isInitialized(): boolean {
	return initialized;
}

/**
 * Отправка цели (конверсии). Безопасно вызывать до `init()` — цель буферизуется.
 *
 * @param target  Имя цели, заведённой в интерфейсе Метрики.
 * @param params  Дополнительные параметры (передаются третьим аргументом ym).
 */
export function reachGoal(target: string, params?: Record<string, unknown>): void {
	if (typeof window === 'undefined') return;

	if (!initialized) {
		pendingGoals.push([target, params]);
		return;
	}

	safeSend(target, params);
}

/** Дёргает ym('reachGoal', ...) с защитой от отсутствия глобального объекта. */
function safeSend(target: string, params?: Record<string, unknown>): void {
	if (typeof window === 'undefined' || typeof window.ym !== 'function') return;
	window.ym(YM_ID, 'reachGoal', target, params);
}

/** Отправляет все буферизованные цели после успешной инициализации. */
function flushPending(): void {
	while (pendingGoals.length > 0) {
		const [target, params] = pendingGoals.shift()!;
		safeSend(target, params);
	}
}
