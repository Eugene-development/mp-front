/**
 * Серверная гео-резолвилка для антибот-модуля.
 *
 * ТЕКУЩИЙ РЕЖИМ: без внешнего GeoIP-провайдера.
 * Возвращается статический регион «Москва и МО» (по месту HQ ООО «МегаПак»).
 * Соответственно модалка региона для всех посетителей показывается в confirm-режиме
 * («Ваш регион — Москва и МО?»), а поведенческий барьер работает в полную силу
 * (нужно кликнуть, чтобы инициализировать Метрику).
 *
 * ЗАГОТОВКА ДЛЯ БУДУЩЕГО: если позже понадобится реальное гео и/или детект
 * VPN/proxy/datacenter — достаточно реализовать тело `resolveGeoProvider()`
 * (ниже, с примером для IPinfo). Архитектура хука (`hooks.server.ts`),
 * проброса в layout и RegionGate при этом НЕ меняется.
 *
 * Почему сейчас без провайдера:
 *  - бесплатно, нет внешних зависимостей и задержек;
 *  - регион в модалке — вторичная информация, первичная функция окна — барьер;
 *  - VPN-флаги у платных провайдеров стоят ~$50/мес, что сейчас не окупается.
 *
 * @see hooks.server.ts — где вызывается resolveGeo.
 */
import type { GeoInfo } from '$lib/antibot/types';

/**
 * Статический фоллбэк: регион по месту HQ, нулевая уверенность.
 * confidence=0 сам по себе безопасен, но т.к. isHosting/isProxy/isVpn не проставлены
 * (не определялись), RegionGate откроется в confirm-режиме — как и должно быть
 * без внешнего VPN-детекта.
 */
export const FALLBACK_GEO: GeoInfo = {
	region: 'Москва и МО',
	country: 'RU',
	confidence: 0
};

/**
 * Резолвит гео по IP. Сейчас всегда возвращает статический фоллбэк.
 *
 * Кэш здесь не нужен, т.к. ничего сетевого не происходит — это запасная точка
 * расширения для будущего провайдера (см. resolveGeoProvider ниже).
 *
 * @param ip IPv4/IPv6 посетителя (не используется в статичном режиме, оставлен
 *           для совместимости сигнатуры с будущей реализацией провайдера).
 */
export async function resolveGeo(_ip: string): Promise<GeoInfo> {
	// Если позже подключите внешний детект — раскомментируйте блок ниже.
	//
	// if (resolveGeoProvider && !isPrivateIp(_ip)) {
	//   try {
	//     const providerGeo = await resolveGeoProvider(_ip);
	//     if (providerGeo) return providerGeo;
	//   } catch {
	//     // падаем на фоллбэк — никогда не роняем рендер из-за гео
	//   }
	// }
	return { ...FALLBACK_GEO };
}

/**
 * ТОЧКА РАСШИРЕНИЯ. Сейчас не реализована (статичный режим).
 *
 * Пример того, что сюда добавить, если понадобится реальное гео + VPN-детект
 * (нужен VITE_GEOIP_TOKEN и платный модуль Privacy Detection):
 *
 *   const token = import.meta.env.VITE_GEOIP_TOKEN;
 *   if (!token) return null;
 *   const res = await fetch(`https://ipinfo.io/${ip}/json?token=${token}`);
 *   const d = await res.json();
 *   const privacy = d.privacy ?? {};
 *   const suspicious = privacy.hosting || privacy.proxy || privacy.vpn;
 *   return {
 *     region: d.region || FALLBACK_GEO.region,
 *     country: d.country,
 *     isHosting: !!privacy.hosting,
 *     isProxy: !!privacy.proxy,
 *     isVpn: !!privacy.vpn,
 *     confidence: suspicious ? 0 : 1,
 *   };
 *
 * @returns GeoInfo | null  (null — провайдер недоступен, использовать фоллбэк)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function resolveGeoProvider(_ip: string): Promise<GeoInfo | null> {
	return null; // TODO: реализовать при подключении GeoIP-провайдера.
}

/**
 * Грубо определяет приватные/loopback IP. Сейчас не используется (статичный режим),
 * оставлен для будущего провайдера — чтобы не тратить его квоту на локальные адреса.
 */
function isPrivateIp(ip: string): boolean {
	if (!ip) return true;
	if (ip === '::1' || ip === '127.0.0.1') return true;
	if (ip.startsWith('10.') || ip.startsWith('192.168.')) return true;
	if (ip.startsWith('172.')) {
		const second = Number(ip.split('.')[1]);
		if (second >= 16 && second <= 31) return true;
	}
	return ip.toLowerCase().startsWith('fe80:') || ip.toLowerCase().startsWith('fc');
}
