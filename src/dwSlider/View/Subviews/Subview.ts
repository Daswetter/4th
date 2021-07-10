import { Observer, IEvent } from '../../../types';

abstract class Subview {
  private observers: Observer[] = [];

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

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public notify(data: { value: number, current: boolean, extra: boolean, nearest: boolean }): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

export default Subview;
