// See https://svelte.dev/docs/kit/types#app.d.ts
import type { GeoInfo } from '$lib/antibot/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/**
			 * Гео-информация посетителя, резолвится в hooks.server.ts по IP.
			 * Определяет режим модалки выбора региона (confirm vs select).
			 */
			geo: GeoInfo;
		}
		interface PageData {
			/** Пробрасывается из +layout.server.ts → доступно в RegionGate как data.geo. */
			geo?: GeoInfo;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
