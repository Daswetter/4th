import { SubView } from "../SubView"

class Wrapper extends SubView{
  public wrapper!: HTMLElement

  constructor(){
    super()
    this.initPrimaryElement()
  }
  
  initPrimaryElement = (): void => {
    this.wrapper = this.init(this.wrapper, 'wrapper')
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