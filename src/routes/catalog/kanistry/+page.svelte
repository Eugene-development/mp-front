<script>
	import { orderModal } from '$lib/modalState.svelte.js';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import ProductLineup from '$lib/components/ProductLineup.svelte';
	import ProductVariantGallery from '$lib/components/ProductVariantGallery.svelte';
	import AvailabilityNote from '$lib/components/AvailabilityNote.svelte';

	const lineup = {
		label: 'Линейка продукции',
		title: 'Полный размерный ряд',
		titleAccent: 'полимерных канистр',
		subtitle:
			'Девять типоразмеров в двух линиях — универсальные канистры и усиленные канистры ГСМ с носиком. Выберите объём, чтобы увидеть стенку, горловину и назначение.',
		scaleHint: 'Высота столбика пропорциональна объёму',
		variants: [
			{
				chip: '1',
				chipUnit: 'л',
				image: 'https://storage.yandexcloud.net/megapak-top/products/kanistra/kanistra-1-litr.jpg', 
				alt: 'Полимерная канистра 1 л',
				title: '1 л',
				scaleLabel: 'объём',
				scale: 1,
				specs: [
					{ label: 'Стенка', value: '1.8–2.0 мм' },
					{ label: 'Горловина', value: 'резьб. 28 мм' }
				],
				use: 'Сэмплы, дозы, фармацевтика.'
			},
			{
				chip: '3',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Полимерная канистра 3 л',
				title: '3 л',
				scaleLabel: 'объём',
				scale: 3,
				specs: [
					{ label: 'Стенка', value: '1.9–2.1 мм' },
					{ label: 'Горловина', value: 'резьб. 32 мм + кольцо' }
				],
				use: 'Бытовая химия, антисептики.'
			},
			{
				chip: '5',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Полимерная канистра 5 л',
				title: '5 л',
				scaleLabel: 'объём',
				scale: 5,
				specs: [
					{ label: 'Стенка', value: '2.0–2.2 мм' },
					{ label: 'Горловина', value: 'резьб. 38 мм + кольцо' }
				],
				use: 'Антисептики, автохимия.'
			},
			{
				chip: '5',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Канистра ГСМ 5 л с носиком',
				title: '5 л',
				tag: 'ГСМ',
				scaleLabel: 'объём',
				scale: 5,
				specs: [
					{ label: 'Стенка', value: '2.2–2.4 мм' },
					{ label: 'Горловина', value: 'резьб. 45 мм + носик' }
				],
				use: 'Моторные масла, ГСМ.'
			},
			{
				chip: '10',
				chipUnit: 'л',
				image: 'https://storage.yandexcloud.net/megapak-top/products/kanistra.jpg',
				alt: 'Полимерная канистра 10 л',
				title: '10 л',
				scaleLabel: 'объём',
				scale: 10,
				specs: [
					{ label: 'Стенка', value: '2.2–2.4 мм' },
					{ label: 'Горловина', value: 'резьб. 48 мм + кольцо' }
				],
				use: 'Масла, растворители.'
			},
			{
				chip: '10',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Канистра ГСМ 10 л с носиком',
				title: '10 л',
				tag: 'ГСМ',
				scaleLabel: 'объём',
				scale: 10,
				specs: [
					{ label: 'Стенка', value: '2.4–2.6 мм' },
					{ label: 'Горловина', value: 'резьб. 50 мм + носик' }
				],
				use: 'Моторные масла, ГСМ.'
			},
			{
				chip: '20',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Канистра ГСМ 20 л с носиком',
				title: '20 л',
				tag: 'ГСМ',
				scaleLabel: 'объём',
				scale: 20,
				specs: [
					{ label: 'Стенка', value: '2.5–2.7 мм' },
					{ label: 'Горловина', value: 'резьб. 60 мм + носик' }
				],
				use: 'Моторные масла, ГСМ.'
			},
			{
				chip: '21.5',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Полимерная канистра 21.5 л',
				title: '21.5 л',
				scaleLabel: 'объём',
				scale: 21.5,
				specs: [
					{ label: 'Стенка', value: '2.3–2.5 мм' },
					{ label: 'Горловина', value: 'резьб. 60 мм + кольцо' }
				],
				use: 'Пищевые жидкости, химия.'
			},
			{
				chip: '31.5',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Полимерная канистра 31.5 л',
				title: '31.5 л',
				scaleLabel: 'объём',
				scale: 31.5,
				specs: [
					{ label: 'Стенка', value: 'до 2.5 мм (усиленный)' },
					{ label: 'Горловина', value: 'резьб. 70 мм + вентиляция' }
				],
				use: 'Оптовая фасовка, экспорт.'
			}
		]
	};
