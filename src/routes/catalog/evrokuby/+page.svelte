<script>
	import { orderModal } from '$lib/modalState.svelte.js';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import ProductLineup from '$lib/components/ProductLineup.svelte';
	import { fade, scale } from 'svelte/transition';

	let activeImage = $state(null);
	let activeImageAlt = $state('');

	function openImageModal(src, alt) {
		activeImage = src;
		activeImageAlt = alt;
	}

	function closeImageModal() {
		activeImage = null;
		activeImageAlt = '';
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && activeImage) {
			closeImageModal();
		}
	}

	const lineup = {
		label: 'Линейка продукции',
		title: 'Конфигурации',
		titleAccent: 'еврокубов 1000 л',
		subtitle:
			'Единый объём 1000 литров — варианты по типу поддона и комплектации. Выберите конфигурацию, чтобы увидеть оснащение и назначение.',
		scaleHint: 'Единый объём 1000 л',
		variants: [
			{
				chip: 'Дерево',
				title: 'Дерево',
				scaleLabel: 'поддон',
				scale: 1000,
				specs: [
					{ label: 'Горловина', value: 'Ø 150 мм' },
					{ label: 'Сливной кран', value: 'DN50' }
				],
				use: 'Химия, реагенты.'
			},
			{
				chip: 'Металл',
				title: 'Металл',
				scaleLabel: 'поддон',
				scale: 1000,
				specs: [
					{ label: 'Горловина', value: 'Ø 225 мм' },
					{ label: 'Сливной кран', value: 'DN50' }
				],
				use: 'Пищевые жидкости.'
			},
			{
				chip: 'Пластик',
				title: 'Пластик',
				scaleLabel: 'поддон',
				scale: 1000,
				specs: [
					{ label: 'Горловина', value: 'Ø 150 мм' },
					{ label: 'Сливной кран', value: 'DN80' }
				],
				use: 'ГСМ, отработка.'
			},
			{
				chip: 'Термо',
				title: 'Термо',
				tag: 'Опция',
				scaleLabel: 'комплектация',
				scale: 1000,
				specs: [
					{ label: 'Термоизоляция', value: 'Термочехол' },
					{ label: 'Подогрев', value: 'ТЭН' }
				],
				use: 'Вязкие и застывающие грузы.'
			}
		]
	};
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>Еврокубы (IBC) 1000 литров оптом — ООО «МегаПак» | В стальной обрешётке из HDPE</title>
	<meta
		name="description"
		content="Еврокубы (IBC-контейнеры) объёмом 1000 литров: полиэтиленовая колба в стальной оцинкованной обрешётке на деревом, металлическом или пластиковом поддоне. Сливной кран, крышка 150/225 мм, термочехлы и ТЭНы. Запрос счёта с НДС."
	/>
	<meta
		name="keywords"
		content="еврокуб, ibc контейнер, еврокуб 1000 литров, ibc тара, еврокуб б/у, еврокуб пищевой, еврокуб оптом, мегапак еврокуб"
	/>
</svelte:head>

