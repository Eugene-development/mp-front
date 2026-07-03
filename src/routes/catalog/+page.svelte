<script>
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import ProductImageSlider from '$lib/components/ProductImageSlider.svelte';

	const CDN = 'https://storage.yandexcloud.net/megapak-top/products';

	/** @type {Record<string, { src: string; alt: string }[]>} */
	const images = {
		bochki: [
			{ src: `${CDN}/bochka-1.jpg`, alt: 'Пластиковая бочка L-Ring 227 л' },
			{ src: `${CDN}/bochka-2.jpg`, alt: 'Пластиковая бочка Open Top' }
		],
		evrokuby: [
			{ src: `${CDN}/image-tank.jpg`, alt: 'Еврокуб 1000 л в стальной обрешётке' },
			{ src: `${CDN}/image-tank-2.jpg`, alt: 'Еврокуб со сливным краном' }
		],
		kanistry: [
			{ src: `${CDN}/kanistra.jpg`, alt: 'Полимерные канистры' },
			{ src: `${CDN}/kanistra/kanistra-1-litr.jpg`, alt: 'Полимерные канистры' },
			{ src: `${CDN}/kanistra/kanistra-1-litr.jpg`, alt: 'Полимерные канистры' },
			{ src: `${CDN}/kanistra/kanistra-1-litr.jpg`, alt: 'Полимерные канистры' },
			{ src: `${CDN}/kanistra/kanistra-1-litr.jpg`, alt: 'Полимерные канистры' },
		], // TODO: добавить фото при появлении
		vedra: [{ src: `${CDN}/vedro-1.jpg`, alt: 'Пластиковые вёдра' }] // TODO: добавить фото при появлении
	};
