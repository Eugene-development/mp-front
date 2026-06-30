/**
 * Единый источник истины антибот-модуля: «доказал ли посетитель, что он человек».
 *
 * Состояние гейтит и инициализацию Яндекс.Метрики (полный гейт init), и показ
 * модалки региона. На старте приложения вызывается `restore()` — если есть
 * валидный localStorage-флаг (повторный визит), барьер считается пройденным,
 * Метрика инициализируется немедленно, модалка не показывается.
 *
 * Источник истины — синглтон `trust` (экспортируется в конце файла).
 */
import { init as initMetrika } from './metrika';
import type { TrustMethod, TrustRecord } from './types';

/** Ключ в localStorage. v1 — версия схемы, позволит инвалидировать флаг при изменении логики. */
const STORAGE_KEY = 'mp_trust_v1';

/** Срок действия «доверия» в днях. После — барьер показывается снова. */
const TRUST_TTL_DAYS = 30;

function isBrowser(): boolean {
	return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

class TrustStore {
	/** Прошёл ли посетитель поведенческий барьер. Реактивно (Svelte 5 runes). */
	verified = $state(false);

	/** Выбранный/подтверждённый регион. Реактивно. */
	region = $state<string>('');

	/**
	 * Восстанавливает состояние из localStorage при старте приложения.
	 * Должна вызываться один раз на клиенте (в +layout.svelte onMount).
	 * Если флаг валиден — проходится барьер методом `returning` (без модалки).
	 */
	restore(): void {
		if (!isBrowser() || this.verified) return;

		const record = this.read();
		if (record && this.isFresh(record)) {
			this.applyTrust('returning', record.region);
		}
	}

	/**
	 * Отмечает посетителя как прошедшего барьер.
	 * - сохраняет флаг в localStorage (TTL TRUST_TTL_DAYS);
	 * - инициализирует Яндекс.Метрику (полный гейт init — до этого счётчик не растёт).
	 *
	 * Идемпотентно: повторные вызовы не делают лишней работы.
	 *
	 * @param method Способ прохождения барьера.
	 * @param region Выбранный/подтверждённый регион (если применимо).
	 */
	verify(method: TrustMethod, region?: string): void {
		if (this.verified) return;

		this.applyTrust(method, region);
		this.persist(method, region);
	}

	/** Сброс доверия (для отладки / ручного тестирования модалки). */
	reset(): void {
		this.verified = false;
		this.region = '';
		if (isBrowser()) localStorage.removeItem(STORAGE_KEY);
	}

	// --- внутренние хелперы -------------------------------------------------

	/** Применяет состояние «доверяем» и стартует Метрику. */
	private applyTrust(method: TrustMethod, region?: string): void {
		this.verified = true;
		if (region !== undefined) this.region = region;
		// Полный гейт: tag.js грузится и счётчик инится ТОЛЬКО после барьера.
		initMetrika();
	}

	/** Читает и парсит запись из localStorage. */
	private read(): TrustRecord | null {
		if (!isBrowser()) return null;
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		try {
			const parsed = JSON.parse(raw) as TrustRecord;
			if (parsed?.v !== 1 || typeof parsed.ts !== 'number') return null;
			return parsed;
		} catch {
			return null;
		}
	}

	/** Записывает флаг доверия в localStorage. */
	private persist(method: TrustMethod, region?: string): void {
		if (!isBrowser()) return;
		const record: TrustRecord = {
			v: 1,
			ts: Date.now(),
			method,
			region: region ?? this.region
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
	}

	/** Не истёк ли срок действия флага доверия. */
	private isFresh(record: TrustRecord): boolean {
		const ageDays = (Date.now() - record.ts) / (1000 * 60 * 60 * 24);
		return ageDays <= TRUST_TTL_DAYS;
	}
}

/** Синглтон — единый источник истины для всего приложения. */
export const trust = new TrustStore();
