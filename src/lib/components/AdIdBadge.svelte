<script>
	import { afterNavigate } from '$app/navigation';
	import { captureUtm, getStoredAdId } from '$lib/utm';

	let adId = $state(null);

	afterNavigate(() => {
		captureUtm();
		adId = getStoredAdId();
	});
</script>

{#if adId}
	<aside
		class="fixed bottom-3 left-3 z-[90] rounded-lg border border-brand-divider bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm"
		aria-label={`Номер визита ${adId}`}
	>
		<span class="block text-[8px] font-bold tracking-[0.16em] text-brand-gray uppercase">
			Номер визита
		</span>
		<strong class="mt-0.5 block font-mono text-xs tracking-wide text-brand-dark">{adId}</strong>
	</aside>
{/if}
