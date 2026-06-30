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
		title: 'Полный размерный ряд',
		titleAccent: 'пластиковых вёдер',
		subtitle:
			'Пять категорий объёмов — от лабораторных доз до оптовой тары. Все с герметичной крышкой и замком первого вскрытия. Выберите объём, чтобы увидеть диаметр и тип ручки.',
		scaleHint: 'Высота столбика пропорциональна объёму',
		variants: [
			{
				chip: '1',
				chipUnit: 'л',
				title: '1 л',
				scaleLabel: 'объём',
				scale: 1,
				specs: [
					{ label: 'Ø корпуса', value: '110 мм' },
					{ label: 'Ручка', value: 'Пластиковая' }
				],
				use: 'Сэмплы, дозы, фармацевтика.'
			},
			{
				chip: '3–5',
				chipUnit: 'л',
				title: '3–5 л',
				scaleLabel: 'объём',
				scale: 4,
				specs: [
					{ label: 'Ø корпуса', value: '180 мм' },
					{ label: 'Ручка', value: 'Пластик / Металл' }
				],
				use: 'Мёд, соусы, краски.'
			},
			{
				chip: '10',
				chipUnit: 'л',
				title: '10 л',
				scaleLabel: 'объём',
				scale: 10,
				specs: [
					{ label: 'Ø корпуса', value: '260 мм' },
					{ label: 'Ручка', value: 'Металлическая' }
				],
				use: 'Майонез, шпаклёвки.'
			},
			{
				chip: '20',
				chipUnit: 'л',
				title: '20 л',
				scaleLabel: 'объём',
				scale: 20,
				specs: [
					{ label: 'Ø корпуса', value: '300 мм' },
					{ label: 'Ручка', value: 'Металлическая' }
				],
				use: 'Строительные смеси.'
			},
			{
				chip: '32',
				chipUnit: 'л',
				title: '32 л',
				scaleLabel: 'объём',
				scale: 32,
				specs: [
					{ label: 'Ø корпуса', value: '350 мм' },
					{ label: 'Ручка', value: 'Металлическая' }
				],
				use: 'Оптовая фасовка, химия.'
			}
		]
	};
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>Пластиковые вёдра 1–32 л оптом — ООО «МегаПак» | С замком первого вскрытия из HDPE</title>
	<meta
		name="description"
		content="Пластиковые вёдра объёмом от 1 до 32 литров с герметичной крышкой и замком первого вскрытия из первичного HDPE. Пластиковая и металлическая ручка, IML-этикетки. Применение в пищевой, лакокрасочной и химической отраслях. Запрос счёта с НДС."
	/>
	<meta
		name="keywords"
		content="пластиковые вёдра, вёдра с замком первого вскрытия, вёдра HDPE, ведро пищевое, ведро для краски, вёдра оптом, мегапак вёдра"
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
		<Breadcrumbs items={[{ name: 'Каталог', href: '/catalog' }, { name: 'Вёдра' }]} />
		<h1
			class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Пластиковые вёдра <br />
			<span class="font-normal text-brand-accent italic">с замком первого вскрытия</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Универсальная полимерная тара объемом от 1 до 32 литров из химически стойкого
			высокомолекулярного полиэтилена низкого давления HDPE. Поставляется в комплекте с плотно
			закрывающейся крышкой, оснащенной контрольной пломбой для защиты от несанкционированного
			доступа, и прочной пластиковой или металлической ручкой.
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
								ГОСТ Р 51760-2011
							</span>
							<span
								class="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-emerald-800 uppercase"
							>
								Герметичные
							</span>
							<span
								class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
							>
								1–32 л
							</span>
						</div>

						<h2 class="font-serif text-3xl leading-snug font-light text-brand-dark md:text-4xl">
							Вёдра для пищевой и промышленной продукции
						</h2>
						<p class="mt-4 max-w-xl text-sm leading-relaxed text-brand-gray">
							Усиленная конструкция корпуса в сочетании с герметичной крышкой и замком первого
							вскрытия обеспечивают защиту от просыпания и проливания сыпучей и жидкой продукции.
							Возможна широкая палитра цветов и нанесение IML-этикеток с фирменным дизайном
							заказчика прямо в форме при формовании.
						</p>

						<!-- Key USPs -->
						<div
							class="mt-8 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-brand-divider pt-6"
						>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">1–32 л</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Линейка объёмов</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">Контроль</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Замок вскрытия</span
								>
							</div>
							<div class="flex flex-col">
								<span class="font-serif text-2xl font-light text-brand-dark">IML</span>
								<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
									>Этикетки в форме</span
								>
							</div>
						</div>

						<div class="mt-8 flex flex-wrap items-center gap-4">
							<button
								onclick={() => orderModal.open('Запрос счета с НДС на пластиковые ведра')}
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
									'https://storage.yandexcloud.net/megapak-top/products/vedro-1.jpg',
									'Пластиковое ведро с герметичной крышкой'
								)}
						>
							<img
								src="https://storage.yandexcloud.net/megapak-top/products/vedro-1.jpg"
								alt="Пластиковое ведро с герметичной крышкой"
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
					Спецификации <span class="font-normal text-brand-accent italic">по литражу</span>
				</h2>
				<p class="mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray">
					Полная матрица типоразмеров: объём, тип ручки, комплектация крышки и рекомендованное
					назначение. Все вёдра отштампованы из первичного HDPE без добавления вторичного сырья.
				</p>
			</div>

			<div class="double-bezel">
				<div class="double-bezel-inner relative overflow-hidden p-6 sm:p-8">
					<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
						Матрица типоразмеров
					</span>
					<h3 class="mb-6 font-serif text-2xl font-light text-brand-dark">
						Вёдра МегаПак — геометрия и комплектация
					</h3>

					<div class="overflow-x-auto rounded-xl bg-brand-dark p-6 text-white sm:p-8">
						<div class="min-w-[540px]">
							<div class="space-y-4 font-mono text-[11px] leading-relaxed">
								<!-- Table Header -->
								<div class="flex justify-between border-b border-white/10 pb-3 font-bold">
									<span class="w-1/6">ЛИТРАЖ</span>
									<span class="w-1/6">ДИАМЕТР</span>
									<span class="w-1/4">РУЧКА</span>
									<span class="w-1/3 text-right">НАЗНАЧЕНИЕ</span>
								</div>

								<!-- Rows -->
								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">1 л</span>
									<span class="w-1/6 text-neutral-400">Ø 110 мм</span>
									<span class="w-1/4 text-neutral-400">Пластиковая</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Сэмплы, дозы, фарма</span
									>
								</div>

								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">3–5 л</span>
									<span class="w-1/6 text-neutral-400">Ø 180 мм</span>
									<span class="w-1/4 text-neutral-400">Пластиковая / Металлическая</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Мёд, соусы, краски</span
									>
								</div>

								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">10 л</span>
									<span class="w-1/6 text-neutral-400">Ø 260 мм</span>
									<span class="w-1/4 text-neutral-400">Металлическая</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Майонез, шпаклёвки</span
									>
								</div>

								<div class="flex justify-between border-b border-white/5 py-2.5">
									<span class="w-1/6 text-neutral-400">20 л</span>
									<span class="w-1/6 text-neutral-400">Ø 300 мм</span>
									<span class="w-1/4 text-neutral-400">Металлическая</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Строительные смеси</span
									>
								</div>

								<div class="flex justify-between py-2.5">
									<span class="w-1/6 text-neutral-400">32 л</span>
									<span class="w-1/6 text-neutral-400">Ø 350 мм</span>
									<span class="w-1/4 text-neutral-400">Металлическая</span>
									<span class="w-1/3 text-right font-semibold text-brand-accent-light"
										>Оптовая фасовка, химия</span
									>
								</div>
							</div>

							<div
								class="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-neutral-400"
							>
								<span>*Все крышки оснащены замком первого вскрытия (контрольной пломбой).</span>
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
					Пластиковые вёдра МегаПак разработаны с учётом физико-химических условий эксплуатации в
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
							Герметичность и пищевой допуск сырья делают ведра идеальными для хранения и
							транспортировки молочных продуктов, солений, майонеза, соусов, меда, джемов, маринадов
							и кондитерских паст. Поставляются с крышкой, оснащенной замком первого вскрытия,
							гарантирующим неизменность продукта с момента фасовки до потребителя.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Майонез, соусы, маринады</li>
								<li class="flex items-center gap-2">✔ Мёд, джемы, пасты</li>
								<li class="flex items-center gap-2">✔ Молочные продукты, соленья</li>
								<li class="flex items-center gap-2">✔ Кондитерские начинки</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Paint -->
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
							Усиленная конструкция ведер обеспечивает надежное хранение водно-дисперсионных красок,
							лаков, строительных клеев, мастик, грунтовок и готовых штукатурок. Обеспечивается
							защита от просыпания и проливания сыпучей и жидкой строительной продукции, а замок
							первого вскрытия подтверждает целостность продукта покупателю.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Водно-дисперсионные краски</li>
								<li class="flex items-center gap-2">✔ Лаки, клеи, мастики</li>
								<li class="flex items-center gap-2">✔ Шпаклёвки и грунтовки</li>
								<li class="flex items-center gap-2">✔ Сухие строительные смеси</li>
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
							Бытовая и промышленная химия
						</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Применяются для фасовки стиральных порошков, чистящих паст, удобрений, автокосметики,
							химических реагентов и дезинфицирующих средств. Имеется защита от просыпания и
							проливания сыпучей и жидкой химической продукции с крышкой, оснащенной замком первого
							вскрытия. HDPE стоек к большинству бытовых и промышленных составов.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Стиральные порошки, чистящие пасты</li>
								<li class="flex items-center gap-2">✔ Автокосметика</li>
								<li class="flex items-center gap-2">✔ Удобрения и реагенты</li>
								<li class="flex items-center gap-2">✔ Дезинфицирующие средства</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Pharma -->
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
						<h3 class="font-serif text-2xl font-light text-brand-dark">Фармацевтика и косметика</h3>
						<p class="mt-4 text-sm leading-relaxed text-brand-gray">
							Вёдра малого литража (1–5 л) с гладкой внутренней поверхностью применяются для фасовки
							фармацевтических субстанций, косметических основ, кремов, гелей, БАДов и влажных
							салфеток. Замок первого вскрытия обеспечивает контроль качества и защиту от
							контрафакта на этапе реализации. Используется только 100% первичный полиэтилен.
						</p>
						<div class="mt-6 border-t border-brand-divider pt-4">
							<span
								class="mb-2 block text-[12px] font-bold tracking-wider text-brand-dark uppercase"
								>Хранение и транспортировка:</span
							>
							<ul class="space-y-1 text-sm text-brand-gray">
								<li class="flex items-center gap-2">✔ Фармацевтические субстанции</li>
								<li class="flex items-center gap-2">✔ Косметические основы, кремы</li>
								<li class="flex items-center gap-2">✔ БАДы, витаминные комплексы</li>
								<li class="flex items-center gap-2">✔ Гигиеническая продукция</li>
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
									исходного сырья, из которого отштампованы вёдра.
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
									Замок первого вскрытия
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Контрольная пломба на крышке подтверждает целостность упаковки и защиту от
									несанкционированного вскрытия на всём пути к потребителю.
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
									IML-этикетирование
								</h4>
								<p class="mt-1 text-[13px] leading-relaxed text-brand-gray">
									Возможность нанесения In-Mold Label этикеток с фирменным дизайном заказчика прямо
									в форме при формовании — без клея и пузырей, с полным прилеганием.
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
							Запросить счёт с НДС <span class="font-normal text-brand-accent italic">на вёдра</span
							>
						</h3>
						<p class="mt-3 max-w-xl text-sm leading-relaxed text-brand-gray">
							Пришлите реквизиты организации и спецификацию по литражам и цветам — дежурный менеджер
							сбыта подготовит официальный счёт с НДС и пакет закрывающих документов.
						</p>
					</div>

					<button
						onclick={() => orderModal.open('Запрос счета с НДС на пластиковые ведра')}
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
								Помимо вёдер производим штабелируемые полимерные канистры 1–31.5 л, пластиковые
								бочки L-Ring/Open Top 48–227 л и еврокубы (IBC) 1000 литров под любые технические
								требования.
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
