import Subview from '../Subview';
import { Size } from '../Subview.types';

class Scale extends Subview {
  public scale!: HTMLElement;

  public scaleElements: Record<string, HTMLElement> = {};

  private scaleValues!: Record<string, string>;

  private lineSize!: Size;

  private isVertical!: boolean;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
  }

  public initScale = (
    scaleValues: Record<string, string>,
    lineSize: Size,
    isVertical: boolean,
  ): void => {
    this.scaleValues = scaleValues;
    this.lineSize = lineSize;
    this.isVertical = isVertical;
    this.createScale(scaleValues);
    this.printScaleValues(scaleValues);
    this.setPosition();
    this.hideScaleElements();
    this.subscribeToAnEvent<number>('scale: clicked', (part) => this.notify({
      value: part, isCurrent: false, isExtra: false, isNearest: true,
    }));
    this.setScaleListener();
  };

  private initPrimary = (initElement: HTMLElement): void => {
    this.scale = this.init(initElement, '__scale');
  };

  private createScale = (scaleValues: Record<string, string>): void => {
    Object.keys(scaleValues).forEach((key) => this.createScaleElement(key));
  };

  private createScaleElement = (part: string): void => {
    const element = document.createElement('div');
    this.scale.append(element);
    element.classList.add('dw-slider__scale-number');
    this.scaleElements = { ...this.scaleElements, [part]: element };
  };

  private printScaleValues = (scaleValues: Record<string, string>): void => {
    Object.keys(scaleValues).forEach((key) => this.printScaleElement(key));
  };

  private printScaleElement = (part: string): void => {
    this.scaleElements[part].innerText = this.scaleValues[part];
  };

  private setPosition = (): void => {
    Object.keys(this.scaleElements).forEach((key) => this.setPositionToAnElement(key));
  };

  private areElementsTouching = (part: number, index: number, orderedKeys: number[]): boolean => {
    const currentElement = this.scaleElements[part];
    const prevElement = this.scaleElements[orderedKeys[index - 1]];
    if (this.isVertical) {
      return currentElement.offsetTop + currentElement.offsetHeight >= prevElement.offsetTop;
    }
    return currentElement.offsetLeft <= prevElement.offsetLeft + prevElement.offsetWidth;
  };

  private hideAdjacentElements = (orderedKeys: number[]): number[] => {
    const reducedKeys = orderedKeys.slice();
    orderedKeys.forEach((part, index) => {
      if (index !== 0 && this.areElementsTouching(part, index, orderedKeys)) {
        for (let i = 1; i < orderedKeys.length; i += 2) {
          this.scaleElements[orderedKeys[i]].style.display = 'none';
          delete reducedKeys[i];
        }
      }
    });
    return reducedKeys.filter((el) => el != null);
  };

  private hideScaleElements = () : void => {
    const keys = Object.keys(this.scaleElements);
    const numberKeys: Array<number> = [];
    keys.forEach((part) => numberKeys.push(Number(part)));
    let orderedKeys = numberKeys.sort((a, b) => a - b);
    let i = 0;
    while (i < 5) {
      orderedKeys = this.hideAdjacentElements(orderedKeys);
      i += 1;
    }
  };

  private setPositionToAnElement = (part: string): void => {
    this.scaleElements[part].style.left = `${Number(part) * this.lineSize.width - this.scaleElements[part].offsetWidth / 2}px`;
    this.scaleElements[part].style.top = `${this.lineSize.height * 2}px`;

    if (this.isVertical) {
      this.scaleElements[part].style.top = `${this.lineSize.height - Number(part) * this.lineSize.height - this.scaleElements[part].offsetHeight / 2}px`;
      this.scaleElements[part].style.left = `${this.lineSize.width * 2}px`;
    }
  };

  private setScaleListener = (): void => {
    Object.keys(this.scaleElements).forEach((key) => this.setListenerForElement(key));
  };

  private setListenerForElement = (part: string): void => {
    this.scaleElements[part].addEventListener('click', () => this.emitEvent<number>('scale: clicked', Number(part)));
  };
}

export default Scale;
