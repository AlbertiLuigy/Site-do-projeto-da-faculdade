<script lang="ts">
	import capi from '$lib/assets/capi.webp';

	let {
		tamanho = 320,
		brilho = false,
		estagio = ''
	}: { tamanho?: number; brilho?: boolean; estagio?: string } = $props();
</script>

<div class="stage" class:brilho style="--t:{tamanho}px">
	<img src={capi} alt="Capi, a Capivara Capital" width="447" height="524" decoding="async" />
	{#if estagio}<span class="muda" aria-hidden="true">{estagio}</span>{/if}
</div>

<style>
	.stage {
		max-width: var(--t);
	}
	.stage img {
		display: block;
		width: 100%;
		height: auto;
	}
	.stage.brilho::before {
		opacity: 1;
	}
	.stage::before {
		opacity: 0;
		transition: opacity 0.4s;
	}
	.muda {
		position: absolute;
		right: 6%;
		bottom: 4%;
		font-size: calc(var(--t) / 9);
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
		z-index: 2;
	}
</style>
