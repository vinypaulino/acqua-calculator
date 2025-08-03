import { VO2Max, VO2Value } from '../dominio/VO2Max';
import { CalculateVO2CooperUseCase } from '../dominio/CalculateVO2CooperUseCase';

describe('VO2Value', () => {
  it('deve criar um VO2Value válido', () => {
    const vo2 = new VO2Value(40);
    expect(vo2.getValue()).toBe(40);
  });
  it('deve lançar erro para valor inválido', () => {
    expect(() => new VO2Value(-1)).toThrow();
    expect(() => new VO2Value(NaN)).toThrow();
  });
});

describe('VO2Max (Cooper)', () => {
  it('deve calcular VO2 máximo corretamente pela fórmula de Cooper', () => {
    // Exemplo: distância = 2400m → (2400 - 504.9) / 44.73 ≈ 42.4
    const vo2max = new VO2Max(2400);
    expect(Number(vo2max.getVO2().getValue().toFixed(1))).toBe(42.4);
  });
  it('deve lançar erro para distância inválida', () => {
    expect(() => new VO2Max(-100)).toThrow();
    expect(() => new VO2Max(NaN)).toThrow();
  });
});

describe('CalculateVO2CooperUseCase', () => {
  it('deve retornar o VO2Value correto para uma distância válida', () => {
    const useCase = new CalculateVO2CooperUseCase();
    const vo2 = useCase.execute(2400);
    expect(Number(vo2.getValue().toFixed(1))).toBe(42.4);
  });
}); 
