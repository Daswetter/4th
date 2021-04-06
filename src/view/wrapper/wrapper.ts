class Wrapper{
  public wrapper!: HTMLElement
  private wrapperWasResized!: () => void

  constructor(public initElement: HTMLElement){
    this.initElement = initElement
    this.init()
  }
  
  private init = (): void => {
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
  setVertical = (): void => {
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