<section
	id="home"
	class="relative w-full overflow-hidden"
>
	<!-- Background abstract lines -->
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<svg
			class="absolute top-1/2 left-1/2 h-[1000px] w-[1600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] md:opacity-[0.09]"
			viewBox="0 0 1600 1000"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<!-- Set 1: Wave flow (brand accent color) -->
			<path d="M -100,200 C 300,100 500,600 800,450 C 1100,300 1200,700 1700,500" stroke="var(--color-brand-accent)" stroke-width="1.25" />
			<path d="M -100,230 C 300,130 500,630 800,480 C 1100,330 1200,730 1700,530" stroke="var(--color-brand-accent)" stroke-width="0.75" stroke-dasharray="4 4" />
			<path d="M -100,260 C 300,160 500,660 800,510 C 1100,360 1200,760 1700,560" stroke="var(--color-brand-accent)" stroke-width="1" />
			<path d="M -100,290 C 300,190 500,690 800,540 C 1100,390 1200,790 1700,590" stroke="var(--color-brand-accent)" stroke-width="0.5" />
			<path d="M -100,320 C 300,220 500,720 800,570 C 1100,420 1200,820 1700,620" stroke="var(--color-brand-accent)" stroke-width="0.75" stroke-dasharray="8 4" />

			<!-- Set 2: Secondary wave flow crossing/complementing (brand dark color) -->
			<path d="M -100,700 C 400,650 500,150 900,200 C 1300,250 1250,50 1700,-50" stroke="var(--color-brand-dark)" stroke-width="1" />
			<path d="M -100,730 C 400,680 500,180 900,230 C 1300,280 1250,80 1700,-20" stroke="var(--color-brand-dark)" stroke-width="0.5" stroke-dasharray="6 3" />
			<path d="M -100,760 C 400,710 500,210 900,260 C 1300,310 1250,110 1700,10" stroke="var(--color-brand-dark)" stroke-width="0.75" />
			<path d="M -100,790 C 400,740 500,240 900,290 C 1300,340 1250,140 1700,40" stroke="var(--color-brand-dark)" stroke-width="0.5" />

			<!-- Set 3: Diagonal geometric grid lines / thin rays representing structure -->
			<line x1="-100" y1="100" x2="1700" y2="700" stroke="var(--color-brand-divider)" stroke-width="0.75" />
			<line x1="-100" y1="150" x2="1700" y2="750" stroke="var(--color-brand-divider)" stroke-width="0.5" />
			<line x1="-100" y1="200" x2="1700" y2="800" stroke="var(--color-brand-divider)" stroke-width="0.75" stroke-dasharray="12 6" />
			<line x1="-100" y1="250" x2="1700" y2="850" stroke="var(--color-brand-divider)" stroke-width="0.5" />

			<line x1="1700" y1="100" x2="-100" y2="700" stroke="var(--color-brand-divider)" stroke-width="0.75" />
			<line x1="1700" y1="150" x2="-100" y2="750" stroke="var(--color-brand-divider)" stroke-width="0.5" />
		</svg>
	</div>
	<div class="mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-center px-4 pt-32 pb-20 md:pt-40">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
		<!-- Left column text -->
		<div class="flex flex-col items-start text-left lg:col-span-6">
			<div
				class="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-accent/15 bg-brand-accent-light/50 px-3 py-1"
			>
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent"></span>
				<span class="text-[10px] font-semibold tracking-widest text-brand-accent uppercase"
					>Сертификация ГОСТ</span
				>
			</div>

			<h1
				class="mb-6 animate-fade-up font-serif text-5xl leading-[1.05] font-light tracking-tight text-brand-dark md:text-7xl"
				style="animation-delay: 100ms;"
			>
				Сверхпрочная <br />
				<span class="font-normal text-brand-accent italic">полимерная тара</span>
			</h1>

			<p
				class="mb-8 max-w-xl animate-fade-up text-sm leading-relaxed text-brand-gray md:text-base"
				style="animation-delay: 200ms;"
			>
				ООО «МегаПак» — производство и прямые поставки сертифицированной упаковки высшего класса
				герметичности. Канистры, бочки и еврокубы для хранения нефтехимии, масел и пищевых сред.
			</p>

			<div class="flex animate-fade-up flex-wrap gap-4" style="animation-delay: 300ms;">
				<a
					href="#calculator"
					class="group flex items-center gap-3 rounded-xl bg-brand-dark px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
				>
					<span>Сформировать заказ</span>
					<span
						class="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="h-3 w-3 text-white"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</span>
				</a>
				<a
					href="#catalog"
					class="hidden md:inline-block rounded-xl border border-brand-divider px-6 py-3.5 text-xs font-bold tracking-wider text-brand-dark uppercase transition-all duration-300 hover:border-brand-gray/30 hover:bg-neutral-50"
				>
					Смотреть каталог
				</a>
			</div>

			<!-- Visual trust metrics -->
			<div
				class="mt-16 grid w-full max-w-lg animate-fade-up grid-cols-3 gap-6 border-t border-brand-divider pt-8"
				style="animation-delay: 400ms;"
			>
				<div class="flex flex-col">
					<span class="font-serif text-2xl font-light text-brand-dark">15+</span>
					<span class="mt-1 text-[9px] tracking-wider text-brand-gray uppercase">Лет на рынке</span>
				</div>
				<div class="flex flex-col">
					<span class="font-serif text-2xl font-light text-brand-dark">100%</span>
					<span class="mt-1 text-[9px] tracking-wider text-brand-gray uppercase">Контроль брака</span>
				</div>
				<div class="flex flex-col">
					<span class="font-serif text-2xl font-light text-brand-dark">&lt; 24 ч</span>
					<span class="mt-1 text-[9px] tracking-wider text-brand-gray uppercase"
						>Отгрузка со склада</span
					>
				</div>
			</div>
		</div>

		<!-- Right column visual with double-bezel and clean graphics -->
		<div
			class="flex animate-fade-up items-center justify-center lg:col-span-6"
			style="animation-delay: 200ms;"
		>
			<div class="double-bezel w-full max-w-2xl">
				<div
					class="double-bezel-inner relative flex h-[600px] flex-col justify-between overflow-hidden p-8"
				>
					<!-- Technical grid pattern behind -->
					<div
						class="pointer-events-none absolute inset-0 opacity-[0.02]"
						style="background-image: radial-gradient(var(--color-brand-dark) 1px, transparent 1px); background-size: 16px 16px;"
					></div>

					<!-- Header card info -->
					<div class="relative z-10 flex items-start justify-between">
						<div class="flex flex-col">
							<span class="text-[9px] font-bold tracking-widest text-brand-accent uppercase"
								>Лидер продаж</span
							>
							<h3 class="mt-1 font-serif text-lg font-light text-brand-dark">
								Еврокуб IBC 1000L
							</h3>
						</div>
						<span
							class="rounded border border-brand-divider bg-neutral-100 px-2 py-0.5 font-mono text-[8px] tracking-wider text-brand-dark uppercase"
							>UN CLASS 31HA1/Y</span
						>
					</div>

					<!-- Centered main product graphics -->
					<div class="relative z-10 flex h-full max-h-[420px] items-center justify-center py-6">
						<img
							src="/images/megapak_eurocube.png"
							alt="Еврокуб МегаПак"
							class="h-full max-h-[380px] object-contain drop-shadow-xl transition-transform duration-700 ease-spring hover:scale-105"
						/>
					</div>

					<!-- Structural technical parameters list -->
					<div class="relative z-10 grid grid-cols-2 gap-4 border-t border-brand-divider pt-4">
						<div class="flex items-center gap-2">
							<span class="h-1.5 w-1.5 rounded-full bg-brand-accent"></span>
							<div class="flex flex-col">
								<span class="text-[8px] tracking-wider text-brand-gray uppercase">Материал колбы</span>
								<span class="text-[10px] font-semibold text-brand-dark">HDPE (ПНД первичный)</span>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
							<div class="flex flex-col">
								<span class="text-[8px] tracking-wider text-brand-gray uppercase">Поддоны</span>
								<span class="text-[10px] font-semibold text-brand-dark">Металл, дерево, пластик</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
