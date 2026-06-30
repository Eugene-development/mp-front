/**
 * Пробрасывает резолвнутое на сервере гео в клиентский layout.
 * RegionGate читает data.geo и решает, в каком режиме показывать модалку
 * (confirm — для доверенного гео; select — для VPN/proxy/datacenter).
 *
 * Тип locals.geo описан в src/app.d.ts (App.Locals.geo).
 */
import { FALLBACK_GEO } from '$lib/server/geo';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ locals }: ServerLoadEvent) => {
	return {
		geo: locals.geo ?? { ...FALLBACK_GEO }
	};
};
