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

  private initPrimary = (initElement: HTMLElement): void => {
    this.progress = this.init(initElement, '__progress');
  };

  public setInitialSettings = (
    lineSize: Size, vertical = false,
  ): void => {
    this.progress.style.top = `${(lineSize.height - this.progress.offsetHeight) / 2}px`;
    this.progress.classList.add('dw-slider__progress_horizontal');

    if (vertical) {
      this.progress.classList.add('dw-slider__progress_vertical');
      this.progress.style.top = '';
      this.progress.style.left = `${(lineSize.width - this.progress.offsetWidth) / 2}px`;
    }
  };

  private setLineSize = (vertical: boolean, lineSize: Size): number => {
    if (vertical) {
      return lineSize.height;
    }
    return lineSize.width;
  };

  private setGeneralSide = (vertical: boolean): string => {
    if (vertical) {
      return 'bottom';
    }
    return 'left';
  };

  private setSecondSide = (vertical: boolean): string => {
    if (vertical) {
      return 'top';
    }
    return 'right';
  };

  public update = (
    part: number, lineSize: Size, vertical: boolean, extra: boolean,
  ) :void => {
    if (extra) {
      this.partExtra = part;
    } else {
      this.part = part;
    }
    const lineOneSize = this.setLineSize(vertical, lineSize);
    const generalSide = this.setGeneralSide(vertical);
    const secondSide = this.setSecondSide(vertical);
    this.setProgress(lineOneSize, generalSide, secondSide);
  };

  private setPart = (): Array<number> => {
    if (this.part >= this.partExtra) {
      return [this.partExtra, this.part];
    }
    return [this.part, this.partExtra];
  };

  private setProgress = (
    lineSide: number, generalSideName: string, secondSideName: string,
  ): void => {
    const [partForGeneral, partForSecond] = this.setPart();
    const generalSide = partForGeneral * lineSide;
    const secondSide = lineSide - partForSecond * lineSide;

    this.progress.style.setProperty(`${generalSideName}`, `${generalSide}px`);
    this.progress.style.setProperty(`${secondSideName}`, `${secondSide}px`);
  };
}

export default Progress;
