class Line{
  public line: HTMLElement 
  private onWidthChanged!: Function;
  private onLeftSideChanged!: Function
  private onLineClicked!: Function;

  constructor(public initElement: HTMLElement) {
    this.line = document.createElement('div')
    this.line.classList.add('range-slider__line')
    this.initElement.append(this.line)

    this.line.onclick = this.moveThumbByClicking

    // this.line.countWidth()
    // this.line.countLeftSide()
  }

  countWidth(): void {
    const width = this.line.offsetWidth
    this.onWidthChanged(width)
  }
  countLeftSide(): void {
    const leftSide = this.line.getBoundingClientRect().left
    this.onLeftSideChanged( leftSide )
  }

  append(element: HTMLElement): void {
    this.line.append(element)
  }

  after(element: HTMLElement): void {
    this.line.after(element)
  }

  moveThumbByClicking = (event: MouseEvent) : void => {
    const distFromBeginToClick = event.pageX - this.line.getBoundingClientRect().left
    const part = (event.pageX - this.line.getBoundingClientRect().left) / this.line.offsetWidth
    this.onLineClicked(distFromBeginToClick, part)
  }



  bindWidthChanged(callback: Function): void {
    this.onWidthChanged = callback;
  }
  bindLeftSideChanged(callback: Function): void {
    this.onLeftSideChanged = callback;
  }
  bindLineClicked(callback: Function): void {
    this.onLineClicked = callback;
  }
}

export { Line }