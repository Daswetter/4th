import Subview from '../Subview';
import { Size } from '../Subview.types';

class Progress extends Subview {
  public progress!: HTMLElement;

  private partExtra = 0;

  private part = 0;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
  }

  public setInitialSettings = (
    lineSize: Size, isVertical = false,
  ): void => {
    this.progress.style.top = `${(lineSize.height - this.progress.offsetHeight) / 2}px`;
    this.progress.classList.add('dw-slider__progress_horizontal');

    if (isVertical) {
      this.progress.classList.add('dw-slider__progress_vertical');
      this.progress.style.top = '';
      this.progress.style.left = `${(lineSize.width - this.progress.offsetWidth) / 2}px`;
    }
  };

  public update = (
    part: number, lineSize: Size, isVertical: boolean, isExtra: boolean,
  ) :void => {
    if (isExtra) {
      this.partExtra = part;
    } else {
      this.part = part;
    }
    const lineOneSize = this.getLineSize(isVertical, lineSize);
    const generalSide = this.getGeneralSide(isVertical);
    const secondSide = this.getSecondSide(isVertical);
    this.setProgress(lineOneSize, generalSide, secondSide);
  };

  private initPrimary = (initElement: HTMLElement): void => {
    this.progress = this.init(initElement, '__progress');
  };

  private getLineSize = (isVertical: boolean, lineSize: Size): number => {
    if (isVertical) {
      return lineSize.height;
    }
    return lineSize.width;
  };

  private getGeneralSide = (isVertical: boolean): string => {
    if (isVertical) {
      return 'bottom';
    }
    return 'left';
  };

  private getSecondSide = (isVertical: boolean): string => {
    if (isVertical) {
      return 'top';
    }
    return 'right';
  };

  private getParts = (): Array<number> => {
    if (this.part >= this.partExtra) {
      return [this.partExtra, this.part];
    }
    return [this.part, this.partExtra];
  };

  private setProgress = (
    lineSide: number, generalSideName: string, secondSideName: string,
  ): void => {
    const [partForGeneral, partForSecond] = this.getParts();
    const generalSide = partForGeneral * lineSide;
    const secondSide = lineSide - partForSecond * lineSide;

    this.progress.style.setProperty(`${generalSideName}`, `${generalSide}px`);
    this.progress.style.setProperty(`${secondSideName}`, `${secondSide}px`);
  };
}

export default Progress;
