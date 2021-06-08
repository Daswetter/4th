import { IEvent } from '../../../types'
abstract class Subview {
  protected onChanged!: (part: number) => void;
  protected onExtraChanged!: (part: number) => void;
  protected events: IEvent<any> = {}

  protected init = (initElement: HTMLElement, element: HTMLElement, styleName: string): HTMLElement => {
    element = document.createElement('div')
    element.classList.add(`dwSlider__${styleName}`)
    initElement.append(element)
    return element
  }

  protected emit<T>(eventName: string, data: T): void{
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        fn.call(null, data);
      });
    }
  }

  protected subscribe<T>(eventName: keyof IEvent<T>, fn: (data: T) => void) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }


  public bindChangedState(callback: (arg0: number) => void ): void {
    this.onChanged = callback;
  }
  public bindExtraChangedState(callback: (arg0: number) => void ): void {
    this.onExtraChanged = callback;
  }
}

export { Subview }
