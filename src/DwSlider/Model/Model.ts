import { IOptions, ModelUpdate } from '../../types';
import Publisher from '../Publisher';

class Model extends Publisher<ModelUpdate> {
  constructor(public options: IOptions) {
    super();
    this.options = this.filterOptions(options);
  }

  private getNumberOfSections = (): number => {
    const differenceBetweenMaxAndMin = Math.abs(this.options.max - this.options.min);
    return Math.floor(differenceBetweenMaxAndMin / this.options.step);
  };

  private findRest = (current: number, part: number, rest: number, stepAsPart: number):number[] => {
    const restAtTheEnd = 1 - stepAsPart * Math.trunc(1 / stepAsPart);
    let newCurrent = current;
    if (rest > restAtTheEnd / 2) {
      newCurrent = this.options.max;
      return [newCurrent, 1];
    }
    return [newCurrent, part];
  };

  private isScaleFullSize = (): boolean => {
    const differenceBetweenMaxAndMin = Math.abs(this.options.max - this.options.min);
    return Number.isInteger(differenceBetweenMaxAndMin / this.options.step);
  };

  private countCurrent = (part: number): Array<number> => {
    const stepAsPart = this.options.step / Math.abs(this.options.max - this.options.min);
    const rest = part - stepAsPart * Math.trunc(part / stepAsPart);

    let newPart: number;
    if (rest < stepAsPart / 2) {
      newPart = part - rest;
    } else {
      newPart = part + (stepAsPart - rest);
    }

    const differenceBetweenMaxAndMin = Math.abs(this.options.max - this.options.min);
    const scaleMax = this.getNumberOfSections() * this.options.step;
    const isCurrentGreaterThanScale = differenceBetweenMaxAndMin * part > scaleMax;

    let current = Math.abs(this.options.max - this.options.min) * newPart + this.options.min;
    if (!this.isScaleFullSize() && isCurrentGreaterThanScale) {
      [current, newPart] = this.findRest(current, newPart, rest, stepAsPart);
    }
    current = this.roundValueTo(current, this.options.step);
    return [current, newPart];
  };

  private filterOptions = (options: IOptions): IOptions => {
    let { step } = { step: options.step };
    let { max } = { max: options.max };
    let { from } = { from: options.from };
    let { to } = { to: options.to };
    let { scaleSize } = { scaleSize: options.scaleSize };

    if (Math.abs(step) > Math.abs(options.max - options.min)) {
      step = Math.abs(options.max - options.min);
    }
    if (options.step < 0) {
      step = Math.abs(step);
    } else if (step === 0) {
      step = 1;
    }
    if (options.max < options.min || options.max === options.min) {
      max = options.min + step;
    }

    if (options.scaleSize > 20) {
      scaleSize = 20;
    } else if (options.scaleSize < 2) {
      scaleSize = 2;
    }

    if (options.from < options.min) {
      from = options.min;
    } else if (options.from > options.max) {
      from = options.max;
    }

    if (options.to < options.min) {
      to = options.min;
    } else if (options.to > options.max) {
      to = options.max;
    }
    return {
      ...options, max, step, scaleSize, from, to,
    };
  };

  public setCurrent(part: number, extra = false): void {
    const [current, newPart] = this.countCurrent(part);
    if (extra) {
      this.options.to = current;
    } else {
      this.options.from = current;
    }
    this.dataWereChanged(current, newPart, extra);
  }

  private dataWereChanged = (current: number, part: number, extra: boolean): void => {
    this.notify({
      current, part, extra, eventName: 'data',
    });
  };

  private filterPart = (part: number): number => {
    if (part > 1) {
      return 1;
    }
    if (part < 0) {
      return 0;
    }
    return part;
  };

  private countPart = (current: number): number => {
    let part = (current - this.options.min) / (this.options.max - this.options.min);
    part = this.filterPart(part);
    return part;
  };

  public setPart(current: number, extra = false): void {
    const part = this.countPart(current);
    const [newCurrent, newPart] = this.countCurrent(part);
    this.dataWereChanged(newCurrent, newPart, extra);
  }

  private createFullSizeScale = (): Record<string, string> => {
    const numberOfScaleSections = this.options.scaleSize - 1;
    let scaleElements: Record<string, string> = {};

    for (let i = 0; i <= numberOfScaleSections; i += 1) {
      const scaleStep = 1 / numberOfScaleSections;
      const scaleValue = (this.options.max - this.options.min) * scaleStep * i + this.options.min;
      const roundScaleValues = this.roundValueTo(scaleValue, this.options.step);
      const partForRound = this.countPart(roundScaleValues);
      scaleElements = { ...scaleElements, [String(partForRound)]: String(roundScaleValues) };
    }

    return scaleElements;
  };

  private createPartSizeScale = (): Record<string, string> => {
    const numberOfScaleSections = this.options.scaleSize - 1;
    let scaleElements: Record<string, string> = {};

    for (let i = 0; i <= numberOfScaleSections; i += 1) {
      const newMax = this.getNumberOfSections() * this.options.step + this.options.min;
      const scaleStep = 1 / numberOfScaleSections;

      let scaleValue: number;
      scaleValue = (newMax - this.options.min) * scaleStep * i + this.options.min;
      scaleValue = this.roundValueTo(scaleValue, this.options.step);

      const newPart = this.countPart(scaleValue);
      scaleElements = { ...scaleElements, [newPart]: String(scaleValue) };
    }

    return scaleElements;
  };

  public countScaleElements = (): Record<string, string> => {
    if (this.isScaleFullSize()) {
      return this.createFullSizeScale();
    }
    return this.createPartSizeScale();
  };

  private roundValueTo = (value: number, roundTo: number): number => {
    const dividedRoundTo = roundTo.toString().split('.');
    let decimal: number;
    if (dividedRoundTo[0] === '0') {
      if (!dividedRoundTo[1]) {
        decimal = -dividedRoundTo[0].length + 1;
      } else {
        decimal = dividedRoundTo[1].length;
      }
    } else {
      decimal = dividedRoundTo[0].length - 1;
    }
    return (Math.round(value * (10 ** decimal)) / (10 ** decimal));
  };

  public refreshAll = (options: IOptions): void => {
    this.options = this.filterOptions(options);
    const scaleElements = this.countScaleElements();
    this.notify({ scaleElements, options: this.options, eventName: 'scale' });
  };
}

export default Model;
