<script>
	import Image from '$lib/components/Image.svelte';
	import { fade, scale } from 'svelte/transition';

	/**
	 * @typedef {Object} SliderImage
	 * @property {string} src
	 * @property {string} alt
	 * @property {string} [label] — подпись активного фото (например литраж). Если
	 *   задана, показывается в левом верхнем углу вместо статичного `badge`.
	 */

	/**
	 * Бесконечная карусель «заглядывания» (peek): активное фото по центру во весь
	 * размер, соседние — видны по бокам с угасанием opacity. Зациклена бесшовно.
	 *
	 * onNavigate/onImageOpen — необязательные колбэки для аналитики. Сам слайдер
	 * ничего в Метрику не шлёт: решение принимает вызывающая сторона
	 * (см. docs/analytics/yandex-metrika-goals.md).
	 *
	 * @type {{
	 *   images: SliderImage[];
	 *   badge?: string;
	 *   badgeClass?: string;
	 *   imageHeight?: string;
	 *   onNavigate?: () => void;
	 *   onImageOpen?: () => void;
	 * }}
	 */
	let {
		images,
		badge = '',
		badgeClass = '',
		imageHeight = 'max-h-[200px] md:max-h-[240px] max-w-full',
		onNavigate,
		onImageOpen
	} = $props();

	// active — индекс слота в массиве `rendered` (0..count+1). Начинаем со слота 1
	// (первое реальное фото). Слоты 0 и count+1 — клоны-«стражи» для бесшовного цикла.
	let active = $state(1);
	// transitionOn=false во время бесшумного сброса (мгновенный прыжок без анимации).
	let transitionOn = $state(true);
	// animating=true, пока едем на клон и ждём transitionend для сброса — блокирует навигацию.
	let animating = $state(false);
	let reduced = $state(false);

	// Лайтбокс крупного фото (как в галерее категории): src/alt выбранного фото
	// или null, когда оверлей закрыт. Body scroll блокируется на время показа.
	let lightboxSrc = $state(/** @type {string | null} */ (null));
	let lightboxAlt = $state('');

	let count = $derived(images.length);
	let multi = $derived(count > 1);
	// [last_clone, ...all, first_clone] — клоны дают соседей на границах цикла.
	let rendered = $derived(multi ? [images[count - 1], ...images, images[0]] : images);
	// Реальный индекс (для счётчика и aria-live).
	let realIndex = $derived(
		multi ? (active === 0 ? count - 1 : active === count + 1 ? 0 : active - 1) : 0
	);
	// slideFrac — доля ширины контейнера под один слайд; остаток (1−slideFrac)/2
	// с каждого бока — peek-зона соседей. Меньше slideFrac → соседние фото ближе к
	// центральному (зазор gap = slideFrac − (centerImg+sideImg)/2 уменьшается).
	// Один параметр — крутим плотность карусели.
	const slideFrac = 0.45;
	const peekFrac = (1 - slideFrac) / 2;
	// Сдвиг трека в процентах от его собственной ширины. Важно: flex-контейнер
	// (display:flex) НЕ растёт под детей — его offsetWidth равен ширине контейнера,
	// а слайды лишь переполняют его. Поэтому translateX(%), считающийся от ширины
	// самого трека, разрешается против ширины контейнера, и формула не зависит от
	// count. Корректна сразу на SSR без измерения DOM. Центрирует слот `active`.
	let offsetPct = $derived(multi ? (peekFrac - slideFrac * active) * 100 : 0);
	// Метка в левом верхнем углу: подпись текущего фото (литраж), если она есть,
	// иначе статичный badge категории. Меняется вместе с активным слайдом.
	let cornerLabel = $derived(images[realIndex]?.label || badge);
	let transition = $derived(
		transitionOn && !reduced ? 'transform 600ms cubic-bezier(0.32, 0.72, 0, 1)' : 'none'
	);

	$effect(() => {
		if (!multi) return;
		// только клиент; на SSR $effect не выполняется.
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	// Логичный индекс реального фото для каждого слота. Клоны-«стражи» считаем за
	// своё оригинал: слот 0 = последнее фото, слот count+1 = первое. Поэтому клон и
	// его реальный слот всегда получают одинаковые opacity/scale.
	function logicalOf(slot) {
		if (slot === 0) return count - 1;
		if (slot === count + 1) return 0;
		return slot - 1;
	}
	/** @param {number} i — индекс слота в rendered */
	function dist(i) {
		if (!multi) return 0;
		// Кольцевое расстояние до активного фото (realIndex). При сбросе с клона
		// (active count+1 → 1) realIndex не меняется → dist() не меняется ни для
		// одного слота → сброс бесшовен: opacity/scale не дёргаются, центр не
		// мигает, сосед справа не «вспыхивает».
		const d = Math.abs(logicalOf(i) - realIndex);
		return Math.min(d, count - d);
	}
	function opacityFor(d) {
		return d === 0 ? 1 : d === 1 ? 0.26 : 0;
	}
	function scaleFor(d) {
		return d === 0 ? 1 : 0.7;
	}

	function next() {
		if (!multi || animating) return;
		// Навигация вперёд любым способом: стрелка «вправо», клик по правому
		// соседнему фото, ArrowRight с клавиатуры.
		onNavigate?.();
		if (reduced) {
			active = ((realIndex + 1) % count) + 1;
			return;
		}
		active += 1;
		if (active === count + 1) animating = true; // едем на правый клон → ждём сброса
	}

	function prev() {
		if (!multi || animating) return;
		// Симметрично next(): стрелка «влево», левое соседнее фото, ArrowLeft.
		onNavigate?.();
		if (reduced) {
			active = ((((realIndex - 1) % count) + count) % count) + 1;
			return;
		}
		active -= 1;
		if (active === 0) animating = true; // едем на левый клон → ждём сброса
	}

	/** @param {TransitionEvent} e */
	function onTrackTransitionEnd(e) {
		if (!multi || e.target !== e.currentTarget || e.propertyName !== 'transform') return;
		// Доехали до клона — бесшумно перепрыгиваем на идентичный реальный слот.
		if (active === 0) silentReset(count);
		else if (active === count + 1) silentReset(1);
	}

	/** @param {number} slot — реальный слот (1..count), идентичный клону */
	function silentReset(slot) {
		transitionOn = false;
		active = slot;
		animating = false;
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				transitionOn = true;
			})
		);
	}

	/** @param {KeyboardEvent} e */
	function onKeydown(e) {
		if (!multi) return;
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			next();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			prev();
		}
	}

	/** @param {SliderImage} img */
	function openLightbox(img) {
		onImageOpen?.();
		lightboxSrc = img.src;
		lightboxAlt = img.alt;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		lightboxSrc = null;
		lightboxAlt = '';
		document.body.style.overflow = '';
	}

	/** @param {KeyboardEvent} e */
	function onWindowKeydown(e) {
		if (e.key === 'Escape' && lightboxSrc) closeLightbox();
	}

	/**
	 * Портал ноды лайтбокса в <body>: оверлей должен покрывать весь viewport
	 * независимо от stacking-context/containment предков (карточка каталога
	 * задаёт transform/scale → containing-block для fixed-детей).
	 */
	function teleport(node) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	$effect(() => {
		return () => {
			// Cleanup: вернуть скролл body при размонтировании компонента.
			if (lightboxSrc) {
				document.body.style.overflow = '';
			}
		};
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#if !count}
	<!-- Пустой массив: сохраняем геометрию карточки без изображения. -->
	<div
		class="relative mb-6 flex items-center justify-center overflow-hidden rounded-xl border border-brand-divider/40 bg-gradient-to-b from-brand-bg/80 to-brand-bg/30 py-8"
	>
		<div class="h-[200px] md:h-[240px]"></div>
	</div>
{:else if !multi}
	<!-- Одно фото: по центру, без навигации и цикла. -->
	<div
		class="relative mb-6 flex items-center justify-center overflow-hidden rounded-xl border border-brand-divider/40 bg-gradient-to-b from-brand-bg/80 to-brand-bg/30 py-10 sm:py-14"
	>
		{#if cornerLabel}
			<span class="absolute top-4 left-4 z-20 {badgeClass}">{cornerLabel}</span>
		{/if}
		<button
			type="button"
			onclick={() => openLightbox(images[0])}
			aria-label={`Увеличить фото: ${images[0].alt}`}
			class="flex cursor-zoom-in items-center justify-center rounded-lg border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
		>
			<Image
				src={images[0].src}
				alt={images[0].alt}
				loading="eager"
				draggable="false"
				class="{imageHeight} w-auto rounded-lg object-contain drop-shadow-xl transition-transform duration-700 ease-spring group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
			/>
		</button>
	</div>
{:else}
	<!-- Бесконечная peek-карусель -->
	<div
		class="relative mb-6 overflow-hidden rounded-xl border border-brand-divider/40 bg-gradient-to-b from-brand-bg/80 to-brand-bg/30 py-10 sm:py-14"
		role="region"
		aria-roledescription="карусель"
		aria-label="Фотографии товара"
	>
		{#if cornerLabel}
			<!--
				#key перезапускает fade при смене подписи: на переключении слайда
				литраж плавно подменяется, а не мигает текстом на месте.
			-->
			{#key cornerLabel}
				<span
					in:fade={{ duration: 220 }}
					out:fade={{ duration: 120 }}
					class="absolute top-4 left-4 z-20 {badgeClass}">{cornerLabel}</span
				>
			{/key}
		{/if}
		<span class="sr-only" aria-live="polite">
			Фото {realIndex + 1} из {count}{images[realIndex]?.label
				? `, ${images[realIndex].label}`
				: ''}
		</span>

		<div
			class="flex"
			style="transform: translateX({offsetPct}%); transition: {transition};"
			ontransitionend={onTrackTransitionEnd}
		>
			{#each rendered as img, i (img.src + '-' + i)}
				{@const d = dist(i)}
				<div
					class="flex flex-shrink-0 items-center justify-center"
					style="width: {slideFrac * 100}%; opacity: {opacityFor(d)}; transform: scale({scaleFor(
						d
					)}); transition: opacity 600ms ease, transform 600ms ease; pointer-events: {d <= 1
						? 'auto'
						: 'none'};"
				>
					{#if d === 0}
						<!-- Центральное фото: клик открывает лайтбокс. -->
						<button
							type="button"
							onclick={() => openLightbox(img)}
							aria-label={`Увеличить фото: ${img.alt}`}
							class="flex cursor-zoom-in items-center justify-center rounded-lg border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
						>
							<Image
								src={img.src}
								alt={img.alt}
								loading={i <= 1 ? 'eager' : 'lazy'}
								draggable="false"
								class="{imageHeight} w-auto rounded-lg object-contain drop-shadow-xl transition-transform duration-700 ease-spring group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
							/>
						</button>
					{:else if d === 1}
						<!-- Боковое фото: клик прокручивает карусель к нему (как стрелки). -->
						<button
							type="button"
							onclick={(e) => {
								e.stopPropagation();
								i < active ? prev() : next();
							}}
							aria-label={i < active ? 'Предыдущее фото' : 'Следующее фото'}
							class="flex cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
						>
							<Image
								src={img.src}
								alt={img.alt}
								loading="lazy"
								draggable="false"
								class="{imageHeight} w-auto rounded-lg object-contain drop-shadow-xl transition-transform duration-500 ease-spring hover:scale-[1.05] motion-reduce:transition-none motion-reduce:hover:scale-100"
							/>
						</button>
					{:else}
						<Image
							src={img.src}
							alt={img.alt}
							loading="lazy"
							draggable="false"
							class="{imageHeight} w-auto rounded-lg object-contain drop-shadow-xl motion-reduce:transition-none"
						/>
					{/if}
				</div>
			{/each}
		</div>

		<button
			type="button"
			onclick={(e) => {
				e.stopPropagation();
				prev();
			}}
			aria-label="Предыдущее фото"
			onkeydown={onKeydown}
			class="absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-dark/25 bg-white text-brand-dark shadow-lg transition-all duration-300 hover:scale-105 hover:border-brand-accent/60 hover:bg-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class="h-5 w-5"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>
		</button>
		<button
			type="button"
			onclick={(e) => {
				e.stopPropagation();
				next();
			}}
			aria-label="Следующее фото"
			onkeydown={onKeydown}
			class="absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-dark/25 bg-white text-brand-dark shadow-lg transition-all duration-300 hover:scale-105 hover:border-brand-accent/60 hover:bg-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class="h-5 w-5"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</button>

		<span
			aria-hidden="true"
			class="absolute top-4 right-4 z-10 rounded-full bg-brand-dark/70 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white backdrop-blur-sm"
		>
			{realIndex + 1} / {count}
		</span>
	</div>
{/if}

{#if lightboxSrc}
	<div
		use:teleport
		transition:fade={{ duration: 200 }}
		class="fixed top-0 right-0 bottom-0 left-0 z-[10000] flex items-center justify-center bg-brand-dark px-4"
		role="button"
		tabindex="0"
		onclick={closeLightbox}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') closeLightbox();
		}}
		style="position: fixed !important; backdrop-filter: blur(16px);"
	>
		<div
			transition:scale={{ duration: 250, start: 0.95, opacity: 0 }}
			class="double-bezel relative max-h-[85vh] max-w-[90vw] overflow-hidden shadow-2xl"
			role="none"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="double-bezel-inner bg-white/95 p-2 sm:p-4">
				<button
					type="button"
					onclick={closeLightbox}
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
				<Image
					src={lightboxSrc}
					alt={lightboxAlt}
					class="max-h-[75vh] max-w-full rounded-lg object-contain shadow-inner"
				/>
				{#if lightboxAlt}
					<p class="mt-4 text-center font-serif text-sm font-light tracking-wide text-brand-dark">
						{lightboxAlt}
					</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
