<script lang="ts">
	import { modo } from '$stores/mode.svelte';

	// Texto com duas vozes: `normal` (acadêmico-dinâmico) e `familia` (dia a dia).
	// Substitui o antigo sistema de data-s do protótipo, mas com HTML de verdade.
	let {
		normal,
		familia,
		html = false
	}: { normal: string; familia: string; html?: boolean } = $props();

	let atual = $derived(modo.familia ? familia : normal);
</script>

{#if html}
	{@html atual}
{:else}
	{atual}
{/if}
