
class Input{
  public input!: HTMLInputElement
  public onValueWasChanged!: (value: number) => void

  constructor(){
    this.init()
    this.eventListener(this.input, this.sendValue.bind(null, this.input))
  }

  init = (): void => {
    this.input = document.createElement('input')
    this.input.classList.add('range-slider__input')
  }

  returnAsHTMLElement = (): HTMLElement => {
    return this.input
  }

  eventListener = (element: HTMLInputElement, fn: () => void): void => {
    ['enter','blur'].forEach( evt => 
      element.addEventListener(evt, fn, false)
    )
  }

  sendValue = (element: HTMLInputElement): void => {
    const value = +element.value
    this.onValueWasChanged(value)
  }

  bindValueWasChanged(callback: (arg0:number) => void): void {
    this.onValueWasChanged = callback;
  }
}

export { Input }