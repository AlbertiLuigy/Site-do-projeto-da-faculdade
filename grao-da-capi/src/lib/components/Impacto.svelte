<script lang="ts">
	import Secao from './Secao.svelte';
	import { ESTATISTICAS } from '$content/site';
	import Duplo from './Duplo.svelte';
</script>

<Secao id="impacto" classe="dk">
	<div class="in">
		<h2>Por que isso importa</h2>
		<p style="max-width:70ch">
			<Duplo
				normal="O mecanismo existe desde os anos 1990 e movimenta pouco mais de 2% do seu potencial. O problema quase nunca é falta de vontade — é falta de informação."
				familia="Esse jeito de ajudar existe há muitos anos, mas quase ninguém usa. O problema não é falta de vontade: é falta de informação."
			/>
		</p>
		<div class="sg">
			{#each ESTATISTICAS as e}
				<div>
					<span class="big">{e.valor}</span>
					<p style="margin:6px 0 0">{e.rotulo}</p>
				</div>
			{/each}
		</div>
		<div class="g2" style="margin-top:26px">
			<div>
				<h3 style="color:var(--ac)">O contrassenso</h3>
				<p style="margin:0">
					Os jovens estão entre os mais engajados em causas, mas pouco usam este instrumento.
					Falta informação, não vontade.
				</p>
			</div>
			<div>
				<h3 style="color:var(--ac)">Custo zero</h3>
				<p style="margin:0">
					O valor sai do imposto que você já pagaria, e não do seu bolso. E ainda é fiscalizado
					por conselhos e tribunais de contas.
				</p>
			</div>
		</div>
	</div>
</Secao>
