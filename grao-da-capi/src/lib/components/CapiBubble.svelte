<script lang="ts">
	import { guia } from '$stores/guia.svelte';
	import { modo } from '$stores/mode.svelte';
	import { CAPI_LINHAS } from '$content/capi';
	import capi from '$lib/assets/capi.webp';

	const semMovimento =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let texto = $state('');

	// Efeito de digitação, reexecutado quando a seção ou a voz muda.
	$effect(() => {
		const chave = guia.chave;
		const voz = modo.familia ? 'familia' : 'normal';
		const alvo = chave ? (CAPI_LINHAS[chave]?.[voz] ?? '') : '';

		if (!alvo) {
			texto = '';
			return;
		}
		if (semMovimento) {
			texto = alvo;
			return;
		}

		let i = 0;
		texto = '';
		const timer = setInterval(() => {
			texto = alvo.slice(0, ++i);
			if (i >= alvo.length) clearInterval(timer);
		}, 16);
		return () => clearInterval(timer);
	});
</script>

<div class="guia" class:on={guia.visivel} aria-hidden={!guia.visivel}>
	<div class="cs"><img src={capi} alt="" /></div>
	<div class="bub" role="status" aria-live="polite">
		<span>{texto}</span>
		<span class="estagio" aria-hidden="true">{guia.estagio}</span>
	</div>
</div>

<style>
	.guia {
		position: fixed;
		left: 12px;
		right: 12px;
		bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
		z-index: 22;
		display: none;
		gap: 10px;
		align-items: flex-end;
		max-width: 680px;
		margin: 0 auto;
	}
	.guia.on {
		display: flex;
	}
	.cs {
		width: 62px;
		flex: none;
	}
	.cs img {
		width: 100%;
		border-radius: 50%;
		background: var(--bg2);
		border: 2px solid var(--br);
	}
	.bub {
		flex: 1;
		font-size: 0.93rem;
		line-height: 1.4;
		padding: 10px 14px;
		display: flex;
		gap: 8px;
		align-items: center;
		justify-content: space-between;
	}
	.estagio {
		font-size: 1.3rem;
		flex: none;
	}
</style>
