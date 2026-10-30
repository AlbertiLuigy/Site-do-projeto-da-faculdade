<script lang="ts">
	import Secao from './Secao.svelte';
	import { simulacao } from '$stores/simulacao.svelte';
	import { brl } from '$lib/utils/brl';
	import capi from '$lib/assets/capi.webp';

	const FRASE_BASE =
		'Sabia que dá para destinar uma parte do imposto de renda para projetos sociais sem pagar nada a mais? Veja no Grão da Capi.';

	let aviso = $state('');
	let capiImg: HTMLImageElement | null = null;

	$effect(() => {
		const img = new Image();
		img.src = capi;
		img.onload = () => {
			capiImg = img;
		};
	});

	let texto = $derived.by(() => {
		const cidade = simulacao.cidade.trim();
		if (simulacao.resultado.total > 0) {
			const causas = simulacao.causas.join(', ');
			return `🌱 Eu simulei destinar até ${brl(simulacao.resultado.total)} do meu IR para ${causas}${cidade ? ' em ' + cidade : ''}. E você?`;
		}
		return `🌱 Eu aprendi que dá para destinar parte do IR a projetos sociais${cidade ? ' em ' + cidade : ''} sem pagar a mais. E você?`;
	});

	function desenhar(): HTMLCanvasElement {
		const canvas = document.createElement('canvas');
		canvas.width = 1080;
		canvas.height = 1920;
		const ctx = canvas.getContext('2d')!;

		const gradiente = ctx.createLinearGradient(0, 0, 1080, 1920);
		gradiente.addColorStop(0, '#1f7a47');
		gradiente.addColorStop(1, '#0f3a22');
		ctx.fillStyle = gradiente;
		ctx.fillRect(0, 0, 1080, 1920);

		ctx.fillStyle = '#fff';
		ctx.font = '700 68px sans-serif';
		let y = 330;
		let linha = '';
		for (const palavra of texto.split(' ')) {
			const teste = linha ? linha + ' ' + palavra : palavra;
			if (ctx.measureText(teste).width > 900) {
				ctx.fillText(linha, 90, y);
				y += 92;
				linha = palavra;
			} else {
				linha = teste;
			}
		}
		ctx.fillText(linha, 90, y);

		ctx.fillStyle = '#f0a93b';
		ctx.font = '600 42px sans-serif';
		ctx.fillText('Grão da Capi · Projeto GRÃO', 90, 1810);

		if (capiImg) {
			const h = 720;
			const w = (h * capiImg.naturalWidth) / capiImg.naturalHeight;
			ctx.drawImage(capiImg, 1080 - 90 - w, 1700 - h, w, h);
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
			<label for="cid">Sua cidade (opcional, entra no card)</label>
			<input id="cid" type="text" bind:value={simulacao.cidade} placeholder="Ex.: Belo Horizonte" />
			<div class="row" style="margin-top:18px">
				<button class="b" onclick={compartilhar}>Compartilhar</button>
				<button class="b o" onclick={whatsapp}>WhatsApp</button>
				<button class="b o" onclick={copiar}>Copiar frase</button>
				<button class="b o" onclick={baixar}>Baixar card</button>
			</div>
			{#if aviso}<p class="mu" role="status" style="margin-top:10px">{aviso}</p>{/if}
		</div>
		<div class="sel" aria-label="Prévia do card de compartilhamento">
			<span>
				{texto}
				<small>Grão da Capi · Projeto GRÃO</small>
			</span>
			<span class="sel-capi"><img src={capi} alt="" /></span>
		</div>
	</div>
</Secao>

<style>
	.sel-capi {
		display: block;
	}
	.sel-capi img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
