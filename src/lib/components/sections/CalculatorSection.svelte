<script>
	import { orderModal } from '../../modalState.svelte.js';

	// Svelte 5 Runes for Calculator State
	let selectedProduct = $state('drum');
	let selectedVolume = $state('227');
	let quantity = $state(50);
	let hasLogo = $state(false);
	let isUrgent = $state(false);
	let highDensity = $state(false);

	const productSpecs = {
		drum: {
			name: 'Пластиковые бочки',
			volumes: [
				{ val: '48', label: '48 литров (с крышкой)' },
				{ val: '127', label: '127 литров (с крышкой)' },
				{ val: '227', label: '227 литров (L-Ring / Окрытая)' }
			],
			basePrice: 1250
		},
		canister: {
			name: 'Пластиковые канистры',
			volumes: [
				{ val: '5', label: '5 литров (евро-стандарт)' },
				{ val: '10', label: '10 литров (штабелируемая)' },
				{ val: '20', label: '20 литров (усиленная)' },
				{ val: '31.5', label: '31.5 литр (макс-объем)' }
			],
			basePrice: 220
		},
		eurocube: {
			name: 'Еврокубы IBC',
			volumes: [
				{ val: '1000-wood', label: '1000 л (деревянный поддон, б/у)' },
				{ val: '1000-metal', label: '1000 л (металлический поддон, новый)' },
				{ val: '1000-heat', label: '1000 л (с подогревом / тэном)' }
			],
			basePrice: 14500
		}
	};

	// Reset volume when product changes
	$effect(() => {
		selectedVolume = productSpecs[selectedProduct].volumes[0].val;
	});

	let currentProductInfo = $derived(productSpecs[selectedProduct]);
	let baseUnitPrice = $derived(currentProductInfo.basePrice);

	let unitPrice = $derived.by(() => {
		let price = baseUnitPrice;
		if (selectedProduct === 'drum' && selectedVolume === '227') price += 400;
		if (selectedProduct === 'drum' && selectedVolume === '127') price += 150;
		if (selectedProduct === 'canister' && selectedVolume === '20') price += 80;
		if (selectedProduct === 'canister' && selectedVolume === '31.5') price += 140;
		if (selectedProduct === 'eurocube' && selectedVolume === '1000-metal') price += 6000;
		if (selectedProduct === 'eurocube' && selectedVolume === '1000-heat') price += 18000;
		if (hasLogo) price += selectedProduct === 'canister' ? 15 : 90;
		if (highDensity) price *= 1.15;
		return Math.round(price);
	});

	let volumeDiscount = $derived.by(() => {
		if (quantity >= 500) return 0.15;
		if (quantity >= 200) return 0.1;
		if (quantity >= 50) return 0.05;
		return 0;
	});

	let totalDiscountAmount = $derived(Math.round(unitPrice * quantity * volumeDiscount));

	let totalPrice = $derived.by(() => {
		let total = unitPrice * quantity;
		if (isUrgent) total += 5000;
		return Math.round(total - totalDiscountAmount);
	});

	let totalLiters = $derived.by(() => {
		let volNum = parseFloat(selectedVolume) || 1000;
		return Math.round(volNum * quantity);
	});

	let calculatedSpec = $derived(`Заказ тары через калькулятор:\n- Тип: ${currentProductInfo.name}\n- Объем/Параметры: ${selectedVolume} л\n- Количество: ${quantity} шт.\n- Логотип компании: ${hasLogo ? 'Да' : 'Нет'}\n- Повышенная плотность: ${highDensity ? 'Да' : 'Нет'}\n- Срочная отгрузка: ${isUrgent ? 'Да' : 'Нет'}\n- Общий литраж: ${totalLiters.toLocaleString()} л\n- Предварительная стоимость (с НДС): ${totalPrice.toLocaleString()} ₽`);
</script>

