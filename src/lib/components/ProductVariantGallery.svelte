<script>
	import { fade, fly, scale } from 'svelte/transition';

	/**
	 * @typedef {Object} GallerySpec
	 * @property {string} label
	 * @property {string} value
	 */

	/**
	 * @typedef {Object} GalleryVariant
	 * @property {string} chip — метка, напр. «10» или «Металл»
	 * @property {string} [chipUnit] — ед. измерения мелким, напр. «л»
	 * @property {string} [tag] — бейдж, напр. «ДОПОГ» / «ГСМ»
	 * @property {string} [title] — название/объём
	 * @property {GallerySpec[]} [specs] — строки деталей для подписи
	 * @property {string|null} [image] — URL фото или null → заглушка
	 * @property {string} [alt] — alt-текст
	 */

	/**
	 * Премиальная галерея изображений тары по вариантам литража. Вариант без фото
	 * показывает заглушку; реальное фото открывается в лайтбоксе по клику.
	 *
	 * @type {{
	 *   label?: string;
	 *   title: string;
	 *   titleAccent?: string;
	 *   subtitle?: string;
	 *   selectorLabel?: string;
	 *   variants: GalleryVariant[];
	 * }}
	 */
	let {
		label = 'Галерея',
		title,
		titleAccent = '',
		subtitle = '',
		selectorLabel = 'Литраж',
		variants
	} = $props();

	let active = $state(0);
	// Направление появления фото: +1 — выезжает справа (вперёд), −1 — слева (назад).
	let enterDir = $state(1);
	// Ширина сцены — для пропорционального горизонтального сдвига при появлении.
	let stageWidth = $state(0);
	/** DOM-ноды кнопок-чипов боковой панели — для авто-скролла к активному варианту. */
	let chipEls = $state(/** @type {HTMLButtonElement[]} */ ([]));
	let lightboxSrc = $state(/** @type {string | null} */ (null));
	let lightboxAlt = $state('');

	let count = $derived(variants.length);
	let current = $derived(variants[active] ?? variants[0]);

	/** @param {GalleryVariant} v */
	function chipLabel(v) {
		return `${v.chip}${v.chipUnit ?? ''}`;
	}

	/** Подпись сцены: значения спецификаций через «·». @param {GalleryVariant} v */
	function caption(v) {
		if (!v.specs?.length) return '';
		return v.specs.map((s) => s.value).join(' · ');
	}

	/** @param {number} i */
	function select(i) {
		if (i >= 0 && i < count && i !== active) {
			// Кратчайшее кольцевое направление к выбранному варианту.
			const forward = (i - active + count) % count <= count / 2;
			enterDir = forward ? 1 : -1;
			active = i;
		}
	}

	/** Следующий вариант с зацикливанием — новое фото выезжает справа. */
	function next() {
		if (count > 1) {
			enterDir = 1;
			active = (active + 1) % count;
		}
	}

	/** Предыдущий вариант с зацикливанием — новое фото выезжает слева. */
	function prev() {
		if (count > 1) {
			enterDir = -1;
			active = (active - 1 + count) % count;
		}
	}

	/** Сдвиг выделения и фокуса на соседний вариант. @param {KeyboardEvent} e @param {number} dir */
	function move(e, dir) {
		const rail = /** @type {HTMLElement} */ (e.currentTarget).parentElement;
		if (!rail) return;
		const btns = /** @type {HTMLButtonElement[]} */ (Array.from(rail.querySelectorAll('button')));
		const idx = btns.indexOf(/** @type {HTMLButtonElement} */ (e.currentTarget));
		if (idx === -1) return;
		const n = (idx + dir + btns.length) % btns.length;
		select(n);
		btns[n].focus();
	}

	/** @param {KeyboardEvent} e */
	function onChipKeydown(e) {
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			move(e, 1);
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			move(e, -1);
		}
	}

	function openLightbox() {
		if (!current.image) return;
		lightboxSrc = current.image;
		lightboxAlt = current.alt ?? chipLabel(current);
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
	 * независимо от stacking-context/containment предков. Без этого fixed-inset-0
	 * может не дотянуться до краёв, если предок создаёт containing-block.
	 */
	function teleport(node) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	// При смене активного варианта (в т.ч. стрелками навигации) держим соответствующий
	// чип в зоне видимости боковой панели — выделение всегда остаётся на экране.
	$effect(() => {
		const i = active;
		const el = chipEls[i];
		if (el) el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
	});

	$effect(() => {
		return () => {
			// Cleanup: restore body scroll when component unmounts
			if (lightboxSrc) {
				document.body.style.overflow = '';
			}
		};
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#if count}
	<div class="double-bezel">
		<div class="double-bezel-inner relative overflow-hidden p-6 sm:p-10">
			<!-- Ambient glow -->
			<div
				class="pointer-events-none absolute -top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-brand-accent-light/30 blur-[90px]"
			></div>

			<div class="relative">
				<!-- Header -->
				<div class="mb-8">
					<span class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase">
						{label}
					</span>
					<h2
						class="font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-4xl"
					>
						{title}{#if titleAccent}&nbsp;<span class="font-normal text-brand-accent italic"
								>{titleAccent}</span
							>{/if}
					</h2>
					{#if subtitle}
						<p class="mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray">
							{subtitle}
						</p>
					{/if}
				</div>

				<div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
					<!-- Stage -->
					<div class="lg:col-span-8">
						<div
							bind:clientWidth={stageWidth}
							class="group relative overflow-hidden rounded-2xl border border-brand-divider/40 bg-gradient-to-b from-brand-bg/80 to-brand-bg/30"
							role="region"
							aria-roledescription="галерея"
							aria-label="Фотографии товара"
						>
							<span class="sr-only" aria-live="polite">
								Вариант {chipLabel(current)}{current.tag ? ', ' + current.tag : ''}
							</span>

							{#if current.tag}
								<span
									class="absolute top-4 left-4 z-20 rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
								>
									{current.tag}
								</span>
							{/if}

							<div class="flex items-center justify-center gap-6 px-6 py-10 sm:gap-10 sm:py-14">
								{#if count > 1}
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											prev();
										}}
										aria-label="Предыдущее фото"
										class="flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-brand-dark shadow-lg transition-all duration-300 hover:scale-105 hover:bg-neutral-50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 sm:h-14 sm:w-14"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2.5"
											stroke="currentColor"
											class="h-6 w-6 sm:h-7 sm:w-7"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15.75 19.5 8.25 12l7.5-7.5"
											/>
										</svg>
									</button>
								{/if}

								{#key active}
									<div
										in:fly={{ x: enterDir * (stageWidth ? stageWidth * 0.4 : 160), duration: 300 }}
										class="relative flex min-w-0 justify-center"
									>
										{#if current.image}
											<button
												type="button"
												onclick={openLightbox}
												aria-label={`Увеличить фото: ${current.alt ?? chipLabel(current)}`}
												class="flex min-w-0 cursor-zoom-in items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-inset"
											>
												<img
													src={current.image}
													alt={current.alt ?? chipLabel(current)}
													loading="eager"
													draggable="false"
													class="max-h-[260px] w-auto max-w-full rounded-lg object-contain drop-shadow-xl transition-transform duration-700 ease-spring group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:max-h-[340px]"
												/>
											</button>
										{:else}
											{@render stagePlaceholder()}
										{/if}
									</div>
								{/key}

								{#if count > 1}
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											next();
										}}
										aria-label="Следующее фото"
										class="flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-brand-dark shadow-lg transition-all duration-300 hover:scale-105 hover:bg-neutral-50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 sm:h-14 sm:w-14"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2.5"
											stroke="currentColor"
											class="h-6 w-6 sm:h-7 sm:w-7"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
									</button>
								{/if}
							</div>

							<span
								class="absolute top-4 right-4 z-10 rounded-full bg-white/80 px-2 py-0.5 font-mono text-[9px] tracking-wider text-brand-gray backdrop-blur-sm"
							>
								{active + 1} / {count}
							</span>
						</div>

						<!-- Caption -->
						<div class="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 px-1">
							<span class="font-serif text-2xl font-light text-brand-dark">
								{chipLabel(current)}
							</span>
							{#if caption(current)}
								<span class="font-mono text-[11px] tracking-wide text-brand-gray">
									{caption(current)}
								</span>
							{/if}
						</div>
					</div>

					<!-- Selector rail -->
					<div class="lg:col-span-4">
						<span class="mb-3 block font-mono text-[9px] tracking-widest text-brand-gray uppercase">
							{selectorLabel}
						</span>
						<div
							class="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:max-h-[420px] lg:flex-col lg:overflow-y-auto lg:pb-0"
						>
							{#each variants as v, i}
								<button
									type="button"
									onclick={() => select(i)}
									bind:this={chipEls[i]}
									onkeydown={onChipKeydown}
									aria-pressed={i === active}
									aria-label={chipLabel(v) + (v.tag ? ' · ' + v.tag : '')}
									class="group flex flex-shrink-0 items-center gap-3 rounded-xl border p-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 lg:w-full {i ===
									active
										? 'border-brand-accent bg-brand-accent-light/60 shadow-sm'
										: 'border-brand-divider bg-brand-card hover:border-brand-accent/40 hover:bg-brand-bg'}"
								>
									<span
										class="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-brand-divider/60 bg-gradient-to-b from-brand-bg to-brand-card"
									>
										{#if v.image}
											<img
												src={v.image}
												alt=""
												loading="lazy"
												draggable="false"
												class="h-full w-full object-contain p-1"
											/>
										{:else}
											{@render thumbPlaceholder(v)}
										{/if}
									</span>
									<span class="flex min-w-0 flex-col">
										<span
											class="font-mono text-xs tracking-wider {i === active
												? 'font-bold text-brand-dark'
												: 'text-brand-gray'}"
										>
											{v.chip}<span class="text-[0.7em] text-brand-gray">{v.chipUnit ?? ''}</span>
										</span>
										{#if v.tag}
											<span
												class="font-mono text-[8px] tracking-widest text-brand-accent uppercase"
											>
												{v.tag}
											</span>
										{/if}
									</span>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<p
					class="mt-6 text-center font-mono text-[9px] tracking-wider text-brand-gray/70 uppercase"
				>
					клик · тап · ← →
				</p>
			</div>
		</div>
	</div>
{/if}

{#snippet glyph(size)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 64 84"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		class={size}
		aria-hidden="true"
	>
		<path d="M27 5 h10 a1 1 0 0 1 1 1 v3 h-12 v-3 a1 1 0 0 1 1 -1 z" stroke-linejoin="round" />
		<path d="M25 11 h14" stroke-linecap="round" />
		<path
			d="M21 17 q-4 0 -4 6 v46 q0 9 9 9 h16 q9 0 9 -9 v-46 q0 -6 -4 -6 z"
			stroke-linejoin="round"
		/>
		<path d="M43 26 q9 2 9 11 q0 9 -9 9" stroke-linecap="round" />
		<rect x="23" y="36" width="18" height="22" rx="3" />
	</svg>
{/snippet}

{#snippet stagePlaceholder()}
	<div
		class="relative flex flex-col items-center justify-center px-6 py-12 sm:py-16"
		aria-label="Фото в подготовке"
	>
		<div
			class="pointer-events-none absolute inset-4 rounded-xl border border-dashed border-brand-divider"
		></div>
		<div class="relative text-brand-accent/25">
			{@render glyph('h-20 w-16')}
		</div>
		<div class="relative mt-4 font-serif text-3xl font-light text-brand-dark/40">
			{chipLabel(current)}
		</div>
		<div class="relative mt-2 font-mono text-[9px] tracking-widest text-brand-gray/70 uppercase">
			Фото в подготовке
		</div>
	</div>
{/snippet}

{#snippet thumbPlaceholder(v)}
	<span class="flex h-full w-full items-center justify-center text-brand-accent/25">
		{@render glyph('h-7 w-6')}
		<span class="sr-only">Нет фото для {chipLabel(v)}</span>
	</span>
{/snippet}

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
				<img
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
