import Subview from '../Subview';

class Input extends Subview {
  public primary!: HTMLInputElement;

  public extra!: HTMLInputElement;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
  }

  public initExtra = (initElement: HTMLElement): void => {
    const input: HTMLInputElement | null = initElement.querySelector('.js-dw-slider__input_to');
    if (input) {
      this.extra = input;
      this.setEventListener(this.extra);
    }
  };

  public update = (current: number, isExtra: boolean): void => {
    this.printValue(this.getElement(isExtra), current);
  };

  private initPrimary = (initElement: HTMLElement): void => {
    const input: HTMLInputElement | null = initElement.querySelector('.js-dw-slider__input_from');
    if (input) {
      this.primary = input;
      this.setEventListener(this.primary);
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
        value, isCurrent: true, isExtra: false, isNearest: false,
      });
    } else {
      this.notify({
        value, isCurrent: true, isExtra: true, isNearest: false,
      });
    }
  };

  private printValue = (element: HTMLInputElement, current: number): void => {
    element.value = String(current);
  };

  private getElement = (isExtra: boolean): HTMLInputElement => {
    if (isExtra) {
      return this.extra;
    }
    return this.primary;
  };
}

export default Input;
