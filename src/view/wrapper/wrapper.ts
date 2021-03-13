import { IWrapper } from './IWrapper'
class Wrapper implements IWrapper{
  public wrapper!: HTMLElement
  onWrapperWidthWasChanged!:() => void

  constructor(public initElement: HTMLElement){
    this.initElement = initElement
    this.init()
    
  }
  init = (): void => {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    this.initElement.append(this.wrapper)
  }
  returnAsHTML = (): HTMLElement => {
    return this.wrapper
  }
  setOrientation = (): void => {
    this.wrapper.style.transform = 'rotate(-90deg)'
  }
}

export { Wrapper }