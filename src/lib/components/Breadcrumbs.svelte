<script>
	/**
	 * @typedef {Object} BreadcrumbItem
	 * @property {string} name
	 * @property {string} [href]
	 */

	/** @type {{ items: BreadcrumbItem[] }} */
	let { items = [] } = $props();
</script>

<div class="mb-4 flex items-center gap-2 text-[12px] font-bold tracking-widest text-brand-gray uppercase">
	<a href="/" class="transition-colors duration-300 hover:text-brand-dark">Главная</a>
	{#each items as item}
		<span>/</span>
		{#if item.href}
			<a href={item.href} class="transition-colors duration-300 hover:text-brand-dark">{item.name}</a>
		{:else}
			<span class="text-brand-accent">{item.name}</span>
		{/if}
	{/each}
</div>
