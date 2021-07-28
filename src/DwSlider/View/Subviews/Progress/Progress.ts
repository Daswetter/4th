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
    this.progress = this.init(initElement, this.progress, '__progress');
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

  public update = (
    part: number, lineSize: Size, vertical: boolean, extra: boolean,
  ) :void => {
    if (!extra && !vertical) {
      this.part = part;
    }

    if (extra && !vertical) {
      this.partExtra = part;
    }

    let lineOneSize = lineSize.width;
    let generalSide = 'left';
    let secondSide = 'right';

    if (!extra && vertical) {
      this.part = part;
      lineOneSize = lineSize.height;
      generalSide = 'bottom';
      secondSide = 'top';
    }

    if (extra && vertical) {
      this.partExtra = part;
      lineOneSize = lineSize.height;
      generalSide = 'bottom';
      secondSide = 'top';
    }

    this.setProgress(lineOneSize, generalSide, secondSide);
  };

  private setProgress = (
    lineSide: number, generalSideName: string, secondSideName: string,
  ): void => {
    let partForGeneral = this.part;
    let partForSecond = this.partExtra;

    if (this.part >= this.partExtra) {
      partForGeneral = this.partExtra;
      partForSecond = this.part;
    }

    const generalSide = partForGeneral * lineSide;
    const secondSide = lineSide - partForSecond * lineSide;

    this.progress.style.setProperty(`${generalSideName}`, `${generalSide}px`);
    this.progress.style.setProperty(`${secondSideName}`, `${secondSide}px`);
  };
}

export default Progress;
