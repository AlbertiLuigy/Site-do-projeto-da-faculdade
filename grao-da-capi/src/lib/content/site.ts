/** Conteúdo editorial do site (dados, quiz, passo a passo, destinos, FAQ, glossário). */

export interface PerguntaMito {
	frase: string;
	/** true = verdade, false = mito */
	verdade: boolean;
	explicacao: string;
}

export const MITOS: PerguntaMito[] = [
	{
		frase: 'Quem ganha pouco nunca precisa declarar.',
		verdade: false,
		explicacao:
			'Mito. Depende de critérios de renda, bens e outras situações. Confira na Receita.'
	},
	{
		frase: 'Destinar imposto faz você pagar mais.',
		verdade: false,
		explicacao: 'Mito. O valor é abatido do imposto a pagar ou somado à restituição.'
	},
	{
		frase: 'Dá para destinar no modelo simplificado.',
		verdade: false,
		explicacao: 'Mito. Só no modelo completo (por deduções legais).'
	},
	{
		frase: 'Quem tem restituição também pode destinar.',
		verdade: true,
		explicacao:
			'Verdade. Você paga o DARF no prazo e o valor volta somado à restituição, corrigido pela Selic.'
	},
	{
		frase: 'Quem tem imposto devido zero pode destinar.',
		verdade: false,
		explicacao: 'Mito. Sem imposto devido não há fatia para redirecionar.'
	},
	{
		frase: 'Na declaração, o dinheiro vai direto para a ONG que eu escolho.',
		verdade: false,
		explicacao:
			'Mito. Vai para o fundo público; a ONG recebe se tiver projeto aprovado pelo conselho.'
	}
];

export interface CaminhoPassos {
	titulo: string;
	itens: string[];
	nota: string;
}

export const PASSOS: Record<'declaracao' | 'ano', CaminhoPassos> = {
	declaracao: {
		titulo: 'Direto na declaração (mar–mai)',
		itens: [
			'Preencha toda a declaração e confirme o modelo <b>Por Deduções Legais</b>.',
			'Abra a ficha <b>Doações Diretamente na Declaração</b> e clique em Novo.',
			'Escolha o fundo (Criança e Adolescente ou Pessoa Idosa), o tipo (municipal, estadual ou nacional) e a cidade.',
			'O programa mostra o <b>Valor Disponível para Destinação</b>. Digite o valor e confirme.',
			'Emita o <b>DARF de Doação</b> e pague dentro do prazo da declaração.'
		],
		nota: 'Sem pagar o DARF no prazo, a destinação não se concretiza. Limite: até 3% para cada fundo.'
	},
	ano: {
		titulo: 'Durante o ano (até dezembro)',
		itens: [
			'Estime seu imposto devido (use o da declaração do ano anterior como referência).',
			'Escolha um projeto ou fundo com <b>aprovação oficial publicada</b>.',
			'Deposite na conta oficial do projeto, <b>em seu CPF</b>, dentro do ano-calendário.',
			'Guarde o recibo emitido em seu nome.',
			'No ano seguinte, informe na ficha <b>Doações Efetuadas</b> com o código da lei.'
		],
		nota: 'Atenção às datas de corte de cada projeto, que costumam ser antes de 31 de dezembro.'
	}
};

export interface DestinoInfo {
	icone: string;
	nome: string;
	causa: 'Infância' | 'Idosos' | 'Cultura' | 'Esporte' | 'Saúde';
	descricao: string;
}

