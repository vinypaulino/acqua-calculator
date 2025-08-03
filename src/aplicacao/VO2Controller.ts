import { CalculateVO2CooperUseCase } from '../dominio/CalculateVO2CooperUseCase';

export class VO2Controller {
  private calculateVO2CooperUseCase: CalculateVO2CooperUseCase;

  constructor() {
    this.calculateVO2CooperUseCase = new CalculateVO2CooperUseCase();
  }

  calcularVO2Cooper(distanceMeters: number) {
    return this.calculateVO2CooperUseCase.execute(distanceMeters);
  }
} 
