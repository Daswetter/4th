import { SubView } from "../SubView"

class Input extends SubView{
  public input!: HTMLInputElement
  public inputExtra!: HTMLInputElement

  constructor(initElement: HTMLElement){
    super()
    this.initInput(initElement)
    this.setEventListener(this.input)
  }

  private initInput = (initElement: HTMLElement): void => {
    this.input = initElement.querySelector('.range-slider__input_from') as HTMLInputElement
    this.inputExtra = initElement.querySelector('.range-slider__input_to') as HTMLInputElement

  }
  public initInputExtra = (): void => {
    this.setEventListener(this.inputExtra)
  }

  private setEventListener = (element: HTMLInputElement): void => {
    element.addEventListener('change', this.sendValue.bind(null, element))
  }

  private getValue = (element: HTMLInputElement): number => {
    return +element.value
  }

  private sendValue = (element: HTMLInputElement): void => {
    const value = this.getValue(element)
    if (element === this.input){
      this.onChanged(value)
    } else {
      this.onExtraChanged(value)
    }
    
  }

  private printValue = (element: HTMLInputElement, current: number): void => {
    element.value = String(current)
  }

  public update = (current: number, element = 'primary'): void => {
    let targetElement = this.input
    if ( element === 'extra'){
      targetElement = this.inputExtra
    } 
    this.printValue(targetElement, current)
  }
}

export { Input }