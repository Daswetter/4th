import { IOptions, ModelUpdate } from '../../types';
import Publisher from '../Publisher';

class Model extends Publisher<ModelUpdate> {
  constructor(public options: IOptions) {
    super();
    this.options = this.filterOptions(options);
  }

  private countScaleMax = (): number => {
    const differenceBetweenMaxAndMin = Math.abs(this.options.max - this.options.min);
    const roundDifference = this.roundTo(differenceBetweenMaxAndMin / this.options.step, 0.00001);
    return Math.floor(roundDifference) * this.options.step;
  };

  private findRest = (current: number, part: number, rest: number, stepAsPart: number):number[] => {
    const restAtTheEnd = 1 - stepAsPart * Math.trunc(1 / stepAsPart);
    if (rest > restAtTheEnd / 2) {
      return [this.options.max, 1];
    }
    return [this.roundTo(current, this.options.step), part];
  };

  private isScaleFullSize = (): boolean => {
    const differenceBetweenMaxAndMin = Math.abs(this.options.max - this.options.min);
    return Number.isInteger(differenceBetweenMaxAndMin / this.options.step);
  };

  private setClosestPart = (rest: number, stepAsPart: number, part: number): number => {
    if (rest < stepAsPart / 2) {
      return part - rest;
    }
    return part + (stepAsPart - rest);
  };

  private roundValue = (current: number): number => {
    if (this.countNumberAccuracy(this.options.min) < this.countNumberAccuracy(this.options.step)) {
      return this.roundTo(current, this.options.min);
    }
    return this.roundTo(current, this.options.step);
  };

  private countCurrent = (part: number): Array<number> => {
    const differenceBetweenMaxAndMin = Math.abs(this.options.max - this.options.min);
    const stepAsPart = this.options.step / differenceBetweenMaxAndMin;
    const rest = part - stepAsPart * Math.trunc(part / stepAsPart);

    const newPart = this.setClosestPart(rest, stepAsPart, part);
    const isCurrentGreaterThanScale = differenceBetweenMaxAndMin * part > this.countScaleMax();

    const current = differenceBetweenMaxAndMin * newPart + this.options.min;
    if (!this.isScaleFullSize() && isCurrentGreaterThanScale) {
      return this.findRest(current, newPart, rest, stepAsPart);
    }
    return [this.roundValue(current), newPart];
  };

  private filterOptions = (options: IOptions): IOptions => {
    let {
      step, max, from, to, scaleSize,
    } = options;

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
    const part = (current - this.options.min) / (this.options.max - this.options.min);
    return this.filterPart(part);
  };

  public setPart(current: number, extra = false): void {
    const part = this.countPart(current);
    const [newCurrent, newPart] = this.countCurrent(part);
    this.dataWereChanged(newCurrent, newPart, extra);
  }

  private filterScaleSize = () => {
    const numberOfScaleSections = this.options.scaleSize - 1;
    const numberOfSliderSections = (this.options.max - this.options.min) / this.options.step;
    if (numberOfScaleSections > numberOfSliderSections) {
      this.options.scaleSize = Math.round(numberOfSliderSections + 1);
    } else if (numberOfScaleSections % numberOfSliderSections !== 0) {
      for (let j = 1; j < numberOfScaleSections; j += 1) {
        if ((numberOfScaleSections + j) % numberOfSliderSections === 0) {
          this.options.scaleSize = numberOfScaleSections + j + 1;
        }
      }
    }
  };

  public countScaleElements = (): Record<string, string> => {
    this.filterScaleSize();
    let scaleElements: Record<string, string> = {};
    const scaleStep = 1 / (this.options.scaleSize - 1);

    for (let i = 0; i < this.options.scaleSize; i += 1) {
      const scaleValue = this.countScaleMax() * scaleStep * i + this.options.min;
      const [current, part] = this.countCurrent(this.countPart(scaleValue));
      scaleElements = { ...scaleElements, [part]: current };
    }
    return scaleElements;
  };

  private countNumberAccuracy = (value: number): number => {
    const dividedValue = value.toString().split('.');
    if (dividedValue[0].length === 1 && !dividedValue[1]) {
      return 0;
    }
    if (dividedValue[0] === '0' || dividedValue[1]) {
      return -dividedValue[1].length;
    }
    return dividedValue[0].length;
  };

  private countNumberOrder = (roundTo: number): number => {
    const order = this.countNumberAccuracy(roundTo);
    if (order < 0) {
      return Math.abs(order);
    }
    if (order === 0) {
      return order;
    }
    return order - 1;
  };

  private roundTo = (value: number, roundTo: number): number => {
    const decimal = this.countNumberOrder(roundTo);
    return (Math.round(value * (10 ** decimal)) / (10 ** decimal));
  };

  public refreshAll = (options: IOptions): void => {
    this.options = this.filterOptions(options);
    const scaleElements = this.countScaleElements();
    this.notify({ scaleElements, options: this.options, eventName: 'scale' });
  };
}

export default Model;
