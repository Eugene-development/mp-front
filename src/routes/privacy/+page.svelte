<script>
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title>Политика конфиденциальности — ООО «МегаПак»</title>
	<meta
		name="description"
		content="Политика в отношении обработки и защиты персональных данных клиентов и пользователей сайта компании ООО «МегаПак»."
	/>
	<meta
		name="keywords"
		content="политика конфиденциальности, персональные данные, согласие на обработку, мегапак"
	/>
</svelte:head>

<!-- Background Ambient Lighting -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div
		class="absolute top-[10%] left-[20%] h-[55vw] w-[55vw] animate-ambient-slow rounded-full bg-brand-accent-light/10 blur-[130px]"
	></div>
	<div
		class="absolute right-[10%] bottom-[10%] h-[50vw] w-[50vw] rounded-full bg-amber-500/5 blur-[120px]"
		style="animation-delay: -4s;"
	></div>
</div>

<main class="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 md:pt-36">
	<!-- Breadcrumbs and Header -->
	<div class="mb-12">
		<Breadcrumbs items={[{ name: 'Политика конфиденциальности' }]} />
		<h1
			class="font-serif text-4xl leading-tight font-light tracking-tight text-brand-dark md:text-6xl"
		>
			Политика <br />
			<span class="font-normal text-brand-accent italic">конфиденциальности</span>
		</h1>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-gray">
			Настоящий документ определяет политику ООО «МегаПак» в отношении обработки персональных данных
			и содержит сведения о реализуемых требованиях к защите персональных данных в соответствии с
			законодательством РФ.
		</p>
	</div>

	<!-- Main grid layout -->
	<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
		<!-- Left: Policy Content (col-span-8) -->
		<div class="lg:col-span-8">
			<div class="double-bezel">
				<div class="double-bezel-inner p-6 sm:p-10">
					<article
						class="prose max-w-none space-y-6 text-sm leading-relaxed text-brand-gray prose-neutral"
					>
						<section>
							<h2 class="mb-4 font-serif text-xl font-semibold text-brand-dark">
								1. Общие положения
							</h2>
							<p>
								Настоящая Политика конфиденциальности составлена в соответствии с требованиями
								Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет
								порядок обработки персональных данных и меры по обеспечению безопасности
								персональных данных, предпринимаемые ООО «МегаПак» (далее — Оператор).
							</p>
							<p>
								Оператор ставит своей важнейшей целью и условием осуществления своей деятельности
								соблюдение прав и свобод человека и гражданина при обработке его персональных
								данных, в том числе защиты прав на неприкосновенность частной жизни, личную и
								семейную тайну.
							</p>
						</section>

						<section class="border-t border-brand-divider pt-6">
							<h2 class="mb-4 font-serif text-xl font-semibold text-brand-dark">
								2. Состав собираемых данных
							</h2>
							<p>Оператор может обрабатывать следующие персональные данные Пользователя:</p>
							<ul class="list-disc space-y-2 pl-5">
								<li>Фамилия, имя, отчество;</li>
								<li>Номер телефона;</li>
								<li>Адрес электронной почты (E-mail);</li>
								<li>Название организации (для B2B-клиентов);</li>
								<li>
									Обезличенные данные о посетителях (в т.ч. файлы «cookie») с помощью сервисов
									интернет-статистики (Яндекс Метрика и др.).
								</li>
							</ul>
						</section>

						<section class="border-t border-brand-divider pt-6">
							<h2 class="mb-4 font-serif text-xl font-semibold text-brand-dark">
								3. Цели обработки данных
							</h2>
							<p>Персональные данные Пользователя обрабатываются в целях:</p>
							<ul class="list-disc space-y-2 pl-5">
								<li>
									Предоставления доступа Пользователю к сервисам, информации и/или материалам,
									содержащимся на веб-сайте;
								</li>
								<li>
									Обработки входящих запросов на коммерческие предложения, выставление счетов с НДС,
									предоставление спецификаций и паспортов качества;
								</li>
								<li>
									Установления с Пользователем обратной связи, включая направление уведомлений,
									запросов, касающихся использования сайта и оказания услуг.
								</li>
							</ul>
						</section>

						<section class="border-t border-brand-divider pt-6">
							<h2 class="mb-4 font-serif text-xl font-semibold text-brand-dark">
								4. Правовые основания обработки
							</h2>
							<p>
								Оператор обрабатывает персональные данные Пользователя только в случае их заполнения
								и/или отправки Пользователем самостоятельно через специальные формы, расположенные
								на сайте. Заполняя соответствующие формы и/или отправляя свои персональные данные
								Оператору, Пользователь выражает свое согласие с данной Политикой.
							</p>
						</section>

						<section class="border-t border-brand-divider pt-6">
							<h2 class="mb-4 font-serif text-xl font-semibold text-brand-dark">
								5. Безопасность и конфиденциальность
							</h2>
							<p>
								Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается
								путем реализации правовых, организационных и технических мер, необходимых для
								выполнения в полном объеме требований действующего законодательства в области защиты
								персональных данных.
							</p>
							<p>
								Оператор обеспечивает сохранность персональных данных и принимает все возможные
								меры, исключающие доступ к персональным данным неуполномоченных лиц. Персональные
								данные Пользователя ни при каких условиях не будут переданы третьим лицам, за
								исключением случаев, связанных с исполнением действующего законодательства.
							</p>
						</section>

						<section class="border-t border-brand-divider pt-6">
							<h2 class="mb-4 font-serif text-xl font-semibold text-brand-dark">
								6. Заключительные положения
							</h2>
							<p>
								Пользователь может получить любые разъяснения по интересующим вопросам, касающимся
								обработки его персональных данных, обратившись к Оператору с помощью электронной
								почты <a href="mailto:info@megapak.top" class="text-brand-accent hover:underline"
									>info@megapak.top</a
								>.
							</p>
							<p>
								Настоящий документ действует бессрочно до замены его новой версией. Актуальная
								версия Политики в свободном доступе расположена в сети Интернет по адресу <a
									href="/privacy"
									class="text-brand-accent hover:underline">/privacy</a
								>.
							</p>
						</section>
					</article>
				</div>
			</div>
		</div>

		<!-- Right: Document Meta Info Sidebar (col-span-4) -->
		<div class="flex flex-col gap-6 lg:col-span-4">
			<div class="double-bezel">
				<div class="double-bezel-inner space-y-6 p-6 sm:p-8">
					<h3
						class="border-b border-brand-divider pb-3 font-serif text-xl font-light text-brand-dark"
					>
						Сведения о документе
					</h3>

					<div class="space-y-4 text-xs">
						<div class="flex justify-between">
							<span class="text-brand-gray">Статус:</span>
							<span class="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600"
								>Действует</span
							>
						</div>
						<div class="flex justify-between">
							<span class="text-brand-gray">Редакция от:</span>
							<span class="font-semibold text-brand-dark">18 июня 2026 г.</span>
						</div>
						<div class="flex justify-between">
							<span class="text-brand-gray">Компания:</span>
							<span class="font-semibold text-brand-dark">ООО «МегаПак»</span>
						</div>
						<div class="flex justify-between">
							<span class="text-brand-gray">ИНН:</span>
							<span class="font-mono text-brand-dark">7723912480</span>
						</div>
					</div>

					<div class="space-y-4 border-t border-brand-divider pt-6">
						<h4 class="text-xs font-bold tracking-wider text-brand-dark uppercase">
							Запросы по данным
						</h4>
						<p class="text-xs leading-relaxed text-brand-gray">
							По вопросам изменения, удаления или уточнения ваших персональных данных пишите на
							официальную почту службы безопасности:
						</p>
						<a
							href="mailto:info@megapak.top"
							class="block rounded-xl bg-brand-dark px-4 py-3 text-center text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
						>
							info@megapak.top
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
