class ContactsModalState {
	isOpen = $state(false);

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}
}

export const contactsModal = new ContactsModalState();
