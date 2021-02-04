import { Line } from './line'

class Thumb{
  public thumb: HTMLElement
  public _shiftXValue = 0;
  private boundOnMouseMove: (event: MouseEvent) => void
  private boundOnMouseUp: () => void
  private onThumbChanged!: Function;
  private lineWidth!: number
  private lineLeftSide!: number
  // private lineWidth: number
  // private lineLeftSide: number

  constructor(public line: Line) {
    this.thumb = document.createElement('div')
    this.thumb.classList.add('range-slider__thumb')
    this.line.append(this.thumb)

    this.boundOnMouseUp = this.onMouseUp.bind(this)
    this.boundOnMouseMove = this.onMouseMove.bind(this)
    
    this.thumb.onmousedown = this.onMouseDown

  }

  onMouseDown = (event: MouseEvent) : void => {
    const shiftX = event.clientX - this.thumb.getBoundingClientRect().left 

    this.setShiftX(shiftX)
    event.preventDefault()

    document.addEventListener('mousemove', this.boundOnMouseMove)
    document.addEventListener('mouseup', this.boundOnMouseUp)
  }
  
  setLineParams(lineWidth: number, lineLeftSide: number): void{
    this.lineWidth = lineWidth
    this.lineLeftSide = lineLeftSide
  }

  setShiftX(value: number): void{
    this._shiftXValue = value
  } 

  onMouseMove = (event: MouseEvent) : void => {
    let leftStop = event.pageX - this._shiftXValue - this.lineWidth  + this.thumb.offsetWidth / 2
    const rightStop = this.lineLeftSide - this.thumb.offsetWidth + this.thumb.offsetWidth 
    
    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    
    this.thumb.style.left = leftStop - this.thumb.offsetWidth / 2 + 'px'

    // this.onThumbChanged(event.pageX)
  }
  changeThumbPos = (dist: number): void => {
    this.thumb.style.left = dist - this.thumb.offsetWidth / 2 + 'px'
  }
  onMouseUp = () : void => {
    document.removeEventListener('mousemove', this.boundOnMouseMove)
    document.removeEventListener('mouseup', this.boundOnMouseUp)
  }

  bindThumbChanged(callback: Function): void {
    this.onThumbChanged = callback;
  }
}

export { Thumb }