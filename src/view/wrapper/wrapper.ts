import { IWrapper } from './IWrapper'
class Wrapper implements IWrapper{
  public wrapper!: HTMLElement
  public orientation: string

  constructor(public initElement: HTMLElement, orientation: string){
    this.initElement = initElement
    this.orientation = orientation
    this.init()
    this.setOrientation(this.orientation)
  }
  init = (): void => {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    this.initElement.append(this.wrapper)
  }
  append(element: HTMLElement): void {
    this.wrapper.append(element)
  }
  setOrientation = (orientation: string): void => {
    if (orientation === 'vertical'){
      this.wrapper.style.transform = 'rotate(-90deg)'
    }
  }
}

export { Wrapper }