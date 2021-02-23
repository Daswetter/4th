import { Wrapper } from '../wrapper/wrapper'
class Line{
  public line!: HTMLElement 
  private onWidthChanged!: Function;
  private onLeftSideChanged!: Function
  private onLineClicked!: Function;

  constructor(public initElement: Wrapper) {
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
    const distFromBeginToClick = event.pageX - this.line.getBoundingClientRect().left
    const part = (event.pageX - this.line.getBoundingClientRect().left) / this.line.offsetWidth
    this.onLineClicked(distFromBeginToClick, part)
  }

  bindLineClicked(callback: Function): void {
    this.onLineClicked = callback;
  }
}

export { Line }