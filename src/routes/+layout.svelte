<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import InfoBanner from '$lib/components/InfoBanner.svelte';
	import ContactsModal from '$lib/components/ContactsModal.svelte';

	let { children } = $props();

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, {
			threshold: 0.05,
			rootMargin: '0px 0px -40px 0px'
		});

		// We use a small timeout to ensure elements are mounted and routes are fully loaded
		const setupObserver = () => {
			const elements = document.querySelectorAll('.reveal-on-scroll');
			elements.forEach(el => observer.observe(el));
		};

		setTimeout(setupObserver, 100);

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>МегаПак — Высокоточная Промышленная Пластиковая Тара</title>
	<meta name="description" content="ООО «МегаПак» — ведущий производитель и поставщик сертифицированной полимерной тары в Москве. Пластиковые бочки, штабелируемые канистры и еврокубы (IBC) оптом по стандартам ГОСТ и ООН." />
	<meta name="keywords" content="пластиковая тара, пластиковые бочки, пластиковые канистры, еврокубы, IBC контейнеры, МегаПак, megapaks, упаковка москва, полимерная тара" />
</svelte:head>

<div class="noise-bg min-h-screen selection:bg-brand-accent-light selection:text-brand-accent">
	<Header />
	{@render children()}
	<Footer />
	<ContactsModal />
</div>

