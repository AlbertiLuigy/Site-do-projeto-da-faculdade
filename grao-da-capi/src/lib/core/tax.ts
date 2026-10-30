/**
 * Motor de cálculo da destinação do Imposto de Renda (pessoa física).
 *
 * Regras implementadas (base: Guia do Projeto GRÃO / legislação vigente):
 *  - O teto do "pool" é 6% do imposto devido; sobe para 7% se houver esporte.
 *  - FIA e Fundo do Idoso: até 3% cada (direto na declaração), dentro do pool.
 *  - Cultura, Esporte e Reciclagem: dentro do pool compartilhado.
 *  - PRONON e PRONAS/PCD: +1% cada, FORA do teto.
 *  - Esporte e Reciclagem não se combinam na mesma declaração.
 *  - Só existe destinação se houver imposto devido > 0.
 *
 * Todos os valores são tratados em CENTAVOS (inteiros) para evitar erro de ponto flutuante.
 */

export type Destino =
	| 'fia'
	| 'idoso'
	| 'cultura'
	| 'esporte'
	| 'reciclagem'
	| 'pronon'
	| 'pronas';

export interface Selecao {
	fia?: boolean;
	idoso?: boolean;
	cultura?: boolean;
	esporte?: boolean;
	reciclagem?: boolean;
	pronon?: boolean;
	pronas?: boolean;
}

export interface LinhaDestino {
	chave: Destino;
	rotulo: string;
	/** Valor em centavos. */
	valor: number;
	nota: string;
	dentroDoPool: boolean;
}

export interface Resultado {
	linhas: LinhaDestino[];
	/** Total a destinar, em centavos. */
	total: number;
	/** Teto do pool em centavos (6% ou 7%). */
	tetoPool: number;
	/** Teto total em centavos (pool + PRONON + PRONAS). */
	tetoTotal: number;
	percentualPool: number;
	percentualTotal: number;
	avisos: string[];
}

export const LIMITE_FUNDO = 3;
export const TETO_POOL_BASE = 6;
export const TETO_POOL_ESPORTE = 7;
export const LIMITE_EXTRA = 1;

const ROTULOS: Record<Destino, string> = {
	fia: 'Fundo dos Direitos da Criança e do Adolescente (FIA)',
	idoso: 'Fundo da Pessoa Idosa',
	cultura: 'Cultura e Audiovisual',
	esporte: 'Esporte',
	reciclagem: 'Reciclagem',
	pronon: 'PRONON',
	pronas: 'PRONAS/PCD'
};

const NOTAS: Record<Destino, string> = {
	fia: 'até 3%, direto na declaração',
	idoso: 'até 3%, direto na declaração',
	cultura: 'dentro do teto compartilhado',
	esporte: 'eleva o teto do conjunto para 7%',
	reciclagem: 'dentro do teto compartilhado',
	pronon: '+1%, fora do teto',
	pronas: '+1%, fora do teto'
};

const VAZIO: Resultado = {
	linhas: [],
	total: 0,
	tetoPool: 0,
	tetoTotal: 0,
	percentualPool: 0,
	percentualTotal: 0,
	avisos: []
};

/**
 * Calcula o plano de destinação possível para um dado imposto devido.
 * @param devido imposto devido em CENTAVOS
 * @param sel destinos escolhidos pelo usuário
 */
export function calcular(devido: number, sel: Selecao = {}): Resultado {
	if (!Number.isFinite(devido) || devido <= 0) {
		return {
			...VAZIO,
			avisos: ['Sem imposto devido não há fatia para destinar — e está tudo bem.']
		};
	}

	const avisos: string[] = [];
	const linhas: LinhaDestino[] = [];
	const pct = (p: number) => Math.floor((devido * p) / 100);

	let esporte = !!sel.esporte;
	const reciclagem = !!(sel.reciclagem && !esporte);

	if (sel.esporte && sel.reciclagem) {
		avisos.push(
			'Esporte e Reciclagem não se combinam na mesma declaração. Consideramos apenas o Esporte (teto de 7%).'
		);
	}

	const percentualPool = esporte ? TETO_POOL_ESPORTE : TETO_POOL_BASE;
	const tetoPool = pct(percentualPool);
	let restante = tetoPool;

	const empurrar = (chave: Destino, valor: number, dentroDoPool: boolean) => {
		if (valor > 0) {
			linhas.push({ chave, rotulo: ROTULOS[chave], valor, nota: NOTAS[chave], dentroDoPool });
		} else {
			avisos.push(`${ROTULOS[chave]}: sem espaço no teto com as escolhas atuais.`);
		}
	};

	// FIA e Idoso primeiro: cada um tem limite próprio de 3% dentro do pool.
	if (sel.fia) {
		const valor = Math.min(pct(LIMITE_FUNDO), restante);
		restante -= valor;
		empurrar('fia', valor, true);
	}
	if (sel.idoso) {
		const valor = Math.min(pct(LIMITE_FUNDO), restante);
		restante -= valor;
		empurrar('idoso', valor, true);
	}

	// Cultura, Esporte e Reciclagem dividem o que sobrou do pool.
	const outros: Destino[] = [];
	if (sel.cultura) outros.push('cultura');
	if (esporte) outros.push('esporte');
	if (reciclagem) outros.push('reciclagem');

	if (outros.length > 0) {
		const base = Math.floor(restante / outros.length);
		const sobra = restante - base * outros.length;
		outros.forEach((chave, i) => {
			empurrar(chave, base + (i < sobra ? 1 : 0), true);
		});
	}

	// Doações extras, fora do teto.
	if (sel.pronon) empurrar('pronon', pct(LIMITE_EXTRA), false);
	if (sel.pronas) empurrar('pronas', pct(LIMITE_EXTRA), false);

	const total = linhas.reduce((soma, l) => soma + l.valor, 0);
	const extrasPercentual = (sel.pronon ? LIMITE_EXTRA : 0) + (sel.pronas ? LIMITE_EXTRA : 0);

	return {
		linhas,
		total,
		tetoPool,
		tetoTotal: pct(percentualPool + extrasPercentual),
		percentualPool,
		percentualTotal: Math.round((total * 100) / devido),
		avisos
	};
}
