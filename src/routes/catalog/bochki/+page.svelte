<script>
	import { orderModal } from '$lib/modalState.svelte.js';
	import { guardedClick } from '$lib/antibot/guardedClick';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import ProductLineup from '$lib/components/ProductLineup.svelte';
	import ProductVariantGallery from '$lib/components/ProductVariantGallery.svelte';
	import AvailabilityNote from '$lib/components/AvailabilityNote.svelte';

	const lineup = {
		label: 'Линейка продукции',
		title: 'Полный размерный ряд',
		titleAccent: 'бочек',
		subtitle:
			'Четыре типоразмера — от лабораторной фасовки до экспортной тары для опасных грузов. Выберите объём, чтобы увидеть геометрию и назначение.',
		scaleHint: 'Высота столбика пропорциональна объёму',
		variants: [
			{
				chip: '48',
				chipUnit: 'л',
				image: 'https://storage.yandexcloud.net/megapak-top/products/bochka/bochka-48.jpg',
				alt: 'Пластиковая бочка 48 л',
				title: '48 л',
				scaleLabel: 'объём',
				scale: 48,
				specs: [
					{ label: 'Тип горловины', value: 'L-Ring, 2 пробки (G3/4 и G2)' },
					{ label: 'Ø корпуса', value: '380 мм' }
				],
				use: 'Реагенты, растворители, лабораторная фасовка.'
			},
			{
				chip: '65',
				chipUnit: 'л',
				image: 'https://storage.yandexcloud.net/megapak-top/products/bochka/bochka-65.jpg',
				alt: 'Пластиковая бочка 65 л',
				title: '65 л',
				scaleLabel: 'объём',
				scale: 65,
				specs: [
					{ label: 'Тип горловины', value: 'L-Ring / Open Top' },
					{ label: 'Ø корпуса', value: '380 мм' }
				],
				use: 'Краски, клеи, пульпа.'
			},
			{
				chip: '127',
				chipUnit: 'л',
				image: null, // TODO: подставить URL фото
				alt: 'Пластиковая бочка 127 л',
				title: '127 л',
				scaleLabel: 'объём',
				scale: 127,
				specs: [
					{ label: 'Тип горловины', value: 'Open Top + стальной хомут' },
					{ label: 'Ø корпуса', value: '455 мм' }
				],
				use: 'Пищевые пюре, пасты, концентраты.'
			},
			{
				chip: '227',
				chipUnit: 'л',
				image: 'https://storage.yandexcloud.net/megapak-top/products/bochka-1.jpg',
				alt: 'Пластиковая бочка 227 л',
				title: '227 л',
				tag: 'ДОПОГ',
				scaleLabel: 'объём',
				scale: 227,
				specs: [
					{ label: 'Тип горловины', value: 'L-Ring / Open Top' },
					{ label: 'Ø корпуса', value: '585 мм' }
				],
				use: 'Опасные грузы, экспорт, многоярусное складирование.'
			}
		]
	};
</script>

<svelte:head>
	<title>Пластиковые бочки 48–227 л оптом — ООО «МегаПак» | L-Ring и Open Top из HDPE</title>
	<meta
		name="description"
		content="Пластиковые бочки объемом от 48 до 227 литров в исполнениях L-Ring (несъемная крышка) и Open Top (открытая горловина с хомутом) из первичного HDPE. Технические характеристики, применение в пищевой, химической отраслях и ГСМ. Запрос счёта с НДС."
	/>
	<meta
		name="keywords"
		content="пластиковые бочки, бочки L-Ring, бочки Open Top, бочки 227 литров, бочки HDPE, бочки оптом, бочки для щелочей, мегапак бочки"
	/>
</svelte:head>

