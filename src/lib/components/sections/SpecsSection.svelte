<!-- Technical Standards Section -->
<section id="specs" class="mx-auto max-w-[1440px] px-4 py-24">
	<div class="reveal-on-scroll grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
		<div class="lg:col-span-5">
			<span
				class="mb-4 inline-block rounded-full border border-brand-divider bg-neutral-100 px-3 py-1 text-[9px] font-bold tracking-widest text-brand-gray uppercase"
				>Контроль качества</span
			>
			<h2
				class="font-serif text-3xl leading-tight font-light tracking-tight text-brand-dark md:text-5xl"
			>
				Стандарты герметичности <br />
				<span class="font-normal text-brand-accent italic">и безопасности</span>
			</h2>
			<p class="mt-6 text-sm leading-relaxed text-brand-gray">
				Промышленное использование емкостей МегаПак исключает риски утечек, порчи сырья или
				несоответствия экологическим протоколам. Мы гарантируем паспортное соответствие сырья и
				жесткий выходной контроль каждой партии.
			</p>

			<div class="mt-8 space-y-4">
				{#each ['Сертификаты соответствия ГОСТ Р и санитарно-эпидемиологические заключения.', 'Сырье — исключительно первичный сшитый полиэтилен высокого давления марки Lupolen.', 'Инспекционный контроль сварных швов и герметичности горловины под избыточным давлением.'] as point}
					<div class="flex items-start gap-2.5">
						<span
							class="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent-light text-[9px] font-bold text-brand-accent"
							>✓</span
						>
						<span class="text-sm text-brand-dark">{point}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="lg:col-span-7">
			<div class="double-bezel">
				<div
					class="double-bezel-inner relative overflow-hidden rounded-2xl bg-neutral-900 p-8 text-white"
				>
					<!-- Matrix table for structural engineering quality -->
					<span
						class="mb-4 block font-mono text-[8px] tracking-widest text-brand-accent uppercase"
						>ENGINEERING PROTOCOL DATA</span
					>
					<h3 class="mb-6 font-serif text-lg font-light text-white">
						Технические нормативы тары МегаПак
					</h3>

					<div class="space-y-4 font-mono text-[10px]">
						<div class="flex justify-between border-b border-white/5 py-2">
							<span class="text-neutral-400">ПОКАЗАТЕЛЬ / ТЕСТ</span>
							<span class="text-neutral-400">НОРМА ГОСТ / UN</span>
							<span class="font-bold text-white">ПОКАЗАТЕЛИ МЕГАПАК</span>
						</div>
						<div class="flex justify-between border-b border-white/5 py-2">
							<span class="text-neutral-400">Устойчивость к падению (высота)</span>
							<span class="text-neutral-400">1.2 м (для класса II)</span>
							<span class="font-bold text-emerald-400">1.8 м (Сертификат пройден)</span>
						</div>
						<div class="flex justify-between border-b border-white/5 py-2">
							<span class="text-neutral-400">Гидравлическое давление (тест)</span>
							<span class="text-neutral-400">100 кПа / 30 мин</span>
							<span class="font-bold text-emerald-400">150 кПа / 60 мин без деформаций</span>
						</div>
						<div class="flex justify-between border-b border-white/5 py-2">
							<span class="text-neutral-400">Сопротивление сжатию при штабелировании</span>
							<span class="text-neutral-400">ГОСТ 25014-81 (3 уровня)</span>
							<span class="font-bold text-emerald-400">До 4 уровней (канистры и бочки)</span>
						</div>
						<div class="flex justify-between py-2">
							<span class="text-neutral-400">Диапазон рабочих температур</span>
							<span class="text-neutral-400">-30°C ... +60°C</span>
							<span class="font-bold text-emerald-400">-40°C ... +80°C (спецполимер)</span>
						</div>
					</div>

					<!-- KBD visual shortcut UI element -->
					<div class="mt-8 flex items-center gap-3 border-t border-white/5 pt-6">
						<span class="text-[9px] text-neutral-400">Быстрый выгруз паспортов:</span>
						<kbd
							class="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9px] text-neutral-300"
							>Shift</kbd
						>
						<span class="text-[9px] text-neutral-500">+</span>
						<kbd
							class="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9px] text-neutral-300"
							>D</kbd
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
