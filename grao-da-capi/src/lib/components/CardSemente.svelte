<script lang="ts">
	import Secao from './Secao.svelte';
	import { simulacao } from '$stores/simulacao.svelte';
	import { brl } from '$lib/utils/brl';
	import capi from '$lib/assets/capi.webp';

	const FRASE_BASE =
		'Sabia que dá para destinar uma parte do imposto de renda para projetos sociais sem pagar nada a mais? Veja no Grão da Capi.';

	let aviso = $state('');
	let capiImg: HTMLImageElement | null = null;

        let tituloCard = $derived(
                simulacao.resultado.total > 0 ? 'Eu fiz a simulação' : 'Eu descobri um jeito de ajudar'
        );

        let resumoCausas = $derived.by(() => {
                if (!simulacao.causas.length) return 'Projetos sociais';
                return simulacao.causas.join(' • ');
        });

	$effect(() => {
		const img = new Image();
		img.src = capi;
		img.onload = () => {
			capiImg = img;
		};
	});

	let texto = $derived.by(() => {
		if (simulacao.resultado.total > 0) {
			const causas = simulacao.causas.join(', ');
			return `🌱 Eu simulei destinar até ${brl(simulacao.resultado.total)} do meu IR para ${causas}. E você?`;
		}
		return '🌱 Eu aprendi que dá para destinar parte do IR a projetos sociais sem pagar a mais. E você?';
	});

        function roundRect(
                ctx: CanvasRenderingContext2D,
                x: number,
                y: number,
                w: number,
                h: number,
                r: number
        ) {
                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.arcTo(x + w, y, x + w, y + h, r);
                ctx.arcTo(x + w, y + h, x, y + h, r);
                ctx.arcTo(x, y + h, x, y, r);
                ctx.arcTo(x, y, x + w, y, r);
                ctx.closePath();
        }

        function quebrarTexto(ctx: CanvasRenderingContext2D, valor: string, largura: number) {
                const linhas: string[] = [];
                let linha = '';
                for (const palavra of valor.split(' ')) {
                        const teste = linha ? `${linha} ${palavra}` : palavra;
                        if (ctx.measureText(teste).width > largura && linha) {
                                linhas.push(linha);
                                linha = palavra;
                        } else {
                                linha = teste;
                        }
                }
                if (linha) linhas.push(linha);
                return linhas;
        }

        function pill(ctx: CanvasRenderingContext2D, x: number, y: number, texto: string, fundo: string, cor: string) {
                ctx.font = '600 28px Segoe UI';
                const largura = ctx.measureText(texto).width + 42;
                roundRect(ctx, x, y, largura, 52, 26);
                ctx.fillStyle = fundo;
                ctx.fill();
                ctx.fillStyle = cor;
                ctx.fillText(texto, x + 21, y + 35);
                return largura;
        }

	function desenhar(): HTMLCanvasElement {
		const canvas = document.createElement('canvas');
		canvas.width = 1080;
		canvas.height = 1920;
		const ctx = canvas.getContext('2d')!;

		const gradiente = ctx.createLinearGradient(0, 0, 1080, 1920);
                gradiente.addColorStop(0, '#1f7a47');
                gradiente.addColorStop(0.52, '#14663b');
                gradiente.addColorStop(1, '#0b321d');
		ctx.fillStyle = gradiente;
		ctx.fillRect(0, 0, 1080, 1920);

                const brilhoTopo = ctx.createRadialGradient(180, 140, 0, 180, 140, 420);
                brilhoTopo.addColorStop(0, 'rgba(255,255,255,0.18)');
                brilhoTopo.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = brilhoTopo;
                ctx.fillRect(0, 0, 1080, 1920);

                const brilhoBaixo = ctx.createRadialGradient(840, 1480, 0, 840, 1480, 360);
                brilhoBaixo.addColorStop(0, 'rgba(240,169,59,0.22)');
                brilhoBaixo.addColorStop(1, 'rgba(240,169,59,0)');
                ctx.fillStyle = brilhoBaixo;
                ctx.fillRect(0, 0, 1080, 1920);

                roundRect(ctx, 66, 66, 948, 1788, 42);
                ctx.fillStyle = 'rgba(255,255,255,0.06)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.14)';
                ctx.lineWidth = 2;
                ctx.stroke();

                pill(ctx, 94, 108, 'Projeto de extensao · PUC Minas', 'rgba(255,255,255,0.14)', '#e8f3ea');

                ctx.fillStyle = '#ffffff';
                ctx.font = '700 70px Arial Rounded MT Bold, Trebuchet MS, sans-serif';
                const tituloLinhas = quebrarTexto(ctx, tituloCard, 520);
                let y = 260;
                for (const linha of tituloLinhas) {
                        ctx.fillText(linha, 96, y);
                        y += 82;
		}

                ctx.font = '600 58px Arial Rounded MT Bold, Trebuchet MS, sans-serif';
                const textoLinhas = quebrarTexto(ctx, texto, 560);
                y += 34;
                for (const linha of textoLinhas) {
                        ctx.fillText(linha, 96, y);
                        y += 74;
                }

                let xMeta = 96;
                y += 30;
                if (simulacao.resultado.total > 0) {
                        xMeta +=
                                pill(ctx, xMeta, y, `${brl(simulacao.resultado.total)} simulados`, '#f0a93b', '#2a1d05') + 14;
                }
                pill(ctx, xMeta, y, resumoCausas, 'rgba(255,255,255,0.12)', '#ffffff');

                roundRect(ctx, 96, 1660, 888, 164, 32);
                ctx.fillStyle = 'rgba(10, 32, 20, 0.26)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.stroke();

                ctx.fillStyle = '#e8f3ea';
                ctx.font = '600 32px Segoe UI';
                ctx.fillText('Grão da Capi · Projeto GRÃO', 132, 1720);
                ctx.fillStyle = '#f0a93b';
                ctx.font = '700 44px Arial Rounded MT Bold, Trebuchet MS, sans-serif';
                ctx.fillText('Seu imposto pode apoiar o que importa.', 132, 1774);
                ctx.fillStyle = '#d5e7d9';
                ctx.font = '500 29px Segoe UI';
                ctx.fillText('Compartilhe, explique em casa e faça essa ideia circular.', 132, 1814);

		if (capiImg) {
                        const h = 680;
			const w = (h * capiImg.naturalWidth) / capiImg.naturalHeight;
                        ctx.drawImage(capiImg, 1080 - 88 - w, 1530 - h, w, h);
		}
		return canvas;
	}

	function baixar() {
		const canvas = desenhar();
		canvas.toBlob((blob) => {
			if (!blob) return;
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'grao-da-capi.png';
			link.click();
		});
	}

	async function copiar() {
		try {
			await navigator.clipboard.writeText(FRASE_BASE);
			aviso = 'Frase copiada!';
		} catch {
			aviso = 'Não deu para copiar. Selecione e copie manualmente.';
		}
	}

	function whatsapp() {
		window.open('https://wa.me/?text=' + encodeURIComponent(FRASE_BASE), '_blank');
	}

	function compartilhar() {
		const completo = `${texto} Simule no Grão da Capi.`;
		if (navigator.share) {
			navigator.share({ text: completo }).catch(() => {});
		} else {
			window.open('https://wa.me/?text=' + encodeURIComponent(completo), '_blank');
		}
	}
