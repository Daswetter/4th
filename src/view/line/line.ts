import { Wrapper } from '../wrapper/wrapper'
class Line{
  public line!: HTMLElement 
  public orientation: string
  private onWidthChanged!: Function;
  private onLeftSideChanged!: Function
  private onLineClicked!: Function;

  constructor(public initElement: Wrapper, orientation: string) {
    this.orientation = orientation
    this.createLine()
    this.appendLine(this.initElement)
    
    this.setClickListener()
  }
  createLine = () : void => {
    this.line = document.createElement('div')
    this.line.classList.add('range-slider__line')
  }

  appendLine = (initElement: Wrapper) : void => {
    initElement.append(this.line)
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
  // TODO: get rid of there methods
  append(element: HTMLElement): void {
    this.line.append(element)
  }

  after(element: HTMLElement): void {
    this.line.after(element)
  }

  prepend(element: HTMLElement): void {
    this.line.prepend(element)
  }

  moveThumbByClicking = (event: MouseEvent) : void => {
    let distFromBeginToClick: number
    if (this.orientation === 'vertical'){
      distFromBeginToClick = - event.pageY + this.line.getBoundingClientRect().bottom
    } else {
      distFromBeginToClick = event.pageX - this.line.getBoundingClientRect().left
    }
    
    this.onLineClicked(distFromBeginToClick)
  }

  bindLineClicked(callback: Function): void {
    this.onLineClicked = callback;
  }
}

export { Line }