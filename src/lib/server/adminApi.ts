import { env } from '$env/dynamic/private';

function apiBaseUrl(): string {
	if (env.AUTH_BACKEND_URL) return env.AUTH_BACKEND_URL.replace(/\/$/, '');
	if (env.RUNTIME_AUTH_API_URL) return `${env.RUNTIME_AUTH_API_URL.replace(/\/$/, '')}/api`;
	if (env.VITE_AUTH_API_URL) return env.VITE_AUTH_API_URL.replace(/\/$/, '');

	return 'http://localhost:8001/api';
}

export async function adminApi(path: string, init: RequestInit = {}): Promise<Response> {
	return fetch(`${apiBaseUrl()}${path}`, {
		...init,
		headers: {
			Accept: 'application/json',
			...(init.body ? { 'Content-Type': 'application/json' } : {}),
			...init.headers
		}
	});
}

export async function readApiJson(response: Response): Promise<Record<string, any>> {
	try {
		return await response.json();
	} catch {
		return {};
	}
}
