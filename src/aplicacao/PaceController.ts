import { CalculatePaceUseCase } from '../dominio/CalculatePaceUseCase';

export class PaceController {
  private calculatePaceUseCase: CalculatePaceUseCase;

  constructor() {
    this.calculatePaceUseCase = new CalculatePaceUseCase();
  }

  calcularPace(timeMinutes: number, distanceKm: number) {
    return this.calculatePaceUseCase.execute(timeMinutes, distanceKm);
  }
} 
