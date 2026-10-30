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
        <div class="cs" aria-hidden="true">
                <span class="halo"></span>
                <img src={capi} alt="" />
        </div>
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
                gap: 14px;
		align-items: flex-end;
                max-width: 760px;
		margin: 0 auto;
	}
	.guia.on {
		display: flex;
	}
	.cs {
                position: relative;
                width: 82px;
                height: 82px;
		flex: none;
                border-radius: 26px;
                padding: 6px;
                background:
                        radial-gradient(circle at 28% 22%, rgba(255, 255, 255, 0.9), transparent 35%),
                        linear-gradient(160deg, #f7c468 0%, #f0a93b 45%, #1f7a47 100%);
                box-shadow:
                        0 16px 30px rgba(16, 56, 33, 0.18),
                        inset 0 1px 0 rgba(255, 255, 255, 0.45);
	}
        .halo {
                position: absolute;
                inset: -6px;
                border-radius: 32px;
                background: radial-gradient(circle, rgba(240, 169, 59, 0.28), transparent 68%);
                z-index: 0;
                pointer-events: none;
        }
        .cs img {
                position: relative;
                z-index: 1;
		width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: center bottom;
                border-radius: 20px;
                display: block;
                background:
                        linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.22)),
                        var(--bg2);
                border: 1px solid rgba(255, 255, 255, 0.55);
                padding: 4px;
	}
	.bub {
		flex: 1;
		font-size: 0.93rem;
                line-height: 1.48;
                padding: 14px 18px;
		display: flex;
                gap: 12px;
                align-items: flex-start;
		justify-content: space-between;
                border-radius: 24px 24px 24px 10px;
                border-width: 2px;
                box-shadow:
                        0 14px 28px rgba(16, 56, 33, 0.14),
                        inset 0 1px 0 rgba(255, 255, 255, 0.65);
                background:
                        linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.86)),
                        var(--card);
                backdrop-filter: blur(10px);
        }
        .bub > span:first-child {
                flex: 1;
                padding-top: 2px;
	}
	.estagio {
                display: inline-grid;
                place-items: center;
		flex: none;
                width: 40px;
                height: 40px;
                border-radius: 14px;
                font-size: 1.15rem;
                background: linear-gradient(180deg, rgba(240, 169, 59, 0.18), rgba(31, 122, 71, 0.12));
                border: 1px solid rgba(31, 122, 71, 0.16);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
        }
        @media (max-width: 560px) {
                .guia {
                        gap: 10px;
                        align-items: center;
                }
                .cs {
                        width: 60px;
                        height: 60px;
                        border-radius: 18px;
                }
                .bub {
                        padding: 12px 14px;
                        font-size: 0.9rem;
                }
                .estagio {
                        width: 32px;
                        height: 32px;
                        border-radius: 12px;
                        font-size: 0.95rem;
                }
	}
</style>
