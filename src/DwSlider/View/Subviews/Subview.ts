import Publisher from '../../Publisher';
import { SubviewData } from '../View.types';

abstract class Subview extends Publisher<SubviewData> {
  protected events: Record<string, Array<(arg0: any) => void>> = {};

  protected init = (
    initElement: HTMLElement,
    element: HTMLElement,
    styleName: string,
  ): HTMLElement => {
    let modifiedElement = element;
    modifiedElement = document.createElement('div');
    modifiedElement.classList.add(`dw-slider${styleName}`);
    initElement.append(modifiedElement);
    return modifiedElement;
  };

  protected emitEvent<EventType>(eventName: string, data: EventType): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  protected subscribeToAnEvent<EventType>(
    eventName: keyof Record<string, Array<(arg0: any) => void>>,
    fn: (data: EventType) => void,
  ): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }
}

export default Subview;
