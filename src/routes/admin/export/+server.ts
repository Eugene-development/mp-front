import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';
import { adminApi, readApiJson } from '$lib/server/adminApi';
import { previewLeads } from '$lib/server/adminPreview';
import {
	buildYandexOfflineCsv,
	isIsoDate,
	isYandexExportPeriod,
	leadsForYandexPeriod
} from '$lib/server/yandexOfflineExport';
import type { RequestHandler } from './$types';

const COOKIE_NAME = 'mp_admin_jwt';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const period = url.searchParams.get('period');
	const date = url.searchParams.get('date');

	if (!isYandexExportPeriod(period) || !isIsoDate(date)) {
		error(400, 'Укажите корректные период и дату выгрузки.');
	}

	const filename = `yandex-offline-conversions-${period}-${date}.csv`;
	if (dev && env.DEV_ADMIN_BYPASS === 'true') {
		const leads = leadsForYandexPeriod(previewLeads, period, date);
		return csvResponse(buildYandexOfflineCsv(leads), filename);
	}

	const token = cookies.get(COOKIE_NAME);
	if (!token) {
		redirect(303, '/admin');
	}

	let response: Response;
	try {
		response = await adminApi(
			`/admin/leads/offline/export?period=${encodeURIComponent(period)}&date=${encodeURIComponent(date)}`,
			{
				headers: {
					Accept: 'text/csv',
					Authorization: `Bearer ${token}`
				}
			}
		);
	} catch {
		error(503, 'Сервис заявок временно недоступен.');
	}

	if (response.status === 401) {
		cookies.delete(COOKIE_NAME, { path: '/admin' });
		redirect(303, '/admin');
	}

	if (!response.ok) {
		const result = await readApiJson(response);
		error(response.status, result.message || 'Не удалось сформировать выгрузку.');
	}

	return new Response(response.body, {
		headers: {
			'Content-Type': response.headers.get('content-type') || 'text/csv; charset=UTF-8',
			'Content-Disposition': response.headers.get('content-disposition') || disposition(filename),
			'Cache-Control': 'private, no-store, max-age=0',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};

function csvResponse(csv: string, filename: string): Response {
	return new Response(csv, {
		headers: {
			'Content-Type': 'text/csv; charset=UTF-8',
			'Content-Disposition': disposition(filename),
			'Cache-Control': 'private, no-store, max-age=0',
			'X-Content-Type-Options': 'nosniff'
		}
	});
}

function disposition(filename: string): string {
	return `attachment; filename="${filename}"`;
}
