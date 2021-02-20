class Wrapper {
  public wrapper: HTMLElement

  constructor(public initElement: HTMLElement){
    this.initElement = initElement
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('range-slider__wrapper')
    initElement.append(this.wrapper)
    // this.getWidth
  }
  append(element: HTMLElement): void {
    this.wrapper.append(element)
  }
  // getWidth(): number {
  //   this.onWidthWasChanged(this.wrapper.offsetWidth)
  // }


  // bindGetWidth = (callback: Function): void => {
  //   this.onWidthWasChanged = callback;
  // }
}

export { Wrapper }