class ModalState {
	isOpen = $state(false);
	initialComment = $state('');

	open(comment = '') {
		this.initialComment = comment;
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}
}

export const contactsModal = new ModalState();
export const orderModal = new ModalState();
export const priceModal = new ModalState();
