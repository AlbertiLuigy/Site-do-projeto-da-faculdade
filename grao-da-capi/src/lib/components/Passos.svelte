<script lang="ts">
	import Secao from './Secao.svelte';
	import { PASSOS, CHECKLIST } from '$content/site';

	let aba = $state<'declaracao' | 'ano'>('declaracao');
	let verChecklist = $state(false);
	let atual = $derived(PASSOS[aba]);
</script>

<Secao id="passos" classe="alt">
	<div class="in">
		<h2>Passo a passo</h2>
		<p class="mu">
			Escolha o caminho conforme o destino que você quer apoiar. Os dois podem ser combinados,
			desde que a soma respeite os limites.
		</p>
		<div class="row" style="margin:18px 0 22px">
			<button
				class="b"
				class:o={aba !== 'declaracao'}
				aria-pressed={aba === 'declaracao'}
				onclick={() => (aba = 'declaracao')}
			>
				Direto na declaração
			</button>
			<button
				class="b"
				class:o={aba !== 'ano'}
				aria-pressed={aba === 'ano'}
				onclick={() => (aba = 'ano')}
			>
				Durante o ano
			</button>
		</div>
		<div class="g2">
			<div class="card">
				<h3>{atual.titulo}</h3>
				<ol class="st">
					{#each atual.itens as item}
						<li>{@html item}</li>
					{/each}
				</ol>
			</div>
			<div>
				<div class="warn">{atual.nota}</div>
				<button class="b o" onclick={() => (verChecklist = !verChecklist)}>
					{verChecklist ? 'Esconder checklist' : 'Ver checklist rápido'}
				</button>
				{#if verChecklist}
					<ul class="check">
						{#each CHECKLIST as item}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</Secao>

<style>
	.check {
		list-style: none;
		padding: 0;
		margin: 16px 0 0;
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
		line-height: 1.3;
	}
</style>
