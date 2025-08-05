// VO2Value value object
export class VO2Value {
  private value: number;

  constructor(value: number) {
    if (isNaN(value) || value <= 0) {
      throw new Error('VO2Value deve ser um número positivo.');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

// VO2Max entity (Jack Daniels formula)
export class VO2Max {
  private distanceMeters: number;
  private timeMinutes: number;
  private vo2: VO2Value;

  constructor(distanceMeters: number, timeMinutes: number) {
    if (isNaN(distanceMeters) || distanceMeters <= 0) {
      throw new Error('Distância deve ser um número positivo.');
    }
    if (isNaN(timeMinutes) || timeMinutes <= 0) {
      throw new Error('Tempo deve ser um número positivo.');
    }
    this.distanceMeters = distanceMeters;
    this.timeMinutes = timeMinutes;
    this.vo2 = new VO2Value(VO2Max.calculateJackDanielsVO2(distanceMeters, timeMinutes));
  }

  static calculateJackDanielsVO2(distanceMeters: number, timeMinutes: number): number {
    // Fórmulas de Jack Daniels
    // % max = 0.8 + 0.1894393 × exp(-0.012778 × tempo) + 0.2989558 × exp(-0.1932605 × tempo)
    const percentMax = 0.8 + 0.1894393 * Math.exp(-0.012778 * timeMinutes) + 0.2989558 * Math.exp(-0.1932605 * timeMinutes);
    
    // velocidade = distância / tempo (em metros por minuto)
    const velocity = distanceMeters / timeMinutes;
    
    // VO2 = -4.60 + 0.182258 × velocidade + 0.000104 × velocidade²
    const vo2 = -4.60 + 0.182258 * velocity + 0.000104 * Math.pow(velocity, 2);
    
    // VO2 MAX = VO2 / % max
    return vo2 / percentMax;
  }

  getVO2(): VO2Value {
    return this.vo2;
  }

  getDistance(): number {
    return this.distanceMeters;
  }

  getTime(): number {
    return this.timeMinutes;
  }
} 
