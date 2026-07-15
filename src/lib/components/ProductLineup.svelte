<script>
	import { fly } from 'svelte/transition';

	/**
	 * @typedef {Object} LineupSpec
	 * @property {string} label
	 * @property {string} value
	 */

	/**
	 * @typedef {Object} LineupVariant
	 * @property {string} chip — метка чипа, напр. «227» или «Металл»
	 * @property {string} [chipUnit] — ед. измерения мелким, напр. «л»
	 * @property {string} [tag] — бейдж, напр. «ДОПОГ» / «ГСМ»
	 * @property {string} title — крупная цифра/название в панели
	 * @property {string} [scaleLabel] — подпись под крупной цифрой
	 * @property {number} scale — число для высоты столбика (∝ масштабу)
	 * @property {LineupSpec[]} specs — строки деталей
	 * @property {string} use — назначение
	 */

	/**
	 * Премиальный интерактивный селектор линейки продукта.
	 *
	 * @type {{
	 *   label?: string;
	 *   title: string;
	 *   titleAccent?: string;
	 *   subtitle?: string;
	 *   scaleHint?: string;
	 *   variants: LineupVariant[];
	 * }}
	 */
	let {
		label = 'Линейка продукции',
		title,
		titleAccent = '',
		subtitle = '',
		scaleHint = '',
		variants
	} = $props();

	let active = $state(0);
	let maxScale = $derived(Math.max(...variants.map((v) => v.scale)));
	let current = $derived(variants[active] ?? variants[0]);

	/** @param {number} i */
	function select(i) {
		if (i >= 0 && i < variants.length) active = i;
	}

	/**
	 * Сдвиг выделения и фокуса на соседний чип.
	 * @param {KeyboardEvent} e
	 * @param {number} dir
	 */
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
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			move(e, 1);
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			move(e, -1);
		}
	}

	/** @param {LineupVariant} v */
	function barHeight(v) {
		const ratio = maxScale > 0 ? (v.scale / maxScale) * 100 : 100;
		return Math.max(25, Math.min(100, Math.round(ratio)));
	}
</script>

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

			<!-- Selector rail with proportional bars -->
			<div class="mb-3 flex items-end justify-between gap-1 sm:gap-4">
				{#each variants as v, i}
					<button
						type="button"
						onclick={() => select(i)}
						onkeydown={onChipKeydown}
						aria-pressed={i === active}
						aria-label={`${v.chip}${v.chipUnit ?? ''}${v.tag ? ' · ' + v.tag : ''}`}
						class="group flex flex-1 flex-col items-center gap-2 rounded-lg px-1 py-2 transition-all duration-300 hover:bg-brand-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
					>
						<!-- Bar track -->
						<div class="flex h-16 w-full items-end justify-center sm:h-20">
							<span
								class="block w-full max-w-[48px] rounded-t-md transition-all duration-500 ease-spring {i ===
								active
									? 'bg-brand-accent'
									: 'bg-neutral-200 group-hover:bg-brand-accent/40'}"
								style="height: {barHeight(v)}%;"
							></span>
						</div>
						<!-- Label -->
						<span class="flex flex-col items-center gap-0.5">
							<span
								class="font-mono text-[10px] tracking-wider sm:text-xs {i === active
									? 'font-bold text-brand-dark'
									: 'text-brand-gray'}"
							>
								{v.chip}<span class="text-[0.62em] text-brand-gray">{v.chipUnit ?? ''}</span>
							</span>
							{#if v.tag}
								<span class="font-mono text-[8px] tracking-widest text-brand-accent uppercase">
									{v.tag}
								</span>
							{/if}
						</span>
					</button>
				{/each}
			</div>
			{#if scaleHint}
				<p class="mb-8 text-center font-mono text-[9px] tracking-wider text-brand-gray uppercase">
					{scaleHint}
				</p>
			{:else}
				<div class="mb-8"></div>
			{/if}

			<!-- Featured detail panel -->
			<div
				class="relative rounded-2xl border border-brand-divider/40 bg-brand-bg/50 p-6 sm:p-8"
				aria-live="polite"
			>
				{#key active}
					<div
						in:fly={{ y: 10, duration: 250 }}
						class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
					>
						<!-- Big metric -->
						<div class="lg:col-span-4">
							{#if current.tag}
								<span
									class="mb-3 inline-block rounded bg-brand-accent-light px-2 py-0.5 font-mono text-[8px] tracking-widest text-brand-accent uppercase"
								>
									{current.tag}
								</span>
							{/if}
							<div
								class="font-serif text-5xl leading-none font-light text-brand-dark sm:text-6xl md:text-7xl"
							>
								{current.title}
							</div>
							{#if current.scaleLabel}
								<span
									class="mt-2 block font-mono text-[9px] tracking-wider text-brand-gray uppercase"
								>
									{current.scaleLabel}
								</span>
							{/if}
						</div>

						<!-- Specs + use -->
						<div class="lg:col-span-8">
							<div class="grid grid-cols-2 gap-4">
								{#each current.specs as s}
									<div class="flex flex-col border-l-2 border-brand-accent/30 pl-3">
										<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase">
											{s.label}
										</span>
										<span class="text-sm font-semibold text-brand-dark">{s.value}</span>
									</div>
								{/each}
							</div>
							<div class="mt-6 border-t border-brand-divider pt-4">
								<span class="mb-1 block text-[9px] tracking-wider text-brand-gray uppercase">
									Назначение
								</span>
								<p class="text-sm leading-relaxed text-brand-dark">{current.use}</p>
							</div>
						</div>
					</div>
				{/key}
			</div>

			<p class="mt-4 text-center font-mono text-[9px] tracking-wider text-brand-gray/70 uppercase">
				клик · тап · ← →
			</p>
		</div>
	</div>
</div>
