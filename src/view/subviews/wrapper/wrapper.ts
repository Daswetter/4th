import { SubView } from "../SubView"

class Wrapper extends SubView{
  public wrapper!: HTMLElement

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
  }
  
  private initPrimary = (initElement: HTMLElement): void => {
    this.wrapper = this.init(initElement, this.wrapper, 'wrapper')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.wrapper
  }

  public setVertical = (): void => {
    this.wrapper.classList.add('.range-slider__wrapper_vertical')
  }

}

export { Wrapper }