<script>
	// Page logic and state
</script>

<svelte:head>
	<title>Стандарты и качество тары ООО «МегаПак» — ГОСТ и UN нормативы</title>
	<meta
		name="description"
		content="Технические стандарты герметичности и прочности пластиковой тары ООО «МегаПак». Сравнение показателей ГОСТ/UN с реальными тестами бочек, канистр и еврокубов."
	/>
	<meta
		name="keywords"
		content="стандарты мегапак, гост канистра, испытания тары, контроль герметичности, сертификат соответствия гост, бочки un"
	/>
</svelte:head>

<!-- Background Ambient Lighting -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute top-[10%] left-[25%] h-[55vw] w-[55vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[130px]"
	></div>
	<div
		class="absolute bottom-[10%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -9s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-16">
		<div class="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-brand-gray uppercase">
			<a href="/" class="transition-colors duration-300 hover:text-brand-dark">Главная</a>
			<span>/</span>
			<span class="text-brand-accent">Стандарты</span>
		</div>
		<h1 class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl">
			Стандарты герметичности <br />
			<span class="font-normal text-brand-accent italic">и промышленной безопасности</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Использование полимерной тары ООО «МегаПак» исключает риски утечек, деформаций или порчи сырья. Мы гарантируем паспортное качество полиэтилена и 100% выходной неразрушающий контроль каждой единицы продукции.
		</p>
	</div>

	<!-- Main grid layout -->
	<div class="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
		<!-- Left: Comparison Matrix Table (col-span-7) -->
		<div class="lg:col-span-7 flex flex-col justify-between">
			<div class="double-bezel">
				<div class="double-bezel-inner relative overflow-hidden bg-brand-dark p-6 sm:p-8 text-white rounded-2xl">
					<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
						Результаты заводских испытаний
					</span>
					<h3 class="mb-6 font-serif text-2xl font-light text-white">
						Технические нормативы тары МегаПак
					</h3>

					<div class="space-y-4 font-mono text-[11px] leading-relaxed">
						<!-- Table Header -->
						<div class="flex justify-between border-b border-white/10 pb-3 text-neutral-450 font-bold">
							<span class="w-2/5">ПОКАЗАТЕЛЬ / ТЕСТ</span>
							<span class="w-1/3 text-left">НОРМА ГОСТ / UN</span>
							<span class="w-1/4 text-right text-brand-accent-light">МЕГАПАК</span>
						</div>
						
						<!-- Row 1 -->
						<div class="flex justify-between border-b border-white/5 py-2.5">
							<span class="w-2/5 text-neutral-400">Устойчивость к падению (высота)</span>
							<span class="w-1/3 text-neutral-400">1.2 м (для класса II)</span>
							<span class="w-1/4 text-right font-bold text-emerald-400">1.8 м (Пройден)</span>
						</div>

						<!-- Row 2 -->
						<div class="flex justify-between border-b border-white/5 py-2.5">
							<span class="w-2/5 text-neutral-400">Гидравлическое давление (тест)</span>
							<span class="w-1/3 text-neutral-400">100 кПа / 30 мин</span>
							<span class="w-1/4 text-right font-bold text-emerald-400">150 кПа / 60 мин</span>
						</div>

						<!-- Row 3 -->
						<div class="flex justify-between border-b border-white/5 py-2.5">
							<span class="w-2/5 text-neutral-400">Сопротивление сжатию (штабель)</span>
							<span class="w-1/3 text-neutral-400">ГОСТ 25014-81 (3 ур.)</span>
							<span class="w-1/4 text-right font-bold text-emerald-400">До 4 уровней</span>
						</div>

						<!-- Row 4 -->
						<div class="flex justify-between py-2.5">
							<span class="w-2/5 text-neutral-400">Рабочие температуры (предел)</span>
							<span class="w-1/3 text-neutral-400">-30°C ... +60°C</span>
							<span class="w-1/4 text-right font-bold text-emerald-400">-40°C ... +80°C</span>
						</div>
					</div>

					<div class="mt-8 border-t border-white/10 pt-6 text-[10px] text-neutral-400 flex items-center justify-between">
						<span>*Испытания проведены в аккредитованной лаборатории.</span>
						<span class="font-bold text-white uppercase tracking-wider">Паспорт качества</span>
					</div>
				</div>
			</div>

			<!-- Quality Checklist -->
			<div class="mt-8 space-y-4">
				<div class="flex gap-4">
					<div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-accent-light text-brand-accent font-bold text-xs">
						✓
					</div>
					<div>
						<h4 class="text-xs font-bold tracking-wider text-brand-dark uppercase">Входной контроль сырья</h4>
						<p class="mt-1 text-[10px] leading-relaxed text-brand-gray">
							Каждая партия первичного полиэтилена HDPE Lupolen проходит лабораторный анализ на показатель текучести расплава (ПТР) и плотность для исключения неоднородности стенок.
						</p>
					</div>
				</div>

				<div class="flex gap-4">
					<div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-accent-light text-brand-accent font-bold text-xs">
						✓
					</div>
					<div>
						<h4 class="text-xs font-bold tracking-wider text-brand-dark uppercase">Испытания на герметичность под давлением</h4>
						<p class="mt-1 text-[10px] leading-relaxed text-brand-gray">
							100% канистр и бочек на конвейере тестируются автоматическими датчиками утечки воздуха методом вакуумного разрежения, исключая малейший микропрокол.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Detailed Test Descriptions & Certificate Request Form (col-span-5) -->
		<div class="lg:col-span-5 flex flex-col gap-6">
			<!-- Quality Testing Info Card -->
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8">
					<h3 class="font-serif text-xl font-light text-brand-dark mb-4">Методология тестов</h3>
					
					<div class="space-y-4 text-xs text-brand-gray leading-relaxed">
						<div>
							<span class="font-bold text-brand-dark block">Тест на падение (Drop Test):</span>
							Емкость заполняется водой с антифризом, охлаждается до -18°C и сбрасывается на бетонную плиту под разными углами. Протечки или растрескивания не допускаются.
						</div>
						<div>
							<span class="font-bold text-brand-dark block">Тест на гидростатическое давление:</span>
							Емкость выдерживает внутреннее избыточное давление 150 кПа в течение 60 минут. Тест подтверждает эластичность сварных швов и прочность резьбовых крышек.
						</div>
						<div>
							<span class="font-bold text-brand-dark block">Тест на штабелирование (Stacking Test):</span>
							Емкость нагружается вертикальной силой, имитирующей полную нагрузку штабеля высотой 3 метра при температуре +40°C в течение 28 дней.
						</div>
					</div>
				</div>
			</div>

			<!-- Certificate Request Form Card -->
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8">
					<h3 class="font-serif text-xl font-light text-brand-dark mb-2">Запросить паспорта качества</h3>
					<p class="text-[10px] text-brand-gray mb-6">
						Укажите почту и название организации, чтобы получить полный комплект сертификатов соответствия ГОСТ и UN.
					</p>

					<form
						class="space-y-4"
						onsubmit={(e) => {
							e.preventDefault();
							alert('Запрос на отправку паспортов качества принят. Документы будут отправлены на указанный E-mail в течение 5 минут.');
						}}
					>
						<div class="flex flex-col">
							<label for="org-name-specs" class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase">
								Название организации
							</label>
							<input
								id="org-name-specs"
								type="text"
								required
								placeholder="ООО Промышленная Снабжение"
								class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
							/>
						</div>

						<div class="flex flex-col">
							<label for="email-specs" class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase">
								E-mail для документов
							</label>
							<input
								id="email-specs"
								type="email"
								required
								placeholder="snabs@prom-snab.ru"
								class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-xs focus:border-brand-accent focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							class="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-brand-dark px-6 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
						>
							<span>Выгрузить сертификаты</span>
							<span class="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1">
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
					</form>
				</div>
			</div>
		</div>
	</div>
</main>
