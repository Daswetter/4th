class Wrapper {
  public wrapper: HTMLElement

  constructor(public initElement: HTMLElement){
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    this.initElement.append(this.wrapper)
  }
  append(element: HTMLElement): void {
    this.wrapper.append(element)
  }
}

export { Wrapper }