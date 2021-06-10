import { IEvent, IView } from '../../../types'
abstract class Subview {
  public mediator!: IView
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

  public setMediator(mediator: IView): void {
    this.mediator = mediator;
  }
}

export { Subview }

