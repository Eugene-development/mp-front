<script>
	import { fade } from 'svelte/transition';

	// Svelte 5 states for the form
	let companyName = $state('');
	let contactPerson = $state('');
	let contactPhone = $state('');
	let contactEmail = $state('');
	let orderComment = $state('');

	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let error = $state('');

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
					Accept: 'application/json'
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
</script>

<!-- Contact B2B Request Form & Live Office Details -->
<section id="contacts" class="border-t border-brand-divider bg-white/40 py-24">
	<div class="mx-auto max-w-[1440px] px-4">
		<div class="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
			<!-- Live Office Details (Left - col-span-5) -->
			<div class="flex flex-col justify-between lg:col-span-5">
				<div>
					<span
						class="mb-4 inline-block rounded-full border border-brand-divider bg-neutral-100 px-3 py-1 text-[9px] font-bold tracking-widest text-brand-gray uppercase"
						>Контакты
					</span>
					<h2
						class="mb-6 font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-5xl"
					>
						Оформление поставок <br />
						<span class="font-normal text-brand-accent italic">и складской выдачи</span>
					</h2>
					<p class="mb-8 text-sm leading-relaxed text-brand-gray">
						Офис продаж и centralный склад ООО «МегаПак» находятся на одной территории в Москве для
						мгновенной выписки документов и отгрузки транспорта.
					</p>

					<!-- Bullet info -->
					<div class="space-y-6">
						<div class="flex gap-4">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-divider bg-neutral-100 text-brand-dark"
							>
								📍
							</div>
							<div class="flex flex-col">
								<span class="text-[10px] tracking-wider text-brand-gray uppercase"
									>Адрес комплекса</span
								>
								<span class="mt-1 text-sm font-semibold text-brand-dark"
									>109429, г. Москва, ул. Верхние Поля, дом 61</span
								>
							</div>
						</div>

						<div class="flex gap-4">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-divider bg-neutral-100 text-brand-dark"
							>
								📞
							</div>
							<div class="flex flex-col">
								<span class="text-[10px] tracking-wider text-brand-gray uppercase"
									>Отдел сбыта и логистики</span
								>
								<span class="mt-1 text-sm font-semibold text-brand-dark"
									>8 (499) 490-61-45 / 8 (903) 749-17-24</span
								>
							</div>
						</div>

						<div class="flex gap-4">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-divider bg-neutral-100 text-brand-dark"
							>
								✉️
							</div>
							<div class="flex flex-col">
								<span class="text-[10px] tracking-wider text-brand-gray uppercase"
									>Прямой E-mail</span
								>
								<span class="mt-1 text-sm font-semibold text-brand-accent hover:underline"
									>zakaz@megapak.top</span
								>
							</div>
						</div>
					</div>
				</div>

				<div
					class="mt-8 border-t border-brand-divider pt-8 text-[9px] leading-relaxed text-brand-gray"
				>
					ООО «МегаПак» | ИНН 7723910385 | КПП 772301001 <br />
					Режим работы отдела продаж: Пн–Пт с 9:00 до 18:00 (МСК).
				</div>
			</div>

			<!-- B2B Request Form (Right - col-span-7) -->
			<div class="double-bezel lg:col-span-7">
				<div class="double-bezel-inner p-8">
					{#if isSuccess}
						<div
							transition:fade
							class="flex flex-col items-center justify-center py-12 text-center"
						>
							<div
								class="mb-6 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-brand-accent-light text-3xl text-brand-accent"
							>
								✓
							</div>
							<h3 class="mb-3 font-serif text-2xl font-light text-brand-dark">
								Запрос успешно отправлен!
							</h3>
							<p class="mb-8 max-w-sm text-sm leading-relaxed text-brand-gray">
								Спасибо! Менеджер сбыта уже получил вашу спецификацию и подготовит счет с НДС.
								Ожидайте звонка или письма.
							</p>
							<button
								onclick={() => (isSuccess = false)}
								class="rounded-xl border border-brand-divider px-6 py-3 text-sm font-bold tracking-wider text-brand-dark uppercase transition-all duration-300 hover:bg-neutral-50 active:scale-95"
							>
								Отправить еще один запрос
							</button>
						</div>
					{:else}
						<h3 class="mb-2 font-serif text-xl font-light text-brand-dark">
							Направить запрос на КП
						</h3>
						<p class="mb-6 text-sm text-brand-gray">
							Прикрепите реквизиты компании, и наш менеджер сбыта выставит официальный счет с НДС.
						</p>

						<form class="space-y-4" onsubmit={handleSubmit}>
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div class="flex flex-col">
									<label
										for="company-name"
										class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
									>
										ИНН / Название организации</label
									>
									<input
										id="company-name"
										type="text"
										required
										bind:value={companyName}

										class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
									/>
								</div>
								<div class="flex flex-col">
									<label
										for="contact-person"
										class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
										>Контактное лицо</label
									>
									<input
										id="contact-person"
										type="text"
										required
										bind:value={contactPerson}

										class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
									/>
								</div>
							</div>

							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div class="flex flex-col">
									<label
										for="contact-phone"
										class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
										>Телефон для связи</label
									>
									<input
										id="contact-phone"
										type="tel"
										required
										bind:value={contactPhone}

										class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
									/>
								</div>
								<div class="flex flex-col">
									<label
										for="contact-email"
										class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
										>E-mail</label
									>
									<input
										id="contact-email"
										type="email"
										required
										bind:value={contactEmail}

										class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
									/>
								</div>
							</div>

							<div class="flex flex-col">
								<label
									for="order-comment"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
									>Детали заказа / Спецификация</label
								>
								<textarea
									id="order-comment"
									rows="3"
									bind:value={orderComment}

									class="resize-none rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
								></textarea>
							</div>

							{#if error}
								<div class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
									⚠️ {error}
								</div>
							{/if}

							<button
								type="submit"
								disabled={isSubmitting}
								class="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-brand-dark px-6 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75"
							>
								{#if isSubmitting}
									<span class="flex items-center gap-2">
										<svg class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											></circle>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
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
	</div>
</section>
