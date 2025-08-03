import { Time, Distance, Pace, PaceValue } from './Pace';

export class CalculatePaceUseCase {
  execute(timeMinutes: number, distanceKm: number): PaceValue {
    const time = new Time(timeMinutes);
    const distance = new Distance(distanceKm);
    const pace = new Pace(time, distance);
    return pace.getPace();
  }
} 
