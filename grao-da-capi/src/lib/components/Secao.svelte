<script lang="ts">
	import type { Snippet } from 'svelte';
	import { guia } from '$stores/guia.svelte';

	let {
		id,
		classe = '',
		children
	}: { id: string; classe?: string; children: Snippet } = $props();

	let el = $state<HTMLElement>();

	// Registra a seção quando ela entra na tela: dispara a fala da Capi e o progresso.
	$effect(() => {
		if (!el) return;
		const obs = new IntersectionObserver(
			(entradas) => {
				for (const e of entradas) {
					if (!e.isIntersecting) continue;
					if (id === 'hero') {
						guia.esconder();
					} else {
						guia.registrar(id);
					}
				}
			},
			{ threshold: 0.3 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	});
</script>

<section {id} class={classe} bind:this={el}>
	{@render children()}
</section>
