<script>
	import { page } from '$app/state';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import CatalogSection from '$lib/components/sections/CatalogSection.svelte';
	import SpecsSection from '$lib/components/sections/SpecsSection.svelte';
	import CalculatorSection from '$lib/components/sections/CalculatorSection.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import ContactsSection from '$lib/components/sections/ContactsSection.svelte';

	const GSM_GROUP = 'kanistry_gsm';
	let isGsmGroup = $derived(
		page.url.searchParams.get('group')?.trim().toLowerCase() === GSM_GROUP
	);
</script>

<main class="relative z-10">
	<HeroSection {isGsmGroup} />
	<CatalogSection />
	<AboutSection />
	<SpecsSection />
	<!-- <CalculatorSection /> -->
	<FaqSection />
	<ContactsSection />
</main>
