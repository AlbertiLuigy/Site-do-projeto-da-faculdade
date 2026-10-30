/** Utilitários de formatação e leitura de valores monetários (centavos ↔ BRL). */

export const brl = (centavos: number): string =>
	(centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Lê um texto digitado ("10.000,00", "10000") e devolve centavos. */
export function parseValor(texto: string): number {
	const limpo = String(texto)
		.replace(/[^\d,]/g, '')
		.replace(',', '.');
	const numero = Number.parseFloat(limpo);
	if (!Number.isFinite(numero)) return 0;
	return Math.round(numero * 100);
}

/** Formata centavos para exibição em um input de texto. */
export function paraInput(centavos: number): string {
	if (!centavos) return '';
	return (centavos / 100).toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
