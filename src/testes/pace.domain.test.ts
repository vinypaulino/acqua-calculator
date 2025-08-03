import { Time, Distance, Pace, PaceValue } from '../dominio/Pace';
import { CalculatePaceUseCase } from '../dominio/CalculatePaceUseCase';

describe('Time', () => {
  it('deve criar um Time válido', () => {
    const t = new Time(50);
    expect(t.getValue()).toBe(50);
  });
  it('deve lançar erro para tempo inválido', () => {
    expect(() => new Time(-1)).toThrow();
    expect(() => new Time(NaN)).toThrow();
  });
});

describe('Distance', () => {
  it('deve criar um Distance válido', () => {
    const d = new Distance(10);
    expect(d.getValue()).toBe(10);
  });
  it('deve lançar erro para distância inválida', () => {
    expect(() => new Distance(-1)).toThrow();
    expect(() => new Distance(NaN)).toThrow();
  });
});

describe('PaceValue', () => {
  it('deve criar um PaceValue válido', () => {
    const p = new PaceValue(5);
    expect(p.getValue()).toBe(5);
  });
  it('deve lançar erro para pace inválido', () => {
    expect(() => new PaceValue(-1)).toThrow();
    expect(() => new PaceValue(NaN)).toThrow();
  });
});

describe('Pace', () => {
  it('deve calcular o pace corretamente', () => {
    const t = new Time(50);
    const d = new Distance(10);
    const pace = new Pace(t, d);
    expect(Number(pace.getPace().getValue().toFixed(2))).toBe(5.00);
  });
});

describe('CalculatePaceUseCase', () => {
  it('deve retornar o PaceValue correto para tempo e distância válidos', () => {
    const useCase = new CalculatePaceUseCase();
    const pace = useCase.execute(50, 10);
    expect(Number(pace.getValue().toFixed(2))).toBe(5.00);
  });
}); 
