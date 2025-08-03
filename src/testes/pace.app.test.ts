import { PaceController } from '../aplicacao/PaceController';
import { PacePresenter } from '../aplicacao/PacePresenter';

describe('PaceController', () => {
  it('deve calcular o pace corretamente', () => {
    const controller = new PaceController();
    const pace = controller.calcularPace(50, 10);
    expect(Number(pace.getValue().toFixed(2))).toBe(5.00);
  });
});

describe('PacePresenter', () => {
  it('deve formatar o resultado do pace corretamente', () => {
    const controller = new PaceController();
    const pace = controller.calcularPace(50, 10);
    const result = PacePresenter.present(pace);
    expect(result).toBe('5:00 min/km');
  });
}); 
