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
	import { trust } from '$lib/antibot/trust.svelte';
	import { trackHumanSignal } from '$lib/antibot/useHumanSignal.svelte';
	import { captcha } from '$lib/antibot/smartcaptcha.svelte';
	import { startEngagementGuard, guardedGoal } from '$lib/antibot/engagementGuard.svelte';

	let { children, data } = $props();

	let observer;
	let stopHumanSignal = () => {};
	let stopPhoneClickTracking = () => {};
	let stopEngagementGuard = () => {};

	onMount(() => {
		// Антибот: восстанавливаем состояние доверия из localStorage.
		// Если посетитель уже проходил барьер — Метрика инициализируется сразу,
		// модалка региона не показывается.
		trust.restore();

		// Антибот: слушаем базовую активность (mouse/touch/scroll). При первом
		// живом сигнале взводим невидимую SmartCaptcha — headless-боты, не
		// генерирующие таких событий, никогда не получят токен.
		stopHumanSignal = trackHumanSignal({
			onSignal: () => {
				if (captcha.token) return;
				// Взводим невидимую SmartCaptcha ВНЕ синхронного цикла первого
				// пользовательского события. На мобильных первый «живой» сигнал —
				// это тап по кнопке-гамбургеру: если запускать execute() прямо в
				// обработчике touchstart/mousedown, тяжёлая работа невидимого
				// челленджа Яндекса (на проде, где домен валиден) блокирует главный
				// поток и клик/переход открытия мобильного меню применяется лишь
				// через 2–4 с. На localhost домен не авторизован — execute() падает
				// в error-callback мгновенно, поэтому локально задержки нет.
				// Откладываем через requestIdleCallback (с гарантированным timeout),
				// чтобы браузер сначала обработал тап и отрисовал меню.
				const armCaptcha = () => {
					if (!captcha.token) captcha.execute();
				};
				if (typeof window.requestIdleCallback === 'function') {
					window.requestIdleCallback(armCaptcha, { timeout: 1000 });
				} else {
					setTimeout(armCaptcha, 200);
				}
			}
		});

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
		stopHumanSignal();
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
</div>
