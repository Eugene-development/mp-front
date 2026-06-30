<script lang="ts">
	/**
	 * Honeypot-поле — скрытая ловушка для примитивных ботов.
	 *
	 * Визуально скрыто (но доступно DOM/ботам): opacity:0, position:absolute,
	 * вынесено за пределы экрана. Реальный пользователь его не увидит и не заполнит;
	 * бот, «сканирующий» форму, обычно заполняет все поля — и тем самым себя выдаёт.
	 * Если поле заполнено → форма блокируется на сабмите (см. useFormGuard).
	 *
	 * Дополнительные антибот-приёмы:
	 *  - рандомизированное имя поля (name=...) — бот не сможет игнорировать его по списку;
	 *  - tabindex=-1 и autocomplete=off — чтобы не мешать пользователю и автозаполнению;
	 *  - aria-hidden + пустой label — доступность сохранена (скринридеры пропускают).
	 *
	 * Стили намеренно инлайновые: на них не должен влиять Tailwind preflight/сброс.
	 */
	import { onMount } from 'svelte';

	let { value = $bindable('') }: { value: string } = $props();

	/** Имя поля — генерируется при монтировании, чтобы его нельзя было занести в чёрный список. */
	let fieldName = $state<string>('');

	onMount(() => {
		fieldName = 'mp_' + Math.random().toString(36).slice(2, 8);
	});
</script>

<!--
	Ловушка. tabindex=-1 и aria-hidden=true — поле невидимо для клавиатуры и
	скринридеров, но остаётся в DOM и доступно ботам. Стили скрывают визуально,
	но НЕ через display:none (иначе некоторые боты пропускают скрытые поля).
-->
<div
	aria-hidden="true"
	style="position:absolute;left:-9999px;top:0;opacity:0;width:1px;height:1px;overflow:hidden;pointer-events:none"
>
	<label
		for={fieldName}
		style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"
		>Оставьте это поле пустым</label
	>
	<input id={fieldName} name={fieldName} type="text" autocomplete="off" tabindex="-1" bind:value />
</div>
