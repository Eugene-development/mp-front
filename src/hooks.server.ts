/**
 * Серверный хук: на каждый запрос резолвит гео посетителя по IP и кладёт в locals.
 *
 * Это база для работы модалки региона (confirm vs select) и для отсечения
 * VPN/proxy/datacenter-трафика. Сам resolveGeo кэшируется по IP, поэтому
 * дёргать внешний API на каждый запрос не приходится.
 *
 * @see src/lib/server/geo.ts
 */
import type { Handle } from '@sveltejs/kit';
import { resolveGeo } from '$lib/server/geo';
import { FALLBACK_GEO } from '$lib/server/geo';

export const handle: Handle = async ({ event, resolve }) => {
	// getClientAddress() возвращает реальный IP (с учётом доверенных прокси/CDN
	// перед фронтендом). Если по какой-то причине недоступен — статический фоллбэк.
	const ip = event.getClientAddress();

	try {
		event.locals.geo = ip ? await resolveGeo(ip) : { ...FALLBACK_GEO };
	} catch {
		// Никогда не роняем рендер страницы из-за сбоя гео-сервиса.
		event.locals.geo = { ...FALLBACK_GEO };
	}

	return resolve(event);
};
