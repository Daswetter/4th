import { SubView } from "../SubView"

class Input extends SubView{
  public input = document.querySelector('.js-config-panel__from') as HTMLInputElement
  public inputExtra = document.querySelector('.js-config-panel__to') as HTMLInputElement

  constructor(){
    super()
    this.setEventListener(this.input, this.sendValue.bind(null, this.input))
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