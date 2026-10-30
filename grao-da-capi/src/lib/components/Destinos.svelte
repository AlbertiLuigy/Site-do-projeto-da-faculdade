<script lang="ts">
	import Secao from './Secao.svelte';
	import { DESTINOS, CAUSAS } from '$content/site';

	let filtro = $state<(typeof CAUSAS)[number]>('Todas');
	let lista = $derived(DESTINOS.filter((d) => filtro === 'Todas' || d.causa === filtro));
</script>

<Secao id="destinos">
	<div class="in">
		<h2>Para onde vai</h2>
		<p class="mu">Filtre pela causa que você mais apoia e veja quem pode receber.</p>
		<div class="row" id="chips" style="margin:16px 0 4px">
			{#each CAUSAS as causa}
				<button
					class="b s"
					class:o={filtro !== causa}
					aria-pressed={filtro === causa}
					onclick={() => (filtro = causa)}
				>
					{causa}
				</button>
			{/each}
		</div>
		<div class="dg">
			{#each lista as d (d.nome)}
				<div class="card">
					<span class="ic">{d.icone}</span>
					<h3>{d.nome}</h3>
					<span class="pill">{d.causa}</span>
					<p style="margin:10px 0 0" class="mu">{d.descricao}</p>
				</div>
			{/each}
		</div>
	</div>
</Secao>