<!-- Interactive B2B Custom Quote Calculator Section -->
<section id="calculator" class="border-y border-brand-divider bg-white/40 py-24">
	<div class="mx-auto max-w-[1440px] px-4">
		<div class="reveal-on-scroll mb-16 flex flex-col items-center text-center">
			<span
				class="mb-4 rounded-full border border-brand-divider bg-neutral-100 px-3 py-1 text-[9px] font-bold tracking-widest text-brand-gray uppercase"
				>Интерактивный расчет</span
			>
			<h2 class="font-serif text-3xl font-light tracking-tight text-brand-dark md:text-5xl">
				Сконфигурируйте <span class="italic">ваш заказ</span>
			</h2>
			<p class="mt-4 max-w-xl text-sm leading-relaxed text-brand-gray">
				Задайте тип тары, требуемый объем, количество изделий и дополнительные B2B опции для
				моментального предварительного расчета стоимости с НДС.
			</p>
		</div>

		<div class="reveal-on-scroll grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
			<!-- Calculator Controls (Left - col-span-7) -->
			<div class="double-bezel lg:col-span-7">
				<div class="double-bezel-inner flex h-full flex-col justify-between p-8">
					<div class="space-y-6">
						<!-- 1. Product selection -->
						<div>
							<span
								class="mb-3 block text-[10px] font-bold tracking-wider text-brand-dark uppercase"
								>1. Тип полимерной тары</span
							>
							<div class="grid grid-cols-3 gap-3">
								{#each [{ id: 'drum', label: 'Бочка', icon: '🛢️' }, { id: 'canister', label: 'Канистра', icon: '🎴' }, { id: 'eurocube', label: 'Еврокуб', icon: '📦' }] as prod}
									<button
										type="button"
										onclick={() => (selectedProduct = prod.id)}
										class="flex flex-col items-center justify-center rounded-xl border p-3 text-xs font-semibold transition-all duration-300 {selectedProduct ===
										prod.id
											? 'border-brand-accent bg-brand-accent-light/30 text-brand-accent shadow-sm'
											: 'border-brand-divider bg-white text-brand-dark hover:bg-neutral-50'}"
									>
										<span class="mb-1 text-lg">{prod.icon}</span>
										<span>{prod.label}</span>
									</button>
								{/each}
							</div>
						</div>

						<!-- 2. Volume selection -->
						<div>
							<label
								for="volume-select"
								class="mb-3 block text-[10px] font-bold tracking-wider text-brand-dark uppercase"
								>2. Объем и характеристики</label
							>
							<select
								id="volume-select"
								bind:value={selectedVolume}
								class="w-full rounded-xl border border-brand-divider bg-white px-4 py-3 text-xs font-semibold text-brand-dark focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none"
							>
								{#each currentProductInfo.volumes as vol}
									<option value={vol.val}>{vol.label}</option>
								{/each}
							</select>
						</div>

						<!-- 3. Quantity -->
						<div>
							<div class="mb-3 flex items-center justify-between">
								<label
									for="quantity-range"
									class="text-[10px] font-bold tracking-wider text-brand-dark uppercase"
									>3. Объем партии (штук)</label
								>
								<div class="flex items-center gap-2">
									<input
										type="number"
										bind:value={quantity}
										min="1"
										max="10000"
										class="w-20 rounded-lg border border-brand-divider bg-neutral-100 px-2 py-1 text-center font-mono text-xs font-bold focus:border-brand-accent focus:outline-none"
									/>
									<span class="text-[10px] text-brand-gray">шт.</span>
								</div>
							</div>
							<input
								id="quantity-range"
								type="range"
								bind:value={quantity}
								min="5"
								max="1000"
								step="5"
								class="h-1 w-full cursor-pointer appearance-none rounded-lg bg-brand-divider accent-brand-dark"
							/>
							<div class="mt-2 flex justify-between font-mono text-[9px] text-brand-gray">
								<span>5 шт. (мин)</span>
								<span>100 шт. (скидка 5%)</span>
								<span>200 шт. (скидка 10%)</span>
								<span>500+ шт. (скидка 15%)</span>
							</div>
						</div>

						<!-- 4. Additional options -->
						<div class="border-t border-brand-divider pt-4">
							<span
								class="mb-3 block text-[10px] font-bold tracking-wider text-brand-dark uppercase"
								>4. Дополнительные требования</span
							>
							<div class="space-y-3">
								<label class="group flex cursor-pointer items-center gap-3">
									<input
										type="checkbox"
										bind:checked={hasLogo}
										class="h-4 w-4 rounded border-brand-divider text-brand-accent focus:ring-brand-accent"
									/>
									<div class="flex flex-col">
										<span
											class="text-xs font-semibold text-brand-dark transition-colors duration-200 group-hover:text-brand-accent"
											>Нанесение логотипа компании</span
										>
										<span class="text-[11px] text-brand-gray"
											>Фирменное брендирование на корпусе изделий</span
										>
									</div>
								</label>

								<label class="group flex cursor-pointer items-center gap-3">
									<input
										type="checkbox"
										bind:checked={highDensity}
										class="h-4 w-4 rounded border-brand-divider text-brand-accent focus:ring-brand-accent"
									/>
									<div class="flex flex-col">
										<span
											class="text-xs font-semibold text-brand-dark transition-colors duration-200 group-hover:text-brand-accent"
											>Повышенная плотность стенок (+15%)</span
										>
										<span class="text-[11px] text-brand-gray"
											>Для особо агрессивных и тяжелых химических веществ</span
										>
									</div>
								</label>

								<label class="group flex cursor-pointer items-center gap-3">
									<input
										type="checkbox"
										bind:checked={isUrgent}
										class="h-4 w-4 rounded border-brand-divider text-brand-accent focus:ring-brand-accent"
									/>
									<div class="flex flex-col">
										<span
											class="text-xs font-semibold text-brand-dark transition-colors duration-200 group-hover:text-brand-accent"
											>Срочная отгрузка (в течение 24 часов)</span
										>
										<span class="text-[11px] text-brand-gray"
											>Приоритетная комплектация на складе в Москве</span
										>
									</div>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Calculator Summary & Results (Right - col-span-5) -->
			<div class="double-bezel lg:col-span-5">
				<div
					class="double-bezel-inner relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-brand-dark p-8 text-white"
				>
					<!-- Graphic backdrop lines -->
					<div
						class="pointer-events-none absolute inset-0 opacity-[0.03]"
						style="background-image: radial-gradient(var(--color-brand-bg) 1px, transparent 1px); background-size: 20px 20px;"
					></div>

					<div class="relative z-10">
						<span
							class="mb-2 block font-mono text-[8px] tracking-widest text-brand-accent uppercase"
							>B2B QUOTATION ESTIMATE</span
						>
						<h3 class="mb-6 font-serif text-xl font-light">Спецификация партии</h3>

						<div class="mb-6 space-y-4 border-b border-white/10 pb-6 font-mono text-xs">
							<div class="flex justify-between">
								<span class="text-neutral-400">Изделие:</span>
								<span class="font-bold text-white">{currentProductInfo.name}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-neutral-400">Объем / Специфика:</span>
								<span class="font-bold text-white">{selectedVolume} л</span>
							</div>
							<div class="flex justify-between">
								<span class="text-neutral-400">Количество:</span>
								<span class="font-bold text-white">{quantity} шт.</span>
							</div>
							<div class="flex justify-between">
								<span class="text-neutral-400">Общий литраж партии:</span>
								<span class="font-bold text-emerald-400">{totalLiters.toLocaleString()} л</span>
							</div>
							<div class="flex justify-between">
								<span class="text-neutral-400">Цена за единицу:</span>
								<span class="font-bold text-white">{unitPrice} ₽</span>
							</div>
							{#if volumeDiscount > 0}
								<div class="flex justify-between">
									<span class="text-brand-accent">Скидка за объем ({volumeDiscount * 100}%):</span>
									<span class="font-bold text-brand-accent"
										>-{totalDiscountAmount.toLocaleString()} ₽</span
									>
								</div>
							{/if}
							{#if isUrgent}
								<div class="flex justify-between">
									<span class="text-amber-400">Срочная сборка:</span>
									<span class="font-bold text-amber-400">+5 000 ₽</span>
								</div>
							{/if}
						</div>
					</div>

					<div class="relative z-10 pt-4">
						<span class="mb-1 block text-[9px] tracking-wider text-neutral-400 uppercase"
							>Предварительный итог (с НДС)</span
						>
						<div class="mb-8 flex items-baseline gap-2">
							<span class="font-serif text-4xl font-light text-white md:text-5xl"
								>{totalPrice.toLocaleString()}</span
							>
							<span class="font-mono text-sm text-neutral-300">₽</span>
						</div>

						<button
							onclick={() => orderModal.open(calculatedSpec)}
							class="group flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-xs font-bold tracking-wider text-brand-dark uppercase transition-all duration-300 hover:bg-neutral-100 active:scale-[0.98] cursor-pointer"
						>
							<span>Отправить заявку</span>
							<span
								class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark/5 transition-transform duration-500 group-hover:translate-x-1"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2.5"
									stroke="currentColor"
									class="h-3 w-3 text-brand-dark"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
									/>
								</svg>
							</span>
						</button>
						<span class="mt-3 block text-center text-[8px] leading-relaxed text-neutral-500">
							Указана предварительная цена. Окончательная стоимость зависит от адреса доставки и
							условий оплаты.
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
