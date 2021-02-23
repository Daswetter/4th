class Wrapper {
  public wrapper: HTMLElement

  constructor(public initElement: HTMLElement){
    this.initElement = initElement
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    initElement.append(this.wrapper)
    // this.wrapper.style.transform = 'rotate(90deg)'
  }
  append(element: HTMLElement): void {
    this.wrapper.append(element)
  }
}

export { Wrapper }