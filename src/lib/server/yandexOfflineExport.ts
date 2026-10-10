const MOSCOW_OFFSET_MS = 3 * 60 * 60 * 1000;
const MAX_AGE_DAYS = 113;

export const yandexExportPeriods = ['day', 'week', 'month', 'quarter', 'year'] as const;
export type YandexExportPeriod = (typeof yandexExportPeriods)[number];

type ExportLead = {
	id: string | number;
	channel: string;
	type: string;
	contact?: string | null;
	created_at?: string | null;
};

export function isYandexExportPeriod(value: string | null): value is YandexExportPeriod {
	return yandexExportPeriods.includes(value as YandexExportPeriod);
}

export function isIsoDate(value: string | null): value is string {
	if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

	const [year, month, day] = value.split('-').map(Number);
	const parsed = new Date(Date.UTC(year, month - 1, day));
	return (
		parsed.getUTCFullYear() === year &&
		parsed.getUTCMonth() === month - 1 &&
		parsed.getUTCDate() === day
	);
}

export function yandexExportSettings(now = new Date()) {
	return {
		today: moscowDate(now),
		minDate: moscowDate(new Date(now.getTime() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000))
	};
}

export function leadsForYandexPeriod(
	leads: ExportLead[],
	period: YandexExportPeriod,
	date: string,
	now = new Date()
): ExportLead[] {
	let [start, end] = calendarRange(period, date);
	const oldest = moscowStartOfDay(new Date(now.getTime() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000));

	if (start < oldest) start = oldest;
	if (end > now) end = now;
	if (start > end) return [];

	return leads.filter((lead) => {
		if (lead.channel !== 'offline' || !lead.created_at) return false;
		const createdAt = new Date(lead.created_at);
		return !Number.isNaN(createdAt.getTime()) && createdAt >= start && createdAt <= end;
	});
}

export function buildYandexOfflineCsv(leads: ExportLead[]): string {
	const lines = ['id;create_date_time;emails;phones;order_status'];

	for (const lead of leads) {
		if (lead.channel !== 'offline' || !['offline_call', 'offline_email'].includes(lead.type)) {
			continue;
		}

		const email = lead.type === 'offline_email' ? normalizeYandexEmail(lead.contact) : null;
		const phone = lead.type === 'offline_call' ? normalizeYandexPhone(lead.contact) : null;
		const createdAt = lead.created_at ? new Date(lead.created_at) : null;
		if ((!email && !phone) || !createdAt || Number.isNaN(createdAt.getTime())) continue;

		lines.push(
			[
				`mp-offline-${lead.id}`,
				formatMoscowDateTime(createdAt),
				email ?? '',
				phone ?? '',
				'IN_PROGRESS'
			]
				.map(csvCell)
				.join(';')
		);
	}

	return `${lines.join('\r\n')}\r\n`;
}

function calendarRange(period: YandexExportPeriod, date: string): [Date, Date] {
	const [year, month, day] = date.split('-').map(Number);
	const anchor = new Date(Date.UTC(year, month - 1, day));
	const start = new Date(anchor);
	const next = new Date(anchor);

	switch (period) {
		case 'day':
			next.setUTCDate(next.getUTCDate() + 1);
			break;
		case 'week': {
			const daysSinceMonday = (start.getUTCDay() + 6) % 7;
			start.setUTCDate(start.getUTCDate() - daysSinceMonday);
			next.setTime(start.getTime());
			next.setUTCDate(next.getUTCDate() + 7);
			break;
		}
		case 'month':
			start.setUTCDate(1);
			next.setTime(start.getTime());
			next.setUTCMonth(next.getUTCMonth() + 1);
			break;
		case 'quarter': {
			const firstMonth = Math.floor(start.getUTCMonth() / 3) * 3;
			start.setUTCMonth(firstMonth, 1);
			next.setTime(start.getTime());
			next.setUTCMonth(next.getUTCMonth() + 3);
			break;
		}
		case 'year':
			start.setUTCMonth(0, 1);
			next.setTime(start.getTime());
			next.setUTCFullYear(next.getUTCFullYear() + 1);
	}

	return [
		new Date(start.getTime() - MOSCOW_OFFSET_MS),
		new Date(next.getTime() - MOSCOW_OFFSET_MS - 1)
	];
}

function moscowStartOfDay(value: Date): Date {
	const shifted = new Date(value.getTime() + MOSCOW_OFFSET_MS);
	return new Date(
		Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()) -
			MOSCOW_OFFSET_MS
	);
}

function moscowDate(value: Date): string {
	const shifted = new Date(value.getTime() + MOSCOW_OFFSET_MS);
	return [
		shifted.getUTCFullYear(),
		String(shifted.getUTCMonth() + 1).padStart(2, '0'),
		String(shifted.getUTCDate()).padStart(2, '0')
	].join('-');
}

function formatMoscowDateTime(value: Date): string {
	const shifted = new Date(value.getTime() + MOSCOW_OFFSET_MS);
	return `${moscowDate(value)} ${[
		shifted.getUTCHours(),
		shifted.getUTCMinutes(),
		shifted.getUTCSeconds()
	]
		.map((part) => String(part).padStart(2, '0'))
		.join(':')}`;
}

export function normalizeYandexEmail(value: string | null | undefined): string | null {
	const email = (value ?? '').trim().toLowerCase();
	return /^[a-z0-9]/.test(email) &&
		/^[\x00-\x7F]+$/.test(email) &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
		? email
		: null;
}

export function normalizeYandexPhone(value: string | null | undefined): string | null {
	let phone = (value ?? '').replace(/\D/g, '');
	if (phone.length === 10 && phone.startsWith('9')) phone = `7${phone}`;
	if (phone.length === 11 && phone.startsWith('8')) phone = `7${phone.slice(1)}`;
	return /^[1-9]\d{6,14}$/.test(phone) ? phone : null;
}

function csvCell(value: string): string {
	return /[;\r\n"]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}
