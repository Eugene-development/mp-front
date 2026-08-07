<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import InfoBanner from '$lib/components/InfoBanner.svelte';
	import ContactsModal from '$lib/components/ContactsModal.svelte';
	import OrderModal from '$lib/components/OrderModal.svelte';
	import PriceRequestModal from '$lib/components/PriceRequestModal.svelte';
	import RegionGate from '$lib/components/Antibot/RegionGate.svelte';
	import SmartCaptchaWidget from '$lib/components/Antibot/SmartCaptchaWidget.svelte';
	import AdIdBadge from '$lib/components/AdIdBadge.svelte';
	import { trust } from '$lib/antibot/trust.svelte';
	import { startEngagementGuard, guardedGoal } from '$lib/antibot/engagementGuard.svelte';
	import { captureUtm } from '$lib/utm';

	let { children, data } = $props();

	let observer;
	let stopPhoneClickTracking = () => {};
	let stopEngagementGuard = () => {};

	onMount(() => {
		// Атрибуция: сохраняем UTM рекламного захода (Яндекс Директ и др.),
		// чтобы заявка с любой страницы несла источник клика. См. $lib/utm.
		captureUtm();

		// Антибот: восстанавливаем состояние доверия из localStorage.
		// Если посетитель уже проходил барьер — Метрика инициализируется сразу,
		// модалка региона не показывается.
		trust.restore();

		// Капчу здесь НЕ взводим. Раньше execute() запускался по первой активности
		// (mousemove/scroll/tap), из-за чего Яндекс показывал всплывающий челлендж
		// на произвольной странице, вне контекста формы — посетитель закрывал его
		// кликом мимо, а на мобильных proof-of-work подвешивал анимацию меню.
		// Теперь капча взводится в момент подхода к форме: captcha.arm() в
		// OrderModal/PriceRequestModal (при открытии) и ContactsSection (по фокусу).

		// Цель Метрики phone_click — клик по любой ссылке tel: (тёплый лид,
		// позвонивший напрямую). Глобальный делегированный слушатель покрывает
		// шапку (все страницы), страницу контактов (оба номера), модалку и
		// баннер единообразно; новые tel-ссылки учитываются автоматически.
		// Фаза capture — срабатывает раньше любых stopPropagation на цели.
		// Идёт через guardedGoal — поведенческий бюджет + серверный гейт
		// (см. engagementGuard.svelte.ts), как и cta_click_*. Сам звонок
		// (открытие дилера) не блокируется — гейтится только отправка цели.
		const handlePhoneClick = (event) => {
			const link = event.target instanceof Element ? event.target.closest('a[href^="tel:"]') : null;
			if (link) guardedGoal('phone_click');
		};
		window.addEventListener('click', handlePhoneClick, true);
		stopPhoneClickTracking = () => window.removeEventListener('click', handlePhoneClick, true);

		// Антибот: поведенческий бюджет + rate-limit для клик-целей вовлечения
		// (cta_click_* и phone_click). См. engagementGuard.svelte.ts.
		stopEngagementGuard = startEngagementGuard();
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
		stopPhoneClickTracking();
		stopEngagementGuard();
	});

	afterNavigate(() => {
		if (observer) {
			observer.disconnect();
		}

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{
				threshold: 0.05,
				rootMargin: '0px 0px -40px 0px'
			}
		);

		/**
		 * .reveal-on-scroll виден по умолчанию (см. layout.css) — это защита от
		 * белых проплешин, если JS ещё не гидрировался/выполнился (медленная сеть,
		 * слабый мобильный CPU). Анимацию появления теперь навешиваем сами, но
		 * только на элементы, которые ЕЩЁ НЕ попали в вьюпорт на момент монтирования
		 * — иначе контент выше/на экране мигнул бы (спрятался и тут же появился).
		 */
		const setupObserver = () => {
			const elements = document.querySelectorAll('.reveal-on-scroll');
			elements.forEach((el) => {
				const rect = el.getBoundingClientRect();
				const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
				if (!alreadyVisible) {
					el.classList.add('reveal-pending');
				}
				observer.observe(el);
			});
		};

		setupObserver();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>МегаПак — Высокоточная Промышленная Пластиковая Тара</title>
	<meta
		name="description"
		content="ООО «МегаПак» — ведущий производитель и поставщик сертифицированной полимерной тары в Москве. Пластиковые бочки, штабелируемые канистры и еврокубы (IBC) оптом по стандартам ГОСТ и ДОПОГ."
	/>
	<meta
		name="keywords"
		content="пластиковая тара, пластиковые бочки, пластиковые канистры, еврокубы, IBC контейнеры, МегаПак, megapaks, упаковка москва, полимерная тара"
	/>
</svelte:head>

<div class="noise-bg min-h-screen selection:bg-brand-accent-light selection:text-brand-accent">
	<Header />
	{@render children()}
	<Footer />
	<ContactsModal />
	<OrderModal />
	<PriceRequestModal />

	<!-- Антибот: модалка выбора региона (поведенческий барьер) и невидимая SmartCaptcha -->
	<RegionGate geo={data.geo} />
	<SmartCaptchaWidget />
	<AdIdBadge />
</div>
