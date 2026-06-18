<script>
	// Page logic and state
</script>

<svelte:head>
	<title>Контакты ООО «МегаПак» — Офис продаж и склад в Москве</title>
	<meta
		name="description"
		content="Официальные контакты компании ООО «МегаПак». Отдел сбыта, адрес комплекса, телефоны и email. Офис продаж и центральный склад на одной территории: Москва, ул. Верхние Поля, 61."
	/>
	<meta
		name="keywords"
		content="контакты мегапак, адрес мегапак, мегапак телефон, мегапак склад, заказать пластиковую тару, мегапак москва"
	/>
</svelte:head>

<!-- Background Ambient Lighting -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute -top-[10%] left-[20%] h-[60vw] w-[60vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[130px]"
	></div>
	<div
		class="absolute bottom-[10%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -8s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Title -->
	<div class="mb-12 md:mb-16">
		<div
			class="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-brand-gray uppercase"
		>
			<a href="/" class="transition-colors duration-300 hover:text-brand-dark">Главная</a>
			<span>/</span>
			<span class="text-brand-accent">Контакты</span>
		</div>
		<h1
			class="font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Контакты
			<span class="font-normal text-brand-accent italic">ООО «МегаПак»</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Офис продаж и центральный логистический комплекс расположены на одной территории для
			максимальной скорости оформления документации и отгрузки готовой продукции.
		</p>
	</div>

	<!-- Main content grid -->
	<div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
		<!-- Left side: Contact Details Cards -->
		<div class="flex flex-col gap-6 lg:col-span-5">
			<!-- Contact Information Card -->
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8">
					<h2 class="mb-6 font-serif text-2xl font-light text-brand-dark">Адрес и реквизиты</h2>

					<div class="space-y-6">
						<!-- Address info -->
						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
							>
								📍
							</div>
							<div class="flex flex-col">
								<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
									>Адрес комплекса</span
								>
								<span class="mt-1 text-sm leading-snug font-semibold text-brand-dark">
									109429, г. Москва, ул. Верхние Поля, дом 61
								</span>
								<span class="mt-0.5 text-sm text-brand-gray">
									Офис продаж и логистический комплекс на одной территории
								</span>
							</div>
						</div>

						<!-- Phones info -->
						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
							>
								📞
							</div>
							<div class="flex flex-col">
								<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
									>Отдел продаж и логистики</span
								>
								<a
									href="tel:+74994906145"
									class="mt-1 text-sm font-semibold text-brand-dark transition-colors duration-300 hover:text-brand-accent"
								>
									8 (499) 490-61-45
								</a>
								<a
									href="tel:+79037491724"
									class="text-sm font-semibold text-brand-dark transition-colors duration-300 hover:text-brand-accent"
								>
									8 (903) 749-17-24
								</a>
							</div>
						</div>

						<!-- Email info -->
						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
							>
								✉️
							</div>
							<div class="flex flex-col">
								<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
									>Для коммерческих запросов</span
								>
								<a
									href="mailto:info@megapak.top"
									class="mt-1 text-sm font-semibold text-brand-accent hover:underline"
								>
									info@megapak.top
								</a>
							</div>
						</div>

						<!-- Working hours info -->
						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
							>
								🕒
							</div>
							<div class="flex flex-col">
								<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
									>Режим работы</span
								>
								<span class="mt-1 text-sm font-semibold text-brand-dark">
									Пн–Пт с 9:00 до 18:00 (МСК)
								</span>
								<span class="mt-0.5 text-sm text-brand-gray">
									Суббота, Воскресенье — выходные дни
								</span>
							</div>
						</div>
					</div>

					<div
						class="mt-8 border-t border-brand-divider pt-6 text-[10px] leading-relaxed text-brand-gray"
					>
						<span class="mb-1 block font-semibold text-brand-dark uppercase"
							>Реквизиты организации</span
						>
						ООО «МегаПак» <br />
						ИНН: 7723910385 | КПП: 772301001 <br />
						ОГРН: 1147746569103
					</div>
				</div>
			</div>
		</div>

		<!-- Right side: Map and Form -->
		<div class="flex flex-col gap-6 lg:col-span-7">
			<!-- Interactive Map Card -->
			<div class="double-bezel overflow-hidden">
				<div class="double-bezel-inner h-[380px] overflow-hidden p-1">
					<iframe
						src="https://yandex.ru/map-widget/v1/?ll=37.822851%2C55.655938&z=15&l=map&pt=37.822851%2C55.655938%2Cpm2rdl"
						width="100%"
						height="100%"
						frameborder="0"
						allowfullscreen="true"
						title="Схема проезда к ООО «МегаПак»"
						class="h-full w-full rounded-[1.25rem] border-0"
						style="filter: contrast(1.05) saturate(0.95);"
					></iframe>
				</div>
			</div>

			<!-- B2B Request Form -->
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8">
					<h3 class="font-serif text-xl font-light text-brand-dark">Направить запрос на КП</h3>
					<p class="mb-6 text-sm text-brand-gray">
						Заполните форму и прикрепите реквизиты, чтобы получить индивидуальное предложение или
						счет с НДС
					</p>

					<form
						class="space-y-4"
						onsubmit={(e) => {
							e.preventDefault();
							alert('Спасибо! Запрос успешно принят. Мы свяжемся с вами в течение 15 минут.');
						}}
					>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div class="flex flex-col">
								<label
									for="company-name-page"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
								>
									Название организации / ИНН
								</label>
								<input
									id="company-name-page"
									type="text"
									required
									placeholder="ООО Промышленная Химия"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
								/>
							</div>
							<div class="flex flex-col">
								<label
									for="contact-person-page"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
								>
									Контактное лицо
								</label>
								<input
									id="contact-person-page"
									type="text"
									required
									placeholder="Константин Александрович"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div class="flex flex-col">
								<label
									for="contact-phone-page"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
								>
									Телефон для связи
								</label>
								<input
									id="contact-phone-page"
									type="tel"
									required
									placeholder="+7 (999) 000-00-00"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
								/>
							</div>
							<div class="flex flex-col">
								<label
									for="contact-email-page"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
								>
									E-mail
								</label>
								<input
									id="contact-email-page"
									type="email"
									required
									placeholder="logistics@prom-chem.ru"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
								/>
							</div>
						</div>

						<div class="flex flex-col">
							<label
								for="order-comment-page"
								class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
							>
								Детали заказа / Спецификация
							</label>
							<textarea
								id="order-comment-page"
								rows="3"
								placeholder="Укажите необходимый объем продукции (например, 100 бочек L-Ring 227л) и адрес доставки."
								class="resize-none rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
							></textarea>
						</div>

						<button
							type="submit"
							class="group mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-brand-dark px-6 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
						>
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
						</button>

						<span class="mt-3 block text-center text-[8px] text-brand-gray">
							Нажимая кнопку, вы соглашаетесь на обработку персональных данных для выставления
							коммерческого предложения.
						</span>
					</form>
				</div>
			</div>
		</div>
	</div>
</main>
