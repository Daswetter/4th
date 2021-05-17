import { SubView } from "../SubView"

class Input extends SubView{
  public primary!: HTMLInputElement
  public extra!: HTMLInputElement

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
    this.setEventListener(this.primary)
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = initElement.querySelector('.dwSlider__input_from') as HTMLInputElement
    this.extra = initElement.querySelector('.dwSlider__input_to') as HTMLInputElement

  }
  public initExtra = (): void => {
    this.setEventListener(this.extra)
  }

  private setEventListener = (element: HTMLInputElement): void => {
    element.addEventListener('change', this.handleChange.bind(null, element))
  }

  private getValue = (element: HTMLInputElement): number => {
    return Number(element.value)
  }

  private handleChange = (element: HTMLInputElement): void => {
    const value = this.getValue(element)
    if (element === this.primary){
      this.onChanged(value)
    } else {
      this.onExtraChanged(value)
    }
    
  }

  private printValue = (element: HTMLInputElement, current: number): void => {
    element.value = String(current)
  }

  public update = (current: number, extra: boolean): void => {
    let targetElement = this.primary
    if (extra){
      targetElement = this.extra
    } 
    this.printValue(targetElement, current)
  }
}

export { Input }