<script>
	import { orderModal } from '$lib/modalState.svelte.js';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
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
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>Каталог промышленной тары ООО «МегаПак» — Пластиковые бочки, канистры, еврокубы</title>
	<meta
		name="description"
		content="Официальный каталог продукции ООО «МегаПак». Технические характеристики пластиковых бочек L-Ring/Open Top, штабелируемых канистр, еврокубов 1000 л и варианты их применения в промышленности."
	/>
	<meta
		name="keywords"
		content="каталог мегапак, пластиковые бочки, полимерные канистры, еврокубы ibc, тара для щелочей, пищевая тара оптом"
	/>
</svelte:head>

<!-- Background Ambient Lighting -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute top-[10%] -left-[10%] h-[55vw] w-[55vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[130px]"
	></div>
	<div
		class="absolute -right-[10%] bottom-[10%] h-[50vw] w-[50vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -7s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-16">
		<Breadcrumbs items={[{ name: 'Каталог' }]} />
		<h1
			class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Промышленный ассортимент <br />
			<span class="font-normal text-brand-accent italic">и варианты его применения</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Вся продукция для ООО «МегаПак» изготавливается на высокотехнологичных выдувных машинах из
			химически стойкого высокомолекулярного полиэтилена низкого давления HDPE, поэтому мы
			гарантируем высокое качество предлагаемой продукции.
		</p>
	</div>

	<!-- Products Stack -->
	<div class="space-y-16">
		<!-- Product 1: Drums -->
		<div class="double-bezel">
			<div class="double-bezel-inner p-6 sm:p-8">
				<div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
					<!-- Left: Image and specs -->
					<div
						class="flex flex-col justify-between border-b border-brand-divider pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0"
					>
						<div>
							<div class="mb-4 flex items-center gap-2">
								<span
									class="rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
								>
									ГОСТ 8728-88
								</span>
								<span
									class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
								>
									Новые и Б/У
								</span>
							</div>
							<h2 class="font-serif text-2xl leading-snug font-light text-brand-dark md:text-3xl">
								Пластиковые бочки
							</h2>
							<p class="mt-4 text-sm leading-relaxed text-brand-gray">
								Классическая промышленная упаковка объемом от 48 до 227 литров. Поставляется в двух
								исполнениях: L-Ring с несъемной верхней крышкой (идеально для наливных грузов) и
								Open Top с полностью открывающейся широкой горловиной под металлический стяжной
								хомут.
							</p>
						</div>

						<div
							class="mt-8 flex items-center justify-center space-x-4 rounded-2xl border border-brand-divider/40 bg-brand-bg/50 py-6"
						>
							<button
								type="button"
								class="cursor-zoom-in border-0 bg-transparent p-0 transition-transform duration-700 hover:scale-[1.03] focus:outline-none"
								onclick={() =>
									openImageModal(
										'https://storage.yandexcloud.net/megapak-top/products/bochka-1.jpg',
										'Пластиковая бочка L-Ring (несъемная крышка)'
									)}
							>
								<img
									src="https://storage.yandexcloud.net/megapak-top/products/bochka-1.jpg"
									alt="Пластиковая бочка L-Ring"
									class="h-[180px] object-contain drop-shadow-lg"
								/>
							</button>
							<button
								type="button"
								class="cursor-zoom-in border-0 bg-transparent p-0 transition-transform duration-700 hover:scale-[1.03] focus:outline-none"
								onclick={() =>
									openImageModal(
										'https://storage.yandexcloud.net/megapak-top/products/bochka-2.jpg',
										'Пластиковая бочка Open Top (открытая крышка с хомутом)'
									)}
							>
								<img
									src="https://storage.yandexcloud.net/megapak-top/products/bochka-2.jpg"
									alt="Пластиковая бочка Open Top"
									class="h-[180px] object-contain drop-shadow-lg"
								/>
							</button>
						</div>

						<div class="mt-6 grid grid-cols-2 gap-4 text-[14px]">
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase"
									>Линейка объемов:</span
								>
								<span class="font-semibold text-brand-dark">48л, 127л, 227л</span>
							</div>
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase">Горловина:</span>
								<span class="font-semibold text-brand-dark">Резьбовая (L-Ring), Открытая</span>
							</div>
						</div>
					</div>

					<!-- Right: Detailed Applications -->
					<div class="flex flex-col justify-between lg:col-span-7 lg:pl-4">
						<div>
							<h3 class="mb-6 font-serif text-lg font-light text-brand-dark">
								Варианты применения по отраслям:
							</h3>

							<div class="space-y-6">
								<!-- Food -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-xl text-emerald-700"
									>
										🍎
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Пищевая промышленность
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Бочки с открытой горловиной (Open Top) с установленным пищевым полиэтиленовым
											вкладышем используются для фасовки, длительного хранения и экспорта ягодных и
											фруктовых пюре, томатной пасты, концентратов соков, повидла, патоки и меда.
										</p>
									</div>
								</div>

								<!-- Chemical -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-xl text-amber-700"
									>
										🧪
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Химическая промышленность
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Герметичные бесшовные бочки L-Ring (с двумя пробками) идеальны для
											транспортировки агрессивных сред: кислот (соляной, серной, уксусной), щелочей,
											гипохлорита натрия, жидкого сырья для бытовой химии, коагулянтов и растворов
											реагентов.
										</p>
									</div>
								</div>

								<!-- Petrochemical -->
								<div class="flex gap-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-purple-100 bg-purple-50 text-xl text-purple-700"
									>
										🛢️
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Нефтехимия и ГСМ
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Обеспечивают безопасный розлив, складское хранение и логистику моторных,
											трансмиссионных и индустриальных масел, технологических присадок,
											антифрикционных пластичных смазок, парафинов и битумных эмульсий.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div
							class="mt-8 flex items-center justify-between border-t border-brand-divider pt-4 text-[14px] text-brand-gray"
						>
							<span>Сертификаты соответствия ГОСТ в наличии</span>
							<div class="flex items-center gap-4">
								<!-- <a
									href="/specs"
									class="font-bold text-brand-gray hover:text-brand-dark hover:underline"
								>
									Подробнее
								</a> -->
								<button
									onclick={() =>
										orderModal.open('Запрос счета с НДС на пластиковые бочки и барабаны')}
									class="cursor-pointer border-0 bg-transparent p-0 font-bold text-brand-accent hover:underline"
								>
									Запросить счет с НДС ↗
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Product 2: Canisters -->
		<div class="double-bezel">
			<div class="double-bezel-inner p-6 sm:p-8">
				<div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
					<!-- Left: Image and specs -->
					<div
						class="flex flex-col justify-between border-b border-brand-divider pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0"
					>
						<div>
							<div class="mb-4 flex items-center gap-2">
								<span
									class="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-emerald-800 uppercase"
								>
									Штабелируемые
								</span>
								<span
									class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
								>
									Усиленные стенки
								</span>
							</div>
							<h2 class="font-serif text-2xl leading-snug font-light text-brand-dark md:text-3xl">
								Полимерные канистры
							</h2>
							<p class="mt-4 text-sm leading-relaxed text-brand-gray">
								Штабелируемые канистры емкостью от 1 до 31.5 литров. Имеют уникальную замковую
								конфигурацию на дне и верхней ручке, которая позволяет устойчиво штабелировать их
								без применения дополнительных прокладочных материалов.
							</p>
						</div>

						<div
							class="mt-8 flex items-center justify-center rounded-2xl border border-brand-divider/40 bg-brand-bg/50 py-6"
						>
							<button
								type="button"
								class="cursor-zoom-in border-0 bg-transparent p-0 transition-transform duration-700 hover:scale-[1.03] focus:outline-none"
								onclick={() =>
									openImageModal(
										'https://storage.yandexcloud.net/megapak-top/products/kanistra.jpg',
										'Полимерная канистра'
									)}
							>
								<img
									src="https://storage.yandexcloud.net/megapak-top/products/kanistra.jpg"
									alt="Полимерная канистра"
									class="h-[180px] object-contain drop-shadow-lg"
								/>
							</button>
						</div>

						<div class="mt-6 grid grid-cols-2 gap-4 text-[14px]">
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase"
									>Диапазон литража:</span
								>
								<span class="font-semibold text-brand-dark">1л, 5л, 10л, 20л, 31.5л</span>
							</div>
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase"
									>Толщина HDPE:</span
								>
								<span class="font-semibold text-brand-dark">До 2.5 мм (усиленный)</span>
							</div>
						</div>
					</div>

					<!-- Right: Detailed Applications -->
					<div class="flex flex-col justify-between lg:col-span-7 lg:pl-4">
						<div>
							<h3 class="mb-6 font-serif text-lg font-light text-brand-dark">
								Варианты применения по отраслям:
							</h3>

							<div class="space-y-6">
								<!-- Food -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-xl text-emerald-700"
									>
										🍎
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Пищевая промышленность
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Белые и прозрачные канистры применяются для розлива питьевой воды, соков,
											молочных сывороток, растительного масла, виноматериалов, соусов, маринадов и
											пищевых эссенций.
										</p>
									</div>
								</div>

								<!-- Medical -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-xl text-blue-700"
									>
										💊
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Медицина и фармацевтика
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Используются для транспортировки дезинфицирующих и антисептических составов,
											дистиллированной воды высокой очистки, жидких фармацевтических субстанций,
											спиртов и растворов реагентов.
										</p>
									</div>
								</div>

								<!-- Chemical -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-xl text-amber-700"
									>
										🧪
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Химическая и агрохимическая
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Фасовка бытовой химии, жидкого мыла, профессиональных клининговых составов,
											автомобильных антифризов, тосолов, стеклоомывателей, а также жидких
											микроудобрений и гербицидов для агрокомплексов.
										</p>
									</div>
								</div>

								<!-- Petrochemical -->
								<div class="flex gap-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-purple-100 bg-purple-50 text-xl text-purple-700"
									>
										🛢️
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Нефтехимия и ГСМ
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Фасовка автомобильных моторных и трансмиссионных масел, бензина, керосина,
											растворителей, тормозных жидкостей и специализированных присадок.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div
							class="mt-8 flex items-center justify-between border-t border-brand-divider pt-4 text-[14px] text-brand-gray"
						>
							<span>Комплектуются крышками с уплотнительным кольцом</span>
							<div class="flex items-center gap-4">
								<!-- <a
									href="/specs"
									class="font-bold text-brand-gray hover:text-brand-dark hover:underline"
								>
									Подробнее
								</a> -->
								<button
									onclick={() => orderModal.open('Запрос счета с НДС на полимерные канистры')}
									class="cursor-pointer border-0 bg-transparent p-0 font-bold text-brand-accent hover:underline"
								>
									Запросить счет с НДС ↗
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Product 3: Plastic Buckets -->
		<div class="double-bezel">
			<div class="double-bezel-inner p-6 sm:p-8">
				<div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
					<!-- Left: Image and specs -->
					<div
						class="flex flex-col justify-between border-b border-brand-divider pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0"
					>
						<div>
							<div class="mb-4 flex items-center gap-2">
								<span
									class="rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
								>
									ГОСТ Р 51760-2011
								</span>
								<span
									class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
								>
									Герметичные
								</span>
							</div>
							<h2 class="font-serif text-2xl leading-snug font-light text-brand-dark md:text-3xl">
								Пластиковые вёдра
							</h2>
							<p class="mt-4 text-sm leading-relaxed text-brand-gray">
								Универсальная полимерная тара объемом от 1 до 32 литров. Поставляется в комплекте с
								плотно закрывающейся крышкой, оснащенной замком первого вскрытия (контрольной
								пломбой) для защиты от несанкционированного доступа. Ведра комплектуются прочной
								пластиковой или металлической ручкой и подходят для широкого спектра пищевой и
								промышленной продукции.
							</p>
						</div>

						<div
							class="mt-8 flex items-center justify-center rounded-2xl border border-brand-divider/40 bg-brand-bg/50 py-6"
						>
							<button
								type="button"
								class="cursor-zoom-in border-0 bg-transparent p-0 transition-transform duration-700 hover:scale-[1.03] focus:outline-none"
								onclick={() =>
									openImageModal(
										'https://storage.yandexcloud.net/megapak-top/products/vedro-1.jpg',
										'Пластиковое ведро с герметичной крышкой'
									)}
							>
								<img
									src="https://storage.yandexcloud.net/megapak-top/products/vedro-1.jpg"
									alt="Пластиковое ведро с герметичной крышкой"
									class="h-[180px] object-contain drop-shadow-lg"
								/>
							</button>
						</div>

						<div class="mt-6 grid grid-cols-2 gap-4 text-[14px]">
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase"
									>Линейка объемов:</span
								>
								<span class="font-semibold text-brand-dark">1л, 3л, 5л, 10л, 20л, 32л</span>
							</div>
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase">Тип ручки:</span>
								<span class="font-semibold text-brand-dark">Пластиковая / Металлическая</span>
							</div>
						</div>
					</div>

					<!-- Right: Detailed Applications -->
					<div class="flex flex-col justify-between lg:col-span-7 lg:pl-4">
						<div>
							<h3 class="mb-6 font-serif text-lg font-light text-brand-dark">
								Варианты применения по отраслям:
							</h3>

							<div class="space-y-6">
								<!-- Food -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-xl text-emerald-700"
									>
										🍎
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Пищевая промышленность
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Герметичность и пищевой допуск сырья делают ведра идеальными для хранения и
											транспортировки молочных продуктов, солений, майонеза, соусов, меда, джемов,
											маринадов и кондитерских паст.
										</p>
									</div>
								</div>

								<!-- Paint -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-xl text-amber-700"
									>
										🎨
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Строительная и лакокрасочная
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Усиленная конструкция ведер обеспечивает надежное хранение водно-дисперсионных
											красок, лаков, строительных клеев, мастик, жидкого стекла, грунтовок и готовых
											штукатурок.
										</p>
									</div>
								</div>

								<!-- Chemical -->
								<div class="flex gap-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-purple-100 bg-purple-50 text-xl text-purple-700"
									>
										🧪
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Бытовая и промышленная химия
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Применяются для фасовки стиральных порошков, чистящих паст, удобрений,
											автокосметики, химических реагентов и дезинфицирующих средств.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div
							class="mt-8 flex items-center justify-between border-t border-brand-divider pt-4 text-[14px] text-brand-gray"
						>
							<span>Широкий выбор цветов и возможность нанесения IML-этикеток</span>
							<div class="flex items-center gap-4">
								<!-- <a
									href="/specs"
									class="font-bold text-brand-gray hover:text-brand-dark hover:underline"
								>
									Подробнее
								</a> -->
								<button
									onclick={() => orderModal.open('Запрос счета с НДС на пластиковые ведра')}
									class="cursor-pointer border-0 bg-transparent p-0 font-bold text-brand-accent hover:underline"
								>
									Запросить счет с НДС ↗
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Product 4: Eurocubes -->
		<div class="double-bezel">
			<div class="double-bezel-inner p-6 sm:p-8">
				<div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
					<!-- Left: Image and specs -->
					<div
						class="flex flex-col justify-between border-b border-brand-divider pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0"
					>
						<div>
							<div class="mb-4 flex items-center gap-2">
								<span
									class="rounded bg-amber-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-amber-800 uppercase"
								>
									1000 литров
								</span>
								<span
									class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
								>
									Сертифицировано
								</span>
							</div>
							<h2 class="font-serif text-2xl leading-snug font-light text-brand-dark md:text-3xl">
								Еврокубы (IBC-контейнеры)
							</h2>
							<p class="mt-4 text-sm leading-relaxed text-brand-gray">
								Крупногабаритная тара емкостью 1000 литров, состоящая из полиэтиленовой внутренней
								колбы и прочной стальной оцинкованной обрешетки. Доступны на деревянном,
								металлическом и пластиковом поддонах под любые технические требования.
							</p>
						</div>

						<div
							class="mt-8 flex items-center justify-center rounded-2xl border border-brand-divider/40 bg-brand-bg/50 py-6"
						>
							<button
								type="button"
								class="cursor-zoom-in border-0 bg-transparent p-0 transition-transform duration-700 hover:scale-[1.03] focus:outline-none"
								onclick={() =>
									openImageModal(
										'https://storage.yandexcloud.net/megapak-top/products/image-tank.jpg',
										'Еврокуб (IBC-контейнер) 1000 литров'
									)}
							>
								<img
									src="https://storage.yandexcloud.net/megapak-top/products/image-tank.jpg"
									alt="Еврокуб (IBC-контейнер) 1000 литров"
									class="h-[180px] object-contain drop-shadow-lg"
								/>
							</button>
						</div>

						<div class="mt-6 grid grid-cols-2 gap-4 text-[14px]">
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase"
									>Комплектация:</span
								>
								<span class="font-semibold text-brand-dark">Сливной кран, крышка 150/225мм</span>
							</div>
							<div class="flex flex-col border-l border-brand-divider pl-3">
								<span class="mb-1 block tracking-wider text-brand-gray uppercase">Доп. опции:</span>
								<span class="font-semibold text-brand-dark">Термочехлы, ТЭНы подогрева</span>
							</div>
						</div>
					</div>

					<!-- Right: Detailed Applications -->
					<div class="flex flex-col justify-between lg:col-span-7 lg:pl-4">
						<div>
							<h3 class="mb-6 font-serif text-lg font-light text-brand-dark">
								Варианты применения по отраслям:
							</h3>

							<div class="space-y-6">
								<!-- Chemical -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-xl text-amber-700"
									>
										🧪
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Химическая промышленность
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Используются для безопасной транспортировки и хранения крупнотоннажных партий
											агрессивных веществ: кислот, концентрированных щелочей, коагулянтов (сульфата
											алюминия), клеевых составов, латекса и смол.
										</p>
									</div>
								</div>

								<!-- Food -->
								<div class="flex gap-4 border-b border-brand-divider pb-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-xl text-emerald-700"
									>
										🍎
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Пищевая промышленность
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Применяются для оптовой логистики пищевых жидкостей: виноматериалов, этилового
											спирта, растительных и кондитерских масел, жидкого шоколада, мелассы, сиропов
											и пищевых добавок.
										</p>
									</div>
								</div>

								<!-- Petrochemical -->
								<div class="flex gap-4">
									<div
										class="flex size-12 flex-shrink-0 items-center justify-center rounded-lg border border-purple-100 bg-purple-50 text-xl text-purple-700"
									>
										🛢️
									</div>
									<div>
										<h4 class="text-sm font-bold tracking-wider text-brand-dark uppercase">
											Нефтехимия и ГСМ
										</h4>
										<p class="mt-1 text-[14px] leading-relaxed text-brand-gray">
											Используются на нефтебазах и АЗС для сбора отработанных индустриальных и
											моторных масел, хранения дизельного топлива, мазута, присадок к топливу и
											технологических растворителей.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div
							class="mt-8 flex items-center justify-between border-t border-brand-divider pt-4 text-[14px] text-brand-gray"
						>
							<span>Для вязких грузов рекомендуем термочехлы и ТЭНы подогрева.</span>
							<div class="flex items-center gap-4">
								<!-- <a
									href="/specs"
									class="font-bold text-brand-gray hover:text-brand-dark hover:underline"
								>
									Подробнее
								</a> -->
								<button
									onclick={() =>
										orderModal.open('Запрос счета с НДС на еврокубы (IBC-контейнеры) 1000 литров')}
									class="cursor-pointer border-0 bg-transparent p-0 font-bold text-brand-accent hover:underline"
								>
									Запросить счет с НДС ↗
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
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
