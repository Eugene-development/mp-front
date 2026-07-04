<script>
	/**
	 * @typedef {Object} SliderImage
	 * @property {string} src
	 * @property {string} alt
	 */

	/**
	 * Бесконечная карусель «заглядывания» (peek): активное фото по центру во весь
	 * размер, соседние — видны по бокам с угасанием opacity. Зациклена бесшовно.
	 *
	 * @type {{
	 *   images: SliderImage[];
	 *   badge?: string;
	 *   badgeClass?: string;
	 *   imageHeight?: string;
	 * }}
	 */
	let { images, badge = '', badgeClass = '', imageHeight = 'h-[200px] md:h-[240px]' } = $props();

	// active — индекс слота в массиве `rendered` (0..count+1). Начинаем со слота 1
	// (первое реальное фото). Слоты 0 и count+1 — клоны-«стражи» для бесшовного цикла.
	let active = $state(1);
	// transitionOn=false во время бесшумного сброса (мгновенный прыжок без анимации).
	let transitionOn = $state(true);
	// animating=true, пока едем на клон и ждём transitionend для сброса — блокирует навигацию.
	let animating = $state(false);
	let reduced = $state(false);

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
		if (reduced) {
			active = ((realIndex + 1) % count) + 1;
			return;
		}
		active += 1;
		if (active === count + 1) animating = true; // едем на правый клон → ждём сброса
	}

	function prev() {
		if (!multi || animating) return;
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
</script>

{#if !count}
	<!-- Пустой массив: сохраняем геометрию карточки без изображения. -->
	<div
		class="relative mb-6 flex items-center justify-center overflow-hidden rounded-xl border border-brand-divider/40 bg-gradient-to-b from-brand-bg/80 to-brand-bg/30 py-8"
	>
		<div class={imageHeight}></div>
	</div>
{:else if !multi}
	<!-- Одно фото: по центру, без навигации и цикла. -->
	<div
		class="relative mb-6 flex items-center justify-center overflow-hidden rounded-xl border border-brand-divider/40 bg-gradient-to-b from-brand-bg/80 to-brand-bg/30 py-8"
	>
		{#if badge}
			<span class="absolute top-4 left-4 z-20 {badgeClass}">{badge}</span>
		{/if}
		<img
			src={images[0].src}
			alt={images[0].alt}
			loading="eager"
			draggable="false"
			class="{imageHeight} w-auto object-contain drop-shadow-xl transition-transform duration-700 ease-spring group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
		/>
	</div>
{:else}
	<!-- Бесконечная peek-карусель -->
	<div
		class="relative mb-6 overflow-hidden rounded-xl border border-brand-divider/40 bg-gradient-to-b from-brand-bg/80 to-brand-bg/30 py-8"
		role="region"
		aria-roledescription="карусель"
		aria-label="Фотографии товара"
	>
		{#if badge}
			<span class="absolute top-4 left-4 z-20 {badgeClass}">{badge}</span>
		{/if}
		<span class="sr-only" aria-live="polite">Фото {realIndex + 1} из {count}</span>

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
					)}); transition: opacity 600ms ease, transform 600ms ease;"
				>
					<img
						src={img.src}
						alt={img.alt}
						loading={i <= 1 ? 'eager' : 'lazy'}
						draggable="false"
						class="{imageHeight} w-auto object-contain drop-shadow-xl transition-transform duration-700 ease-spring {d ===
						0
							? 'group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
							: 'motion-reduce:transition-none'}"
					/>
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
			class="absolute right-4 bottom-3 z-10 rounded-full bg-brand-dark/70 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white backdrop-blur-sm"
		>
			{realIndex + 1} / {count}
		</span>
	</div>
{/if}
