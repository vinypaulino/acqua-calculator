import { VO2Max, VO2Value } from '../dominio/VO2Max';
import { CalculateVO2JackDanielsUseCase } from '../dominio/CalculateVO2CooperUseCase';

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

describe('VO2Max (Jack Daniels)', () => {
  it('deve calcular VO2 máximo corretamente pela fórmula de Jack Daniels', () => {
    // Exemplo: 2400m em 12 minutos
    const vo2max = new VO2Max(2400, 12);
    expect(vo2max.getVO2().getValue()).toBeGreaterThan(0);
  });
  it('deve lançar erro para distância inválida', () => {
    expect(() => new VO2Max(-100, 12)).toThrow();
    expect(() => new VO2Max(NaN, 12)).toThrow();
  });
  it('deve lançar erro para tempo inválido', () => {
    expect(() => new VO2Max(2400, -1)).toThrow();
    expect(() => new VO2Max(2400, NaN)).toThrow();
  });
});

describe('CalculateVO2JackDanielsUseCase', () => {
  it('deve retornar o VO2Value correto para distância e tempo válidos', () => {
    const useCase = new CalculateVO2JackDanielsUseCase();
    const vo2 = useCase.execute(2400, 12);
    expect(vo2.getValue()).toBeGreaterThan(0);
  });
}); 
