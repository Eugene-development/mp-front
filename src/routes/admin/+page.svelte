<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let offlineType = $state('');
	let contactPlaceholder = $derived(
		offlineType === 'call'
			? 'Номер телефона'
			: offlineType === 'email'
				? 'Электронная почта'
				: 'Телефон или email'
	);

	const typeLabels = {
		invoice: 'Счёт с НДС',
		price: 'Запрос цены',
		offline_call: 'Звонок',
		offline_email: 'Почта',
		offline: 'Офлайн (без типа)'
	};

	function formatDate(value) {
		if (!value) return '—';
		return new Intl.DateTimeFormat('ru-RU', {
			dateStyle: 'short',
			timeStyle: 'short',
			timeZone: 'Europe/Moscow'
		}).format(new Date(value));
	}

	function leadName(lead) {
		return lead.company_name || lead.name || 'Без названия';
	}

	function leadPerson(lead) {
		return lead.contact_person || lead.name || '—';
	}

	function leadContact(lead) {
		return [lead.phone, lead.email, lead.contact].filter(Boolean).join(' · ') || '—';
	}
</script>

<svelte:head>
	<title>Заявки — МегаПак Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="relative z-10 min-h-screen bg-[#f3f1eb] px-4 pt-28 pb-20 md:pt-32">
	{#if !data.authenticated}
		<section class="mx-auto max-w-md">
			<div class="overflow-hidden rounded-3xl border border-brand-divider bg-white shadow-xl">
				<div class="border-b border-brand-divider bg-brand-dark px-7 py-8 text-white">
					<p class="text-[10px] font-bold tracking-[0.2em] text-white/55 uppercase">МегаПак</p>
					<h1 class="mt-3 font-serif text-3xl font-light">Вход в панель заявок</h1>
					<p class="mt-2 text-sm leading-relaxed text-white/65">
						Доступ разрешён только администраторам из mp-auth.
					</p>
				</div>

				<form method="POST" action="?/login" use:enhance class="space-y-5 p-7">
					<label class="block">
						<span class="mb-2 block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
							Email
						</span>
						<input
							name="email"
							type="email"
							autocomplete="username"
							required
							value={form?.action === 'login' ? form.email || '' : ''}
							class="w-full rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
						/>
					</label>

					<label class="block">
						<span class="mb-2 block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
							Пароль
						</span>
						<input
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="w-full rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
						/>
					</label>

					{#if data.sessionExpired}
						<p class="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
							Сессия истекла. Войдите снова.
						</p>
					{/if}
					{#if form?.action === 'login' && form.message}
						<p class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
							{form.message}
						</p>
					{/if}

					<button
						type="submit"
						class="w-full rounded-xl bg-brand-dark px-5 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition hover:bg-neutral-800"
					>
						Войти
					</button>
				</form>
			</div>
		</section>
	{:else}
		<div class="mx-auto max-w-[1500px]">
			<header class="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
				<div>
					<div class="flex items-center gap-3">
						<p class="text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase">
							Панель управления
						</p>
						{#if data.previewMode}
							<span
								class="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-[9px] font-bold tracking-wider text-amber-800 uppercase"
							>
								Dev-предпросмотр
							</span>
						{/if}
					</div>
					<h1
						class="mt-2 font-serif text-4xl font-light tracking-tight text-brand-dark md:text-5xl"
					>
						Заявки клиентов
					</h1>
					<p class="mt-2 text-sm text-brand-gray">
						Онлайн-формы и обращения, зафиксированные менеджером по телефону.
					</p>
				</div>

				{#if !data.previewMode}
					<form method="POST" action="?/logout" use:enhance>
						<button
							type="submit"
							class="rounded-xl border border-brand-divider bg-white px-5 py-3 text-xs font-bold tracking-wider text-brand-dark uppercase transition hover:bg-neutral-50"
						>
							Выйти
						</button>
					</form>
				{/if}
			</header>

			{#if data.summary}
				<section class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Сводка заявок">
					<div class="rounded-2xl border border-brand-divider bg-white p-5 shadow-sm">
						<span class="text-[10px] font-bold tracking-wider text-brand-gray uppercase">Всего</span
						>
						<strong class="mt-2 block font-serif text-4xl font-light text-brand-dark">
							{data.summary.total}
						</strong>
					</div>
					<div class="rounded-2xl border border-brand-divider bg-white p-5 shadow-sm">
						<span class="text-[10px] font-bold tracking-wider text-emerald-700 uppercase"
							>Онлайн</span
						>
						<strong class="mt-2 block font-serif text-4xl font-light text-brand-dark">
							{data.summary.online}
						</strong>
					</div>
					<div class="rounded-2xl border border-brand-divider bg-white p-5 shadow-sm">
						<span class="text-[10px] font-bold tracking-wider text-amber-700 uppercase">Офлайн</span
						>
						<strong class="mt-2 block font-serif text-4xl font-light text-brand-dark">
							{data.summary.offline}
						</strong>
					</div>
				</section>
			{/if}

			<section class="mb-8 rounded-2xl border border-brand-divider bg-white p-5 shadow-sm md:p-6">
				<div class="mb-5">
					<h2 class="font-serif text-2xl font-light text-brand-dark">Добавить офлайн-заявку</h2>
					<p class="mt-1 text-sm text-brand-gray">
						Запишите номер визита, который клиент видит в левом нижнем углу сайта.
					</p>
				</div>

				<form
					method="POST"
					action="?/createOffline"
					use:enhance
					class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5"
				>
					<select
						name="offline_type"
						required
						bind:value={offlineType}
						class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
					>
						<option value="" disabled> Тип обращения </option>
						<option value="call">Звонок</option>
						<option value="email">Почта</option>
					</select>
					<input
						name="name"
						required
						placeholder="Имя / компания"
						value={form?.action === 'createOffline' ? form.values?.name || '' : ''}
						class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
					/>
					<input
						name="contact"
						type={offlineType === 'email' ? 'email' : offlineType === 'call' ? 'tel' : 'text'}
						required
						placeholder={contactPlaceholder}
						value={form?.action === 'createOffline' ? form.values?.contact || '' : ''}
						class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none"
					/>
					<input
						name="ad_id"
						inputmode="numeric"
						pattern={'[0-9]{1,32}'}
						placeholder="Номер визита"
						value={form?.action === 'createOffline' ? form.values?.ad_id || '' : ''}
						class="rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 font-mono text-sm focus:border-brand-accent focus:outline-none"
					/>
					<button
						type="submit"
						class="rounded-xl bg-brand-dark px-5 py-3 text-xs font-bold tracking-wider text-white uppercase transition hover:bg-neutral-800"
					>
						Добавить
					</button>
					<textarea
						name="comment"
						rows="4"
						placeholder="Комментарий"
						class="min-h-28 resize-y rounded-xl border border-brand-divider bg-brand-bg px-4 py-3 text-sm leading-relaxed focus:border-brand-accent focus:outline-none md:col-span-2 xl:col-span-5"
						>{form?.action === 'createOffline' ? form.values?.comment || '' : ''}</textarea
					>
				</form>

				{#if form?.action === 'createOffline' && form.message}
					<p
						class={`mt-4 rounded-xl border p-3 text-sm ${form.success ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}
					>
						{form.message}
					</p>
				{/if}
			</section>

			{#if data.apiError}
				<p class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
					{data.apiError}
				</p>
			{:else if data.leads}
				<section class="overflow-hidden rounded-2xl border border-brand-divider bg-white shadow-sm">
					<div class="overflow-x-auto">
						<table class="w-full min-w-[1120px] border-collapse text-left text-sm">
							<thead class="bg-brand-dark text-white">
								<tr>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Дата</th>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Канал</th>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Тип</th>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Клиент</th>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Контактное лицо</th>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Связь</th>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Источник конверсии</th>
									<th class="px-5 py-4 text-[9px] tracking-wider uppercase">Комментарий</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-brand-divider">
								{#each data.leads.data as lead (lead.id)}
									<tr class="align-top transition hover:bg-neutral-50">
										<td class="px-5 py-4 text-xs whitespace-nowrap text-brand-gray">
											{formatDate(lead.created_at)}
										</td>
										<td class="px-5 py-4">
											<span
												class={`rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase ${lead.channel === 'online' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
											>
												{lead.channel === 'online' ? 'Онлайн' : 'Офлайн'}
											</span>
										</td>
										<td class="px-5 py-4 text-xs font-semibold text-brand-dark">
											{typeLabels[lead.type] || lead.type}
										</td>
										<td class="max-w-52 px-5 py-4 font-semibold text-brand-dark">
											{leadName(lead)}
										</td>
										<td class="max-w-44 px-5 py-4 text-brand-gray">{leadPerson(lead)}</td>
										<td class="max-w-56 px-5 py-4 text-xs text-brand-dark">{leadContact(lead)}</td>
										<td class="px-5 py-4">
											{#if lead.ad_id}
												<code
													class="rounded-md bg-brand-accent-light px-2 py-1 font-mono text-xs font-bold text-brand-accent"
												>
													{lead.ad_id}
												</code>
											{:else}
												<span class="text-brand-gray">—</span>
											{/if}
										</td>
										<td class="max-w-72 px-5 py-4 text-xs leading-relaxed text-brand-gray">
											{lead.comment || '—'}
										</td>
									</tr>
								{:else}
									<tr>
										<td colspan="8" class="px-5 py-12 text-center text-brand-gray">
											Заявок пока нет.
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					{#if data.leads.last_page > 1}
						<nav
							class="flex items-center justify-between border-t border-brand-divider px-5 py-4 text-sm"
						>
							<span class="text-brand-gray">
								Страница {data.leads.current_page} из {data.leads.last_page}
							</span>
							<div class="flex gap-2">
								{#if data.leads.current_page > 1}
									<a
										href={`?page=${data.leads.current_page - 1}`}
										class="rounded-lg border border-brand-divider px-3 py-2 text-xs font-bold uppercase hover:bg-neutral-50"
									>
										Назад
									</a>
								{/if}
								{#if data.leads.current_page < data.leads.last_page}
									<a
										href={`?page=${data.leads.current_page + 1}`}
										class="rounded-lg border border-brand-divider px-3 py-2 text-xs font-bold uppercase hover:bg-neutral-50"
									>
										Далее
									</a>
								{/if}
							</div>
						</nav>
					{/if}
				</section>
			{/if}
		</div>
	{/if}
</main>
