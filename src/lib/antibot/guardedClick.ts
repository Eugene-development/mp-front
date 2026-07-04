/**
 * Обёртка для onclick-обработчиков, которые открывают модалки (не сабмитят формы).
 *
 * У таких кнопок нет своей антибот-защиты (в отличие от submit-форм — там
 * honeypot + SmartCaptcha + серверная верификация). Единственная дешёвая, но
 * действенная проверка — `event.isTrusted`: true только для кликов, инициированных
 * реальным устройством ввода. Синтетические клики ботов (el.click(), dispatchEvent)
 * имеют isTrusted === false и игнорируются.
 *
 * Использование:
 *   <button onclick={guardedClick(() => orderModal.open('...'))}>
 */
export function guardedClick(handler: () => void): (event: MouseEvent) => void {
	return (event: MouseEvent) => {
		if (event.isTrusted === false) return;
		handler();
	};
}
