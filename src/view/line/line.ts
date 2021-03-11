class Line{
  public line!: HTMLElement
  private onLineClicked!: (arg0:number) => void;

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

  left(): number {
    return this.line.getBoundingClientRect().left    
  }
  bottom(): number {
    const bottom = this.line.getBoundingClientRect().bottom + document.documentElement.scrollTop
    return bottom
  }
 
  countPart = (dist: number): number => {
    return dist / this.line.offsetWidth
  }
  
  moveThumbByClickingForVertical = (event: MouseEvent) : void => {
    const distFromBeginToClick = - event.clientY + this.line.getBoundingClientRect().bottom
    const part = this.countPart(distFromBeginToClick)
    this.onLineClicked(part)
  }

  moveThumbByClickingForHorizontal = (event: MouseEvent) : void => {
    const distFromBeginToClick = event.clientX - this.line.getBoundingClientRect().left
    const part = this.countPart(distFromBeginToClick)
    this.onLineClicked(part)
  }

  bindLineClicked(callback: (arg0:number) => void): void {
    this.onLineClicked = callback;
  }
}

export { Line }