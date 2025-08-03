import { VO2Max, VO2Value } from './VO2Max';

export class CalculateVO2CooperUseCase {
  execute(distanceMeters: number): VO2Value {
    const vo2max = new VO2Max(distanceMeters);
    return vo2max.getVO2();
  }
} 
