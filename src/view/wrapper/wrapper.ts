class Wrapper {
  public wrapper: HTMLElement
  public orientation: string

  constructor(public initElement: HTMLElement, orientation: string){
    this.initElement = initElement
    this.orientation = orientation
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    initElement.append(this.wrapper)
    
    this.setOrientation(this.orientation)
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