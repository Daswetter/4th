import { SubView } from "../SubView"

class Input extends SubView{
  public input!: HTMLInputElement
  public inputExtra!: HTMLInputElement

  constructor(){
    super()
    this.initPrimaryElement()
    
    this.setEventListener(this.input, this.sendValue.bind(null, this.input))
  }

  private initInput = (element: HTMLInputElement): HTMLInputElement => {
    element = document.createElement('input')
    element.classList.add('range-slider__input')
    return element
  }

  initPrimaryElement = (): void => {
    this.input = this.initInput(this.input)
  }

  public initInputExtra = (): void => {
    this.inputExtra = this.initInput(this.inputExtra)
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
    const value = this.getValue(element)
    this.onChanged(value)
  }

  private sendValueForExtra = (element: HTMLInputElement): void => {
    const value = this.getValue(element)
    this.onExtraChanged(value)
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
}

export { Input }