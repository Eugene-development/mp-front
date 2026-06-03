<script>
	import { onMount } from 'svelte';
	import { contactsModal } from '../modalState.svelte.js';

	let activeSection = $state('home');
	let scrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;

			// Highlight active menu item based on viewport scroll position
			const sections = ['home', 'about', 'catalog', 'specs', 'calculator', 'faq', 'contacts'];
			for (const section of sections) {
				const el = document.getElementById(section);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= 120 && rect.bottom >= 120) {
						activeSection = section;
						break;
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Trigger initial

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<!-- Header / Sleek Detached Floating Nav -->
<header
	class="fixed inset-x-0 top-0 z-50 transition-all duration-500 {scrolled
		? 'pt-4'
		: 'pointer-events-none pt-6'}"
>
	<div class="pointer-events-auto mx-auto flex w-full max-w-[1440px] justify-center px-4">
		<nav
			class="flex w-full max-w-none items-center justify-between rounded-2xl border bg-white/75 px-6 py-3 backdrop-blur-xl transition-all duration-500 dark:bg-brand-dark/75 {scrolled
				? 'border-brand-divider shadow-sm'
				: 'border-transparent bg-transparent backdrop-blur-none'}"
		>
			<a href="#home" class="group flex items-center gap-2">
				<img
					src="/images/megapack-logo.svg"
					alt="МЕГАПАК"
					class="h-8 w-auto transition-transform duration-300 group-hover:scale-[0.98] dark:invert"
				/>
			</a>

			<!-- Nav links -->
			<div class="hidden items-center gap-1 md:flex">
				{#each [{ id: 'home', label: 'Главная' }, { id: 'about', label: 'О нас' }, { id: 'catalog', label: 'Каталог' }, { id: 'specs', label: 'Стандарты' }, { id: 'calculator', label: 'Расчет' }, { id: 'faq', label: 'Вопросы' }] as item}
					<a
						href="#{item.id}"
						class="rounded-lg px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 {activeSection ===
						item.id
							? 'bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-neutral-200'
							: 'text-neutral-400 hover:bg-neutral-100/60 hover:text-brand-dark dark:text-neutral-400 dark:hover:text-white'}"
					>
						{item.label}
					</a>
				{/each}
			</div>

			<!-- Technical Contact Button -->
			<button
				onclick={() => contactsModal.open()}
				class="group relative flex cursor-pointer items-center gap-2 rounded-xl bg-brand-dark px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-all duration-500 hover:bg-neutral-800 active:scale-[0.98]"
			>
				<span>Контакты</span>
				<span
					class="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0.5"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="h-2.5 w-2.5 text-white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
				</span>
			</button>
		</nav>
	</div>
</header>

