/**
 * Утилита отслеживания базовой активности пользователя (mouse/touch/scroll).
 *
 * Назначение (Вариант 3 из ТЗ): инициализировать «тяжёлую» защиту — а именно
 * взводить невидимую SmartCaptcha — только после срабатывания хотя бы одного
 * живого пользовательского события. Это отсекает headless-ботов, которые вообще
 * не генерируют движения мыши/скролла/тача: для них captcha просто не встанет
 * на вооружение, и сабмит останется заблокированным.
 *
 * Ключевая проверка — `event.isTrusted`: true только для событий, инициированных
 * реальным устройством ввода. Синтетические события (el.click(), dispatchEvent),
 * которыми эмулируют активность боты, имеют isTrusted === false и игнорируются.
 *
 * Не путать с trust-гейтом: эвристика НЕ открывает гейт Метрики (по умолчанию),
 * иначе первичный барьер (модалка) терял бы смысл. Она лишь взводит captcha.
 */

export type HumanSignalType =
	| 'mousemove'
	| 'mousedown'
	| 'scroll'
	| 'touchstart'
	| 'touchmove'
	| 'keydown';

export interface HumanSignalOptions {
	/** Вызывается один раз — при первом «живом» событии. */
	onSignal?: (type: HumanSignalType, event: Event) => void;
}

/** Список событий, которые считаются признаком живого присутствия. */
const SIGNAL_EVENTS: HumanSignalType[] = [
	'mousemove',
	'mousedown',
	'scroll',
	'touchstart',
	'touchmove',
	'keydown'
];

/**
 * Вешает (однократно срабатывающие) слушатели базовой активности.
 * Возвращает функцию очистки — вызовите её в onDestroy/onMount-return.
 *
 * @example
 * const stop = trackHumanSignal({ onSignal: () => armCaptcha() });
 * onDestroy(stop);
 */
export function trackHumanSignal(options: HumanSignalOptions = {}): () => void {
	if (typeof window === 'undefined') return () => {};

	let triggered = false;
	const { onSignal } = options;

	const handler = (type: HumanSignalType) => (event: Event) => {
		if (triggered) return;
		// isTrusted === true только для реальных устройств ввода.
		if (event.isTrusted === false) return;
		triggered = true;
		cleanup();
		onSignal?.(type, event);
	};

	const listeners: Array<[HumanSignalType, EventListener]> = SIGNAL_EVENTS.map((type) => [
		type,
		handler(type) as EventListener
	]);

	for (const [type, fn] of listeners) {
		// passive: true — не блокируем рендер/скролл; capture не нужен.
		window.addEventListener(type, fn, { passive: true });
	}

	function cleanup() {
		for (const [type, fn] of listeners) {
			window.removeEventListener(type, fn);
		}
	}

	return cleanup;
}
