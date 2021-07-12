import $ from 'jquery';

import { IOptions, IDwSlider } from '../../types';
import './components/toggle/toggle';
import './components/input/input';
import './config-panel.scss';

class ConfigPanel {
  private initElement!: HTMLElement;

  private DwSlider!: IDwSlider;

  private inputs!: { [key: string]: HTMLInputElement };

  private checkboxes!: { [key: string]: HTMLInputElement };

  private events: { [eventName: string]: Array<(arg0: any) => void> } = {};

  constructor(initElementName: string) {
    this.defineInitElement(initElementName);
    this.init();
  }

  private defineInitElement = (initElementName: string): void => {
    this.initElement = document.querySelector(initElementName) as HTMLElement;
    this.DwSlider = $(initElementName).data('DwSlider');
  };

  private init = (): void => {
    const inputTitles = ['min', 'max', 'step', 'from', 'to', 'scaleSize'];

    inputTitles.forEach(
      (title) => {
        this.inputs = { ...this.inputs, [title]: this.initInput(title as keyof IOptions) };
      },
    );

    const checkboxTitles = ['vertical', 'double', 'scale', 'progress', 'tip'];

    checkboxTitles.forEach(
      (title) => {
        this.checkboxes = {
          ...this.inputs, [title]: this.initCheckbox(title as keyof IOptions),
        };
      },
    );

    this.updateCurrentState();

    this.subscribeToAnEvent<{ element: HTMLInputElement, optionKey: keyof IOptions }>('input: changed', ({ element, optionKey }) => this.handleInputChange({ element, optionKey }));

    this.subscribeToAnEvent<{ optionKey: keyof IOptions }>('checkbox: changed', ({ optionKey }) => this.handleCheckboxChange({ optionKey }));

    this.subscribeToAnEvent<null>('checkbox: changed', () => this.isDisable(this.inputs.to, this.DwSlider.returnCurrentOptions().double, this.DwSlider.returnCurrentOptions().to as number));
    this.subscribeToAnEvent<null>('checkbox: changed', () => this.isDisable(this.inputs.scaleSize, this.DwSlider.returnCurrentOptions().scale, this.DwSlider.returnCurrentOptions().scaleSize));
  };

  private setEventListener = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', () => this.emitEvent<{ element: HTMLInputElement, optionKey: keyof IOptions }>('input: changed', { element, optionKey }));
  };

  private setEventListenerOnCheckbox = (
    element: HTMLInputElement, optionKey: keyof IOptions,
  ): void => {
    element.addEventListener('change', () => this.emitEvent<{ element: HTMLInputElement, optionKey: keyof IOptions }>('checkbox: changed', { element, optionKey }));
  };

  private isDisable = (
    element: HTMLInputElement, condition: boolean, relatedValue: number,
  ): void => {
    const modifiedElement = element;
    if (condition) {
      modifiedElement.disabled = false;
      modifiedElement.value = String(relatedValue);
    } else {
      modifiedElement.disabled = true;
      modifiedElement.value = '';
    }
  };

  private initInput = (optionKey: keyof IOptions): HTMLInputElement => {
    const element = this.initElement.querySelector(`.js-input__field_type_${optionKey}`) as HTMLInputElement;
    this.displayInputValue(element, optionKey);
    this.setEventListener(element, optionKey);
    return element;
  };

  private displayInputValue = (element: HTMLInputElement, optionKey: keyof IOptions) => {
    const modifiedElement = element;
    modifiedElement.value = String(this.DwSlider.returnCurrentOptions()[optionKey]);
  };

  private displayCheckboxState = (element: HTMLInputElement, optionKey: keyof IOptions) => {
    const modifiedElement = element;
    modifiedElement.checked = this.DwSlider.returnCurrentOptions()[optionKey] as boolean;
  };

  private handleInputChange = (
    params: { element: HTMLInputElement, optionKey: keyof IOptions },
  ): void => {
    this.DwSlider.update({
      [params.optionKey]: Number(params.element.value),
    });
    this.updateCurrentState();
  };

  private updateCurrentState = (): void => {
    Object.keys(this.inputs).forEach(
      (key) => this.displayInputValue(this.inputs[key], key as keyof IOptions),
    );
    Object.keys(this.checkboxes).forEach(
      (key) => this.displayCheckboxState(this.checkboxes[key], key as keyof IOptions),
    );

    this.isDisable(
      this.inputs.to,
      this.DwSlider.returnCurrentOptions().double,
      this.DwSlider.returnCurrentOptions().to as number,
    );
    this.isDisable(
      this.inputs.scaleSize,
      this.DwSlider.returnCurrentOptions().scale,
      this.DwSlider.returnCurrentOptions().scaleSize,
    );
  };

  private initCheckbox = (optionKey: keyof IOptions): HTMLInputElement => {
    const element = this.initElement.querySelector(`.js-toggle__input_type_${optionKey}`) as HTMLInputElement;
    this.setEventListenerOnCheckbox(element, optionKey);
    this.displayCheckboxState(element, optionKey);
    return element;
  };

  private handleCheckboxChange = (params: { optionKey: keyof IOptions }): void => {
    const isCurrentStateTrue = this.DwSlider.returnCurrentOptions()[params.optionKey];
    let newState: boolean;
    if (isCurrentStateTrue) {
      newState = false;
    } else {
      newState = true;
    }
    this.DwSlider.update({
      [params.optionKey]: newState,
    });
  };

  protected emitEvent<T>(eventName: string, data: T): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  protected subscribeToAnEvent<T>(eventName: string, fn: (data: T) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }
}

export default ConfigPanel;
