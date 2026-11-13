<script>
	import Image from '$lib/components/Image.svelte';
</script>

<!-- High-End Editorial Multi-column Footer -->
<footer class="relative z-10 border-t border-white/5 bg-brand-dark py-16 text-white">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12">
			<!-- Column 1: Brand -->
			<div class="flex flex-col items-start md:col-span-4">
				<a href="/" class="group mb-6 flex items-center gap-2">
					<Image
						imageClass="invert"
						src="/images/megapack-logo.svg"
						alt="МЕГАПАК"
						class="h-8 w-auto transition-transform duration-300 group-hover:scale-[0.98]"
					/>
				</a>
				<p class="max-w-xs text-sm leading-relaxed text-neutral-400">
					Промышленная разработка, крупносерийный выдув и дистрибуция промышленной полимерной тары
				</p>
				<a
					href="/about"
					class="mt-4 inline-block text-sm font-semibold text-brand-accent-light transition-colors duration-300 hover:underline"
				>
					Подробнее о нас →
				</a>
			</div>

			<!-- Column 2: Products -->
			<div class="md:col-span-3">
				<h4 class="mb-4 text-sm font-bold tracking-wider text-white uppercase">НОМЕНКЛАТУРА</h4>
				<ul class="space-y-2 text-sm text-neutral-400">
					<li>
						<a href="/catalog" class="transition-colors duration-200 hover:text-white">Бочки</a>
					</li>
					<li>
						<a href="/catalog" class="transition-colors duration-200 hover:text-white">Вёдра</a>
					</li>
					<li>
						<a href="/catalog/kanistry" class="transition-colors duration-200 hover:text-white"
							>Канистры</a
						>
					</li>
					<li>
						<a href="/catalog" class="transition-colors duration-200 hover:text-white">Тубы</a>
					</li>
					<li>
						<a href="/catalog" class="transition-colors duration-200 hover:text-white"
							>Еврокубы IBC</a
						>
					</li>
					<!-- <li>
						<a href="/catalog" class="transition-colors duration-200 hover:text-white"
							>Термочехлы и ТЭНы подогрева</a
						>
					</li> -->
				</ul>
			</div>

			<!-- Column 3: Quality -->
			<div class="md:col-span-2">
				<h4 class="mb-4 text-sm font-bold tracking-wider text-white uppercase">ИНФОРМАЦИЯ</h4>
				<ul class="space-y-2 text-sm text-neutral-400">
					<li>
						<a href="/applications" class="transition-colors duration-200 hover:text-white"
							>Применение</a
						>
					</li>
					<li>
						<a href="/specs" class="transition-colors duration-200 hover:text-white"
							>ГОСТ Нормативы</a
						>
					</li>
					<!-- <li>
						<a href="/specs" class="transition-colors duration-200 hover:text-white"
							>Контроль герметичности</a
						>
					</li> -->
				</ul>
			</div>

			<!-- Column 4: Contacts quick -->
			<div class="md:col-span-3">
				<h4 class="mb-4 text-sm font-bold tracking-wider text-white uppercase">ОФИС СБЫТА</h4>
				<ul class="space-y-2 text-sm text-neutral-400">
					<li class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4 shrink-0 text-[#e57373]"
							><path
								d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
							></path></svg
						>
						<span class="font-bold text-white">8 (499) 490-61-45</span>
					</li>
					<li class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4 shrink-0 text-[#e57373]"
							><path
								d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
							></path></svg
						>
						<span class="font-bold text-white">8 (903) 749-17-24</span>
					</li>
					<li class="flex items-center gap-2">
						<span>✉️</span> <span class="font-bold text-white">info@megapak.top</span>
					</li>
					<li class="flex items-center gap-2">
						<span>📍</span> <span>Московская область, г.Дзержинский, ул. карьер ЗИЛ, д.14</span>
					</li>
					<li class="pt-2">
						<a
							href="/contacts"
							class="inline-flex items-center gap-1 rounded bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-brand-accent-light transition-colors duration-300 hover:bg-white/10"
						>
							Открыть страницу с картой →
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Copyright & Legal -->
		<div
			class="flex flex-col items-center justify-between border-t border-white/5 pt-8 text-[11px] text-neutral-500 sm:flex-row"
		>
			<span
				>© 2026 ООО «МегаПак». Все права защищены. Производственная площадка полимерной тары в
				Дзержинском.</span
			>
			<div class="mt-4 flex items-center gap-4 sm:mt-0">
				<a href="/specs" class="hover:text-neutral-300">Техническая документация</a>
				<a href="/privacy" class="hover:text-neutral-300">Политика конфиденциальности</a>
				<a
					href="/admin"
					class="rounded-md border border-white/10 px-2.5 py-1 text-neutral-400 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
				>
					Админ
				</a>
			</div>
		</div>
	</div>
</footer>
