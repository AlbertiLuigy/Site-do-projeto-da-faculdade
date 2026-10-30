<script lang="ts">
	import { FAQ, GLOSSARIO, CHECKLIST } from '$content/site';

	let aberto = $state<number | null>(null);
</script>

<div class="in">
	<a class="b s o" href="/">← Início</a>
	<h1 style="margin-top:18px">Material de consulta</h1>
	<p class="mu">
		Conteúdo de apoio para consultar depois da ação. Este material tem caráter informativo e não
		substitui a orientação de um contador ou advogado tributarista.
	</p>

	<h2>Dúvidas frequentes</h2>
	{#each FAQ as item, i}
		<div class="card" style="margin-bottom:12px">
			<button
				class="pergunta"
				aria-expanded={aberto === i}
				onclick={() => (aberto = aberto === i ? null : i)}
			>
				<span>{item.pergunta}</span>
				<span aria-hidden="true">{aberto === i ? '−' : '+'}</span>
			</button>
			{#if aberto === i}
				<p style="margin:10px 0 0" class="mu">{item.resposta}</p>
			{/if}
		</div>
	{/each}

	<h2 style="margin-top:40px">Glossário</h2>
	<dl class="glossario">
		{#each GLOSSARIO as termo}
			<dt>{termo.pergunta}</dt>
			<dd>{termo.resposta}</dd>
		{/each}
	</dl>

	<h2 style="margin-top:40px">Checklist rápido</h2>
	<ul class="check">
		{#each CHECKLIST as item}
			<li>{item}</li>
		{/each}
	</ul>

	<div class="warn">
		Fontes para conferir: página “Destinação do IRPF” da Receita Federal; Lei 9.250/1995 (art.
		12); ECA (Lei 8.069/1990); Lei 12.213/2010; Lei Rouanet; Lei 11.438/2006 (Esporte); Lei
		14.260/2021 (Reciclagem).
	</div>
</div>

<style>
	.pergunta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		width: 100%;
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		font-weight: 700;
		text-align: left;
		color: var(--fg);
		cursor: pointer;
		min-height: 44px;
	}
	.glossario {
		margin: 0;
	}
	.glossario dt {
		font-weight: 700;
		margin-top: 14px;
	}
	.glossario dd {
		margin: 2px 0 0;
		color: var(--mu);
	}
	.check {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.check li {
		padding: 8px 0 8px 30px;
		position: relative;
		border-bottom: 1px solid var(--bd);
	}
	.check li::before {
		content: '☐';
		position: absolute;
		left: 0;
		color: var(--br);
		font-size: 1.2rem;
	}
</style>
