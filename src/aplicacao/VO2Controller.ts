import { CalculateVO2JackDanielsUseCase } from '../dominio/CalculateVO2CooperUseCase';

export class VO2Controller {
  private calculateVO2JackDanielsUseCase: CalculateVO2JackDanielsUseCase;

  constructor() {
    this.calculateVO2JackDanielsUseCase = new CalculateVO2JackDanielsUseCase();
  }

  calcularVO2JackDaniels(distanceMeters: number, timeMinutes: number) {
    return this.calculateVO2JackDanielsUseCase.execute(distanceMeters, timeMinutes);
  }
} 
