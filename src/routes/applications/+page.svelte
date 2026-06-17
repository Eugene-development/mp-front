<script>
	// Page logic and state
</script>

<svelte:head>
	<title>Применение полимерной тары МегаПак — Отраслевые B2B решения</title>
	<meta
		name="description"
		content="Области применения пластиковой тары ООО «МегаПак». Решения для пищевой промышленности, медицины и фармацевтики, химической отрасли и ГСМ с перечнями сертифицированной продукции."
	/>
	<meta
		name="keywords"
		content="применение тары, пищевая канистра, тара для химии, бочки для гсм, еврокубы для фармацевтики, мегапак промышленность"
	/>
</svelte:head>

<!-- Background Ambient Lighting -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute top-[10%] left-[30%] h-[50vw] w-[50vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[130px]"
	></div>
	<div
		class="absolute bottom-[20%] left-[5%] h-[45vw] w-[45vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -5s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-16">
		<div
			class="mb-4 flex items-center gap-2 text-[12px] font-bold tracking-widest text-brand-gray uppercase"
		>
			<a href="/" class="transition-colors duration-300 hover:text-brand-dark">Главная</a>
			<span>/</span>
			<span class="text-brand-accent">Применение</span>
		</div>
		<h1
			class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Отраслевые решения <br />
			<span class="font-normal text-brand-accent italic">и стандарты применения</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Полимерная тара ООО «МегаПак» разрабатывается с учетом специфических физико-химических условий
			эксплуатации в различных отраслях промышленности. Ниже представлены ключевые области
			применения и рекомендованные типы продукции.
		</p>
	</div>

	<!-- Industries Grid -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Section 1: Food Industry -->
		<div class="double-bezel">
			<div class="double-bezel-inner flex h-full flex-col justify-between p-6 sm:p-8">
				<div>
					<div class="mb-4 flex items-center justify-between">
						<span class="text-5xl">🍎</span>
						<span
							class="border-emerald-150 rounded border bg-emerald-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-emerald-700 uppercase"
						>
							Пищевой допуск
						</span>
					</div>
					<h2 class="font-serif text-2xl font-light text-brand-dark">Пищевая промышленность</h2>
					<p class="mt-4 text-sm leading-relaxed text-brand-gray">
						К пищевой упаковке предъявляются высочайшие гигиенические требования. Тара должна быть
						химически нейтральной, не выделять посторонних запахов и не менять органолептических
						свойств продукции. Мы используем исключительно 100% первичный полиэтилен высокого
						давления (HDPE) без добавления вторичного сырья и красителей, содержащих тяжелые
						металлы.
					</p>

					<div class="mt-6">
						<span class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
							>Хранение и транспортировка:</span
						>
						<ul class="space-y-1 text-sm text-brand-gray">
							<li class="flex items-center gap-2">✔ Растительные масла и жиры</li>
							<li class="flex items-center gap-2">✔ Концентраты соков и сиропы</li>
							<li class="flex items-center gap-2">✔ Молочные продукты и закваски</li>
							<li class="flex items-center gap-2">✔ Пищевые добавки, мед, маринады</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 border-t border-brand-divider pt-6">
					<span class="mb-3 block text-[12px] font-bold tracking-wider text-brand-accent uppercase"
						>Рекомендуемая продукция:</span
					>
					<div class="flex flex-wrap gap-2">
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Штабелируемые канистры</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Бочки Open Top</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Еврокубы IBC на пластиковом поддоне</span
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 2: Medicine & Pharma -->
		<div class="double-bezel">
			<div class="double-bezel-inner flex h-full flex-col justify-between p-6 sm:p-8">
				<div>
					<div class="mb-4 flex items-center justify-between">
						<span class="text-5xl">💊</span>
						<span
							class="border-blue-150 rounded border bg-blue-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-blue-700 uppercase"
						>
							Высокая чистота
						</span>
					</div>
					<h2 class="font-serif text-2xl font-light text-brand-dark">Фармацевтика и медицина</h2>
					<p class="mt-4 text-sm leading-relaxed text-brand-gray">
						Для фармацевтической отрасли критически важна стерильность сырья и абсолютная химическая
						стабильность упаковочного материала при контакте со спиртами, дезинфицирующими
						растворами, дистиллированной водой и субстанциями лекарственных средств. Продукция
						производится в условиях строгого контроля пыли и статического напряжения.
					</p>

					<div class="mt-6">
						<span class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
							>Хранение и транспортировка:</span
						>
						<ul class="space-y-1 text-sm text-brand-gray">
							<li class="flex items-center gap-2">✔ Дистиллированная и деионизированная вода</li>
							<li class="flex items-center gap-2">✔ Спиртосодержащие растворы и антисептики</li>
							<li class="flex items-center gap-2">✔ Активные фармацевтические субстанции (АФС)</li>
							<li class="flex items-center gap-2">✔ Жидкое сырье для медицинских препаратов</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 border-t border-brand-divider pt-6">
					<span class="mb-3 block text-[12px] font-bold tracking-wider text-brand-accent uppercase"
						>Рекомендуемая продукция:</span
					>
					<div class="flex flex-wrap gap-2">
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Канистры высокой очистки</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>L-Ring бочки</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Еврокубы IBC с гигиеническим допуском</span
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 3: Chemical Industry -->
		<div class="double-bezel">
			<div class="double-bezel-inner flex h-full flex-col justify-between p-6 sm:p-8">
				<div>
					<div class="mb-4 flex items-center justify-between">
						<span class="text-5xl">🧪</span>
						<span
							class="border-amber-150 rounded border bg-amber-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-amber-700 uppercase"
						>
							Химостойкость
						</span>
					</div>
					<h2 class="font-serif text-2xl font-light text-brand-dark">Химическая промышленность</h2>
					<p class="mt-4 text-sm leading-relaxed text-brand-gray">
						Транспортировка кислот, щелочей, коагулянтов и агрессивных химикатов требует повышенной
						прочности тары к растрескиванию и деформации. Наши емкости изготавливаются из
						высокомолекулярного полиэтилена, обладающего выдающейся стойкостью к широкому спектру
						едких веществ и соответствующего строгим нормативам ГОСТ для агрессивных грузов.
					</p>

					<div class="mt-6">
						<span class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
							>Хранение и транспортировка:</span
						>
						<ul class="space-y-1 text-sm text-brand-gray">
							<li class="flex items-center gap-2">✔ Концентрированные кислоты и щелочи</li>
							<li class="flex items-center gap-2">✔ Автомобильная химия, тосолы, антифризы</li>
							<li class="flex items-center gap-2">✔ Промышленная химия, реагенты и коагулянты</li>
							<li class="flex items-center gap-2">✔ Жидкие удобрения и пестициды для АПК</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 border-t border-brand-divider pt-6">
					<span class="mb-3 block text-[12px] font-bold tracking-wider text-brand-accent uppercase"
						>Рекомендуемая продукция:</span
					>
					<div class="flex flex-wrap gap-2">
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Многослойные COEX канистры</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Усиленные L-Ring бочки</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Еврокубы IBC в стальной корзине</span
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 4: Petrochemistry & Lubricants -->
		<div class="double-bezel">
			<div class="double-bezel-inner flex h-full flex-col justify-between p-6 sm:p-8">
				<div>
					<div class="mb-4 flex items-center justify-between">
						<span class="text-5xl">🛢️</span>
						<span
							class="border-purple-150 rounded border bg-purple-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-purple-700 uppercase"
						>
							Сертификация
						</span>
					</div>
					<h2 class="font-serif text-2xl font-light text-brand-dark">Нефтехимия и ГСМ</h2>
					<p class="mt-4 text-sm leading-relaxed text-brand-gray">
						При обращении с горюче-смазочными материалами, маслами, присадками и нефтехимическими
						составами критическое значение имеет пожаробезопасность упаковки, стойкость к
						нефтепродуктам и предотвращение накопления статического электричества. Тара проходит
						испытания на падение с высоты при отрицательных температурах и избыточное
						гидростатическое давление.
					</p>

					<div class="mt-6">
						<span class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
							>Хранение и транспортировка:</span
						>
						<ul class="space-y-1 text-sm text-brand-gray">
							<li class="flex items-center gap-2">
								✔ Моторные, трансмиссионные и гидравлические масла
							</li>
							<li class="flex items-center gap-2">
								✔ Нефтехимические присадки и ингибиторы коррозии
							</li>
							<li class="flex items-center gap-2">✔ Дизельное топливо, керосин, смазки</li>
							<li class="flex items-center gap-2">✔ Растворители, лаки, олифы и смывки</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 border-t border-brand-divider pt-6">
					<span class="mb-3 block text-[12px] font-bold tracking-wider text-brand-accent uppercase"
						>Рекомендуемая продукция:</span
					>
					<div class="flex flex-wrap gap-2">
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Канистры под ГСМ (антистатические)</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>L-Ring бочки повышенной прочности</span
						>
						<span
							class="rounded border border-brand-accent/10 bg-brand-accent-light/40 px-2 py-1 text-[12px] font-medium text-brand-accent"
							>Еврокубы IBC</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
