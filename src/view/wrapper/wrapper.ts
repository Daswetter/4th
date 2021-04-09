class Wrapper{
  public wrapper!: HTMLElement

  constructor(public initElement: HTMLElement){
    this.initElement = initElement
    this.init()
  }
  
  private init = (): void => {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    this.initElement.append(this.wrapper)
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