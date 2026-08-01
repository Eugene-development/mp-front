<script>
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import ProductImageSlider from '$lib/components/ProductImageSlider.svelte';
	import {
		markArrivedFromHome,
		markScrolledDown,
		markSliderEngaged,
		resetCatalogFunnel
	} from '$lib/analytics/catalogFunnel';

	const CDN = 'https://storage.yandexcloud.net/megapak-top/products';

	// --- Шаги цели catalog_kanistry_interest ---
	// Последовательность проверяет catalogFunnel.ts; в Метрику уходит одна цель,
	// только когда пройдены все три шага по порядку.
	// Полное описание: docs/analytics/yandex-metrika-goals.md.

	afterNavigate((nav) => {
		// Каждый вход на страницу начинает последовательность заново: состояние
		// воронки живёт в модуле и переживает размонтирование компонента.
		resetCatalogFunnel();

		// Шаг 1. Клиентский переход внутри приложения: SvelteKit знает предыдущий URL.
		if (nav.from) {
			if (nav.from.url.pathname === '/') markArrivedFromHome();
			return;
		}
		// Полная загрузка страницы (прямой заход, F5, открытие в новой вкладке):
		// предыдущий URL берём из referrer и учитываем только свой origin.
		if (!document.referrer) return;
		try {
			const ref = new URL(document.referrer);
			if (ref.origin === location.origin && ref.pathname === '/') markArrivedFromHome();
		} catch {
			/* невалидный referrer — шаг просто не засчитываем */
		}
	});

	// Шаг 2: любой скролл вниз по странице каталога.
	onMount(() => {
		let lastY = window.scrollY;
		let done = false;

		const onScroll = () => {
			const y = window.scrollY;
			// Только движение вниз и только ниже нулевой позиции: восстановление
			// скролла браузером при возврате назад не должно считаться за шаг.
			if (!done && y > lastY && y > 0) {
				done = true;
				markScrolledDown();
				window.removeEventListener('scroll', onScroll);
			}
			lastY = y;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	/** @type {Record<string, { src: string; alt: string; label?: string }[]>} */
	const images = {
		bochki: [
			{ src: `${CDN}/bochka-1.jpg`, alt: 'Пластиковая бочка L-Ring 227 л' },
			{ src: `${CDN}/bochka-2.jpg`, alt: 'Пластиковая бочка Open Top' }
		],
		evrokuby: [
			{ src: `${CDN}/image-tank.jpg`, alt: 'Еврокуб 1000 л в стальной обрешётке' },
			{ src: `${CDN}/image-tank-2.jpg`, alt: 'Еврокуб со сливным краном' }
		],
		// label — литраж вида канистры: слайдер показывает его в левом верхнем углу
		// вместо статичного бейджа категории и обновляет при переключении фото.
		kanistry: [
			{ src: `${CDN}/kanistra/kanistra-1-litr.jpg`, alt: 'Канистра 1 л', label: '1 литр' },
			{ src: `${CDN}/kanistra/kanistra-3-litra.jpg`, alt: 'Канистра 3 л', label: '3 литра' },
			{ src: `${CDN}/kanistra/kanistra-10-litrov.jpg`, alt: 'Канистра 10 л', label: '10 литров' },
			{
				src: `${CDN}/kanistra/kanistra-21.5-litra.jpg`,
				alt: 'Канистра 21.5 л',
				label: '21.5 литра'
			},
			{
				src: `${CDN}/kanistra/kanistra-31.5-litra.jpg`,
				alt: 'Канистра 31.5 л',
				label: '31.5 литра'
			},
			{
				src: `${CDN}/kanistra/kanistra-gsm-5.jpg`,
				alt: 'Канистра ГСМ 5 л',
				label: 'ГСМ · 5 литров'
			},
			{
				src: `${CDN}/kanistra/kanistra-gsm-10.jpg`,
				alt: 'Канистра ГСМ 10 л',
				label: 'ГСМ · 10 литров'
			},
			{
				src: `${CDN}/kanistra/kanistra-gsm-20.jpg`,
				alt: 'Канистра ГСМ 20 л',
				label: 'ГСМ · 20 литров'
			}
		],
		vedra: [{ src: `${CDN}/vedro-1.jpg`, alt: 'Пластиковые вёдра' }] // TODO: добавить фото при появлении
	};

	/**
	 * @typedef {Object} ProductChip
	 * @property {string} text
	 * @property {string} [class] — Tailwind-классы бейджа
	 */

	/**
	 * @typedef {Object} ProductSpec
	 * @property {string} label
	 * @property {string} value
	 */

	/**
	 * @typedef {Object} ProductCategory
	 * @property {string} title
	 * @property {{ src: string; alt: string; label?: string }[]} images
	 * @property {string} badge
	 * @property {string} badgeClass
	 * @property {ProductChip[]} chips
	 * @property {string} description
	 * @property {ProductSpec[]} specs
	 * @property {string} href
	 */

	/** @type {ProductCategory[]} */
	const products = [
		{
			title: 'Полимерные канистры',
			images: images.kanistry,
			badge: 'Штабелируемые',
			badgeClass:
				'rounded bg-emerald-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-emerald-800 uppercase',
			chips: [
				{
					text: 'Первичный HDPE',
					class:
						'rounded bg-emerald-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-emerald-800 uppercase'
				},
				{
					text: 'до 2.7 мм',
					class:
						'rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase'
				}
			],
			description:
				'Штабелируемые канистры от 1 до 31.5 литра с замковым соединением дно–ручка и усиленными стенками. Специальные канистры ГСМ с носиком.',
			specs: [
				{ label: 'Литраж', value: '1 / 3 / 5 / 10 / 21.5 / 31.5 л' },
				{ label: 'Стенка', value: 'До 2.7 мм (ГСМ)' }
			],
			href: '/catalog/kanistry'
		},
		{
			title: 'Пластиковые бочки',
			images: images.bochki,
			badge: 'ДОПОГ · 227 л',
			badgeClass:
				'rounded bg-purple-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-purple-800 uppercase',
			chips: [
				{
					text: 'ГОСТ 8728-88',
					class:
						'rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase'
				},
				{
					text: 'Новые и Б/У',
					class:
						'rounded bg-amber-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-amber-800 uppercase'
				}
			],
			description:
				'Промышленная упаковка от 48 до 227 литров в исполнениях L-Ring и Open Top. Сертифицированы по ДОПОГ для перевозки опасных грузов.',
			specs: [
				{ label: 'Объёмы', value: '48 / 65 / 127 / 227 л' },
				{ label: 'Горловина', value: 'L-Ring · Open Top' }
			],
			href: '/catalog/bochki'
		},
		{
			title: 'Пластиковые вёдра',
			images: images.vedra,
			badge: 'Замок вскрытия',
			badgeClass:
				'rounded bg-blue-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-blue-800 uppercase',
			chips: [
				{
					text: 'ГОСТ Р 51760-2011',
					class:
						'rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase'
				},
				{
					text: 'Герметичные',
					class:
						'rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase'
				}
			],
			description:
				'Универсальная тара от 1 до 32 литров с герметичной крышкой и замком первого вскрытия. Пластиковая или металлическая ручка, IML-этикетирование.',
			specs: [
				{ label: 'Объёмы', value: '1 / 3 / 5 / 10 / 20 / 32 л' },
				{ label: 'Ручка', value: 'Пластик / Металл' }
			],
			href: '/catalog/vedra'
		},
		{
			title: 'Еврокубы (IBC)',
			images: images.evrokuby,
			badge: 'ДОПОГ · 1000 л',
			badgeClass:
				'rounded bg-purple-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-purple-800 uppercase',
			chips: [
				{
					text: '1000 литров',
					class:
						'rounded bg-amber-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-amber-800 uppercase'
				},
				{
					text: 'Стальная обрешётка',
					class:
						'rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-gray uppercase'
				}
			],
			description:
				'Крупногабаритная тара 1000 литров: полиэтиленовая колба в стальной оцинкованной обрешётке. Новые, б/у и с тэном подогрева и утеплителем.',
			specs: [
				{ label: 'Комплектация', value: 'Кран, крышка 150/225 мм' },
				{ label: 'Типы', value: 'Новый · Б/У · С тэном' }
			],
			href: '/catalog/evrokuby'
		}
	];
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

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Header -->
	<div class="mb-14 md:mb-16">
		<Breadcrumbs items={[{ name: 'Каталог' }]} />
		<div class="mt-6 max-w-4xl">
			<!-- <span
				class="mb-5 inline-block rounded-full border border-brand-divider bg-white/60 px-3 py-1 font-mono text-[9px] tracking-widest text-brand-accent uppercase backdrop-blur-sm"
			>
				Промышленный ассортимент · HDPE
			</span> -->
			<h1
				class="font-serif text-3xl leading-[1.05] font-light tracking-tight text-brand-dark md:text-7xl"
			>
				Промышленная
				<span class="font-normal text-brand-accent italic">тара</span>
			</h1>
			<p class="mt-6 max-w-3xl text-sm leading-relaxed text-brand-gray md:text-base">
				Вся продукция ООО «МегаПак» изготавливается на высокотехнологичных выдувных машинах из
				химически стойкого высокомолекулярного полиэтилена низкого давления HDPE. Направления
				производства — от лабораторной фасовки до тысячелитровых IBC-контейнеров.
			</p>
		</div>
	</div>

	<!-- Products Grid: 2 columns on desktop, 1 on mobile -->
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		{#each products as product (product.href)}
			<article class="group flex flex-col">
				<div
					class="double-bezel transition-all duration-500 group-hover:scale-[1.008] group-hover:shadow-[0_35px_70px_-15px_rgba(17,17,24,0.18)]"
				>
					<div class="double-bezel-inner flex h-full flex-col p-6 sm:p-8">
						<h2
							class="mb-5 font-serif text-2xl leading-tight font-light text-brand-dark transition-colors duration-300 group-hover:text-brand-accent md:text-3xl"
						>
							{product.title}
						</h2>

						<!-- Image area -->
						<!--
							Шаг 3: навигация по карусели любой категории ИЛИ клик по фото
							канистры (открытие лайтбокса) — оба варианта закрывают один шаг.
						-->
						<ProductImageSlider
							images={product.images}
							badge={product.badge}
							badgeClass={product.badgeClass}
							onNavigate={markSliderEngaged}
							onImageOpen={product.href === '/catalog/kanistry' ? markSliderEngaged : undefined}
						/>

						<!-- Badges -->
						<div class="mb-3 flex flex-wrap items-center gap-2">
							{#each product.chips as chip (chip.text)}
								<span class={chip.class}>{chip.text}</span>
							{/each}
						</div>
						<p class="mt-2 text-sm leading-relaxed text-brand-gray">
							{product.description}
						</p>

						<div class="mt-5 grid grid-cols-2 gap-4 text-[9px]">
							{#each product.specs as spec (spec.label)}
								<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
									<span class="mb-1 block tracking-wider text-brand-gray uppercase">
										{spec.label}
									</span>
									<span class="font-semibold text-brand-dark">{spec.value}</span>
								</div>
							{/each}
						</div>

						<a
							href={product.href}
							class="mt-6 flex items-center gap-2 border-t border-brand-divider pt-5 no-underline"
						>
							<span
								class="inline-flex h-9 items-center justify-center rounded-lg border border-brand-accent/30 bg-brand-accent-light/50 px-4 text-xs font-bold tracking-wider text-brand-accent uppercase transition-all duration-300 group-hover:border-brand-accent/60 group-hover:bg-brand-accent-light"
							>
								Ознакомиться подробнее
							</span>
							<span
								class="ml-auto text-brand-accent transition-transform duration-300 group-hover:translate-x-1"
								>→</span
							>
						</a>
					</div>
				</div>
			</article>
		{/each}
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
