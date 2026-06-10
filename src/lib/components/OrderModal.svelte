<script>
	import { orderModal } from '../modalState.svelte.js';
	import { fade, scale } from 'svelte/transition';

	// Close on ESC key press
	function handleKeydown(event) {
		if (event.key === 'Escape' && orderModal.isOpen) {
			orderModal.close();
		}
	}

	// Svelte 5 states for the form
	let companyName = $state('');
	let contactPerson = $state('');
	let contactPhone = $state('');
	let contactEmail = $state('');
	let orderComment = $state('');
	
	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let error = $state('');

	$effect(() => {
		if (orderModal.isOpen) {
			orderComment = orderModal.initialComment || '';
		}
	});

	const authApiUrl = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8001/api';

	async function handleSubmit(e) {
		e.preventDefault();
		error = '';
		isSubmitting = true;

		try {
			const sourceUrl = typeof window !== 'undefined' ? window.location.href : '';

			const response = await fetch(`${authApiUrl}/notify/invoice-request`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					company_name: companyName.trim(),
					contact_person: contactPerson.trim(),
					phone: contactPhone.trim(),
					email: contactEmail.trim(),
					comment: orderComment.trim() || null,
					source_url: sourceUrl
				})
			});

			const result = await response.json();

			if (!response.ok) {
				if (result.errors) {
					const messages = Object.values(result.errors).flat();
					throw new Error(messages.join(', ') || 'Ошибка валидации данных');
				}
				throw new Error(result.message || 'Не удалось отправить запрос');
			}

			isSuccess = true;
			// Reset form fields
			companyName = '';
			contactPerson = '';
			contactPhone = '';
			contactEmail = '';
			orderComment = '';
		} catch (err) {
			console.error('Invoice request error:', err);
			error = err.message || 'Не удалось отправить заявку. Попробуйте позже.';
		} finally {
			isSubmitting = false;
		}
	}

	function handleClose() {
		orderModal.close();
		// Reset state on close
		setTimeout(() => {
			isSuccess = false;
			error = '';
		}, 300);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if orderModal.isOpen}
	<!-- Backdrop with modern blur and dark overlay -->
	<div
		transition:fade={{ duration: 250 }}
		class="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/50 px-4 backdrop-blur-md"
		onclick={handleClose}
		onkeydown={() => {}}
		role="button"
		tabindex="0"
	>
		<!-- Animated Premium Modal Container -->
		<div
			transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
			class="double-bezel relative w-full max-w-lg overflow-hidden shadow-2xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
			role="document"
		>
			<div class="double-bezel-inner p-6 sm:p-8">
				<!-- Custom Close Button -->
				<button
					onclick={handleClose}
					class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-brand-divider bg-neutral-100 text-brand-gray transition-all duration-300 hover:bg-neutral-200 hover:text-brand-dark active:scale-95 sm:top-6 sm:right-6"
					aria-label="Закрыть"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="h-4 w-4"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>

				{#if isSuccess}
					<div transition:fade class="flex flex-col items-center justify-center text-center py-12">
						<div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent-light text-brand-accent text-3xl animate-bounce">
							✓
						</div>
						<h3 class="mb-3 font-serif text-2xl font-light text-brand-dark">Запрос успешно отправлен!</h3>
						<p class="mb-8 max-w-sm text-xs leading-relaxed text-brand-gray">
							Спасибо! Дежурный менеджер сбыта уже получил вашу спецификацию и подготовит счет с НДС в течение 15 минут.
						</p>
						<button
							onclick={handleClose}
							class="rounded-xl border border-brand-divider bg-neutral-100 px-6 py-3 text-xs font-bold tracking-wider text-brand-dark uppercase transition-all duration-300 hover:bg-neutral-200 active:scale-95"
						>
							Закрыть окно
						</button>
					</div>
				{:else}
					<!-- Title block -->
					<div class="mb-6">
						<span
							class="mb-2 inline-block rounded-full border border-brand-divider bg-neutral-100 px-3 py-1 text-[9px] font-bold tracking-widest text-brand-gray uppercase"
						>
							Заявка на коммерческое предложение
						</span>
						<h3 class="font-serif text-3xl font-light tracking-tight text-brand-dark">
							Получить счет <span class="font-normal text-brand-accent italic">с НДС</span>
						</h3>
						<p class="mt-2 text-xs text-brand-gray">
							Прикрепите реквизиты компании, и дежурный менеджер сбыта выставит официальный счет.
						</p>
					</div>

					<!-- Form -->
					<form class="space-y-4" onsubmit={handleSubmit}>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div class="flex flex-col">
								<label
									for="modal-company-name"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
									>Название организации / ИНН</label
								>
								<input
									id="modal-company-name"
									type="text"
									required
									bind:value={companyName}
									placeholder="ООО Промышленная Химия"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
								/>
							</div>
							<div class="flex flex-col">
								<label
									for="modal-contact-person"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
									>Контактное лицо</label
								>
								<input
									id="modal-contact-person"
									type="text"
									required
									bind:value={contactPerson}
									placeholder="ФИО"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div class="flex flex-col">
								<label
									for="modal-contact-phone"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
									>Телефон для связи</label
								>
								<input
									id="modal-contact-phone"
									type="tel"
									required
									bind:value={contactPhone}
									placeholder="+7 (999) 000-00-00"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
								/>
							</div>
							<div class="flex flex-col">
								<label
									for="modal-contact-email"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
									>E-mail</label
								>
								<input
									id="modal-contact-email"
									type="email"
									required
									bind:value={contactEmail}
									placeholder="email@mail.ru"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
								/>
							</div>
						</div>

						<div class="flex flex-col">
							<label
								for="modal-order-comment"
								class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
								>Детали заказа / Спецификация</label
							>
							<textarea
								id="modal-order-comment"
								rows="3"
								bind:value={orderComment}
								placeholder="Комментарий к заказу"
								class="resize-none rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
							></textarea>
						</div>

						{#if error}
							<div class="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
								⚠️ {error}
							</div>
						{/if}

						<button
							type="submit"
							disabled={isSubmitting}
							class="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-brand-dark px-6 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75"
						>
							{#if isSubmitting}
								<span class="flex items-center gap-2">
									<svg class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Отправка...
								</span>
							{:else}
								<span>Получить счет с НДС</span>
								<span
									class="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2.5"
										stroke="currentColor"
										class="h-3 w-3 text-white"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
										/>
									</svg>
								</span>
							{/if}
						</button>

						<span class="mt-3 block text-center text-[8px] text-brand-gray">
							Нажимая кнопку, вы соглашаетесь на обработку персональных данных для выставления
							счета.
						</span>
					</form>
				{/if}
			</div>
		</div>
	</div>
{/if}
