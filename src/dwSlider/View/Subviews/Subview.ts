import { IEvent } from '../../../types';
import Publisher from '../../Publisher';

abstract class Subview extends Publisher<{
  value: number, current: boolean, extra: boolean, nearest: boolean
}> {
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
}

export default Subview;
