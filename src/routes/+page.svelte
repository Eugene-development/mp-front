<script>
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import CatalogSection from '$lib/components/sections/CatalogSection.svelte';
	import SpecsSection from '$lib/components/sections/SpecsSection.svelte';
	import CalculatorSection from '$lib/components/sections/CalculatorSection.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import ContactsSection from '$lib/components/sections/ContactsSection.svelte';
</script>

<!-- Ambient soft light gradient blobs in background -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute -top-[20%] -left-[10%] h-[50vw] w-[50vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[120px]"
	></div>
	<div
		class="absolute top-[40%] -right-[15%] h-[45vw] w-[45vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -10s;"
	></div>
</div>

<main class="relative z-10">
	<HeroSection />
	<AboutSection />
	<CatalogSection />
	<SpecsSection />
	<CalculatorSection />
	<FaqSection />
	<ContactsSection />
</main>