</script>

<svelte:head>
	<title
		>Полимерные канистры 1–31.5 л и канистры ГСМ оптом — ООО «МегаПак» | Штабелируемые HDPE</title
	>
	<meta
		name="description"
		content="Полимерные штабелируемые канистры объёмом 1, 3, 5, 10, 21.5, 31.5 литра из первичного HDPE. Канистры ГСМ 5, 10, 20 л с носиком. Технические характеристики, крышки с уплотнительным кольцом, применение в пищевой, медицинской, химической отраслях и ГСМ. Запрос счёта с НДС."
	/>
	<meta
		name="keywords"
		content="полимерные канистры, штабелируемые канистры, канистры HDPE, канистры оптом, пищевая канистра, канистра для гсм, мегапак канистры"
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

<main class="relative mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-16">
		<Breadcrumbs items={[{ name: 'Каталог', href: '/catalog' }, { name: 'Канистры' }]} />
		<h1
			class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Полимерные канистры <br />
			<span class="font-normal text-brand-accent italic">из первичного HDPE</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Штабелируемые канистры с замковой конфигурацией дна и верхней ручки, которая позволяет
			устойчиво штабелировать тару без применения дополнительных прокладочных материалов.
			Изготовлены из химически стойкого высокомолекулярного полиэтилена низкого давления HDPE на
			высокотехнологичных выдувных машинах.
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
								class="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-emerald-800 uppercase"
							>
								Штабелируемые
							</span>
							<span
								class="rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
							>
								Первичный HDPE
							</span>
							<span
								class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
							>
								1–31.5 л + ГСМ
							</span>
						</div>

						<h2 class="font-serif text-3xl leading-snug font-light text-brand-dark md:text-4xl">
							Канистры для наливных и сыпучих грузов
						</h2>
						<p class="mt-4 max-w-xl text-sm leading-relaxed text-brand-gray">
							Усиленные стенки толщиной до 2.5&nbsp;мм, замковое соединение «дно–ручка» и крышки с
							уплотнительным кольцом обеспечивают герметичность, устойчивость к падению и
							многоярусное складирование. Каждая канистра проходит 100% выходной контроль на
							конвейере.
						</p>

						<!-- Key USPs -->
						<div
							class="mt-8 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-brand-divider pt-6"
						>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">9 типоразмеров</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Пластик + ГСМ</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">до 2.7 мм</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Толщина стенки</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">4 яруса</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Штабелирование</span
								>
							</div>
						</div>

						<div class="mt-8 flex flex-wrap items-center gap-4">
							<button
								onclick={() => orderModal.open('Запрос счета с НДС на полимерные канистры')}
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
					<!-- Right: manager note -->
					<div class="flex items-center justify-center lg:col-span-5">
						<AvailabilityNote />
					</div>
				</div>
			</div>
		</div>

		<!-- Gallery by volume -->
		<ProductVariantGallery
			label="Галерея"
			title="Изображения "
			titleAccent="по литражу"
			selectorLabel="Литраж"
			subtitle="Выберите объём, чтобы рассмотреть канистру. Для части типоразмеров фото ещё в подготовке."
			variants={lineup.variants}
		/>

		<!-- Section 2: Technical specifications -->
		<div>
			<div class="mb-8">
				<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
					Технические характеристики
				</span>
				<h2
					class="font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-4xl"
				>
					Спецификации <span class="font-normal text-brand-accent italic">по литражу</span>
				</h2>
				<p class="mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray">
					Полная матрица типоразмеров: объём, толщина стенки, тип крышки и рекомендованное
					назначение. Все канистры отштампованы из первичного HDPE без добавления вторичного сырья.
					Представлены две линейки: пластиковые канистры (1, 3, 5, 10, 21.5, 31.5 л) и канистры ГСМ
					(5, 10, 20 л) с усиленной конструкцией и носиком для розлива.
				</p>
			</div>

			<div class="double-bezel">
				<div class="double-bezel-inner relative overflow-hidden p-6 sm:p-8">
					<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
						Матрица типоразмеров
					</span>
					<h3 class="mb-6 font-serif text-2xl font-light text-brand-dark">
						Канистры МегаПак — геометрия и комплектация
					</h3>

					<div class="overflow-x-auto rounded-xl bg-brand-dark p-6 text-white sm:p-8">
						<div class="min-w-[540px]">
							<div class="space-y-4 font-mono text-[11px] leading-relaxed">
								<!-- Section: Пластиковые канистры -->
								<div class="mb-3  border-white/20 pb-2">
									<span class="font-bold text-xl tracking-wider text-red-300 uppercase">
										Пластиковые канистры
									</span>
								</div>

								<!-- Table Header -->
								<div class="flex justify-between  border-white/10 pb-3 font-bold">
									<span class="w-1/6">ЛИТРАЖ</span>
									<span class="w-1/6">ТОЛЩИНА</span>
									<span class="w-1/4">ТИП КРЫШКИ</span>
									<span class="w-1/3 text-right">НАЗНАЧЕНИЕ</span>
								</div>

								<!-- Rows -->
								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">1 л</span>
									<span class="w-1/6 text-neutral-400">1.8–2.0 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 28 мм</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Сэмплы, дозы, фарма</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">3 л</span>
									<span class="w-1/6 text-neutral-400">1.9–2.1 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 32 мм + кольцо</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Бытовая химия, антисептики</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">5 л</span>
									<span class="w-1/6 text-neutral-400">2.0–2.2 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 38 мм + кольцо</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Антисептики, автохимия</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">10 л</span>
									<span class="w-1/6 text-neutral-400">2.2–2.4 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 48 мм + кольцо</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Масла, растворители</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">21.5 л</span>
									<span class="w-1/6 text-neutral-400">2.3–2.5 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 60 мм + кольцо</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Пищевые жидкости, химия</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">31.5 л</span>
									<span class="w-1/6 text-neutral-400">до 2.5 мм (усиленный)</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 70 мм + вентиляция</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Оптовая фасовка, экспорт</span
									>
								</div>

								<!-- Section: Канистры ГСМ -->
								<div class="mt-6 mb-3 border-white/20 pb-2">
									<span class="font-bold text-xl tracking-wider text-red-300 uppercase">
										Канистры ГСМ
									</span>
								</div>

								<!-- Table Header -->
								<div class="flex justify-between border-white/10 pb-3 font-bold">
									<span class="w-1/6">ЛИТРАЖ</span>
									<span class="w-1/6">ТОЛЩИНА</span>
									<span class="w-1/4">ТИП КРЫШКИ</span>
									<span class="w-1/3 text-right">НАЗНАЧЕНИЕ</span>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">5 л</span>
									<span class="w-1/6 text-neutral-400">2.2–2.4 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 45 мм + носик</span>
									<span class="w-1/3 text-right font-semibold text-purple-300"
										>Моторные масла, ГСМ</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">10 л</span>
									<span class="w-1/6 text-neutral-400">2.4–2.6 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 50 мм + носик</span>
									<span class="w-1/3 text-right font-semibold text-purple-300"
										>Моторные масла, ГСМ</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">20 л</span>
									<span class="w-1/6 text-neutral-400">2.5–2.7 мм</span>
									<span class="w-1/4 text-neutral-400">Резьбовая 60 мм + носик</span>
									<span class="w-1/3 text-right font-semibold text-purple-300"
										>Моторные масла, ГСМ</span
									>
								</div>
							</div>

							<div
								class="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-neutral-400"
							>
								<span>*Толщина стенки указана по корпусу, в зоне выдувного шва — выше.</span>
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
					Полимерные канистры МегаПак разработаны с учётом физико-химических условий эксплуатации в
					конкретных отраслях. Ниже — ключевые направления с перечнями совместимых продуктов.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
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
							Штабелируемые канистры с усиленной конструкцией дна и крышки идеально подходят для
							фасовки и транспортировки питьевой воды, натуральных соков и соковых концентратов,
							молочной сыворотки и кисломолочных продуктов, рафинированных и нерафинированных
							растительных масел, виноматериалов и спиртовых дистиллятов, томатных и фруктовых
							соусов, маринадов, пищевых эссенций и жидких пищевых добавок. Используется
							исключительно 100% первичный полиэтилен без добавления вторичного сырья и красителей с
							тяжёлыми металлами.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Растительные масла и жиры</li>
								<li class="flex items-center gap-2">✔ Соки, концентраты, сыворотка</li>
								<li class="flex items-center gap-2">✔ Вода питьевая и минеральная</li>
								<li class="flex items-center gap-2">✔ Соусы, маринады, эссенции</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Medical -->
				<div class="double-bezel">
					<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
						<div class="mb-4 flex items-center justify-between">
							<span class="text-5xl">💊</span>
							<span
								class="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-blue-700 uppercase"
							>
								Фарма. чистота
							</span>
						</div>
						<h3 class="font-serif text-2xl font-light text-brand-dark">Медицина и фармацевтика</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Применяются для транспортировки дезинфицирующих и антисептических составов на основе
							спиртов, хлоргексидина и четвертичных аммонийных соединений, дистиллированной и
							деионизированной воды высокой очистки, жидких фармацевтических субстанций и
							полупродуктов, этилового и изопропилового спиртов, водных растворов реагентов и
							буферных смесей. Гладкая внутренняя поверхность исключает адсорбцию активных веществ и
							контаминацию продукта.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Антисептики и дезрастворы</li>
								<li class="flex items-center gap-2">✔ Дистиллированная вода</li>
								<li class="flex items-center gap-2">✔ Фармацевтические субстанции</li>
								<li class="flex items-center gap-2">✔ Спирты и реагенты</li>
							</ul>
						</div>
					</div>
				</div>

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
							Химическая и агрохимическая
						</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Фасовка средств бытовой и промышленной химии: стиральных и чистящих составов, жидкого
							мыла, профессиональных клининговых концентратов, кислотных и щелочных моющих средств,
							автомобильных антифризов, тосолов и стеклоомывателей. В агропромышленном комплексе —
							жидкие минеральные микроудобрения, СЗР, гербициды, инсектициды, фунгициды и
							водорастворимые адъюванты. HDPE стоек к большинству агрессивных сред при концентрациях
							до паспортных пределов.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Бытовая и промхимия</li>
								<li class="flex items-center gap-2">✔ Антифризы, тосолы, омыватели</li>
								<li class="flex items-center gap-2">✔ Микроудобрения, СЗР</li>
								<li class="flex items-center gap-2">✔ Гербициды и пестициды</li>
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
							Оптимальный вариант для фасовки и розлива моторных, трансмиссионных и индустриальных
							масел, автомобильного бензина, керосина и дизельного топлива, тормозных жидкостей
							(DOT-3/4/5.1), антифризов и теплоносителей, органических растворителей (уайт-спирит,
							ацетон, ксилол), специализированных топливных присадок и технических жидкостей.
							Канистры разработаны с учётом требований транспортной безопасности при перевозке
							опасных грузов и комплектуются крышками с уплотнительным кольцом и возможностью
							вентиляции.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Моторные и индустриальные масла</li>
								<li class="flex items-center gap-2">✔ Бензин, керосин, ДТ</li>
								<li class="flex items-center gap-2">✔ Растворители и присадки</li>
								<li class="flex items-center gap-2">✔ Тормозные жидкости, антифризы</li>
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
								<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
									ГОСТ Р 51760-2011
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Пластиковая тара для пищевых продуктов. Подтверждает соответствие гигиеническим
									требованиям к материалам, контактирующим с пищевыми средами.
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
									ГОСТ 8728-88 (HDPE)
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Полиэтилен низкого давления. Подтверждает марку и физико-механические показатели
									исходного сырья, из которого отштампованы канистры.
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
									Декларации соответствия техническому регламенту Таможенного союза на тару для
									пищевой продукции и химически опасных грузов.
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
									100% выходной контроль
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Каждая канистра проходит проверку на герметичность, геометрию корпуса и работу
									резьбового соединения крышки с уплотнительным кольцом непосредственно на
									конвейере.
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
								>на канистры</span
							>
						</h3>
						<p class="mt-3 max-w-xl text-sm leading-relaxed text-brand-gray">
							Пришлите реквизиты организации и спецификацию по литражам — дежурный менеджер сбыта
							подготовит официальный счёт с НДС и пакет закрывающих документов.
						</p>
					</div>

					<button
						onclick={() => orderModal.open('Запрос счета с НДС на полимерные канистры')}
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
								Помимо канистр производим пластиковые бочки L-Ring/Open Top, вёдра с замком первого
								вскрытия и еврокубы (IBC) 1000 литров под любые технические требования.
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
