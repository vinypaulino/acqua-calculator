import { VO2Value } from '../dominio/VO2Max';

export class VO2Presenter {
  static present(vo2: VO2Value): string {
    return `${vo2.getValue().toFixed(1)} ml/kg/min`;
  }
} 
