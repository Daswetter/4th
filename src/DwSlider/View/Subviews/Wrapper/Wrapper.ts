import Subview from '../Subview';

class Wrapper extends Subview {
  public wrapper!: HTMLElement;

  constructor(initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
  }

  public returnAsHTML = (): HTMLElement => this.wrapper;

  public setInitialSettings = (vertical: boolean): void => {
    if (vertical) {
      this.wrapper.classList.add('dw-slider_vertical');
    } else {
      this.wrapper.classList.add('dw-slider_horizontal');
    }
  };

  private initPrimary = (initElement: HTMLElement): void => {
    this.wrapper = this.init(initElement, '');
  };
}

export default Wrapper;
