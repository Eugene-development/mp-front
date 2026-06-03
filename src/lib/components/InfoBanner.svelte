<script>
	let visible = $state(true);
</script>

{#if visible}
	<div class="fixed inset-x-0 top-0 z-[60] flex justify-center px-4">
		<div
			class="flex w-full max-w-7xl items-center justify-between gap-4 rounded-b-2xl border border-t-0 border-white/5 bg-brand-dark px-6 py-2 text-white shadow-lg"
		>
			<!-- Left: phone numbers -->
			<div class="hidden items-center gap-6 sm:flex">
				<a
					href="tel:+78994906145"
					class="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-neutral-300 transition-colors duration-200 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-3 w-3 text-brand-accent"
					>
						<path
							fill-rule="evenodd"
							d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
							clip-rule="evenodd"
						/>
					</svg>
					8 (903) 749-17-24
				</a>
				<a
					href="tel:+74994906145"
					class="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-neutral-300 transition-colors duration-200 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-3 w-3 text-brand-accent"
					>
						<path
							fill-rule="evenodd"
							d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
							clip-rule="evenodd"
						/>
					</svg>
					8 (499) 490-61-45
				</a>
			</div>

			<!-- Center: working hours -->
			<div class="flex items-center gap-1.5 text-[11px] text-neutral-400">
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
				<span>Пн–Пт &nbsp;9:00 — 18:00 МСК</span>
			</div>

			<!-- Right: email + close -->
			<div class="flex items-center gap-4">
				<a
					href="mailto:zakaz@megapaks.ru"
					class="hidden items-center gap-1.5 font-mono text-[11px] tracking-wide text-neutral-300 transition-colors duration-200 hover:text-white sm:flex"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-3 w-3 text-brand-accent"
					>
						<path
							d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
						/>
						<path
							d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
						/>
					</svg>
					zakaz@megapaks.ru
				</a>
				<button
					type="button"
					onclick={() => (visible = false)}
					aria-label="Закрыть баннер"
					class="flex h-5 w-5 items-center justify-center rounded text-neutral-500 transition-colors duration-200 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="h-3 w-3"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}