</script>

<Secao id="semente" classe="alt">
	<div class="in g2" style="align-items:center">
		<div>
			<h2>Leve a semente para casa</h2>
			<p>
				Quem já declara pode destinar agora. Envie esta mensagem para um familiar, poste nos
				stories ou baixe o card para compartilhar.
			</p>
			<div class="row" style="margin-top:18px">
				<button class="b" onclick={compartilhar}>Compartilhar</button>
				<button class="b o" onclick={whatsapp}>WhatsApp</button>
				<button class="b o" onclick={copiar}>Copiar frase</button>
				<button class="b o" onclick={baixar}>Baixar card</button>
			</div>
			{#if aviso}<p class="mu" role="status" style="margin-top:10px">{aviso}</p>{/if}
		</div>
		<div class="sel" aria-label="Prévia do card de compartilhamento">
                        <div class="sel-copy">
                                <span class="sel-kick">Projeto de extensão · PUC Minas</span>
                                <strong class="sel-title">{tituloCard}</strong>
                                <p class="sel-texto">{texto}</p>
                                <div class="sel-meta">
                                        {#if simulacao.resultado.total > 0}
                                                <span class="sel-pill sel-pill-ac">{brl(simulacao.resultado.total)} simulados</span>
                                        {/if}
                                        <span class="sel-pill">{resumoCausas}</span>
                                </div>
                        </div>
                        <div class="sel-art" aria-hidden="true">
                                <span class="sel-glow"></span>
                                <span class="sel-capi"><img src={capi} alt="" /></span>
                        </div>
                        <div class="sel-footer">
                                <small>Grão da Capi · Projeto GRÃO</small>
                                <b>Seu imposto pode apoiar o que importa.</b>
                                <span>Compartilhe, explique em casa e faça essa ideia circular.</span>
                        </div>
		</div>
	</div>
</Secao>

<style>
        .sel-copy {
                display: flex;
                flex-direction: column;
                gap: 12px;
                min-width: 0;
        }
        .sel-kick {
                width: fit-content;
                max-width: 100%;
                border-radius: 999px;
                padding: 8px 14px;
                background: rgba(255, 255, 255, 0.14);
                border: 1px solid rgba(255, 255, 255, 0.1);
                font: 600 0.78rem/1.2 'Segoe UI', sans-serif;
                color: #eef7ef;
        }
        .sel-title {
                font-size: clamp(1.45rem, 1vw + 1.2rem, 2rem);
                line-height: 1.02;
                letter-spacing: -0.03em;
        }
        .sel-texto {
                margin: 0;
                max-width: 28ch;
                color: rgba(255, 255, 255, 0.96);
                font-size: 1.05rem;
                line-height: 1.42;
        }
        .sel-meta {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
        }
        .sel-pill {
                display: inline-flex;
                align-items: center;
                min-height: 34px;
                padding: 7px 12px;
                border-radius: 999px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.08);
                font: 600 0.8rem/1.2 'Segoe UI', sans-serif;
                color: #eef7ef;
        }
        .sel-pill-ac {
                background: var(--ac);
                color: #2a1d05;
                border-color: transparent;
        }
        .sel-footer {
                grid-column: 1 / -1;
                margin-top: 2px;
                padding: 16px 18px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                border-radius: 20px;
                background: rgba(10, 32, 20, 0.28);
                border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sel-footer b {
                font-size: 1rem;
                line-height: 1.2;
        }
        .sel-footer span {
                color: rgba(232, 243, 236, 0.88);
                font: 500 0.86rem/1.4 'Segoe UI', sans-serif;
        }
        .sel-art {
                position: relative;
                min-height: 270px;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                align-self: end;
        }
        .sel-glow {
                position: absolute;
                right: 22px;
                bottom: 18px;
                width: 210px;
                height: 210px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(240, 169, 59, 0.28), rgba(240, 169, 59, 0));
                filter: blur(10px);
        }
	.sel-capi {
		display: block;
                position: relative;
                z-index: 1;
                width: min(100%, 220px);
	}
	.sel-capi img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
