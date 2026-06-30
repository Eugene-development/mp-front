<script lang="ts">
	/**
	 * Модалка выбора региона — первичный поведенческий барьер антибот-системы.
	 *
	 * Две задачи:
	 *  1. UX: уточнить регион посетителя (confirm-режим для доверенного гео,
	 *     select-режим для VPN/proxy/datacenter или ненадёжного гео).
	 *  2. Защита: не позволить примитивному боту пройти барьер. До клика по
	 *     подтверждению Яндекс.Метрика не инициализируется (полный гейт init),
	 *     поэтому бот не фиксируется как полноценный визит.
	 *
	 * Антибот-приёмы DOM:
	 *  - некэшируемый токен-суффикс в data-* атрибутах (см. generateToken);
	 *  - вложенная разметка без «говорящих» селекторов/текста на верхнем узле;
	 *  - обработчики клика проверяют event.isTrusted === true — синтетические
	 *    el.click() / dispatchEvent от ботов игнорируются.
	 *
	 * Доступность (a11y): role="dialog" aria-modal, фокус-трап, закрытие по Esc
	 * доступно только возвратным посетителям (модалка не должна закрываться без
	 * выбора при первом визите — иначе барьер бессмысленен).
	 */
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { trust } from '$lib/antibot/trust.svelte';
	import { DEFAULT_REGION, REGIONS } from '$lib/antibot/regions';
	import type { GeoInfo } from '$lib/antibot/types';

	let { geo }: { geo: GeoInfo } = $props();

	/**
	 * Режим модалки:
	 *  - `confirm` — доверенное гео: «Ваш регион — X?» · Да / Выбрать другой.
	 *  - `select`  — VPN/proxy/datacenter или ненадёжное гео: «Выберите регион».
	 */
	let mode = $state<'confirm' | 'select'>('confirm');

	/** Выбранный в select-режиме регион. */
	let selectedRegion = $state<string>(DEFAULT_REGION);

	/** DOM-токен обфускации (некэшируемый — меняется при каждой отрисовке). */
	let token = $state<string>('');

	/** Элемент для фокус-трапа. */
	let dialogRef = $state<HTMLDivElement | null>(null);
	let lastFocused: HTMLElement | null = null;

	onMount(() => {
		// trust.restore() уже должен был отработать в layout, но проверяем —
		// если посетитель уже прошёл барьер (повторный визит), модалку не показываем.
		trust.restore();
		if (trust.verified) return;

		token = generateToken();

		// Решаем режим по серверному гео. Низкая confidence / VPN / прокси / hosting
		// → безопасный select-режим (без «угадывания» региона для подозрительного IP).
		const suspicious =
			geo.confidence <= 0 || geo.isHosting === true || geo.isProxy === true || geo.isVpn === true;
		if (suspicious || !geo.region) {
			mode = 'select';
			selectedRegion = DEFAULT_REGION;
		} else {
			mode = 'confirm';
			selectedRegion = geo.region;
		}

		// Запоминаем активный элемент, чтобы вернуть фокус после закрытия.
		lastFocused = document.activeElement as HTMLElement | null;

		// После отрисовки переводим фокус в диалог (a11y).
		queueMicrotask(() => dialogRef?.focus());
	});

	/**
	 * Обработчик клика по «подтвердить» (confirm-режим).
	 * isTrusted-проверка: синтетический клик бота (el.click()) игнорируется.
	 */
	function handleConfirm(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (event.isTrusted === false) return;
		if (!matchesToken(event.currentTarget)) return;
		trust.verify('modal', selectedRegion);
	}

	/**
	 * Обработчик клика по «выбрать другой» — переключаемся в select-режим.
	 */
	function handleChooseAnother(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (event.isTrusted === false) return;
		if (!matchesToken(event.currentTarget)) return;
		mode = 'select';
	}

	/**
	 * Обработчик подтверждения выбора региона в select-режиме.
	 */
	function handleSelectSubmit(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (event.isTrusted === false) return;
		if (!matchesToken(event.currentTarget)) return;
		trust.verify('modal', selectedRegion);
	}

	/**
	 * Фокус-трап внутри диалога (Tab/Shift+Tab не уводят фокус наружу).
	 */
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && trust.verified) {
			// Esc разрешаем закрыть только уже доверенному посетителю.
			return;
		}
		if (event.key !== 'Tab' || !dialogRef) return;

		const focusables = getFocusable(dialogRef);
		if (focusables.length === 0) return;

		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		const active = document.activeElement as HTMLElement | null;

		if (event.shiftKey && active === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	}

	/** Проверяет, что data-атрибут токена на кликнутом элементе совпадает с текущим. */
	function matchesToken(el: HTMLElement): boolean {
		return el.dataset.mpToken === token;
	}

	/** Случайный токен для обфускации (мешает ботам кэшировать селекторы). */
	function generateToken(): string {
		return Math.random().toString(36).slice(2) + Date.now().toString(36);
	}

	/** Возвращает массив фокусируемых элементов внутри контейнера. */
	function getFocusable(container: HTMLElement): HTMLElement[] {
		const selector =
			'a[href], button:not([disabled]), select, input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
		return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
			(el) => el.offsetParent !== null || el === document.activeElement
		);
	}
