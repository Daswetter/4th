import Subview from '../Subview';

class Input extends Subview {
  public primary!: HTMLInputElement;

  public extra!: HTMLInputElement;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
    this.setEventListener(this.primary);
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = initElement.querySelector('.js-dwSlider__input_from') as HTMLInputElement;
    this.extra = initElement.querySelector('.js-dwSlider__input_to') as HTMLInputElement;
  };

  public initExtra = (): void => {
    this.setEventListener(this.extra);
  };

  private setEventListener = (input: HTMLInputElement): void => {
    const element = input;
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
    const input = element;
    input.value = String(current);
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
