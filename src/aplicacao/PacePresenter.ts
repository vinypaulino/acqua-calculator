import { PaceValue } from '../dominio/Pace';

export class PacePresenter {
  static present(pace: PaceValue): string {
    const value = pace.getValue();
    const min = Math.floor(value);
    const sec = Math.round((value - min) * 60);
    return `${min}:${sec.toString().padStart(2, '0')} min/km`;
  }
} 
