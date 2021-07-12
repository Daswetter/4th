import Publisher from '../../Publisher';

abstract class Subview extends Publisher<{
  value: number, current: boolean, extra: boolean, nearest: boolean
}> {
  protected events: {
    [eventName: string]: Array<(arg0: any) => void>
  } = {};

  protected init = (
    initElement: HTMLElement,
    element: HTMLElement,
    styleName: string,
  ): HTMLElement => {
    let modifiedElement = element;
    modifiedElement = document.createElement('div');
    modifiedElement.classList.add(`DwSlider${styleName}`);
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
    eventName: keyof { [eventName: string]: Array<(arg0: EventType) => void> },
    fn: (data: EventType) => void,
  ): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }
}

export default Subview;
