<script lang="ts">
	/**
	 * Невидимый виджет Yandex SmartCaptcha.
	 *
	 * Монтируется один раз в корневом layout. Сам по себе ничего не показывает:
	 * рендерит invisible-виджет и регистрирует его в общем сторе (smartcaptcha.svelte.ts).
	 * Запуск проверки (execute) инициируют формы: captcha.arm() при открытии
	 * модалки / фокусе на первом поле и captcha.execute() при сабмите.
	 *
	 * Скрипт виджета грузится лениво и только если задан
	 * VITE_SMARTCAPTCHA_SITE_KEY. Без ключа компонент ничего не делает (fail-open),
	 * чтобы не ломать сабмит на стейджинге/локальной разработке. Если скрипт не
	 * загрузился (ad-block, сбой CDN), стор помечается unavailable — формы уходят
	 * без токена, а решение принимает сервер (жёсткий лимит по IP).
	 *
	 * @see https://yandex.cloud/en/docs/smartcaptcha/concepts/invisible-captcha
	 */
	import { onMount } from 'svelte';
	import { captcha, SITE_KEY } from '$lib/antibot/smartcaptcha.svelte';

	let container = $state<HTMLDivElement | null>(null);
	let scriptLoaded = $state(false);

	/**
	 * Глобальная функция-обработчик, которую виджет Яндекса вызывает по имени.
	 * Имя передаётся в ?onload=..., а render() использует колбэки из props.
	 * Чтобы компонент не «торчал» в window под стабильным именем, навешиваем
	 * обработчики через render()-props (не через глобальные имена).
	 */
	onMount(() => {
		if (!SITE_KEY) return; // fail-open: на стейджинге/локалке без ключа капчи нет
		if (typeof window === 'undefined') return;

		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		waitForScript()
			.then(() => {
				renderWidget();
			})
			.catch(() => {
				// Скрипт не загрузился — фиксируем недоступность, чтобы формы не
				// ждали токен вечно и не блокировали живых пользователей.
				captcha.markUnavailable();
			});
	});

	/** Загружает captcha.js один раз (с защитой от повторной вставки). */
	function waitForScript(): Promise<void> {
		if (scriptLoaded && window.smartCaptcha) return Promise.resolve();

		return new Promise((resolve, reject) => {
			const SRC = 'https://smartcaptcha.yandexcloud.net/captcha.js';
			const existing = document.querySelector<HTMLScriptElement>(`script[src^="${SRC}"]`);
			if (existing) {
				// Скрипт уже вставлен — дождёмся готовности smartCaptcha.
				if (window.smartCaptcha) {
					scriptLoaded = true;
					resolve();
					return;
				}
				existing.addEventListener('load', () => {
					scriptLoaded = true;
					resolve();
				});
				existing.addEventListener('error', () => reject(new Error('captcha-script-error')));
				return;
			}

			// Назначаем глобальный onload-колбэк ДО вставки скрипта (как требует Я.).
			(window as unknown as { onloadSmartCaptchaScript?: () => void }).onloadSmartCaptchaScript =
				() => {
					scriptLoaded = true;
					resolve();
				};

			const script = document.createElement('script');
			script.src = `${SRC}?render=onload&onload=onloadSmartCaptchaScript`;
			script.async = true;
			// Ad-block режет домен капчи → событие error. Без этого обработчика
			// промис не резолвился бы никогда и сабмит висел бы до таймаута.
			script.addEventListener('error', () => reject(new Error('captcha-script-blocked')));
			document.head.appendChild(script);
		});
	}

	/** Рендерит invisible-виджет в контейнер и регистрирует его в сторе. */
	function renderWidget(): void {
		if (!container || !window.smartCaptcha || !SITE_KEY) {
			captcha.markUnavailable();
			return;
		}

		const widgetId = window.smartCaptcha.render(container, {
			sitekey: SITE_KEY,
			invisible: true,
			// Скрывает «шилд» Яндекса — плашку «Политика обработки данных», которая
			// иначе висит на всех страницах поверх дизайна. Это официальный параметр
			// render() (не CSS-хак), нарушения правил Яндекса нет. Условие Яндекса об
			// уведомлении юзеров закрыто в /privacy (раздел «Состав собираемых данных»).
			hideShield: true,
			callback: (token: string) => captcha.handleCallback(token),
			'error-callback': (error: unknown) => captcha.handleError(error)
		});

		captcha.registerWidget(widgetId);
	}
</script>

<!--
	Контейнер виджета. Невидимый режим не показывает кнопку, но Я. может
	показывать «shield»/челлендж — оставляем контейнер в DOM, вне основного потока.
-->
<!-- eslint-disable-next-line svelte/no-inline-styles -->
<div bind:this={container} class="smartcaptcha-slot" aria-hidden="true"></div>

<style>
	/*
	 * Контейнер не влияет на лэйаут: виджет невидим, при подозрительном поведении
	 * показывает всплывающий челлендж.
	 *
	 * z-index обязателен: Яндекс рендерит всплывающий челлендж как fixed-потомка
	 * этого контейнера. Без z-index он живёт в корневом stacking-контексте на
	 * уровне auto и перекрывается контентом страницы (<main class="relative z-10">).
	 * z-index поднимает весь stacking-контекст слота (вместе с фиксированными
	 * потомками) выше всех слоёв приложения; сам слот остаётся нулевого размера и
	 * pointer-events:none, поэтому клики по странице не крадёт.
	 *
	 * Шилд Яндекса (плашка «Политика обработки данных») скрыт через hideShield в
	 * render(); уведомление об обработке данных вынесено в /privacy (раздел 2).
	 */
	.smartcaptcha-slot {
		position: absolute;
		width: 0;
		height: 0;
		overflow: visible;
		pointer-events: none;
		z-index: 99999;
	}
</style>
