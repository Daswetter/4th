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

  public returnAsHTML = (): HTMLElement => {
    return this.wrapper
  }

  public setVertical = (): void => {
    this.wrapper.style.flexDirection = 'row'
    this.wrapper.style.alignItems = 'flex-start'
  }

  private onResize = (): void => {
    this.wrapperWasResized()
  }
  
  public bindWrapperWasResized(callback: () => void): void {
    this.wrapperWasResized = callback;
  }
}

export { Wrapper }