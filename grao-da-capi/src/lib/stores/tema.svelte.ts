export type Tema = 'light' | 'dark';

const CHAVE = 'grao_t';

/** Tema claro/escuro com persistência em localStorage. */
class TemaStore {
	atual = $state<Tema>('light');

	/** Lê a preferência salva (ou do sistema). Chamar apenas no cliente. */
	iniciar() {
		try {
			const salvo = localStorage.getItem(CHAVE);
			if (salvo === 'light' || salvo === 'dark') {
				this.atual = salvo;
				return;
			}
		} catch {
			/* localStorage indisponível */
		}
		this.atual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	alternar() {
		this.atual = this.atual === 'dark' ? 'light' : 'dark';
		try {
			localStorage.setItem(CHAVE, this.atual);
		} catch {
			/* ignora */
		}
	}
}

export const tema = new TemaStore();
