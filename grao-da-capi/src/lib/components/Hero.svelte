<script lang="ts">
	import Secao from './Secao.svelte';
	import CapiMascot from './CapiMascot.svelte';
	import Duplo from './Duplo.svelte';
	import { guia } from '$stores/guia.svelte';
</script>

<Secao id="hero">
	<div class="in hero">
		<div>
			<span class="kick">Projeto de extensão · PUC Minas</span>
			<h1>Seu imposto pode ir para onde você acredita.</h1>
			<p class="lead">
				<Duplo
					normal="Parte do seu Imposto de Renda pode ajudar projetos sociais <b>sem custo extra</b>. Descubra como em 2 minutos."
					familia="Uma parte do Imposto de Renda pode ajudar projetos sociais. Você não paga nada a mais. Veja como em 2 minutos."
					html
				/>
			</p>
                        <div class="fala-hero">
                                <div class="hero-capi-mobile" aria-hidden="true">
                                        <CapiMascot tamanho={320} brilho estagio={guia.estagio} />
                                </div>
                                <div class="bub hero-bub" role="status" aria-live="polite" style="margin-bottom:20px">
                                        <Duplo
                                                normal="Oi, eu sou a Capi, a Capital! Em 2 minutos te mostro para onde seu imposto pode ir."
                                                familia="Oi! Eu sou a Capi. Vou te explicar uma coisa bem simples sobre imposto."
                                        />
                                </div>
			</div>
			<div class="row">
				<a class="b" href="#simulador">Simular agora</a>
				<a class="b o" href="#entenda">Entender em 30s</a>
			</div>
			<div class="chips">
				<span class="chip">💸 R$ 0 a mais</span>
				<span class="chip">⏱️ 2 minutos</span>
				<span class="chip">🔒 Seus dados ficam no navegador</span>
			</div>
		</div>
                <div class="hero-capi-desktop">
                        <CapiMascot tamanho={420} brilho estagio={guia.estagio} />
                </div>
	</div>
</Secao>

<style>
	.hero {
		display: grid;
		gap: 28px;
		align-items: center;
		padding-top: clamp(28px, 6vw, 64px);
	}
        .fala-hero {
                margin-bottom: 20px;
        }
        .hero-bub {
                margin-bottom: 0 !important;
        }
        .hero-capi-mobile {
                display: none;
        }
        .hero-capi-desktop {
                display: none;
        }
	@media (min-width: 820px) {
		.hero {
			grid-template-columns: 1.15fr 0.85fr;
		}
                .hero-capi-mobile {
                        display: none;
                }
                .hero-capi-desktop {
                        display: block;
                }
                .fala-hero {
                        margin-bottom: 20px;
                }
        }
        @media (max-width: 819px) {
                .fala-hero {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                }
                .hero-capi-mobile {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        pointer-events: none;
                }
                .hero-capi-mobile :global(.stage) {
                        width: min(320px, 84vw);
                        margin: 0 auto;
                        filter: drop-shadow(0 8px 16px rgba(20, 60, 35, 0.14));
                }
                .hero-bub {
                        width: 100%;
                }
        }
        @media (max-width: 460px) {
                .hero-capi-mobile :global(.stage) {
                        width: min(290px, 82vw);
                }
	}
</style>
