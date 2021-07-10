import { Observer } from '../../../../types';
import Subview from '../Subview';

class Scale extends Subview {
  public scale!: HTMLElement;

  public scaleElements:{ [key: string]: HTMLElement } = {};

  private scaleValues!: { [key: string]: string };

  private lineSize!: { width: number; height: number };

  private vertical!: boolean;

  constructor(public initElement: HTMLElement, public observer: Observer) {
    super();
    this.initPrimary(initElement);
    this.observer = observer;
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.scale = this.init(initElement, this.scale, '__scale');
  };

  public initScale = (
    scaleValues: { [key: string]: string },
    lineSize: { width: number; height: number },
    vertical: boolean,
  ): void => {
    this.scaleValues = scaleValues;
    this.lineSize = lineSize;
    this.vertical = vertical;
    this.createScale(scaleValues);
    this.printScaleValues(scaleValues);
    this.setPosition();
    this.subscribeToAnEvent<number>('scale: clicked', (part) => this.notify({
      value: part, current: false, extra: false, nearest: true,
    }));
    this.setScaleListener();
  };

  private createScale = (scaleValues: { [key: string]: string }): void => {
    Object.keys(scaleValues).forEach((key) => this.createScaleElement(key));
  };

  private createScaleElement = (part: string): void => {
    const element = document.createElement('div');
    this.scale.append(element);
    element.classList.add('dwSlider__scale-number');
    this.scaleElements = { ...this.scaleElements, [part]: element };
  };

  private printScaleValues = (scaleValues: { [key: string]: string }): void => {
    Object.keys(scaleValues).forEach((key) => this.printScaleElement(key));
  };

  private printScaleElement = (part: string): void => {
    this.scaleElements[part].innerText = this.scaleValues[part];
  };

  private setPosition = (): void => {
    Object.keys(this.scaleElements).forEach((key) => this.setPositionToAnElement(key));
  };

  private setPositionToAnElement = (part: string): void => {
    this.scaleElements[part].style.left = `${Number(part) * this.lineSize.width - this.scaleElements[part].offsetWidth / 2}px`;
    this.scaleElements[part].style.top = `${this.lineSize.height * 2}px`;

    if (this.vertical) {
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
