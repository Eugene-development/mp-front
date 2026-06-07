<script>
	// Page logic and state
</script>

<svelte:head>
	<title>О компании ООО «МегаПак» — Производство и поставка промышленной тары</title>
	<meta
		name="description"
		content="ООО «МегаПак» — ведущий поставщик сертифицированной промышленной полимерной тары в России. Автоматизированное производство, соответствие ГОСТ, строгий контроль герметичности."
	/>
	<meta
		name="keywords"
		content="о компании мегапак, производство тары, мегапак завод, полимерная тара москва, пластиковые бочки оптом"
	/>
</svelte:head>

<!-- Background Ambient Lighting -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute -top-[10%] -left-[10%] h-[55vw] w-[55vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[130px]"
	></div>
	<div
		class="absolute top-[30%] -right-[10%] h-[50vw] w-[50vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -6s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-16">
		<div class="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-brand-gray uppercase">
			<a href="/" class="transition-colors duration-300 hover:text-brand-dark">Главная</a>
			<span>/</span>
			<span class="text-brand-accent">О нас</span>
		</div>
		<h1 class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl">
			Ориентир надёжности <br />
			<span class="font-normal text-brand-accent italic">в промышленной упаковке</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			ООО «МегаПак» проектирует, изготавливает и поставляет высокотехнологичную полимерную тару для крупнейших предприятий химического, оборонного, нефтеперерабатывающего и агропромышленного секторов России.
		</p>
	</div>

	<!-- Main Narrative Grid -->
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
		<!-- Left: Text Column (Story & Mission) -->
		<div class="space-y-6 lg:col-span-7">
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8 space-y-6">
					<h2 class="font-serif text-2xl font-light text-brand-dark">Информация</h2>
					<p class="text-xs leading-relaxed text-brand-gray">
						Основанная более 12 лет назад, наша компания прошла путь от локального поставщика до одного из признанных лидеров рынка промышленной упаковки. Мы поняли, что в сегменте хранения и транспортировки наливных грузов мелочей не существует. Любая микротрещина или негерметичный шов могут привести к колоссальным убыткам для клиента и экологическим рискам.
					</p>
					<p class="text-xs leading-relaxed text-brand-gray">
						Поэтому мы сделали ставку на бескомпромиссное качество. Мы не просто продаем пластиковые бочки и канистры — мы предоставляем комплексные упаковочные решения, протестированные под избыточным давлением и сертифицированные по жестким стандартам ООН для перевозки опасных грузов.
					</p>
					<p class="text-xs leading-relaxed text-brand-gray">
						Сегодня производственные мощности компании оснащены автоматизированными выдувными комплексами последнего поколения, что позволяет нам выпускать продукцию с идеальной геометрией стенок и гарантированной герметичностью.
					</p>
				</div>
			</div>

			<!-- Interactive Core Values List -->
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8">
					<h3 class="mb-6 font-serif text-xl font-light text-brand-dark">Наши ключевые ценности</h3>
					<div class="space-y-4">
						<div class="flex gap-4 border-b border-brand-divider pb-4">
							<span class="text-lg">🛡️</span>
							<div>
								<h4 class="text-xs font-bold tracking-wider text-brand-dark uppercase">Безопасность прежде всего</h4>
								<p class="mt-1 text-[10px] leading-relaxed text-brand-gray">
									Вся тара проходит контроль герметичности на автоматических тестерах утечки. В производство идет только сертифицированный первичный полиэтилен низкого давления (HDPE) высокой плотности.
								</p>
							</div>
						</div>
						<div class="flex gap-4 border-b border-brand-divider pb-4">
							<span class="text-lg">⚡</span>
							<div>
								<h4 class="text-xs font-bold tracking-wider text-brand-dark uppercase">Оперативность B2B процессов</h4>
								<p class="mt-1 text-[10px] leading-relaxed text-brand-gray">
									Офис продаж и склад отгрузки расположены на одной охраняемой территории в Москве. Менеджер выписывает накладные и счета-фактуры за 10 минут, пока ваш транспорт заезжает на погрузку.
								</p>
							</div>
						</div>
						<div class="flex gap-4">
							<span class="text-lg">🌱</span>
							<div>
								<h4 class="text-xs font-bold tracking-wider text-brand-dark uppercase">Экологическая ответственность</h4>
								<p class="mt-1 text-[10px] leading-relaxed text-brand-gray">
									Мы используем технологии безотходного производства. Все технологические обрезки полиэтилена проходят вторичную переработку на вспомогательные изделия, не контактирующие с агрессивными средами.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Metrics & Highlights -->
		<div class="space-y-6 lg:col-span-5">
			<!-- Metrics Dashboard -->
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8">
					<h3 class="mb-6 font-serif text-xl font-light text-brand-dark">Компания в цифрах</h3>
					
					<div class="grid grid-cols-2 gap-4">
						<div class="rounded-xl border border-brand-divider bg-brand-bg p-4 text-center transition-all duration-300 hover:scale-[1.02]">
							<span class="block text-2xl font-bold text-brand-accent">12+ лет</span>
							<span class="mt-1 block text-[9px] font-bold text-brand-gray tracking-wider uppercase">Опыта на рынке</span>
						</div>
						
						<div class="rounded-xl border border-brand-divider bg-brand-bg p-4 text-center transition-all duration-300 hover:scale-[1.02]">
							<span class="block text-2xl font-bold text-brand-accent">1.5 млн+</span>
							<span class="mt-1 block text-[9px] font-bold text-brand-gray tracking-wider uppercase">Изделий в год</span>
						</div>

						<div class="rounded-xl border border-brand-divider bg-brand-bg p-4 text-center transition-all duration-300 hover:scale-[1.02]">
							<span class="block text-2xl font-bold text-brand-accent">1000+</span>
							<span class="mt-1 block text-[9px] font-bold text-brand-gray tracking-wider uppercase">B2B клиентов</span>
						</div>

						<div class="rounded-xl border border-brand-divider bg-brand-bg p-4 text-center transition-all duration-300 hover:scale-[1.02]">
							<span class="block text-2xl font-bold text-brand-accent">100%</span>
							<span class="mt-1 block text-[9px] font-bold text-brand-gray tracking-wider uppercase">Герметичность</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Technical Standards Badge Card -->
			<div class="double-bezel bg-brand-dark/5">
				<div class="double-bezel-inner p-6 sm:p-8">
					<h3 class="mb-4 font-serif text-lg font-light text-brand-dark">Сертификация ГОСТ</h3>
					<p class="text-xs leading-relaxed text-brand-gray">
						Наши пластиковые канистры и L-Ring бочки имеют официальные сертификаты Минтранса РФ и соответствуют требованиям ООН по упаковке и транспортировке опасных грузов морским, железнодорожным и автомобильным транспортом.
					</p>
					<div class="mt-6 flex flex-wrap gap-2">
						<span class="rounded bg-neutral-150 px-2 py-1 text-[8px] font-bold tracking-wider text-brand-dark uppercase border border-brand-divider">ГОСТ 30765-2001</span>
						<span class="rounded bg-neutral-150 px-2 py-1 text-[8px] font-bold tracking-wider text-brand-dark uppercase border border-brand-divider">ГОСТ Р 51760-2011</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
