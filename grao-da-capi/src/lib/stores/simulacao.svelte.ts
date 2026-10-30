import { calcular, type Resultado, type Selecao } from '$core/tax';

/** Estado compartilhado do simulador (usado também pelo card de compartilhamento). */
class SimulacaoStore {
	/** Imposto devido em centavos. */
	devido = $state(0);
	selecao = $state<Selecao>({});
	/** Usuário declara no modelo completo? */
	completo = $state(true);
	/** Cenário futuro ("quando eu tiver um salário de..."). */
	futuro = $state(false);

	resultado = $derived<Resultado>(calcular(this.devido, this.selecao));

	get causas(): string[] {
		const rotulos: Record<string, string> = {
			fia: 'Criança e Adolescente',
			idoso: 'Pessoa Idosa',
			cultura: 'Cultura',
			esporte: 'Esporte',
			reciclagem: 'Reciclagem',
			pronon: 'PRONON',
			pronas: 'PRONAS/PCD'
		};
		return Object.entries(this.selecao)
			.filter(([, marcado]) => marcado)
			.map(([chave]) => rotulos[chave])
			.filter(Boolean);
	}
}

export const simulacao = new SimulacaoStore();
