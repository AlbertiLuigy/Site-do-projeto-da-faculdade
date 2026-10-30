import { describe, expect, it } from 'vitest';
import { calcular } from './tax';

const R = 100; // 1 real em centavos

describe('calcular() — motor da destinação do IR', () => {
	it('não destina nada quando o imposto devido é zero', () => {
		const r = calcular(0, { fia: true });
		expect(r.total).toBe(0);
		expect(r.linhas).toHaveLength(0);
		expect(r.avisos.length).toBeGreaterThan(0);
	});

	// Exemplo 1 e 4 do Guia: R$ 10.000 de imposto devido.
	it('FIA + Idoso na declaração = 3% + 3% (R$ 600 de R$ 10.000)', () => {
		const r = calcular(10_000 * R, { fia: true, idoso: true });
		expect(r.total).toBe(600 * R);
		expect(r.percentualPool).toBe(6);
		expect(r.linhas.find((l) => l.chave === 'fia')?.valor).toBe(300 * R);
		expect(r.linhas.find((l) => l.chave === 'idoso')?.valor).toBe(300 * R);
	});

	it('só FIA é limitado a 3% (R$ 300 de R$ 10.000)', () => {
		const r = calcular(10_000 * R, { fia: true });
		expect(r.total).toBe(300 * R);
	});

	it('esporte eleva o pool para 7% (R$ 700 de R$ 10.000)', () => {
		const r = calcular(10_000 * R, { esporte: true });
		expect(r.percentualPool).toBe(7);
		expect(r.total).toBe(700 * R);
	});

	it('PRONON e PRONAS somam +1% cada, fora do teto (R$ 100 cada)', () => {
		const r = calcular(10_000 * R, { pronon: true, pronas: true });
		expect(r.percentualTotal).toBe(2);
		expect(r.total).toBe(200 * R);
	});

	it('teto máximo teórico = 9% (esporte + PRONON + PRONAS)', () => {
		const r = calcular(10_000 * R, { esporte: true, pronon: true, pronas: true });
		expect(r.percentualTotal).toBe(9);
		expect(r.total).toBe(900 * R);
	});

	it('nunca ultrapassa o teto do pool ao combinar vários destinos', () => {
		const devido = 10_000 * R;
		const r = calcular(devido, { fia: true, idoso: true, cultura: true, esporte: true });
		const dentroDoPool = r.linhas
			.filter((l) => l.dentroDoPool)
			.reduce((s, l) => s + l.valor, 0);
		expect(dentroDoPool).toBeLessThanOrEqual(r.tetoPool);
		expect(dentroDoPool).toBe(700 * R); // teto de 7% com esporte
	});

	it('quando FIA e Idoso já preenchem o pool, Cultura não recebe nada', () => {
		const r = calcular(10_000 * R, { fia: true, idoso: true, cultura: true });
		expect(r.linhas.some((l) => l.chave === 'cultura')).toBe(false);
		expect(r.total).toBe(600 * R);
	});

	it('a soma das linhas é sempre igual ao total (sem duplicidade)', () => {
		const r = calcular(20_000 * R, { fia: true, cultura: true, esporte: true, pronon: true });
		const soma = r.linhas.reduce((s, l) => s + l.valor, 0);
		expect(soma).toBe(r.total);
	});

	it('esporte e reciclagem não se combinam (reciclagem é descartada)', () => {
		const r = calcular(10_000 * R, { esporte: true, reciclagem: true });
		expect(r.linhas.some((l) => l.chave === 'reciclagem')).toBe(false);
		expect(r.avisos.join(' ')).toMatch(/não se combinam/i);
	});

	// Exemplo 5 do Guia: jovem na primeira declaração.
	it('jovem com R$ 4.000 de imposto devido: FIA + Idoso = R$ 240', () => {
		const r = calcular(4_000 * R, { fia: true, idoso: true });
		expect(r.total).toBe(240 * R);
	});

	it('arredonda para baixo em centavos e soma exatamente o total', () => {
		// 3% de R$ 33,33 não é inteiro em centavos.
		const r = calcular(3333, { fia: true });
		expect(Number.isInteger(r.total)).toBe(true);
		expect(r.total).toBe(Math.floor(3333 * 0.03));
	});
});