export const DESTINOS: DestinoInfo[] = [
	{
		icone: '👧',
		nome: 'Fundo dos Direitos da Criança e do Adolescente (FIA)',
		causa: 'Infância',
		descricao: 'Conselho municipal (CMDCA), estadual ou nacional. Até 3% direto na declaração.'
	},
	{
		icone: '👵',
		nome: 'Fundo da Pessoa Idosa',
		causa: 'Idosos',
		descricao: 'Conselho do Idoso municipal, estadual ou nacional. Até 3% direto na declaração.'
	},
	{
		icone: '🎭',
		nome: 'Cultura e Audiovisual',
		causa: 'Cultura',
		descricao:
			'Projetos aprovados (Lei Rouanet, Lei do Audiovisual). Doação até dezembro, dentro do teto do conjunto.'
	},
	{
		icone: '⚽',
		nome: 'Esporte',
		causa: 'Esporte',
		descricao: 'Projetos aprovados pelo Ministério do Esporte. Eleva o teto do conjunto para 7%.'
	},
	{
		icone: '🩺',
		nome: 'PRONON e PRONAS/PCD',
		causa: 'Saúde',
		descricao:
			'Câncer e pessoa com deficiência. +1% cada, fora do teto. Confirme a vigência na Receita.'
	}
];

export const CAUSAS = ['Todas', 'Infância', 'Idosos', 'Cultura', 'Esporte', 'Saúde'] as const;

export interface Faq {
	pergunta: string;
	resposta: string;
}

export const FAQ: Faq[] = [
	{
		pergunta: 'Posso doar mesmo tendo restituição?',
		resposta: 'Sim. O valor doado é somado à restituição, corrigido pela Selic.'
	},
	{
		pergunta: 'Existe valor mínimo?',
		resposta: 'Não há valor mínimo fixado pela Receita. O que existe é o limite máximo.'
	},
	{
		pergunta: 'Perco dinheiro se doar?',
		resposta:
			'Não, desde que respeite os limites, doe a destinos habilitados e informe corretamente.'
	},
	{
		pergunta: 'A doação vai direto para a ONG?',
		resposta:
			'Na declaração, vai para o fundo público. Durante o ano, você pode apoiar projetos específicos aprovados.'
	},
	{
		pergunta: 'Quando é a hora de planejar?',
		resposta:
			'Para cultura, esporte, saúde e reciclagem, antes de dezembro do ano anterior à declaração.'
	}
];

export const CHECKLIST = [
	'Tenho imposto devido maior que zero?',
	'Vou declarar no modelo completo?',
	'Já calculei o limite (3%, 6%, 7%, +1%/+1%) sobre o imposto devido?',
	'O projeto ou fundo tem aprovação oficial e conta identificada?',
	'A doação está no meu CPF e dentro do prazo?',
	'Guardei o recibo/comprovante?',
	'Informei na ficha correta (“Doações Efetuadas” ou “Doações Diretamente na Declaração”)?',
	'Paguei o DARF no prazo (se doei na declaração)?'
];

export const GLOSSARIO: Faq[] = [
	{
		pergunta: 'Imposto devido',
		resposta: 'Total de IR calculado sobre seus rendimentos, antes de comparar com o que foi retido.'
	},
	{
		pergunta: 'Modelo completo (deduções legais)',
		resposta: 'Modelo em que você deduz despesas e doações incentivadas. Só ele permite destinar.'
	},
	{ pergunta: 'DARF', resposta: 'Documento de arrecadação usado para pagar a doação na declaração.' },
	{ pergunta: 'FIA', resposta: 'Fundo da Infância e Adolescência.' },
	{
		pergunta: 'Conselho (CMDCA, Conselho do Idoso)',
		resposta: 'Órgão que gere o fundo e decide como aplicar os recursos.'
	},
	{ pergunta: 'Glosa', resposta: 'Não aceitação de uma dedução pela Receita.' },
	{
		pergunta: 'PRONON / PRONAS-PCD',
		resposta: 'Programas de saúde para oncologia e para pessoas com deficiência.'
	}
];

export const ESTATISTICAS = [
	{ valor: 'R$ 283,7 mi', rotulo: 'doados em 2023 (estimativa)' },
	{ valor: '+R$ 11 bi', rotulo: 'potencial se todos os elegíveis doassem' },
	{ valor: '~2%', rotulo: 'do potencial efetivamente aproveitado' },
	{ valor: '<3%', rotulo: 'dos contribuintes fazem a destinação' }
];
