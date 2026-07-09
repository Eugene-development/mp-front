import { guardedGoal } from './antibot/engagementGuard.svelte';

class ModalState {
	isOpen = $state(false);
	initialComment = $state('');
	/**
	 * Цель конверсии на успешный сабмит формы (используется только OrderModal):
	 * order_submit — главная, invoice_submit_<product> — каталог, calc_submit —
	 * калькулятор. Компонент формы шлёт reachGoal(submitGoal) после отправки.
	 */
	submitGoal = $state('');

	/**
	 * Открывает модалку.
	 *
	 * @param comment    Подставляется в поле комментария формы.
	 * @param ctaGoal    Клик-цель вовлечения (cta_click_*) — уходит через guardedGoal
	 *                   (поведенческий бюджет + серверный гейт) только для живого клика.
	 * @param submitGoal Цель конверсии на сабмит (см. поле выше). Сохраняется в
	 *                   состоянии, компонент формы отправит её после успешной отправки.
	 *
	 * ctaGoal проверяет isTrusted косвенно: все кнопки открытия обёрнуты в
	 * guardedClick, который отсекает синтетические клики ботов ещё до open().
	 * Гейтится только отправка целей — модалка открывается в любом случае.
	 */
	open(comment = '', ctaGoal, submitGoal) {
		this.initialComment = comment;
		this.isOpen = true;
		if (ctaGoal) guardedGoal(ctaGoal);
		this.submitGoal = submitGoal || '';
	}

	close() {
		this.isOpen = false;
	}
}

export const contactsModal = new ModalState();
export const orderModal = new ModalState();
export const priceModal = new ModalState();