<!-- Background Ambient Lighting -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute top-[10%] left-[15%] h-[55vw] w-[55vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[130px]"
	></div>
	<div
		class="absolute -right-[5%] bottom-[5%] h-[50vw] w-[50vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -7s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-16">
		<Breadcrumbs items={[{ name: 'Каталог', href: '/catalog' }, { name: 'Еврокубы' }]} />
		<h1
			class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Еврокубы (IBC) <br />
			<span class="font-normal text-brand-accent italic">1000 литров</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Крупногабаритная тара объёмом 1000 литров, состоящая из полиэтиленовой внутренней колбы и
			прочной стальной оцинкованной обрешётки. Поставляются на деревянном, металлическом и
			пластиковом поддоне под любые технические требования. Доступны новые и б/у исполнения.
		</p>
	</div>

	<div class="space-y-16">
		<!-- Section 1: Hero -->
		<div class="double-bezel">
			<div class="double-bezel-inner p-6 sm:p-8">
				<div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
					<!-- Left: text -->
					<div class="flex flex-col items-start lg:col-span-7">
						<div class="mb-4 flex flex-wrap items-center gap-2">
							<span
								class="rounded bg-amber-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-amber-800 uppercase"
							>
								1000 литров
							</span>
							<span
								class="rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
							>
								Стальная обрешётка
							</span>
							<span
								class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
							>
								Новые и Б/У
							</span>
						</div>

						<h2 class="font-serif text-3xl leading-snug font-light text-brand-dark md:text-4xl">
							IBC-контейнеры для крупнотоннажной логистики
						</h2>
						<p class="mt-4 max-w-xl text-sm leading-relaxed text-brand-gray">
							Полипропиленовая колба выдувается из химически стойкого полиэтилена и помещается в
							оцинкованную стальную сетчатую обрешётку. Сливной кран с защитным колпаком, верхняя
							крышка 150 или 225 мм и возможность штабелирования делают еврокуб универсальным
							решением для перевозки и хранения жидкостей. Для вязких грузов доступны термочехлы и
							ТЭНы подогрева.
						</p>

						<!-- Key USPs -->
						<div
							class="mt-8 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-brand-divider pt-6"
						>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">1000 л</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Полезный объём</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">3 поддона</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Дерево / Металл / Пластик</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">2 яруса</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Штабелирование</span
								>
							</div>
						</div>

						<div class="mt-8 flex flex-wrap items-center gap-4">
							<button
								onclick={() =>
									orderModal.open('Запрос счета с НДС на еврокубы (IBC-контейнеры) 1000 литров')}
								class="group flex h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-brand-dark bg-brand-dark px-6 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
							>
								<span>Запросить счёт с НДС</span>
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
						</div>
					</div>

					<!-- Right: image -->
					<div class="flex items-center justify-center lg:col-span-5">
						<button
							type="button"
							class="group flex w-full cursor-zoom-in flex-col items-center justify-center rounded-2xl border border-brand-divider/40 bg-brand-bg/50 py-10 transition-transform duration-700 hover:scale-[1.02] focus:outline-none"
							onclick={() =>
								openImageModal(
									'https://storage.yandexcloud.net/megapak-top/products/image-tank.jpg',
									'Еврокуб (IBC-контейнер) 1000 литров'
								)}
						>
							<img
								src="https://storage.yandexcloud.net/megapak-top/products/image-tank.jpg"
								alt="Еврокуб (IBC-контейнер) 1000 литров"
								class="h-[280px] object-contain drop-shadow-lg transition-transform duration-700 group-hover:scale-105"
							/>
							<span
								class="mt-4 text-[9px] font-bold tracking-widest text-brand-gray uppercase transition-colors duration-300 group-hover:text-brand-accent"
							>
								Нажмите, чтобы увеличить ↗
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 2: Technical specifications -->
		<div>
			<div class="mb-8">
				<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
					Технические характеристики
				</span>
				<h2
					class="font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-4xl"
				>
					Спецификации <span class="font-normal text-brand-accent italic">и комплектация</span>
				</h2>
				<p class="mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray">
					Полная матрица комплектаций: тип поддона, размер горловины, тип сливного крана и
					дополнительные опции. Все еврокубы проходят проверку на герметичность и слив.
				</p>
			</div>

			<div class="double-bezel">
				<div class="double-bezel-inner relative overflow-hidden p-6 sm:p-8">
					<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
						Матрица комплектаций
					</span>
					<h3 class="mb-6 font-serif text-2xl font-light text-brand-dark">
						Еврокубы МегаПак — конструкция и опции
					</h3>

					<div class="overflow-x-auto rounded-xl bg-brand-dark p-6 text-white sm:p-8">
						<div class="min-w-[540px]">
							<div class="space-y-4 font-mono text-[11px] leading-relaxed">
								<!-- Table Header -->
								<div class="flex justify-between border-b border-white/10 pb-3 font-bold">
									<span class="w-1/6">ОБЪЁМ</span>
									<span class="w-1/6">ПОДДОН</span>
									<span class="w-1/4">ГОРЛОВИНА / КРАН</span>
									<span class="w-1/3 text-right">НАЗНАЧЕНИЕ</span>
								</div>

								<!-- Rows -->
								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">1000 л</span>
									<span class="w-1/6 text-neutral-400">Деревянный</span>
									<span class="w-1/4 text-neutral-400">Ø 150 мм, кран DN50</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Химия, реагенты</span
									>
								</div>

								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">1000 л</span>
									<span class="w-1/6 text-neutral-400">Металлический</span>
									<span class="w-1/4 text-neutral-400">Ø 225 мм, кран DN50</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Пищевые жидкости</span
									>
								</div>

								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">1000 л</span>
									<span class="w-1/6 text-neutral-400">Пластиковый</span>
									<span class="w-1/4 text-neutral-400">Ø 150 мм, кран DN80</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>ГСМ, отработка</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">1000 л</span>
									<span class="w-1/6 text-neutral-400">По запросу</span>
									<span class="w-1/4 text-neutral-400">+ Термочехол / ТЭН</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Вязкие, застывающие грузы</span
									>
								</div>
							</div>

							<div
								class="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-neutral-400"
							>
								<span>*Возможна поставка новых и прошедших восстановление б/у еврокубов.</span>
								<span class="font-bold tracking-wider text-white uppercase">Паспорт качества</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Product line -->
		<ProductLineup {...lineup} />

		<!-- Section 3: Industries -->
		<div>
			<div class="mb-8">
				<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
					Отрасли применения
				</span>
				<h2
					class="font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-4xl"
				>
					Варианты применения <span class="font-normal text-brand-accent italic">по отраслям</span>
				</h2>
				<p class="mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray">
					Еврокубы МегаПак разработаны с учётом физико-химических условий эксплуатации в конкретных
					отраслях. Ниже — ключевые направления с перечнями совместимых продуктов.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Chemical -->
				<div class="double-bezel">
					<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
						<div class="mb-4 flex items-center justify-between">
							<span class="text-5xl">🧪</span>
							<span
								class="rounded border border-amber-100 bg-amber-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-amber-700 uppercase"
							>
								Хим. стойкость
							</span>
						</div>
						<h3 class="font-serif text-2xl font-light text-brand-dark">
							Химическая промышленность
						</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Используются для безопасной транспортировки и хранения крупнотоннажных партий
							агрессивных веществ: кислот, концентрированных щелочей, коагулянтов (сульфата
							алюминия), клеевых составов, латекса и смол. Полиэтиленовая колба химически инертна и
							стойка к большинству агрессивных сред при концентрациях до паспортных пределов.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Кислоты и концентрированные щёлочи</li>
								<li class="flex items-center gap-2">✔ Коагулянты (сульфат алюминия)</li>
								<li class="flex items-center gap-2">✔ Клеи, латекс, смолы</li>
								<li class="flex items-center gap-2">✔ Жидкое сырьё для химии</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Food -->
				<div class="double-bezel">
					<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
						<div class="mb-4 flex items-center justify-between">
							<span class="text-5xl">🍎</span>
							<span
								class="rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-emerald-700 uppercase"
							>
								Пищевой допуск
							</span>
						</div>
						<h3 class="font-serif text-2xl font-light text-brand-dark">Пищевая промышленность</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Применяются для оптовой логистики пищевых жидкостей: виноматериалов, этилового спирта,
							растительных и кондитерских масел, жидкого шоколада, мелассы, сиропов и пищевых
							добавок. Используются только новые еврокубы в пищевом исполнении с соответствующим
							гигиеническим заключением.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Виноматериалы, этиловый спирт</li>
								<li class="flex items-center gap-2">✔ Растительные масла</li>
								<li class="flex items-center gap-2">✔ Жидкий шоколад, меласса</li>
								<li class="flex items-center gap-2">✔ Сиропы, пищевые добавки</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Petrochemical -->
				<div class="double-bezel">
					<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
						<div class="mb-4 flex items-center justify-between">
							<span class="text-5xl">🛢️</span>
							<span
								class="rounded border border-purple-100 bg-purple-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-purple-700 uppercase"
							>
								Опасные грузы
							</span>
						</div>
						<h3 class="font-serif text-2xl font-light text-brand-dark">Нефтехимия и ГСМ</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Используются на нефтебазах и АЗС для сбора отработанных индустриальных и моторных
							масел, хранения дизельного топлива, мазута, присадок к топливу и технологических
							растворителей. Для вязких и застывающих нефтепродуктов комплектуются термочехлом и
							ТЭНом подогрева. Возможно использование б/у еврокубов.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Отработанные масла (сбор)</li>
								<li class="flex items-center gap-2">✔ Дизельное топливо, мазут</li>
								<li class="flex items-center gap-2">✔ Топливные присадки</li>
								<li class="flex items-center gap-2">✔ Растворители (+подогрев)</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Viscous / heating -->
				<div class="double-bezel">
					<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
						<div class="mb-4 flex items-center justify-between">
							<span class="text-5xl">🔥</span>
							<span
								class="rounded border border-orange-100 bg-orange-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-orange-700 uppercase"
							>
								Подогрев
							</span>
						</div>
						<h3 class="font-serif text-2xl font-light text-brand-dark">
							Вязкие и застывающие грузы
						</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Для продуктов с высокой вязкостью или температурой кристаллизации (парафины, воски,
							патока, глицерин, тяжелые смолы) еврокубы доукомплектовываются утеплённым термочехлом
							и встроенным ТЭНом подогрева. Это поддерживает рабочую текучесть продукта и облегчает
							слив через нижний кран без дополнительного оборудования.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Парафины, воски</li>
								<li class="flex items-center gap-2">✔ Патока, глицерин</li>
								<li class="flex items-center gap-2">✔ Тяжёлые смолы</li>
								<li class="flex items-center gap-2">✔ Мёд и сиропы (подогрев)</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 4: Certificates -->
		<div>
			<div class="mb-8">
				<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
					Сертификаты и соответствия
				</span>
				<h2
					class="font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-4xl"
				>
					Подтверждённое качество <span class="font-normal text-brand-accent italic"
						>по стандартам</span
					>
				</h2>
			</div>

			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-8">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="flex gap-4 border-b border-brand-divider pb-6 md:border-b md:pb-6">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-accent-light text-sm font-bold text-brand-accent"
							>
								✓
							</div>
							<div>
								<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">ДОПОГ</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Европейское соглашение о международной дорожной перевозке опасных грузов. Еврокубы
									прошли испытания на падение, герметичность и гидравлическое давление в
									соответствии с требованиями ДОПОГ.
								</p>
							</div>
						</div>

						<div class="flex gap-4 border-b border-brand-divider pb-6 md:border-b md:pb-6">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-accent-light text-sm font-bold text-brand-accent"
							>
								✓
							</div>
							<div>
								<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
									Пищевое исполнение
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Гигиеническое заключение на новые еврокубы, допущенные к контакту с пищевыми
									средами и сырьём для пищевого производства.
								</p>
							</div>
						</div>

						<div class="flex gap-4 border-b border-brand-divider pb-6 md:border-b-0 md:pb-0">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-accent-light text-sm font-bold text-brand-accent"
							>
								✓
							</div>
							<div>
								<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
									Декларации ТР ТС
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Декларации соответствия техническому регламенту Таможенного союза на
									крупногабаритную тару для пищевой продукции и химически опасных грузов.
								</p>
							</div>
						</div>

						<div class="flex gap-4">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-accent-light text-sm font-bold text-brand-accent"
							>
								✓
							</div>
							<div>
								<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
									Выходной контроль
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Каждый еврокуб проходит 100% выходной контроль: проверка герметичности колбы,
									работоспособности сливного крана и целостности стальной обрешётки.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 5: CTA -->
		<div class="double-bezel">
			<div class="double-bezel-inner relative overflow-hidden p-8 sm:p-12">
				<div
					class="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left"
				>
					<div>
						<h3 class="font-serif text-3xl font-light tracking-tight text-brand-dark md:text-4xl">
							Запросить счёт с НДС <span class="font-normal text-brand-accent italic"
								>на еврокубы</span
							>
						</h3>
						<p class="mt-3 max-w-xl text-sm leading-relaxed text-brand-gray">
							Пришлите реквизиты организации и спецификацию по поддонам и опциям — дежурный менеджер
							сбыта подготовит официальный счёт с НДС и пакет закрывающих документов.
						</p>
					</div>

					<button
						onclick={() =>
							orderModal.open('Запрос счета с НДС на еврокубы (IBC-контейнеры) 1000 литров')}
						class="group flex h-[52px] flex-shrink-0 cursor-pointer items-center gap-3 rounded-xl border border-brand-dark bg-brand-dark px-8 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
					>
						<span>Получить счёт</span>
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
				</div>
			</div>
		</div>

		<!-- Section 6: Cross-reference to full catalog -->
		<div>
			<a href="/catalog" class="group block">
				<div class="double-bezel transition-transform duration-500 group-hover:scale-[1.005]">
					<div
						class="double-bezel-inner flex flex-col items-center gap-6 p-8 sm:flex-row sm:justify-between sm:p-10"
					>
						<div>
							<span
								class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase"
							>
								Полный ассортимент
							</span>
							<h3 class="font-serif text-2xl font-light text-brand-dark md:text-3xl">
								Смотреть полный каталог
							</h3>
							<p class="mt-2 max-w-xl text-sm leading-relaxed text-brand-gray">
								Помимо еврокубов производим штабелируемые полимерные канистры 1–31.5 л, пластиковые
								бочки L-Ring/Open Top 48–227 л и вёдра с замком первого вскрытия под любые
								технические требования.
							</p>
						</div>
						<div
							class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-brand-divider bg-brand-bg text-brand-accent transition-all duration-300 group-hover:border-brand-accent group-hover:bg-brand-accent-light"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
								/>
							</svg>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</main>

{#if activeImage}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/60 px-4 backdrop-blur-md"
		onclick={closeImageModal}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				closeImageModal();
			}
		}}
		role="button"
		tabindex="0"
	>
		<!-- Animated Premium Image Container -->
		<div
			transition:scale={{ duration: 250, start: 0.95, opacity: 0 }}
			class="double-bezel relative max-h-[85vh] max-w-[90vw] overflow-hidden shadow-2xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="none"
		>
			<div class="double-bezel-inner bg-white/95 p-2 sm:p-4">
				<!-- Close Button -->
				<button
					onclick={closeImageModal}
					class="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-brand-divider bg-neutral-100 text-brand-gray transition-all duration-300 hover:bg-neutral-200 hover:text-brand-dark active:scale-95"
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
				<img
					src={activeImage}
					alt={activeImageAlt}
					class="max-h-[75vh] max-w-full rounded-lg object-contain shadow-inner"
				/>
				{#if activeImageAlt}
					<p class="mt-4 text-center font-serif text-sm font-light tracking-wide text-brand-dark">
						{activeImageAlt}
					</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
