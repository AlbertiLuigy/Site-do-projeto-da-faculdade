<script lang="ts">
	import '../app.css';
	import Header from '$components/Header.svelte';
	import CapiBubble from '$components/CapiBubble.svelte';
	import Rodape from '$components/Rodape.svelte';
	import { tema } from '$stores/tema.svelte';
	import { guia } from '$stores/guia.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const TITULOS: Record<string, string> = {
		'/': 'Grão da Capi — destine seu IR com consciência',
		'/simulador': 'Simulador — Grão da Capi',
		'/mitos': 'Mito ou verdade? — Grão da Capi',
		'/passos': 'Passo a passo — Grão da Capi',
		'/destinos': 'Para onde vai — Grão da Capi',
		'/impacto': 'Por que isso importa — Grão da Capi',
		'/capi': 'Por que a Capi? — Grão da Capi',
		'/compartilhe': 'Leve a semente para casa — Grão da Capi',
		'/material': 'Material de consulta — Grão da Capi',
		'/sobre': 'Sobre o Projeto GRÃO — Grão da Capi'
	};

	let titulo = $derived(TITULOS[page.url.pathname] ?? 'Grão da Capi');

	// Tema: lê a preferência do usuário e aplica no elemento raiz.
	$effect(() => {
		tema.iniciar();
	});
	$effect(() => {
		document.documentElement.dataset.theme = tema.atual;
	});

	// O crescimento da muda acompanha o progresso de leitura.
	$effect(() => {
		document.documentElement.style.setProperty('--g', String(0.6 + 0.8 * guia.progresso));
	});
</script>

<svelte:head>
	<title>{titulo}</title>
	<meta
		name="description"
		content="Projeto GRÃO: entenda como destinar parte do seu Imposto de Renda a projetos sociais, sem pagar nada a mais."
	/>
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<CapiBubble />
<Rodape />
