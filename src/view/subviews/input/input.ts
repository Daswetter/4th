import { Subview } from "../Subview"


class Input extends Subview{
  public primary!: HTMLInputElement
  public extra!: HTMLInputElement

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
    this.setEventListener(this.primary)

    this.subscribeOnEvent<HTMLInputElement>('input: changed', element => this.handleChange(element));
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = initElement.querySelector('.dwSlider__input_from') as HTMLInputElement
    this.extra = initElement.querySelector('.dwSlider__input_to') as HTMLInputElement
  }
  
  public initExtra = (): void => {
    this.setEventListener(this.extra)
  }

  private setEventListener = (element: HTMLInputElement): void => {
    element.addEventListener('change', () => this.emitEvent<HTMLInputElement>('input: changed', element))
  }

  private handleChange = (element: HTMLInputElement): void => {
    const value = Number(element.value)
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