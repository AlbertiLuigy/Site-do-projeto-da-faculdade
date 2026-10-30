<script lang="ts">
	import Secao from './Secao.svelte';
	import { simulacao } from '$stores/simulacao.svelte';
	import { brl, parseValor, paraInput } from '$lib/utils/brl';
	import type { Destino } from '$core/tax';

	const OPCOES: { chave: Destino; rotulo: string; nota: string }[] = [
		{ chave: 'fia', rotulo: 'Criança e Adolescente (FIA)', nota: 'até 3%' },
		{ chave: 'idoso', rotulo: 'Pessoa Idosa', nota: 'até 3%' },
		{ chave: 'cultura', rotulo: 'Cultura e Audiovisual', nota: 'no teto' },
		{ chave: 'esporte', rotulo: 'Esporte', nota: 'teto 7%' },
		{ chave: 'reciclagem', rotulo: 'Reciclagem', nota: 'no teto' },
		{ chave: 'pronon', rotulo: 'PRONON', nota: '+1%' },
		{ chave: 'pronas', rotulo: 'PRONAS/PCD', nota: '+1%' }
	];

	const ATALHOS = [4_000, 10_000, 20_000];

	let texto = $state('');

	function aoDigitar(evento: Event) {
		const alvo = evento.currentTarget as HTMLInputElement;
		texto = alvo.value;
		simulacao.devido = parseValor(alvo.value);
	}

	function usarAtalho(reais: number) {
		texto = paraInput(reais * 100);
		simulacao.devido = reais * 100;
	}

	function alternarDestino(chave: Destino, marcado: boolean) {
		simulacao.selecao = { ...simulacao.selecao, [chave]: marcado };
	}

	let resultado = $derived(simulacao.resultado);
	let maior = $derived(Math.max(...resultado.linhas.map((l) => l.valor), 1));
</script>

<Secao id="simulador">
	<div class="in">
		<h2>Simulador</h2>
		<p class="mu">
			Digite um imposto devido e escolha os destinos. Os valores mostram o máximo que poderia ir
			para cada fundo respeitando os limites da lei.
		</p>
		<div class="row" style="margin:16px 0 22px">
			<button
				class="b"
				class:o={simulacao.futuro}
				aria-pressed={!simulacao.futuro}
				onclick={() => (simulacao.futuro = false)}
			>
				Cenário de hoje
			</button>
			<button
				class="b"
				class:o={!simulacao.futuro}
				aria-pressed={simulacao.futuro}
				onclick={() => (simulacao.futuro = true)}
			>
				Cenário futuro
			</button>
		</div>

		<div class="sim">
			<div class="card">
				<label for="due">
					{simulacao.futuro
						? 'Imposto devido que estimo ter no futuro (R$)'
						: 'Imposto devido (R$)'}
				</label>
				<input
					id="due"
					type="text"
					inputmode="decimal"
					value={texto}
					oninput={aoDigitar}
					placeholder="Ex.: 10.000,00"
				/>
				{#if simulacao.futuro}
					<div class="row" style="margin-top:10px">
						{#each ATALHOS as v}
							<button class="b s o" onclick={() => usarAtalho(v)}>{brl(v * 100)}</button>
						{/each}
					</div>
				{/if}

				<label class="chk" style="margin-top:18px">
					<input type="checkbox" bind:checked={simulacao.completo} />
					Vou declarar no modelo completo (por deduções legais)
				</label>

				<fieldset>
					<legend>Para onde destinar</legend>
					{#each OPCOES as op}
						<label class="chk">
							<input
								type="checkbox"
								checked={simulacao.selecao[op.chave] ?? false}
								onchange={(e) => alternarDestino(op.chave, e.currentTarget.checked)}
							/>
							<span>{op.rotulo} <span class="pill">{op.nota}</span></span>
						</label>
					{/each}
				</fieldset>
			</div>

			<div class="card" id="res">
				{#if !texto.trim()}
					<p class="mu" style="margin:0">👈 Digite o imposto devido para ver o resultado.</p>
				{:else if simulacao.devido <= 0}
					<div class="warn" style="margin:0">
						<b>Imposto devido R$ 0.</b>
						Sem imposto devido não há o que destinar — e tudo bem. Tente o cenário futuro ou
						compartilhe com quem já declara.
					</div>
				{:else if resultado.linhas.length === 0}
					<p class="mu" style="margin:0">Escolha ao menos um destino.</p>
				{:else}
					<p class="mu" style="margin:0">Você poderia destinar até</p>
					<div class="big">{brl(resultado.total)}</div>
					<p class="mu">
						{resultado.percentualTotal}% do imposto devido de
						{brl(simulacao.devido)}. Seu custo total não aumenta.
					</p>
					<div class="rw">
						{#each resultado.linhas as l (l.chave)}
                                                        <div class="linha-resultado" style="margin-top:12px">
                                                                <div class="topo-resultado">
                                                                        <span class="rotulo-resultado">{l.rotulo}</span>
                                                                        <span class="valor-resultado">{brl(l.valor)}</span>
                                                                </div>
								<span class="mu">{l.nota}</span>
								<i style="width:{Math.max(6, (l.valor / maior) * 100)}%"></i>
							</div>
						{/each}
					</div>
					{#each resultado.avisos as aviso}
						<div class="warn">{aviso}</div>
					{/each}
					{#if !simulacao.completo}
						<div class="warn">
							Com o modelo simplificado não dá para destinar. Teste o completo no programa da
							Receita.
						</div>
					{/if}
					<p class="mu" style="margin:14px 0 0">
						FIA, Idoso, Cultura, Esporte e Reciclagem dividem o mesmo teto
						({resultado.percentualPool}%). Se tiver restituição, o valor volta somado a ela.
					</p>
				{/if}
			</div>
		</div>
	</div>
</Secao>

<style>
	.sim {
		display: grid;
		gap: 18px;
	}
	@media (min-width: 900px) {
		.sim {
			grid-template-columns: 1.05fr 0.95fr;
		}
		#res {
			position: sticky;
			top: 84px;
			align-self: start;
		}
	}
	fieldset {
		border: 1px solid var(--bd);
		border-radius: 16px;
		padding: 12px 16px 16px;
		margin: 20px 0 0;
	}
	legend {
		font-weight: 700;
		padding: 0 6px;
	}
        .topo-resultado {
                display: flex;
                justify-content: space-between;
                gap: 10px;
                align-items: baseline;
        }
        .rotulo-resultado {
                min-width: 0;
        }
        .valor-resultado {
                flex: none;
                white-space: nowrap;
        }
        @media (max-width: 560px) {
                .topo-resultado {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 4px;
                }
                .valor-resultado {
                        white-space: normal;
                }
        }
</style>
