import Subview from '../Subview';

class Wrapper extends Subview {
  public wrapper!: HTMLElement;

  constructor(initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.wrapper = this.init(initElement, this.wrapper, '');
  };

  public returnAsHTML = (): HTMLElement => this.wrapper;

  public setInitialSettings = (vertical: boolean): void => {
    if (vertical) {
      this.wrapper.classList.add('dwSlider_vertical');
    } else {
      this.wrapper.classList.add('dwSlider_horizontal');
    }
  };
}

export default Wrapper;
