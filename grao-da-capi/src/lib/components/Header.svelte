<script lang="ts">
	import { modo } from '$stores/mode.svelte';
	import { tema } from '$stores/tema.svelte';
	import { guia } from '$stores/guia.svelte';
</script>

<header>
	<a class="marca" href="/">🌱 Grão da Capi</a>
	<div class="row">
		<button
			class="b s"
			class:o={!modo.familia}
			aria-pressed={modo.familia}
			onclick={() => modo.alternar()}
		>
			<span class="lg">Explica pro meu pai/mãe</span><span class="sh">Modo família</span>
		</button>
		<button class="b s o" aria-label="Alternar tema claro/escuro" onclick={() => tema.alternar()}>
			◐
		</button>
	</div>
	<div id="bar" style="width:{guia.progresso * 100}%"></div>
</header>

<style>
	header {
		position: sticky;
		top: env(safe-area-inset-top, 0px);
		z-index: 21;
		background: var(--card);
		border-bottom: 1px solid var(--bd);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 8px clamp(12px, 3vw, 28px);
		min-height: 58px;
	}
	.marca {
		font: 700 1.1rem 'Arial Rounded MT Bold', 'Trebuchet MS', sans-serif;
		display: flex;
		align-items: center;
		gap: 8px;
		white-space: nowrap;
		text-decoration: none;
		color: var(--fg);
	}
	#bar {
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 4px;
		background: linear-gradient(90deg, var(--br), var(--ac));
		border-radius: 0 4px 4px 0;
		transition: width 0.6s;
	}
</style>
