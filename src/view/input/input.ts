
class Input{
  public input!: HTMLElement

  constructor(){
    this.init()
  }

  init = (): void => {
    this.input = document.createElement('input')
    this.input.classList.add('range-slider__input')
  }

  returnAsHTMLElement = (): HTMLElement => {
    return this.input
  }
}

export { Input }