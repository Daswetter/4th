export class View {
  private initElement: HTMLElement | null
  private line: HTMLElement | null
  // private handle: HTMLElement;
  // private line: HTMLElement;
  // private progressLine: HTMLElement;

  constructor() {
    this.initElement = this.getElement('.js-slider')
    this.line = this.createElement('div', 'range-slider__line')
    console.log(this.line);
    this.initElement.append(this.line) || '';
  }
  getElement(selector: string): HTMLElement | null{
    return document.querySelector(selector)
  }
  createElement(tag: string, className?: string): HTMLElement | null {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }
}