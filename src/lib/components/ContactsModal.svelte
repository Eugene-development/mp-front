<script>
	import { contactsModal } from '../modalState.svelte.js';
	import { fade, scale } from 'svelte/transition';

	// Close on ESC key press
	function handleKeydown(event) {
		if (event.key === 'Escape' && contactsModal.isOpen) {
			contactsModal.close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if contactsModal.isOpen}
	<div
		transition:fade={{ duration: 250 }}
		class="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/50 px-4 backdrop-blur-md"
		onclick={(e) => {
			if (e.target === e.currentTarget) contactsModal.close();
		}}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				contactsModal.close();
			}
		}}
		role="button"
		tabindex="0"
	>
		<!-- Animated Premium Modal Container -->
		<div
			transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
			class="double-bezel relative w-full max-w-lg overflow-hidden shadow-2xl"
		>
			<div class="double-bezel-inner p-6 sm:p-8">
				<!-- Custom Close Button -->
				<button
					onclick={() => contactsModal.close()}
					class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-brand-divider bg-neutral-100 text-brand-gray transition-all duration-300 hover:bg-neutral-200 hover:text-brand-dark active:scale-95 sm:top-6 sm:right-6"
					aria-label="Закрыть контакты"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="h-4 w-4"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>

				<!-- Title block -->
				<div class="mb-8">
					<span
						class="mb-2 inline-block rounded-full border border-brand-divider bg-neutral-100 px-3 py-1 text-[9px] font-bold tracking-widest text-brand-gray uppercase"
					>
						Контактная информация
					</span>
					<h3 class="font-serif text-3xl font-light tracking-tight text-brand-dark sm:text-4xl">
						Связаться <span class="font-normal text-brand-accent italic">с нами</span>
					</h3>
				</div>

				<!-- Premium contact card stack -->
				<div class="space-y-6">
					<!-- Working Hours -->
					<div class="flex gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
						>
							🕒
						</div>
						<div class="flex flex-col">
							<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
								>Время работы</span
							>
							<span class="mt-1 text-sm font-semibold text-brand-dark">
								Пн–Пт с 9:00 до 18:00 (МСК)
							</span>
							<span class="text-[10px] text-brand-gray">Выходные: Суббота, Воскресенье</span>
						</div>
					</div>

					<!-- Phones -->
					<div class="flex gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
						>
							📞
						</div>
						<div class="flex flex-col">
							<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
								>Телефоны отдела сбыта</span
							>
							<div class="mt-1 flex flex-col gap-1 sm:flex-row sm:gap-4">
								<a
									href="tel:+74994906145"
									class="text-sm font-semibold text-brand-dark transition-colors duration-300 hover:text-brand-accent"
								>
									8 (499) 490-61-45
								</a>
								<span class="hidden text-brand-divider sm:inline">|</span>
								<a
									href="tel:+79037491724"
									class="text-sm font-semibold text-brand-dark transition-colors duration-300 hover:text-brand-accent"
								>
									8 (903) 749-17-24
								</a>
							</div>
						</div>
					</div>

					<!-- Email -->
					<div class="flex gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
						>
							✉️
						</div>
						<div class="flex flex-col">
							<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
								>Прямой E-mail</span
							>
							<a
								href="mailto:info@megapak.top"
								class="mt-1 text-sm font-semibold text-brand-accent transition-colors duration-300 hover:underline"
							>
								info@megapak.top
							</a>
						</div>
					</div>

					<!-- Address -->
					<div class="flex gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-divider bg-neutral-100 text-lg"
						>
							📍
						</div>
						<div class="flex flex-col">
							<span class="text-[9px] font-bold tracking-wider text-brand-gray uppercase"
								>Адрес комплекса</span
							>
							<span class="mt-1 text-sm leading-relaxed font-semibold text-brand-dark">
								109429, г. Москва, ул. Верхние Поля, дом 61
							</span>
						</div>
					</div>
				</div>

				<div
					class="mt-8 border-t border-brand-divider pt-6 text-[9px] leading-relaxed text-brand-gray"
				>
					ООО «МегаПак» | ИНН 7723910385 | КПП 772301001 <br />
					Офис продаж и центральный склад находятся на одной территории.
				</div>
			</div>
		</div>
	</div>
{/if}
