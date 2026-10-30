<script lang="ts">
	import Secao from './Secao.svelte';
	import Duplo from './Duplo.svelte';
</script>

<Secao id="entenda">
	<div class="in g2" style="align-items:center">
		<div>
			<h2>A ideia em 30 segundos</h2>
			<p>
				<Duplo
					normal="Todo ano, quem declara calcula quanto deve de Imposto de Renda. A lei permite que uma parte desse valor vá para fundos de criança, idoso, cultura, esporte e saúde, em vez de ir para o caixa geral da União."
					familia="Todo ano você calcula quanto deve de imposto. Uma parte desse valor pode ir para ajudar crianças, idosos, cultura, esporte e saúde, em vez de ir toda para o governo."
				/>
			</p>
			<p>
				<Duplo
					normal="<b>Você não paga nada a mais:</b> o valor destinado é abatido do imposto a pagar ou somado à sua restituição."
					familia="<b>Você não paga nada a mais:</b> esse dinheiro sai do imposto que você já ia pagar."
					html
				/>
			</p>
		</div>
		<div class="g2">
			<div class="card">
				<h3>🏢 A analogia do condomínio</h3>
				<p class="mu" style="margin:0">
					<Duplo
						normal="Você deve R$ 100 de condomínio e a administração diz: “até R$ 6 podem ir direto para a reforma da praça”. Seu gasto é o mesmo, mas você escolheu o destino de R$ 6."
						familia="Você deve R$ 100 de condomínio. Podem dizer: “desses R$ 100, até R$ 6 podem ir direto para melhorar a praça do prédio”. Você gasta o mesmo, só escolhe onde vai o dinheiro."
					/>
				</p>
			</div>
			<div class="card">
				<h3>🧮 Só conta o imposto devido</h3>
				<p class="mu" style="margin:0">
					<Duplo
						normal="É o IR calculado sobre seus rendimentos, antes de comparar com o já retido. Os percentuais (3%, 6%, 7%, +1%) incidem sobre ele. Se for zero, não há o que destinar."
						familia="É quanto de imposto você deve no total, no papel. As porcentagens contam sobre esse valor. Se der zero, não tem o que dividir."
					/>
				</p>
			</div>
		</div>
	</div>
</Secao>
