<script lang="ts">
	import Secao from './Secao.svelte';
	import { MITOS } from '$content/site';
	import { CAPI_EXTRA } from '$content/capi';
	import CapiMascot from './CapiMascot.svelte';

	let indice = $state(0);
	let acertos = $state(0);
	let respondida = $state(false);
	let ultimoOk = $state(false);

	let fim = $derived(indice >= MITOS.length);

	function responder(resposta: boolean) {
		if (respondida) return;
		const pergunta = MITOS[indice];
		ultimoOk = resposta === pergunta.verdade;
		if (ultimoOk) acertos++;
		respondida = true;
	}

	function proxima() {
		indice++;
		respondida = false;
	}

	function reiniciar() {
		indice = 0;
		acertos = 0;
		respondida = false;
	}
</script>

<Secao id="mitos" classe="alt">
	<div class="in">
		<h2 style="text-align:center">Mito ou verdade?</h2>
		<div class="quiz">
			<div class="card">
				{#if fim}
					<div class="fim">
						<CapiMascot tamanho={140} brilho={acertos >= 5} />
						<p class="resultado">Você acertou {acertos} de {MITOS.length}!</p>
						<p>
							{acertos >= 5
								? 'Já dá para ensinar em casa. 🎉'
								: 'Releia “A ideia em 30 segundos” e tente de novo.'}
						</p>
						<button class="b" onclick={reiniciar}>Jogar de novo</button>
					</div>
				{:else}
					<div class="dots" aria-hidden="true">
						{#each MITOS as _, i}
							<i class:on={i <= indice}></i>
						{/each}
					</div>
					<p class="pergunta" id="qt">“{MITOS[indice].frase}”</p>
					<div class="qb">
						<button class="b o" disabled={respondida} onclick={() => responder(false)}>Mito</button>
						<button class="b" disabled={respondida} onclick={() => responder(true)}>Verdade</button>
					</div>
					{#if respondida}
						<div class="warn" style="margin-bottom:0">
							<b style="color:var(--{ultimoOk ? 'ok' : 'no'})">
								{ultimoOk ? 'Acertou! 🎉' : 'Quase!'}
							</b>
							{MITOS[indice].explicacao}
						</div>
						<div class="row" style="margin-top:14px">
							<button class="b s" onclick={proxima}>
								{indice + 1 < MITOS.length ? 'Próxima' : 'Ver resultado'}
							</button>
							<span class="mu">{CAPI_EXTRA[ultimoOk ? 'acerto' : 'erro'].normal}</span>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</Secao>

<style>
	.quiz {
		max-width: 720px;
		margin: 0 auto;
	}
	#qt {
		font: 700 clamp(1.2rem, 3vw, 1.6rem) / 1.3 'Arial Rounded MT Bold', 'Trebuchet MS', sans-serif;
		margin: 12px 0 18px;
		max-width: none;
	}
	.fim {
		text-align: center;
	}
	.resultado {
		font: 700 1.5rem 'Arial Rounded MT Bold', 'Trebuchet MS', sans-serif;
		color: var(--br);
		margin: 12px auto;
	}
        @media (max-width: 560px) {
                .qb {
                        flex-direction: column;
                }
                .qb .b {
                        width: 100%;
                }
        }
</style>
