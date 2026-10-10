import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { adminApi, readApiJson } from '$lib/server/adminApi';
import { previewLeads } from '$lib/server/adminPreview';
import {
	normalizeYandexEmail,
	normalizeYandexPhone,
	yandexExportSettings
} from '$lib/server/yandexOfflineExport';
import type { Actions, PageServerLoad } from './$types';

const COOKIE_NAME = 'mp_admin_jwt';

function isPreviewMode(): boolean {
	return dev && env.DEV_ADMIN_BYPASS === 'true';
}

function previewData() {
	const online = previewLeads.filter((lead) => lead.channel === 'online').length;
	const offline = previewLeads.length - online;

	return {
		authenticated: true,
		previewMode: true,
		exportSettings: yandexExportSettings(),
		leads: {
			data: previewLeads,
			current_page: 1,
			last_page: 1,
			total: previewLeads.length
		},
		summary: { total: previewLeads.length, online, offline }
	};
}

function bearer(token: string): HeadersInit {
	return { Authorization: `Bearer ${token}` };
}

function safePage(value: string | null): number {
	const page = Number.parseInt(value ?? '1', 10);
	return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export const load: PageServerLoad = async ({ cookies, url }) => {
	if (isPreviewMode()) {
		return previewData();
	}

	const token = cookies.get(COOKIE_NAME);
	if (!token) {
		return { authenticated: false, leads: null, summary: null };
	}

	const page = safePage(url.searchParams.get('page'));
	const exportSettings = yandexExportSettings();

	try {
		const response = await adminApi(`/admin/leads?page=${page}&per_page=50`, {
			headers: bearer(token)
		});
		const result = await readApiJson(response);

		if (response.status === 401) {
			cookies.delete(COOKIE_NAME, { path: '/admin' });
			return { authenticated: false, leads: null, summary: null, sessionExpired: true };
		}

		if (!response.ok) {
			return {
				authenticated: true,
				exportSettings,
				leads: null,
				summary: null,
				apiError: result.message || 'Не удалось загрузить заявки.'
			};
		}

		return {
			authenticated: true,
			exportSettings,
			leads: result.leads,
			summary: result.summary
		};
	} catch {
		return {
			authenticated: true,
			exportSettings,
			leads: null,
			summary: null,
			apiError: 'Сервис заявок временно недоступен.'
		};
	}
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		if (!email || !password) {
			return fail(422, { action: 'login', message: 'Введите email и пароль.', email });
		}

		try {
			const response = await adminApi('/admin/login', {
				method: 'POST',
				body: JSON.stringify({ email, password })
			});
			const result = await readApiJson(response);

			if (!response.ok || typeof result.token !== 'string') {
				return fail(response.status >= 400 ? response.status : 401, {
					action: 'login',
					message: result.message || 'Не удалось войти.',
					email
				});
			}

			cookies.set(COOKIE_NAME, result.token, {
				path: '/admin',
				httpOnly: true,
				secure: !dev,
				sameSite: 'strict',
				maxAge: Number(result.expires_in) || 28_800
			});

			return { action: 'login', success: true };
		} catch {
			return fail(503, {
				action: 'login',
				message: 'Сервис авторизации временно недоступен.',
				email
			});
		}
	},

	logout: async ({ cookies }) => {
		cookies.delete(COOKIE_NAME, { path: '/admin' });
		return { action: 'logout', success: true };
	},

	createOffline: async ({ request, cookies }) => {
		const previewMode = isPreviewMode();
		const token = cookies.get(COOKIE_NAME);
		if (!token && !previewMode) {
			return fail(401, { action: 'createOffline', message: 'Сессия истекла. Войдите снова.' });
		}

		const formData = await request.formData();
		const payload = {
			offline_type: String(formData.get('offline_type') ?? '').trim(),
			name: String(formData.get('name') ?? '').trim(),
			contact: String(formData.get('contact') ?? '').trim(),
			ad_id: String(formData.get('ad_id') ?? '').trim() || null,
			comment: String(formData.get('comment') ?? '').trim() || null
		};

		if (!['call', 'email'].includes(payload.offline_type)) {
			return fail(422, {
				action: 'createOffline',
				message: 'Выберите тип обращения: звонок или почта.',
				values: payload
			});
		}

		if (!payload.name || !payload.contact) {
			return fail(422, {
				action: 'createOffline',
				message: 'Укажите имя и контакт клиента.',
				values: payload
			});
		}

		const validContact =
			payload.offline_type === 'call'
				? normalizeYandexPhone(payload.contact)
				: normalizeYandexEmail(payload.contact);
		if (!validContact) {
			return fail(422, {
				action: 'createOffline',
				message:
					payload.offline_type === 'call'
						? 'Укажите номер телефона с кодом страны.'
						: 'Укажите корректный адрес электронной почты.',
				values: payload
			});
		}

		if (payload.ad_id && !/^[0-9]{1,32}$/.test(payload.ad_id)) {
			return fail(422, {
				action: 'createOffline',
				message: 'Номер визита должен содержать от 1 до 32 цифр.',
				values: payload
			});
		}

		if (previewMode) {
			previewLeads.unshift({
				id: `preview-${Date.now()}`,
				channel: 'offline',
				type: `offline_${payload.offline_type}`,
				delivery_status: 'recorded',
				ad_id: payload.ad_id,
				name: payload.name,
				company_name: null,
				contact_person: null,
				phone: null,
				email: null,
				contact: payload.contact,
				comment: payload.comment,
				source_url: null,
				created_at: new Date().toISOString()
			});

			return {
				action: 'createOffline',
				success: true,
				message: 'Офлайн-заявка добавлена в предпросмотр.'
			};
		}

		try {
			const response = await adminApi('/admin/leads/offline', {
				method: 'POST',
				headers: bearer(token),
				body: JSON.stringify(payload)
			});
			const result = await readApiJson(response);

			if (!response.ok) {
				return fail(response.status, {
					action: 'createOffline',
					message: result.message || 'Не удалось добавить заявку.',
					values: payload
				});
			}

			return { action: 'createOffline', success: true, message: result.message };
		} catch {
			return fail(503, {
				action: 'createOffline',
				message: 'Сервис заявок временно недоступен.',
				values: payload
			});
		}
	}
};
