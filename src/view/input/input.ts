
class Input{
  public input!: HTMLInputElement
  public inputExtra!: HTMLInputElement
  private onValueWasChanged!: (value: number) => void
  private onValueExtraWasChanged!: (value: number) => void

  constructor(){
    this.input = this.init(this.input)
    this.eventListener(this.input, this.sendValue.bind(null, this.input))
  }

  private init = (element: HTMLInputElement): HTMLInputElement => {
    element = document.createElement('input')
    element.classList.add('range-slider__input')
    return element
  }

  initInputExtra = (): void => {
    this.inputExtra = this.init(this.inputExtra)
    this.eventListener(this.inputExtra, this.sendValueForExtra.bind(null, this.inputExtra))
  }

  returnAsHTML = (): HTMLElement => {
    return this.input
  }

  returnExtraAsHTML = (): HTMLElement => {
    return this.inputExtra
  }

  private eventListener = (element: HTMLInputElement, fn: () => void): void => {
    ['enter','blur'].forEach( evt => 
      element.addEventListener(evt, fn, false)
    )
  }

  private setValue = (element: HTMLInputElement): number => {
    return +element.value
  }

  sendValue = (element: HTMLInputElement): void => {
    const value = this.setValue(element)
    this.onValueExtraWasChanged(value)
  }

  sendValueForExtra = (element: HTMLInputElement): void => {
    const value = this.setValue(element)
    this.onValueExtraWasChanged(value)
  }

  update = (res: number, element = 'primary'): void => {
    if (element === 'primary'){
      this.input.value = res + ''
    } else if ( element === 'extra'){
      this.inputExtra.value = res + ''
    } 
  }

  bindValueWasChanged(callback: (arg0:number) => void): void {
    this.onValueWasChanged = callback;
  }
  bindValueExtraWasChanged(callback: (arg0:number) => void): void {
    this.onValueExtraWasChanged = callback;
  }
}

export { Input }