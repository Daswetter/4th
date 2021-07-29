import Subview from '../Subview';

class Input extends Subview {
  public primary!: HTMLInputElement;

  public extra!: HTMLInputElement;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
  }

  private initPrimary = (initElement: HTMLElement): void => {
    const input: HTMLInputElement | null = initElement.querySelector('.js-dw-slider__input_from');
    if (input) {
      this.primary = input;
      this.setEventListener(this.primary);
    }
  };

  public initExtra = (initElement: HTMLElement): void => {
    const input: HTMLInputElement | null = initElement.querySelector('.js-dw-slider__input_to');
    if (input) {
      this.extra = input;
      this.setEventListener(this.extra);
    }
  };

  private setEventListener = (element: HTMLInputElement): void => {
    this.subscribeToAnEvent<HTMLInputElement>('input: changed', (component) => this.handleChange(component));
    element.addEventListener('change', () => this.emitEvent<HTMLInputElement>('input: changed', element));
  };

  private handleChange = (element: HTMLInputElement): void => {
    const value = Number(element.value);
    if (element === this.primary) {
      this.notify({
        value, current: true, extra: false, nearest: false,
      });
    } else {
      this.notify({
        value, current: true, extra: true, nearest: false,
      });
    }
  };

  private printValue = (element: HTMLInputElement, current: number): void => {
    element.value = String(current);
  };

  public update = (current: number, extra: boolean): void => {
    let targetElement = this.primary;
    if (extra) {
      targetElement = this.extra;
    }
    this.printValue(targetElement, current);
  };
}

export default Input;
