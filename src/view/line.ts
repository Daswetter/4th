class Line{
  public line: HTMLElement 
  private onLineChanged!: Function;
  private onLineClicked!: Function;

  constructor(public initElement: HTMLElement) {
    this.line = document.createElement('div')
    this.line.classList.add('range-slider__line')
    this.initElement.append(this.line)

    this.line.onclick = this.moveThumbByClicking
  }

  width(): void {
    const width = this.line.offsetWidth
    const leftSide = this.line.getBoundingClientRect().left

    this.onLineChanged( leftSide, width )
  }

  append(element: HTMLElement): void {
    this.line.append(element)
  }

  moveThumbByClicking = (event: MouseEvent) : void => {
    const distFromBeginToClick = event.pageX - this.line.getBoundingClientRect().left
    // this.onLineClicked(distFromBeginToClick)
    // this.thumb.style.left = event.pageX - this.line.getBoundingClientRect().left - this.thumb.offsetWidth / 2 + 'px' 
    const part = (event.pageX - this.line.getBoundingClientRect().left) / this.line.offsetWidth
    // sendPartToModel(part)
    this.onLineClicked(distFromBeginToClick, part)
  }
  // getPart(): number {
  //   const part = (event.pageX - this.line.getBoundingClientRect().left) / this.line.offsetWidth
  //   return part
  // }

  bindLineChanged(callback: Function): void {
    this.onLineChanged = callback;
  }
  bindLineClicked(callback: Function): void {
    this.onLineClicked = callback;
  }
}

export { Line }