<main class="relative mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-16">
		<Breadcrumbs items={[{ name: 'Каталог', href: '/catalog' }, { name: 'Бочки' }]} />
		<h1
			class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Пластиковые бочки <br />
			<span class="font-normal text-brand-accent italic">L-Ring и Open Top</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Классическая промышленная упаковка объемом от 48 до 227 литров из химически стойкого
			высокомолекулярного полиэтилена низкого давления HDPE. Поставляется в двух исполнениях: с
			несъемной верхней крышкой для наливных грузов и с полностью открывающейся горловиной под
			металлический стяжной хомут.
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
								class="rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
							>
								ГОСТ 8728-88
							</span>
							<span
								class="rounded bg-amber-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-amber-800 uppercase"
							>
								Новые и Б/У
							</span>
							<span
								class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
							>
								48–227 л
							</span>
						</div>

						<h2 class="font-serif text-3xl leading-snug font-light text-brand-dark md:text-4xl">
							Бочки для наливных и вязких грузов
						</h2>
						<p class="mt-4 max-w-xl text-sm leading-relaxed text-brand-gray">
							Герметичные бесшовные бочки L-Ring с двумя пробками исключают протечки агрессивных
							сред. Бочки Open Top с широким горлом удобны для фасовки паст, пюре и сыпучих грузов с
							установкой полиэтиленового вкладыша. Усиленный корпус выдерживает многоярусное
							складирование и транспортировку опасных грузов.
						</p>

						<!-- Key USPs -->
						<div
							class="mt-8 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-brand-divider pt-6"
						>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">48–227 л</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Линейка объёмов</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">2 типа</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>L-Ring / Open Top</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">ДОПОГ</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Опасные грузы</span
								>
							</div>
						</div>

						<div class="mt-8 flex flex-wrap items-center gap-4">
							<button
								onclick={guardedClick(() =>
									orderModal.open(
										'Запрос счета с НДС на пластиковые бочки и барабаны',
										'cta_click_invoice_bochki',
										'invoice_submit_bochki'
									)
								)}
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
			title="Фото"
			titleAccent="по литражу"
			selectorLabel="Литраж"
			subtitle="Выберите объём, чтобы рассмотреть бочку. Для части типоразмеров фото ещё в подготовке."
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
					Полная матрица типоразмеров: объём, тип горловины, материал ручки и рекомендованное
					назначение. Все бочки отштампованы из первичного HDPE без добавления вторичного сырья.
				</p>
			</div>

			<div class="double-bezel">
				<div class="double-bezel-inner relative overflow-hidden p-6 sm:p-8">
					<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
						Матрица типоразмеров
					</span>
					<h3 class="mb-6 font-serif text-2xl font-light text-brand-dark">
						Бочки МегаПак — геометрия и комплектация
					</h3>

					<div class="overflow-x-auto rounded-xl bg-brand-dark p-6 text-white sm:p-8">
						<div class="min-w-[540px]">
							<div class="space-y-4 font-mono text-[11px] leading-relaxed">
								<!-- Table Header -->
								<div class="flex justify-between border-b border-white/10 pb-3 font-bold">
									<span class="w-1/6">ЛИТРАЖ</span>
									<span class="w-1/6">ДИАМЕТР</span>
									<span class="w-1/4">ТИП ГОРЛОВИНЫ</span>
									<span class="w-1/3 text-right">НАЗНАЧЕНИЕ</span>
								</div>

								<!-- Rows -->
								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">48 л</span>
									<span class="w-1/6 text-neutral-400">Ø 380 мм</span>
									<span class="w-1/4 text-neutral-400">L-Ring, 2 пробки (G3/4 и G2)</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Реагенты, растворители</span
									>
								</div>

								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">65 л</span>
									<span class="w-1/6 text-neutral-400">Ø 380 мм</span>
									<span class="w-1/4 text-neutral-400">L-Ring / Open Top</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Краски, клеи, пульпа</span
									>
								</div>

								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">127 л</span>
									<span class="w-1/6 text-neutral-400">Ø 455 мм</span>
									<span class="w-1/4 text-neutral-400">Open Top + стальной хомут</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Пищевые пюре, пасты</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">227 л</span>
									<span class="w-1/6 text-neutral-400">Ø 585 мм</span>
									<span class="w-1/4 text-neutral-400">L-Ring / Open Top</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Опасные грузы, экспорт</span
									>
								</div>
							</div>

							<div
								class="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-neutral-400"
							>
								<span>*Бочки L-Ring укомплектованы двумя пробками с уплотнительными кольцами.</span>
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
					Пластиковые бочки МегаПак разработаны с учётом физико-химических условий эксплуатации в
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
							Бочки с открытой горловиной (Open Top) с установленным пищевым полиэтиленовым
							вкладышем используются для фасовки, длительного хранения и экспорта ягодных и
							фруктовых пюре, томатной пасты, концентратов соков, повидла, патоки и меда.
							Используется исключительно 100% первичный полиэтилен без добавления вторичного сырья.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Фруктовые и ягодные пюре</li>
								<li class="flex items-center gap-2">✔ Томатная паста, концентраты</li>
								<li class="flex items-center gap-2">✔ Мёд, патока, повидло</li>
								<li class="flex items-center gap-2">✔ Соковые концентраты</li>
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
							Химическая промышленность
						</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Герметичные бесшовные бочки L-Ring (с двумя пробками) идеальны для транспортировки
							агрессивных сред: кислот (соляной, серной, уксусной), щелочей, гипохлорита натрия,
							жидкого сырья для бытовой химии, коагулянтов и растворов реагентов. HDPE стоек к
							большинству агрессивных сред при концентрациях до паспортных пределов.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Кислоты и щёлочи</li>
								<li class="flex items-center gap-2">✔ Гипохлорит натрия</li>
								<li class="flex items-center gap-2">✔ Коагулянты, реагенты</li>
								<li class="flex items-center gap-2">✔ Сырьё для бытовой химии</li>
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
							Обеспечивают безопасный розлив, складское хранение и логистику моторных,
							трансмиссионных и индустриальных масел, технологических присадок, антифрикционных
							пластичных смазок, парафинов и битумных эмульсий. Бочки разработаны с учётом
							требований транспортной безопасности при перевозке опасных грузов по ДОПОГ.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Моторные и индустриальные масла</li>
								<li class="flex items-center gap-2">✔ Пластичные смазки, парафины</li>
								<li class="flex items-center gap-2">✔ Битумные эмульсии</li>
								<li class="flex items-center gap-2">✔ Топливные присадки</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Construction -->
				<div class="double-bezel">
					<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
						<div class="mb-4 flex items-center justify-between">
							<span class="text-5xl">🎨</span>
							<span
								class="rounded border border-orange-100 bg-orange-50 px-2 py-0.5 text-[8px] font-bold tracking-wider text-orange-700 uppercase"
							>
								Универсальность
							</span>
						</div>
						<h3 class="font-serif text-2xl font-light text-brand-dark">
							Строительная и лакокрасочная
						</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Бочки Open Top с широким горлом применяются для фасовки водно-дисперсионных красок,
							лаков, строительных клеёв, мастик, грунтовок и готовых штукатурок. Открытая горловина
							обеспечивает удобный розлив вязких составов и установку мешалок, а герметичная крышка
							надёжно защищает продукт от высыхания и проливания.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Водно-дисперсионные краски</li>
								<li class="flex items-center gap-2">✔ Лаки, клеи, мастики</li>
								<li class="flex items-center gap-2">✔ Грунтовки и штукатурки</li>
								<li class="flex items-center gap-2">✔ Сухие строительные смеси</li>
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
									ГОСТ 8728-88 (HDPE)
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Полиэтилен низкого давления. Подтверждает марку и физико-механические показатели
									исходного сырья, из которого отштампованы бочки.
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
									ГОСТ Р 51760-2011
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Пластиковая тара для пищевых продуктов. Подтверждает соответствие гигиеническим
									требованиям к материалам, контактирующим с пищевыми средами.
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
								<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">ДОПОГ</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Европейское соглашение о международной дорожной перевозке опасных грузов. Бочки
									227 л прошли испытания на падение, герметичность и гидравлическое давление в
									соответствии с требованиями ДОПОГ.
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
							Запросить счёт с НДС <span class="font-normal text-brand-accent italic">на бочки</span
							>
						</h3>
						<p class="mt-3 max-w-xl text-sm leading-relaxed text-brand-gray">
							Пришлите реквизиты организации и спецификацию по литражам — дежурный менеджер сбыта
							подготовит официальный счёт с НДС и пакет закрывающих документов.
						</p>
					</div>

					<button
						onclick={guardedClick(() =>
							orderModal.open(
								'Запрос счета с НДС на пластиковые бочки и барабаны',
								'cta_click_invoice_bochki',
								'invoice_submit_bochki'
							)
						)}
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
								Смотреть весь каталог
							</h3>
							<p class="mt-2 max-w-xl text-sm leading-relaxed text-brand-gray">
								Помимо бочек производим штабелируемые полимерные канистры 1–31.5 л, вёдра с замком
								первого вскрытия и еврокубы (IBC) 1000 литров под любые технические требования.
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
