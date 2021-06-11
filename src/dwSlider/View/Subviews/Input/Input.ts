import { Subview } from "../Subview"


class Input extends Subview{
  public primary!: HTMLInputElement
  public extra!: HTMLInputElement

  constructor(public initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
    this.setEventListener(this.primary)
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = initElement.querySelector('.js-dwSlider__input_from') as HTMLInputElement
    this.extra = initElement.querySelector('.js-dwSlider__input_to') as HTMLInputElement
  }
  
  public initExtra = (): void => {
    this.setEventListener(this.extra)
  }

  private setEventListener = (element: HTMLInputElement): void => {
    this.subscribe<HTMLInputElement>('input: changed', element => this.handleChange(element));
    element.addEventListener('change', () => this.emit<HTMLInputElement>('input: changed', element))
  }

  private handleChange = (element: HTMLInputElement): void => {
    const value = Number(element.value)
    if (element === this.primary){
      this.mediator.notify({value: value, current: true, extra: false, nearest: false})
    } else {
      this.mediator.notify({value: value, current: true, extra: true, nearest: false})
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