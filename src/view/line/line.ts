class Line{
  public line!: HTMLElement
  private onLineClicked!: (arg0:number) => void;

  constructor(orientation: string) {
    this.init()
    
    if (orientation === 'vertical'){
      this.setClickListenerForVertical()
    } else if (orientation === 'horizontal'){
      this.setClickListenerForHorizontal()
    }
    
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
    return this.line.getBoundingClientRect().bottom
  }

  moveThumbByClickingForVertical = (event: MouseEvent) : void => {
    const distFromBeginToClick = - event.clientY + this.line.getBoundingClientRect().bottom
    this.onLineClicked(distFromBeginToClick)
  }

  moveThumbByClickingForHorizontal = (event: MouseEvent) : void => {
    const distFromBeginToClick = event.clientX - this.line.getBoundingClientRect().left
    this.onLineClicked(distFromBeginToClick)
  }

  bindLineClicked(callback: (arg0:number) => void): void {
    this.onLineClicked = callback;
  }
}

export { Line }