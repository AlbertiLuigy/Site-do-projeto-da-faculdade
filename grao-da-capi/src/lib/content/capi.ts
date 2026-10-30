/**
 * Falas da Capi — o conteúdo que a mascote "fala" em cada seção do site.
 * Toda fala existe em duas vozes: `normal` (tom acadêmico-dinâmico) e
 * `familia` (linguagem do dia a dia, para quando o jovem mostra a tela em casa).
 */

export type Voz = 'normal' | 'familia';

export interface LinhaCapi {
	normal: string;
	familia: string;
}

/** Falas por seção (a chave é o id da seção, usado pelo IntersectionObserver). */
export const CAPI_LINHAS: Record<string, LinhaCapi> = {
	entenda: {
		normal:
			'Imposto devido é o “bolo” do seu IR. A destinação só muda o destino de uma fatia.',
		familia:
			'Imposto devido é quanto de imposto você deve no total. Só essa parte pode ser dividida.'
	},
	mitos: {
		normal: 'Vamos testar? Eu explico cada resposta.',
		familia: 'Vamos brincar de certo ou errado? Depois eu explico.'
	},
	simulador: {
		normal: 'Aqui você vê quanto pode destinar. Se der zero, simule o futuro!',
		familia: 'Aqui você descobre quanto poderia dar. Se der zero, teste um salário futuro.'
	},
	passos: {
		normal: 'Dois caminhos: na declaração (mar–mai) ou durante o ano (até dez).',
		familia: 'Existem dois jeitos de fazer. Eu te mostro os dois.'
	},
	destinos: {
		normal: 'Lembra: na declaração o dinheiro vai para o fundo, não direto para a ONG.',
		familia: 'O dinheiro não vai direto pra ONG. Vai pra um fundo, que escolhe os projetos.'
	},
	impacto: {
		normal: 'Pouca gente destina. Você pode mudar essa conta.',
		familia: 'Quase ninguém sabe disso. Você pode ensinar bastante gente.'
	},
	capi: {
		normal: 'Essa mudinha na minha cabeça é o grão. Ela cresce conforme você aprende!',
		familia: 'Essa plantinha na minha cabeça é a sementinha do que você aprendeu.'
	},
	semente: {
		normal: 'Agora a melhor parte: conta isso para quem já declara!',
		familia: 'Agora conta pro seu pai, sua mãe, sua tia — quem já declara pode fazer isso agora!'
	}
};

/** Falas pontuais (fora do fluxo de seções). */
export const CAPI_EXTRA = {
	boasVindas: {
		normal:
			'Oi, eu sou a Capi, a Capital! Em 2 minutos te mostro para onde seu imposto pode ir.',
		familia: 'Oi! Eu sou a Capi. Vou te explicar uma coisa bem simples sobre imposto.'
	},
	modoFamiliaOn: {
		normal: 'Modo família ligado: falo bem simples, sem “economês”.',
		familia: 'Pronto! Agora estou falando bem simples, do jeitinho de casa.'
	},
	modoFamiliaOff: {
		normal: 'Voltei ao modo normal.',
		familia: 'Voltei ao jeito normal de falar.'
	},
	acerto: {
		normal: 'Isso! Boa!',
		familia: 'Muito bem! Você acertou!'
	},
	erro: {
		normal: 'Quase! Olha só por quê…',
		familia: 'Quase! Vem cá, deixa eu explicar de novo.'
	},
	resultadoOk: {
		normal: 'Olha só o que você poderia direcionar!',
		familia: 'Viu só? Isso tudo poderia ir pra um projeto bom, sem pagar nada a mais.'
	},
	resultadoZero: {
		normal: 'Hoje seu imposto devido é R$ 0, e tudo bem! A semente você já leva.',
		familia: 'Hoje você não paga imposto, então não tem o que dividir. Mas um dia vai ter!'
	},
	ocioso: {
		normal: 'Tô aqui se precisar. 🌱',
		familia: 'Quando quiser, é só me chamar.'
	}
} satisfies Record<string, LinhaCapi>;

/** Sequência de estágios da semente, do grão à árvore. */
export const ESTAGIOS = ['🫘', '🌱', '🌿', '🌳'];
