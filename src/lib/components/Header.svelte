<script>
	import { onMount } from 'svelte';
	import { contactsModal } from '../modalState.svelte.js';
	import { fade } from 'svelte/transition';

	let activeSection = $state('home');
	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	$effect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

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
	class="fixed inset-x-0 top-0 z-50 transition-all duration-500 {scrolled || mobileMenuOpen
		? 'pt-4'
		: 'pointer-events-none pt-6'}"
>
	<div class="pointer-events-auto mx-auto flex w-full max-w-[1440px] justify-center px-4">
		<nav
			class="flex w-full max-w-none items-center justify-between rounded-2xl border border-white/10 bg-brand-dark/90 px-6 py-3 backdrop-blur-2xl transition-all duration-500 {scrolled ||
			mobileMenuOpen
				? 'border-white/20 bg-brand-dark/95 shadow-2xl shadow-black/50'
				: 'shadow-xl shadow-black/30'}"
		>
			<a href="#home" class="group flex items-center gap-2">
				<img
					src="/images/megapack-logo.svg"
					alt="МЕГАПАК"
					class="h-8 w-auto invert transition-transform duration-300 group-hover:scale-[0.98]"
				/>
			</a>

			<!-- Nav links -->
			<div class="hidden items-center gap-1 md:flex">
				{#each [{ id: 'home', label: 'Главная' }, { id: 'about', label: 'О нас' }, { id: 'catalog', label: 'Каталог' }, { id: 'specs', label: 'Стандарты' }, { id: 'calculator', label: 'Расчет' }, { id: 'faq', label: 'Вопросы' }] as item}
					<a
						href="#{item.id}"
						class="rounded-lg px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 {activeSection ===
						item.id
							? 'bg-gradient-to-r from-white/15 to-white/5 text-brand-accent-light'
							: 'text-neutral-300 hover:bg-white/5 hover:text-white'}"
					>
						{item.label}
					</a>
				{/each}
			</div>

			<!-- Technical Contact Button -->
			<button
				onclick={() => contactsModal.open()}
				class="group relative hidden cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-neutral-950 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-all duration-500 hover:bg-neutral-900 active:scale-[0.98] md:flex"
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

			<!-- Hamburger Button -->
			<button
				onclick={toggleMobileMenu}
				class="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white transition-all duration-500 hover:bg-neutral-100 active:scale-[0.98] md:hidden"
				aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
			>
				<div class="relative flex h-4 w-4 flex-col items-center justify-between">
					<span
						class="h-0.5 w-4 rounded-full bg-brand-dark transition-all duration-300 {mobileMenuOpen
							? 'translate-y-[7px] rotate-45'
							: ''}"
					></span>
					<span
						class="h-0.5 w-4 rounded-full bg-brand-dark transition-all duration-300 {mobileMenuOpen
							? 'opacity-0'
							: ''}"
					></span>
					<span
						class="h-0.5 w-4 rounded-full bg-brand-dark transition-all duration-300 {mobileMenuOpen
							? '-translate-y-[7px] -rotate-45'
							: ''}"
					></span>
				</div>
			</button>
		</nav>
	</div>

	{#if mobileMenuOpen}
		<!-- Mobile Menu Overlay -->
		<div
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 z-40 flex flex-col justify-between bg-brand-dark/95 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
		>
			<!-- Links List -->
			<div class="flex flex-col gap-6">
				{#each [{ id: 'home', label: 'Главная' }, { id: 'about', label: 'О нас' }, { id: 'catalog', label: 'Каталог' }, { id: 'specs', label: 'Стандарты' }, { id: 'calculator', label: 'Расчет' }, { id: 'faq', label: 'Вопросы' }] as item}
					<a
						href="#{item.id}"
						onclick={closeMobileMenu}
						class="border-b border-white/10 pb-4 text-lg font-medium tracking-wider uppercase transition-colors duration-300 {activeSection ===
						item.id
							? 'font-semibold text-brand-accent'
							: 'text-neutral-400 hover:text-white'}"
					>
						{item.label}
					</a>
				{/each}
			</div>

			<!-- Bottom area with contact details & button -->
			<div class="flex flex-col gap-6 border-t border-white/10 pt-6">
				<div class="flex flex-col gap-2 text-xs text-neutral-400">
					<div class="flex items-center gap-2">
						<span>📞</span>
						<a href="tel:+74994906145" class="font-semibold text-white hover:text-brand-accent">
							8 (499) 490-61-45
						</a>
					</div>
					<div class="flex items-center gap-2">
						<span>✉️</span>
						<a
							href="mailto:zakaz@megapaks.ru"
							class="font-semibold text-white hover:text-brand-accent"
						>
							zakaz@megapaks.ru
						</a>
					</div>
				</div>

				<button
					onclick={() => {
						closeMobileMenu();
						contactsModal.open();
					}}
					class="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-semibold tracking-wider text-brand-dark uppercase transition-all duration-500 hover:bg-neutral-100 active:scale-[0.98]"
				>
					<span>Связаться с нами</span>
					<span
						class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark/10 transition-transform duration-500 group-hover:translate-x-0.5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="h-2.5 w-2.5 text-brand-dark"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</span>
				</button>
			</div>
		</div>
	{/if}
</header>
