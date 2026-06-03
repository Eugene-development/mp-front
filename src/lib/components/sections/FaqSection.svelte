<script>
	let activeFaq = $state(null);

	const faqs = [
		{
			q: 'Каков минимальный объем оптового заказа?',
			a: 'Минимальный объем для заказа канистр составляет 100 штук, для бочек — 20 штук, для еврокубов — от 2 штук. Для постоянных партнеров возможны индивидуальные условия отгрузки.'
		},
		{
			q: 'Сертифицирована ли продукция для опасных грузов?',
			a: 'Да, наши новые пластиковые бочки (227 л) и еврокубы имеют официальный международный сертификат UN (ООН), разрешающий транспортировку и хранение химических, едких и опасных веществ групп I, II и III.'
		},
		{
			q: 'Предоставляете ли вы б/у тару и насколько она безопасна?',
			a: 'Мы поставляем прошедшую профессиональную промышленную подготовку (промывку, пропаривание и проверку на герметичность) тару. Б/у еврокубы и бочки идеально подходят для технических жидкостей, дизельного топлива, септиков и полива.'
		},
		{
			q: 'Как организована доставка продукции?',
			a: 'Компания МегаПак располагает собственным грузовым автопарком для оперативной доставки по Москве и Московской области. В регионы России доставка осуществляется через проверенные транспортные компании.'
		},
		{
			q: 'Возможно ли изготовление тары с логотипом компании?',
			a: 'Да, мы выполняем брендирование пластиковой тары: нанесение рельефного логотипа на канистры в процессе выдува, либо высококачественную трафаретную печать (шелкографию) на бочки и еврокубы.'
		}
	];

	function toggleFaq(index) {
		activeFaq = activeFaq === index ? null : index;
	}
</script>

<!-- FAQ Accordion Section -->
<section id="faq" class="mx-auto max-w-[1000px] px-4 py-24">
	<div class="reveal-on-scroll mb-16 flex flex-col items-center text-center">
		<span
			class="mb-4 rounded-full border border-brand-divider bg-neutral-100 px-3 py-1 text-[9px] font-bold tracking-widest text-brand-gray uppercase"
			>FAQ</span
		>
		<h2 class="font-serif text-3xl font-light tracking-tight text-brand-dark md:text-5xl">
			Ответы на ваши вопросы
		</h2>
		<p class="mt-4 max-w-lg text-xs leading-relaxed text-brand-gray">
			Подробная информация о работе компании МегаПак, условиях поставок по безналичному расчету и
			техническому сопровождению тары.
		</p>
	</div>

	<!-- Accordion list (Flat editorial style) -->
	<div class="reveal-on-scroll space-y-2 border-t border-brand-divider">
		{#each faqs as faq, i}
			<div class="border-b border-brand-divider">
				<button
					type="button"
					onclick={() => toggleFaq(i)}
					class="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
				>
					<span
						class="text-xs font-semibold text-brand-dark transition-colors duration-200 group-hover:text-brand-accent md:text-sm"
						>{faq.q}</span
					>
					<span
						class="flex h-6 w-6 items-center justify-center font-mono text-base text-brand-gray transition-transform duration-300 {activeFaq ===
						i
							? 'rotate-45 text-brand-accent'
							: ''}"
					>
						＋
					</span>
				</button>

				<!-- Expandable answer container with transition -->
				<div
					class="overflow-hidden transition-all duration-500 ease-spring"
					style="max-height: {activeFaq === i ? '160px' : '0px'}"
				>
					<div class="max-w-3xl pb-6 text-sm leading-relaxed text-brand-gray">
						{faq.a}
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
