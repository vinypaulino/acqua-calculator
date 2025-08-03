import { VO2Controller } from '../aplicacao/VO2Controller';
import { VO2Presenter } from '../aplicacao/VO2Presenter';

describe('VO2Controller', () => {
  it('deve calcular VO2 máximo via Cooper', () => {
    const controller = new VO2Controller();
    const vo2 = controller.calcularVO2Cooper(2400);
    expect(Number(vo2.getValue().toFixed(1))).toBe(42.4);
  });
});

describe('VO2Presenter', () => {
  it('deve formatar o resultado do VO2 corretamente', () => {
    const controller = new VO2Controller();
    const vo2 = controller.calcularVO2Cooper(2400);
    const result = VO2Presenter.present(vo2);
    expect(result).toBe('42.4 ml/kg/min');
  });
}); 
