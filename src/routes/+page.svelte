<script>
	import { page } from '$app/state';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import CatalogSection from '$lib/components/sections/CatalogSection.svelte';
	import SpecsSection from '$lib/components/sections/SpecsSection.svelte';
	import CalculatorSection from '$lib/components/sections/CalculatorSection.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import ContactsSection from '$lib/components/sections/ContactsSection.svelte';

	let isGsmCampaign = $derived(
		page.url.searchParams.get('utm_campaign')?.toLowerCase().includes('gsm') ?? false
	);
</script>

<main class="relative z-10">
	<HeroSection {isGsmCampaign} />
	<CatalogSection />
	<AboutSection />
	<SpecsSection />
	<!-- <CalculatorSection /> -->
	<FaqSection />
	<ContactsSection />
</main>
