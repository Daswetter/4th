
class Input{
  public input!: HTMLInputElement
  public inputExtra!: HTMLInputElement
  private onValueWasChanged!: (value: number) => void
  private onValueExtraWasChanged!: (value: number) => void

  constructor(){
    this.initInput()
  }

  private init = (element: HTMLInputElement): HTMLInputElement => {
    element = document.createElement('input')
    element.classList.add('range-slider__input')
    return element
  }

  private initInput = (): void => {
    this.input = this.init(this.input)
    this.setEventListener(this.input, this.sendValue.bind(null, this.input))
  }

  public initInputExtra = (): void => {
    this.inputExtra = this.init(this.inputExtra)
    this.setEventListener(this.inputExtra, this.sendValueForExtra.bind(null, this.inputExtra))
  }

  public returnAsHTML = (): HTMLElement => {
    return this.input
  }

  public returnExtraAsHTML = (): HTMLElement => {
    return this.inputExtra
  }

  private setEventListener = (element: HTMLInputElement, fn: () => void): void => {
    ['enter','blur'].forEach( evt => 
      element.addEventListener(evt, fn, false)
    )
  }

  private getValue = (element: HTMLInputElement): number => {
    return +element.value
  }

  private sendValue = (element: HTMLInputElement): void => {
    element.classList.add('test')
    const value = this.getValue(element)
    this.onValueWasChanged(value)
  }

  private sendValueForExtra = (element: HTMLInputElement): void => {
    const value = this.getValue(element)
    this.onValueExtraWasChanged(value)
  }

  private setValue = (element: HTMLInputElement, result: number): void => {
    element.value = result + ''
  }

  public update = (result: number, element = 'primary'): void => {
    let targetElement = this.input
    if ( element === 'extra'){
      targetElement = this.inputExtra
    } 
    this.setValue(targetElement, result)
  }

  public bindValueWasChanged(callback: (arg0:number) => void): void {
    this.onValueWasChanged = callback;
  }
  public bindValueExtraWasChanged(callback: (arg0:number) => void): void {
    this.onValueExtraWasChanged = callback;
  }
}

export { Input }