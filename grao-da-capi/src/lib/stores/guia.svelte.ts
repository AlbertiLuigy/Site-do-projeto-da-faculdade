import { ESTAGIOS } from '$content/capi';

const TOTAL_SECOES = 8;

/**
 * Estado da "guia" (balão flutuante da Capi) e do progresso de leitura.
 * O progresso alimenta a barra do topo e o crescimento da muda (--g / estágio).
 */
class GuiaStore {
	visivel = $state(false);
	chave = $state<string | null>(null);
	visitadas = $state<string[]>([]);

	progresso = $derived(Math.min(1, this.visitadas.length / TOTAL_SECOES));
	estagio = $derived(ESTAGIOS[Math.min(ESTAGIOS.length - 1, Math.floor(this.progresso * 4))]);

	registrar(chave: string) {
		if (!this.visitadas.includes(chave)) {
			this.visitadas = [...this.visitadas, chave];
		}
		this.chave = chave;
		this.visivel = true;
	}

	esconder() {
		this.visivel = false;
	}
}

export const guia = new GuiaStore();
