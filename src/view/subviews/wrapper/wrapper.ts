import { SubView } from "../SubView"

class Wrapper extends SubView{
  public wrapper!: HTMLElement

  constructor(initElement: HTMLElement){
    super()
    this.initPrimaryElement(initElement)
  }
  
  initPrimaryElement = (initElement: HTMLElement): void => {
    this.wrapper = this.init(initElement, this.wrapper, 'wrapper')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.wrapper
  }

  public setVertical = (): void => {
    this.wrapper.style.flexDirection = 'row'
    this.wrapper.style.alignItems = 'flex-start'
  }

}

export { Wrapper }