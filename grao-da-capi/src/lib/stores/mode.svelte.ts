/**
 * Estado global do "Modo família".
 * Quando ligado, todo o conteúdo da Capi e os textos com data-s usam a voz simples.
 */
class ModoFamilia {
	familia = $state(false);

	alternar() {
		this.familia = !this.familia;
	}
}

export const modo = new ModoFamilia();
