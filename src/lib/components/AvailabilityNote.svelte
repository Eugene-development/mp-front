<script>
	/**
	 * Небольшая информационная карточка для hero-блока: наличие на складе и
	 * минимальный объём партии уточняйте у менеджеров отдела сбыта.
	 */
</script>

<div class="w-full rounded-2xl border border-brand-divider/50 bg-brand-bg/60 p-6 shadow-sm sm:p-8">
	<div class="mb-5 flex items-center gap-3">
		<span
			class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent-light text-brand-accent"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.6"
				stroke="currentColor"
				class="h-5 w-5"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
				/>
			</svg>
		</span>
		<span class="font-mono text-[12px] tracking-widest text-brand-accent uppercase">
			Обратите внимание
		</span>
	</div>

	<h3 class="font-serif text-2xl leading-snug font-light text-brand-dark">
		Уточняйте у менеджера
	</h3>

	<p class="mt-3 text-sm leading-relaxed text-brand-gray">
		Актуальные складские остатки, наличие очереди на отгрузку и минимальный объём партии.
	</p>

	<ul class="mt-5 space-y-2 border-t border-brand-divider pt-4">
		<li class="flex items-center gap-2.5 text-sm text-brand-dark">
			<span class="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent"></span>
			Наличие на продукции на складе
		</li>
		<li class="flex items-center gap-2.5 text-sm text-brand-dark">
			<span class="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent"></span>
			Минимальная партия закупки
		</li>
		<li class="flex items-center gap-2.5 text-sm text-brand-dark">
			<span class="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent"></span>
			Наличие очереди на загрузку
		</li>
	</ul>
</div>
