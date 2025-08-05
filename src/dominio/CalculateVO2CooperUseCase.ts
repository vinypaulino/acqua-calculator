import { VO2Max, VO2Value } from './VO2Max';

export class CalculateVO2JackDanielsUseCase {
  execute(distanceMeters: number, timeMinutes: number): VO2Value {
    const vo2max = new VO2Max(distanceMeters, timeMinutes);
    return vo2max.getVO2();
  }
} 