</script>

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
		class="absolute top-[8%] left-[10%] h-[50vw] w-[50vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[140px]"
	></div>
	<div
		class="absolute -right-[8%] bottom-[12%] h-[45vw] w-[45vw] rounded-full bg-amber-500/5 blur-[130px]"
		style="animation-delay: -7s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Header -->
	<div class="mb-14 md:mb-16">
		<Breadcrumbs items={[{ name: 'Каталог' }]} />
		<div class="mt-6 max-w-4xl">
			<span
				class="mb-5 inline-block rounded-full border border-brand-divider bg-white/60 px-3 py-1 font-mono text-[9px] tracking-widest text-brand-accent uppercase backdrop-blur-sm"
			>
				Промышленный ассортимент · HDPE
			</span>
			<h1
				class="font-serif text-4xl leading-[1.05] font-light tracking-tight text-brand-dark md:text-7xl"
			>
				Промышленная тара
				<span class="font-normal text-brand-accent italic">из первичного полиэтилена</span>
			</h1>
			<p class="mt-6 max-w-2xl text-sm leading-relaxed text-brand-gray md:text-base">
				Вся продукция ООО «МегаПак» изготавливается на высокотехнологичных выдувных машинах из
				химически стойкого высокомолекулярного полиэтилена низкого давления HDPE. Четыре направления
				производства — от лабораторной фасовки до тысячелитровых IBC-контейнеров.
			</p>
		</div>
	</div>

	<!-- Products Grid: 2 columns on desktop, 1 on mobile -->
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Product 1: Drums -->
		<div class="group flex flex-col">
			<div
				class="double-bezel transition-all duration-500 group-hover:scale-[1.008] group-hover:shadow-[0_35px_70px_-15px_rgba(17,17,24,0.18)]"
			>
				<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
					<!-- Image area -->
					<ProductImageSlider
						images={images.bochki}
						badge="ДОПОГ · 227 л"
						badgeClass="rounded bg-purple-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-purple-800 uppercase"
					/>

					<!-- Badges -->
					<div class="mb-3 flex flex-wrap items-center gap-2">
						<span
							class="rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
							>ГОСТ 8728-88</span
						>
						<span
							class="rounded bg-amber-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-amber-800 uppercase"
							>Новые и Б/У</span
						>
					</div>

					<h2
						class="font-serif text-2xl leading-tight font-light text-brand-dark transition-colors duration-300 group-hover:text-brand-accent md:text-3xl"
					>
						Пластиковые бочки
					</h2>
					<p class="mt-3 text-sm leading-relaxed text-brand-gray">
						Промышленная упаковка от 48 до 227 литров в исполнениях L-Ring и Open Top.
						Сертифицированы по ДОПОГ для перевозки опасных грузов.
					</p>

					<div class="mt-5 grid grid-cols-2 gap-4 text-[13px]">
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Объёмы</span
							>
							<span class="font-semibold text-brand-dark">48 / 65 / 127 / 227 л</span>
						</div>
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Горловина</span
							>
							<span class="font-semibold text-brand-dark">L-Ring · Open Top</span>
						</div>
					</div>

					<a
						href="/catalog/bochki"
						class="mt-6 flex items-center gap-2 border-t border-brand-divider pt-5 no-underline"
					>
						<span
							class="inline-flex h-9 items-center justify-center rounded-lg border border-brand-accent/30 bg-brand-accent-light/50 px-4 text-xs font-bold tracking-wider text-brand-accent uppercase transition-all duration-300 group-hover:border-brand-accent/60 group-hover:bg-brand-accent-light"
						>
							Открыть карточку товара
						</span>
						<span
							class="ml-auto text-brand-accent transition-transform duration-300 group-hover:translate-x-1"
							>→</span
						>
					</a>
				</div>
			</div>
		</div>

		<!-- Product 2: Canisters -->
		<div class="group flex flex-col">
			<div
				class="double-bezel transition-all duration-500 group-hover:scale-[1.008] group-hover:shadow-[0_35px_70px_-15px_rgba(17,17,24,0.18)]"
			>
				<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
					<!-- Image area -->
					<ProductImageSlider
						images={images.kanistry}
						badge="Штабелируемые"
						badgeClass="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-emerald-800 uppercase"
					/>

					<!-- Badges -->
					<div class="mb-3 flex flex-wrap items-center gap-2">
						<span
							class="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-emerald-800 uppercase"
							>Первичный HDPE</span
						>
						<span
							class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
							>до 2.7 мм</span
						>
					</div>

					<h2
						class="font-serif text-2xl leading-tight font-light text-brand-dark transition-colors duration-300 group-hover:text-brand-accent md:text-3xl"
					>
						Полимерные канистры
					</h2>
					<p class="mt-3 text-sm leading-relaxed text-brand-gray">
						Штабелируемые канистры от 1 до 31.5 литра с замковым соединением дно–ручка и усиленными
						стенками. Специальные канистры ГСМ с носиком (5, 10, 20 л).
					</p>

					<div class="mt-5 grid grid-cols-2 gap-4 text-[13px]">
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Литраж</span
							>
							<span class="font-semibold text-brand-dark">1 / 3 / 5 / 10 / 21.5 / 31.5 л</span>
						</div>
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Стенка</span
							>
							<span class="font-semibold text-brand-dark">До 2.7 мм (ГСМ усиленный)</span>
						</div>
					</div>

					<a
						href="/catalog/kanistry"
						class="mt-6 flex items-center gap-2 border-t border-brand-divider pt-5 no-underline"
					>
						<span
							class="inline-flex h-9 items-center justify-center rounded-lg border border-brand-accent/30 bg-brand-accent-light/50 px-4 text-xs font-bold tracking-wider text-brand-accent uppercase transition-all duration-300 group-hover:border-brand-accent/60 group-hover:bg-brand-accent-light"
						>
							Открыть карточку товара
						</span>
						<span
							class="ml-auto text-brand-accent transition-transform duration-300 group-hover:translate-x-1"
							>→</span
						>
					</a>
				</div>
			</div>
		</div>

		<!-- Product 3: Buckets -->
		<div class="group flex flex-col">
			<div
				class="double-bezel transition-all duration-500 group-hover:scale-[1.008] group-hover:shadow-[0_35px_70px_-15px_rgba(17,17,24,0.18)]"
			>
				<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
					<!-- Image area -->
					<ProductImageSlider
						images={images.vedra}
						badge="Замок вскрытия"
						badgeClass="rounded bg-blue-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-blue-800 uppercase"
					/>

					<!-- Badges -->
					<div class="mb-3 flex flex-wrap items-center gap-2">
						<span
							class="rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
							>ГОСТ Р 51760-2011</span
						>
						<span
							class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
							>Герметичные</span
						>
					</div>

					<h2
						class="font-serif text-2xl leading-tight font-light text-brand-dark transition-colors duration-300 group-hover:text-brand-accent md:text-3xl"
					>
						Пластиковые вёдра
					</h2>
					<p class="mt-3 text-sm leading-relaxed text-brand-gray">
						Универсальная тара от 1 до 32 литров с герметичной крышкой и замком первого вскрытия.
						Пластиковая или металлическая ручка, IML-этикетирование.
					</p>

					<div class="mt-5 grid grid-cols-2 gap-4 text-[13px]">
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Объёмы</span
							>
							<span class="font-semibold text-brand-dark">1 / 3 / 5 / 10 / 20 / 32 л</span>
						</div>
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Ручка</span
							>
							<span class="font-semibold text-brand-dark">Пластик / Металл</span>
						</div>
					</div>

					<a
						href="/catalog/vedra"
						class="mt-6 flex items-center gap-2 border-t border-brand-divider pt-5 no-underline"
					>
						<span
							class="inline-flex h-9 items-center justify-center rounded-lg border border-brand-accent/30 bg-brand-accent-light/50 px-4 text-xs font-bold tracking-wider text-brand-accent uppercase transition-all duration-300 group-hover:border-brand-accent/60 group-hover:bg-brand-accent-light"
						>
							Открыть карточку товара
						</span>
						<span
							class="ml-auto text-brand-accent transition-transform duration-300 group-hover:translate-x-1"
							>→</span
						>
					</a>
				</div>
			</div>
		</div>

		<!-- Product 4: Eurocubes -->
		<div class="group flex flex-col">
			<div
				class="double-bezel transition-all duration-500 group-hover:scale-[1.008] group-hover:shadow-[0_35px_70px_-15px_rgba(17,17,24,0.18)]"
			>
				<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
					<!-- Image area -->
					<ProductImageSlider
						images={images.evrokuby}
						badge="ДОПОГ · 1000 л"
						badgeClass="rounded bg-purple-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-purple-800 uppercase"
					/>

					<!-- Badges -->
					<div class="mb-3 flex flex-wrap items-center gap-2">
						<span
							class="rounded bg-amber-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-amber-800 uppercase"
							>1000 литров</span
						>
						<span
							class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase"
							>Стальная обрешётка</span
						>
					</div>

					<h2
						class="font-serif text-2xl leading-tight font-light text-brand-dark transition-colors duration-300 group-hover:text-brand-accent md:text-3xl"
					>
						Еврокубы (IBC)
					</h2>
					<p class="mt-3 text-sm leading-relaxed text-brand-gray">
						Крупногабаритная тара 1000 литров: полиэтиленовая колба в стальной оцинкованной
						обрешётке. Новые, б/у и с тэном подогрева и утеплителем.
					</p>

					<div class="mt-5 grid grid-cols-2 gap-4 text-[13px]">
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Комплектация</span
							>
							<span class="font-semibold text-brand-dark">Кран, крышка 150/225 мм</span>
						</div>
						<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
							<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase"
								>Типы</span
							>
							<span class="font-semibold text-brand-dark">Новый · Б/У · С тэном</span>
						</div>
					</div>

					<a
						href="/catalog/evrokuby"
						class="mt-6 flex items-center gap-2 border-t border-brand-divider pt-5 no-underline"
					>
						<span
							class="inline-flex h-9 items-center justify-center rounded-lg border border-brand-accent/30 bg-brand-accent-light/50 px-4 text-xs font-bold tracking-wider text-brand-accent uppercase transition-all duration-300 group-hover:border-brand-accent/60 group-hover:bg-brand-accent-light"
						>
							Открыть карточку товара
						</span>
						<span
							class="ml-auto text-brand-accent transition-transform duration-300 group-hover:translate-x-1"
							>→</span
						>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Materials & Quality note -->
	<div class="mt-16">
		<div class="double-bezel">
			<div
				class="double-bezel-inner flex flex-col gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between"
			>
				<div class="max-w-2xl">
					<span class="mb-3 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
						О производстве
					</span>
					<h3 class="font-serif text-2xl font-light text-brand-dark md:text-3xl">
						Единый стандарт качества для всей номенклатуры
					</h3>
					<p class="mt-3 text-sm leading-relaxed text-brand-gray">
						Выдувные машины последнего поколения, 100% первичный полиэтилен низкого давления HDPE
						без добавления вторичного сырья и выходной контроль каждой единицы на герметичность и
						геометрию. Сертификаты соответствия ГОСТ и ДОПОГ предоставляются с каждой партией.
					</p>
				</div>
				<div class="flex flex-shrink-0 items-center gap-3">
					<div
						class="flex flex-col items-center rounded-xl border border-brand-divider bg-brand-bg/50 px-6 py-4"
					>
						<span class="font-serif text-xl font-light text-brand-dark">ГОСТ</span>
						<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
							>8728 / 51760</span
						>
					</div>
					<div
						class="flex flex-col items-center rounded-xl border border-brand-divider bg-brand-bg/50 px-6 py-4"
					>
						<span class="font-serif text-xl font-light text-brand-dark">ДОПОГ</span>
						<span class="mt-1 text-[8px] tracking-wider text-brand-gray uppercase"
							>Опасные грузы</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
