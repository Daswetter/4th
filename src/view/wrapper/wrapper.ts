import { IWrapper } from './IWrapper'
class Wrapper implements IWrapper{
  public wrapper!: HTMLElement
  private wrapperWasResized!: () => void

  constructor(public initElement: HTMLElement){
    this.initElement = initElement
    this.init()
  }
  init = (): void => {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    this.initElement.append(this.wrapper)
    this.wrapper.style.display = 'flex'
    this.wrapper.style.flexDirection = 'column'
    window.addEventListener("resize", this.onResize)
  }
  returnAsHTML = (): HTMLElement => {
    return this.wrapper
  }
  setOrientation = (): void => {
    this.wrapper.style.flexDirection = 'row'
    this.wrapper.style.alignItems = 'flex-start'
  }

  onResize = (): void => {
    this.wrapperWasResized()
  }
  bindWrapperWasResized(callback: () => void): void {
    this.wrapperWasResized = callback;
  }
}

export { Wrapper }