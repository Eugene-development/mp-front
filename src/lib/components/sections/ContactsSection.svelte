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
						Офис продаж и центральный склад ООО «МегаПак» находятся на одной территории в Москве для
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
					<h3 class="mb-2 font-serif text-xl font-light text-brand-dark">Направить запрос на КП</h3>
					<p class="mb-6 text-xs text-brand-gray">
						Прикрепите реквизиты компании, и дежурный менеджер сбыта выставит официальный счет с НДС
						в течение 15 минут.
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
									for="company-name"
									class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
									>Название организации / ИНН</label
								>
								<input
									id="company-name"
									type="text"
									required
									placeholder="ООО Промышленная Химия"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
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
									placeholder="Константин Александрович"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
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
									placeholder="+7 (999) 000-00-00"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
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
									placeholder="logistics@prom-chem.ru"
									class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
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
								placeholder="Требуется 100 синих бочек L-Ring 227 л и 10 еврокубов на металлическом поддоне. Доставка в Подольск."
								class="resize-none rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
							></textarea>
						</div>

						<button
							type="submit"
							class="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-brand-dark px-6 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
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
							счета.
						</span>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
