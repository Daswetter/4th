import { SubView } from "../SubView"

class Input extends SubView{
  public input!: HTMLInputElement
  public inputExtra!: HTMLInputElement

  constructor(initElement: HTMLElement){
    super()
    this.initInput(initElement)
    this.setEventListener(this.input, this.sendValue.bind(null, this.input))
  }

  initInput = (initElement: HTMLElement): void => {
    this.input = initElement.querySelector('.range-slider__input_from') as HTMLInputElement
    this.inputExtra = initElement.querySelector('.range-slider__input_to') as HTMLInputElement

  }
  public initInputExtra = (): void => {
    this.setEventListener(this.inputExtra, this.sendValueForExtra.bind(null, this.inputExtra))
  }

  private setEventListener = (element: HTMLInputElement, fn: () => void): void => {
    element.addEventListener('change', fn, false)
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