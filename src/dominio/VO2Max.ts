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

// VO2Max entity (for Cooper formula)
export class VO2Max {
  private distanceMeters: number;
  private vo2: VO2Value;

  constructor(distanceMeters: number) {
    if (isNaN(distanceMeters) || distanceMeters <= 0) {
      throw new Error('Distância deve ser um número positivo.');
    }
    this.distanceMeters = distanceMeters;
    this.vo2 = new VO2Value(VO2Max.calculateCooperVO2(distanceMeters));
  }

  static calculateCooperVO2(distanceMeters: number): number {
    // Fórmula de Cooper: VO2 máx = (distância em metros - 504.9) / 44.73
    return (distanceMeters - 504.9) / 44.73;
  }

  getVO2(): VO2Value {
    return this.vo2;
  }

  getDistance(): number {
    return this.distanceMeters;
  }
} 
