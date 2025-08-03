// Value object for Time (in minutes)
export class Time {
  private value: number;
  constructor(value: number) {
    if (isNaN(value) || value <= 0) {
      throw new Error('Tempo deve ser um número positivo.');
    }
    this.value = value;
  }
  getValue(): number {
    return this.value;
  }
}

// Value object for Distance (in kilometers)
export class Distance {
  private value: number;
  constructor(value: number) {
    if (isNaN(value) || value <= 0) {
      throw new Error('Distância deve ser um número positivo.');
    }
    this.value = value;
  }
  getValue(): number {
    return this.value;
  }
}

// Value object for Pace (min/km)
export class PaceValue {
  private value: number;
  constructor(value: number) {
    if (isNaN(value) || value <= 0) {
      throw new Error('Pace deve ser um número positivo.');
    }
    this.value = value;
  }
  getValue(): number {
    return this.value;
  }
}

// Pace entity
export class Pace {
  private time: Time;
  private distance: Distance;
  private pace: PaceValue;

  constructor(time: Time, distance: Distance) {
    this.time = time;
    this.distance = distance;
    this.pace = new PaceValue(Pace.calculatePace(time, distance));
  }

  static calculatePace(time: Time, distance: Distance): number {
    return time.getValue() / distance.getValue();
  }

  getPace(): PaceValue {
    return this.pace;
  }
  getTime(): Time {
    return this.time;
  }
  getDistance(): Distance {
    return this.distance;
  }
} 
