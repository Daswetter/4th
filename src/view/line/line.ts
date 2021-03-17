class Line{
  public line!: HTMLElement
  private onLineClicked!: (arg0:number) => void;
  private onLineWidthWasChanged!: (arg0:number) => void;

  constructor() {
    this.init()
  }

  init = () : void => {
    this.line = document.createElement('div')
    this.line.classList.add('range-slider__line')
  }
  returnAsHTML = (): HTMLElement => {
    return this.line
  }

  setClickListenerForVertical = (): void => {
    this.line.onclick = this.moveThumbByClickingForVertical
  }
  setClickListenerForHorizontal = (): void => {
    this.line.onclick = this.moveThumbByClickingForHorizontal
  }

  width(): number {
    return this.line.offsetWidth
  }
  
  height(): number {
    return this.line.offsetHeight
  }

  left(): number {
    const left = this.line.getBoundingClientRect().left
    return left
  }
  bottom(): number {
    const bottom = this.line.getBoundingClientRect().bottom + document.documentElement.scrollTop
    return bottom
  }
 
  
  moveThumbByClickingForVertical = (event: MouseEvent) : void => {
    const distFromBeginToClick = - event.clientY + this.line.getBoundingClientRect().bottom
    const part = distFromBeginToClick / this.line.offsetHeight
    this.onLineClicked(part)
  }

  moveThumbByClickingForHorizontal = (event: MouseEvent) : void => {
    const distFromBeginToClick = event.clientX - this.left()
    const part = distFromBeginToClick / this.width()
    this.onLineClicked(part)
  }

  verticalMod = (): void => {
    const height = this.line.offsetHeight + 'px';
    const width = this.line.offsetWidth + 'px';
    [this.line.style.width, this.line.style.height] = [height, width]
  }

  bindLineClicked(callback: (arg0:number) => void): void {
    this.onLineClicked = callback;
  }
}

export { Line }