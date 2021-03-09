class Line{
  public line!: HTMLElement 
  public orientation: string
  private onLineClicked!: (arg0:number) => void;

  constructor(orientation: string) {
    this.orientation = orientation
    this.createLine()
    
    this.setClickListener()
    
    
  }
  createLine = () : void => {
    this.line = document.createElement('div')
    this.line.classList.add('range-slider__line')
  }
  returnAsHTML = (): HTMLElement => {
    return this.line
  }

  setClickListener = (): void => {
    this.line.onclick = this.moveThumbByClicking
  }
  width(): number {
    return this.line.offsetWidth
  }

  left(): number {
    return this.line.getBoundingClientRect().left    
  }
  bottom(): number {
    return this.line.getBoundingClientRect().bottom
  }

  moveThumbByClicking = (event: MouseEvent) : void => {
    let distFromBeginToClick: number
    if (this.orientation === 'vertical'){
      distFromBeginToClick = - event.clientY + this.line.getBoundingClientRect().bottom
      
    } else {
      distFromBeginToClick = event.clientX - this.line.getBoundingClientRect().left
    }
    this.onLineClicked(distFromBeginToClick)
  }

  bindLineClicked(callback: (arg0:number) => void): void {
    this.onLineClicked = callback;
  }
}

export { Line }