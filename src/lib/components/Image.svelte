<script>
	let {
		src,
		alt = '',
		class: className = '',
		imageClass = '',
		style = '',
		...attributes
	} = $props();
	let image = $state();
	let settledSource = $state(null);
	let failedSource = $state(null);
	let pending = $derived(settledSource !== src);
	let failed = $derived(failedSource === src);

	function settle(node) {
		if (!node.complete) return;
		settledSource = src;
		failedSource = node.naturalWidth ? null : src;
	}

	$effect(() => {
		// A cached image can finish before hydration attaches its load handler.
		src;
		if (image) settle(image);
	});
</script>

<span class="image-frame {className}" class:pending class:failed {style} aria-busy={pending}>
	{#key src}
		<img
			{...attributes}
			bind:this={image}
			{src}
			{alt}
			class={imageClass}
			onload={(event) => settle(event.currentTarget)}
			onerror={(event) => settle(event.currentTarget)}
		/>
	{/key}
	{#if pending || failed}
		<span class="image-feedback" role="status">
			{#if failed}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					aria-hidden="true"
				>
					<rect x="3" y="3" width="18" height="18" rx="3" />
					<path d="m3 17 5-5 4 4 3-3 6 6M15 7h.01" />
				</svg>
				<span class="sr-only">Изображение недоступно{alt ? `: ${alt}` : ''}</span>
			{:else}
				<span class="image-spinner" aria-hidden="true"></span>
				<span class="sr-only">Загрузка изображения</span>
			{/if}
		</span>
	{/if}
</span>

<style>
	.image-frame {
		display: inline-grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		vertical-align: middle;
		isolation: isolate;
	}

	img {
		grid-area: 1 / 1;
		display: block;
		width: auto;
		height: inherit;
		min-width: 0;
		max-width: 100%;
		max-height: inherit;
		object-fit: inherit;
		border-radius: inherit;
	}

	.pending img,
	.failed img {
		opacity: 0;
		min-width: 2rem;
		min-height: 2rem;
	}

	.image-feedback {
		grid-area: 1 / 1;
		z-index: 1;
		display: grid;
		place-items: center;
		min-width: 2rem;
		min-height: 2rem;
		color: var(--color-brand-accent);
		pointer-events: none;
	}

	.image-spinner,
	.image-feedback svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.image-spinner {
		border: 2px solid var(--color-brand-accent-light);
		border-top-color: var(--color-brand-accent);
		border-radius: 50%;
		animation: image-spin 800ms linear infinite;
	}

	@keyframes image-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.image-spinner {
			animation: none;
		}
	}
</style>
