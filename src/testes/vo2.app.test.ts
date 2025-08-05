import { VO2Controller } from '../aplicacao/VO2Controller';
import { VO2Presenter } from '../aplicacao/VO2Presenter';

describe('VO2Controller', () => {
  it('deve calcular VO2 máximo via Jack Daniels', () => {
    const controller = new VO2Controller();
    const vo2 = controller.calcularVO2JackDaniels(2400, 12);
    expect(vo2.getValue()).toBeGreaterThan(0);
  });
});

describe('VO2Presenter', () => {
  it('deve formatar o resultado do VO2 corretamente', () => {
    const controller = new VO2Controller();
    const vo2 = controller.calcularVO2JackDaniels(2400, 12);
    const result = VO2Presenter.present(vo2);
    expect(result).toMatch(/\d+\.\d ml\/kg\/min/);
  });
}); 
