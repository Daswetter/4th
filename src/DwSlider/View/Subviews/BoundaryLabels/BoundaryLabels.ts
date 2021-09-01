import Subview from '../Subview';
import { PositionParams, Size } from '../Subview.types';

class BoundaryLabels extends Subview {
  public min!: HTMLElement;

  public max!: HTMLElement;

  constructor(public initElement: HTMLElement) {
    super();
    this.initElements(initElement);
  }

  public setInitialSettings = (
    min: number,
    max: number,
    lineWidth: number,
    thumbSize: Size,
    vertical = false,
  ): void => {
    this.printInnerText(this.min, min);
    this.printInnerText(this.max, max);

    if (vertical) {
      this.setPositionToVertical(this.min, lineWidth, thumbSize.width);
      this.setPositionToVertical(this.max, lineWidth, thumbSize.width);
    } else {
      this.setPositionToHorizontal(this.min, thumbSize.height);
      this.setPositionToHorizontal(this.max, thumbSize.height);
    }
  };

  public update = (
    tipParams: PositionParams,
    vertical: boolean,
    tipExtraParams?: PositionParams,
  ): void => {
    if (tipExtraParams) {
      this.setOpacityToDouble(tipParams, tipExtraParams, vertical);
    } else {
      this.setOpacityToSingle(tipParams, vertical);
    }
  };

  private initElements = (initElement: HTMLElement): void => {
    this.min = this.init(initElement, '__boundary-labels_min');
    this.max = this.init(initElement, '__boundary-labels_max');
  };

  private printInnerText = (element: HTMLElement, text: number): void => {
    element.innerText = String(text);
  };

  private setPositionToHorizontal = (element: HTMLElement, thumbHeight: number): void => {
    element.style.top = `${-element.offsetHeight - thumbHeight / 2}px`;
    const side = `${-element.offsetWidth / 2}px`;

    if (element === this.min) {
      element.style.left = side;
    } else {
      element.style.right = side;
    }
  };

  private setPositionToVertical = (
    element: HTMLElement, lineWidth: number, thumbWidth: number,
  ): void => {
    element.style.right = `${lineWidth + thumbWidth / 3}px`;
    const side = `${-element.offsetHeight / 2}px`;

    if (element === this.min) {
      element.style.bottom = side;
    } else {
      element.style.top = side;
    }
  };

  private setOpacity = (condition: boolean, optionalCondition?: boolean): string => {
    if (condition || optionalCondition) {
      return '0';
    }
    return '1';
  };

  private switchOpacity = (
    element: HTMLElement, condition: boolean, optionalCondition?: boolean,
  ): void => {
    element.style.opacity = this.setOpacity(condition, optionalCondition);
  };

  private isPrimaryTouchingMin = (
    tipParams: PositionParams, vertical: boolean,
  ): boolean => {
    if (vertical) {
      return tipParams.top + tipParams.height >= this.min.offsetTop;
    }
    return tipParams.left <= (this.min.offsetLeft + this.min.offsetWidth);
  };

  private isPrimaryTouchingMax = (tipParams: PositionParams, vertical: boolean): boolean => {
    if (vertical) {
      return tipParams.top <= (this.max.offsetTop + this.max.offsetHeight);
    }
    return tipParams.left + tipParams.width >= this.max.offsetLeft;
  };

  private isExtraTouchingMin = (tipExtraParams: PositionParams, vertical: boolean): boolean => {
    if (vertical) {
      return tipExtraParams.top + tipExtraParams.height >= this.min.offsetTop;
    }
    return tipExtraParams.left <= (this.min.offsetLeft + this.min.offsetWidth);
  };

  private isExtraTouchingMax = (tipExtraParams: PositionParams, vertical: boolean): boolean => {
    if (vertical) {
      return tipExtraParams.top <= (this.max.offsetTop + this.max.offsetHeight);
    }
    return tipExtraParams.left + tipExtraParams.width >= this.max.offsetLeft;
  };

  private setOpacityToDouble = (
    tipParams: PositionParams,
    tipExtraParams: PositionParams,
    vertical: boolean,
  ): void => {
    const isPrimaryTouchingMin = this.isPrimaryTouchingMin(tipParams, vertical);
    const isExtraTouchingMin = this.isExtraTouchingMin(tipExtraParams, vertical);
    this.switchOpacity(this.min, isPrimaryTouchingMin, isExtraTouchingMin);

    const isPrimaryTouchingMax = this.isPrimaryTouchingMax(tipParams, vertical);
    const isExtraTouchingMax = this.isExtraTouchingMax(tipExtraParams, vertical);
    this.switchOpacity(this.max, isPrimaryTouchingMax, isExtraTouchingMax);
  };

  private setOpacityToSingle = (
    tipParams: PositionParams,
    vertical: boolean,
  ): void => {
    const isPrimaryTouchingMin = this.isPrimaryTouchingMin(tipParams, vertical);
    this.switchOpacity(this.min, isPrimaryTouchingMin);

    const isPrimaryTouchingMax = this.isPrimaryTouchingMax(tipParams, vertical);
    this.switchOpacity(this.max, isPrimaryTouchingMax);
  };
}

export default BoundaryLabels;
