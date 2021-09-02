import $ from 'jquery';

import { IDwSlider, IOptions } from '../../types';
import './components/toggle/toggle';
import './components/input/input';
import './config-panel.scss';
import { OptionKey, ChangeEvent } from './ConfigPanel.types';

class ConfigPanel {
  private initElement!: HTMLElement;

  private DwSlider!: IDwSlider;

  private inputs!: Record<string, HTMLInputElement>;

  private checkboxes!: Record<string, HTMLInputElement>;

  private events: Record<string, Array<(arg0: any) => void>> = {};

  constructor(initElementName: string) {
    this.defineInitElement(initElementName);
    this.init();
  }

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

  private defineInitElement = (initElementName: string): void => {
    const initElement: HTMLElement | null = document.querySelector(initElementName);
    if (initElement) {
      this.initElement = initElement;
    }
    this.DwSlider = $(initElementName).data('DwSlider');
  };

  private init = (): void => {
    const inputTitles = ['min', 'max', 'step', 'from', 'to', 'scaleSize'];

    inputTitles.forEach(
      (title) => {
        this.inputs = { ...this.inputs, [title]: this.initInput(title) };
      },
    );

    const checkboxTitles = ['isVertical', 'isDouble', 'hasScale', 'hasProgress', 'hasTip'];

    checkboxTitles.forEach(
      (title) => {
        this.checkboxes = {
          ...this.inputs, [title]: this.initCheckbox(title),
        };
      },
    );

    this.updateCurrentState();

    this.subscribeToAnEvent<ChangeEvent>('input: changed', ({ element, optionKey }) => this.handleInputChange({ element, optionKey }));

    this.subscribeToAnEvent<OptionKey>('checkbox: changed', ({ optionKey }) => this.handleCheckboxChange({ optionKey }));

    this.subscribeToAnEvent<null>('checkbox: changed', () => this.isDisable(this.inputs.to, this.DwSlider.getCurrentValues().isDouble, this.DwSlider.getCurrentValues().to));
    this.subscribeToAnEvent<null>('checkbox: changed', () => this.isDisable(this.inputs.scaleSize, this.DwSlider.getCurrentValues().hasScale, this.DwSlider.getCurrentValues().scaleSize));
  };

  private setEventListener = (element: HTMLInputElement, optionKey: string): void => {
    element.addEventListener('change', () => this.emitEvent<ChangeEvent>('input: changed', { element, optionKey }));
  };

  private setEventListenerOnCheckbox = (
    element: HTMLInputElement, optionKey: string,
  ): void => {
    element.addEventListener('change', () => this.emitEvent<ChangeEvent>('checkbox: changed', { element, optionKey }));
  };

  private isDisable = (
    element: HTMLInputElement, condition: boolean, relatedValue: number,
  ): void => {
    if (condition) {
      element.disabled = false;
      element.value = String(relatedValue);
    } else {
      element.disabled = true;
      element.value = '';
    }
  };

  private initInput = (optionKey: string): HTMLInputElement => {
    const element: HTMLInputElement | null = this.initElement.querySelector(`.js-input__field_type_${optionKey}`);
    if (element) {
      this.displayInputValue(element, optionKey);
      this.setEventListener(element, optionKey);
      return element;
    }
    throw new Error(`${optionKey} is not found`);
  };

  private displayInputValue = (element: HTMLInputElement, optionKey: string) => {
    const currentOptions = this.DwSlider.getCurrentValues();
    if (optionKey in currentOptions) {
      element.value = String(currentOptions[optionKey as keyof IOptions]);
    }
  };

  private displayCheckboxState = (element: HTMLInputElement, optionKey: string) => {
    const currentOptions = this.DwSlider.getCurrentValues();
    if (optionKey in currentOptions) {
      element.checked = Boolean(currentOptions[optionKey as keyof IOptions]);
    }
  };

  private handleInputChange = (params: ChangeEvent): void => {
    this.DwSlider.update({
      [params.optionKey]: Number(params.element.value),
    });
    this.updateCurrentState();
  };

  private updateCurrentState = (): void => {
    Object.keys(this.inputs).forEach(
      (key) => this.displayInputValue(this.inputs[key], key),
    );
    Object.keys(this.checkboxes).forEach(
      (key) => this.displayCheckboxState(this.checkboxes[key], key),
    );

    const currentOptions = this.DwSlider.getCurrentValues();
    this.isDisable(
      this.inputs.to,
      currentOptions.isDouble,
      currentOptions.to,
    );
    this.isDisable(
      this.inputs.scaleSize,
      currentOptions.hasScale,
      currentOptions.scaleSize,
    );
  };

  private initCheckbox = (optionKey: string): HTMLInputElement => {
    const element: HTMLInputElement | null = this.initElement.querySelector(`.js-toggle__input_type_${optionKey}`);
    if (element) {
      this.setEventListenerOnCheckbox(element, optionKey);
      this.displayCheckboxState(element, optionKey);
      return element;
    }
    throw new Error(`${optionKey} is not found`);
  };

  private handleCheckboxChange = (params: OptionKey): void => {
    const isCurrentStateTrue = this.DwSlider.getCurrentValues()[params.optionKey];
    const newState = !isCurrentStateTrue;
    this.DwSlider.update({
      [params.optionKey]: newState,
    });
  };
}

export default ConfigPanel;