</script>

{#if !trust.verified}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark/60 px-4 backdrop-blur-md"
		transition:fade={{ duration: 200 }}
	>
		<div
			bind:this={dialogRef}
			transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
			class="double-bezel relative w-full max-w-md overflow-hidden shadow-2xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="rg-title"
			tabindex="-1"
			onkeydown={handleKeydown}
		>
			<div class="double-bezel-inner p-6 sm:p-8">
				<div class="mb-6">
					<span
						class="mb-2 inline-block rounded-full border border-brand-divider bg-neutral-100 px-3 py-1 text-[9px] font-bold tracking-widest text-brand-gray uppercase"
					>
						Подтверждение региона
					</span>
					<!-- id намеренно неинформативен — см. антибот-комментарий в шапке компонента -->
					<h3 id="rg-title" class="font-serif text-2xl font-light tracking-tight text-brand-dark">
						{#if mode === 'confirm'}
							Ваш регион — <span class="font-normal text-brand-accent italic">{selectedRegion}</span
							>?
						{:else}
							Выберите <span class="font-normal text-brand-accent italic">ваш регион</span>
						{/if}
					</h3>
					<p class="mt-2 text-sm text-brand-gray">
						Это нужно, чтобы подобрать актуальные условия поставки и логистики.
					</p>
				</div>

				{#if mode === 'confirm'}
					<!-- confirm-режим: две кнопки. data-атрибут = токен, проверяемый в обработчике. -->
					<div class="flex flex-col gap-3 sm:flex-row">
						<button
							type="button"
							data-mp-token={token}
							onclick={handleConfirm}
							class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
						>
							Да, всё верно
						</button>
						<button
							type="button"
							data-mp-token={token}
							onclick={handleChooseAnother}
							class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-divider bg-neutral-100 px-5 py-3.5 text-sm font-bold tracking-wider text-brand-dark uppercase transition-all duration-300 hover:bg-neutral-200 active:scale-[0.98]"
						>
							Выбрать другой
						</button>
					</div>
				{:else}
					<!-- select-режим: выпадающий список + кнопка подтверждения. -->
					<div class="flex flex-col gap-4">
						<div class="flex flex-col">
							<label
								for="rg-select"
								class="mb-2 text-[9px] font-bold tracking-wider text-brand-dark uppercase"
							>
								Регион
							</label>
							<select
								id="rg-select"
								bind:value={selectedRegion}
								class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
							>
								{#each REGIONS as opt (opt.value)}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						</div>
						<button
							type="button"
							data-mp-token={token}
							onclick={handleSelectSubmit}
							class="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
						>
							Подтвердить регион
						</button>
					</div>
				{/if}

				<span class="mt-4 block text-center text-[8px] text-brand-gray">
					Это разовое подтверждение — при следующем визите оно не потребуется.
				</span>
			</div>
		</div>
	</div>
{/if}
