import { IEvent } from '../../../types';

abstract class Subview {
  public updatableMethod!: (
    data: { value: number, current: boolean, extra: boolean, nearest: boolean }
  ) => void;

  protected events: IEvent<any> = {};

  protected init = (
    initElement: HTMLElement,
    element: HTMLElement,
    styleName: string,
  ): HTMLElement => {
    let modifiedElement = element;
    modifiedElement = document.createElement('div');
    modifiedElement.classList.add(`dwSlider${styleName}`);
    initElement.append(modifiedElement);
    return modifiedElement;
  };

  protected emitEvent<T>(eventName: string, data: T): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  protected subscribeToAnEvent<T>(eventName: keyof IEvent<T>, fn: (data: T) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }

  public subscribe(updatableMethod: (
    data: { value: number, current: boolean, extra: boolean, nearest: boolean }
  ) => void): void {
    this.updatableMethod = updatableMethod;
  }

  public notify(data: { value: number, current: boolean, extra: boolean, nearest: boolean }): void {
    this.updatableMethod(data);
  }
}

export default Subview;
