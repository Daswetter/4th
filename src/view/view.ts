export class View {
  private initElement: HTMLElement
  private line: HTMLElement
  private handle: HTMLElement
  private labels: HTMLElement
  private initialLabel: HTMLElement
  private finalLabel: HTMLElement 

  constructor() {
    this.initElement = this.getElement('.js-slider')
    this.line = this.createElement('div', 'range-slider__line')
    this.handle = this.createElement('div', 'range-slider__handle')
    this.labels = this.createElement('div', 'range-slider__labels')
    this.initialLabel = this.createElement('div', 'range-slider__initialLabel')
    this.finalLabel = this.createElement('div', 'range-slider__finalLabel')

    this.initialLabel.innerText = '0'
    this.finalLabel.innerText = '100'

    this.initElement.append(this.line)
    this.line.append(this.handle, this.labels)
    this.labels.append(this.initialLabel, this.finalLabel)
  }
  getElement(selector: string): HTMLElement{
    const element = document.querySelector(selector) as HTMLElement
    return element
  }
  createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
}
