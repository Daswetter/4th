import { Line } from '../line/line'

class Thumb{
  public thumb: HTMLElement
  public shiftXValue = 0;
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

  setInitialPos(part: number): void{
    this.thumb.style.left =  this.lineWidth * part - this.thumb.offsetWidth / 2 + 'px'
    this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
  }

  setLineWidth(lineWidth: number): void{
    this.lineWidth = lineWidth
  }
  setLineLeftSide(lineLeftSide: number): void{
    this.lineLeftSide = lineLeftSide
  }

  setShiftX(value: number): void{
    this.shiftXValue = value
  } 

  onMouseMove = (event: MouseEvent) : void => {
    let leftStop = event.pageX - this.shiftXValue - this.lineLeftSide  + this.thumb.offsetWidth / 2
    const rightStop = this.lineWidth - this.thumb.offsetWidth + this.thumb.offsetWidth 
    
    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    
    this.thumb.style.left = leftStop - this.thumb.offsetWidth / 2 + 'px'
    this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
  }

  changeThumbPos = (dist: number): void => {
    this.thumb.style.left = dist - this.thumb.offsetWidth / 2 + 'px'
    this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
  }

  onMouseUp = () : void => {
    document.removeEventListener('mousemove', this.boundOnMouseMove)
    document.removeEventListener('mouseup', this.boundOnMouseUp)
  }

  setScalePos = (value: number): void => {
    if (value === 1){
      this.thumb.style.left = - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
    } else if (value === 2) {
      this.thumb.style.left = this.lineWidth / 4 - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
    }  else if (value === 3) {
      this.thumb.style.left = this.lineWidth / 2 - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
    }  else if (value === 4) {
      this.thumb.style.left = this.lineWidth / 4 * 3 - this.thumb.offsetWidth / 2 +  'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
    }  else if (value === 5) {
      this.thumb.style.left = this.lineWidth - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px')
    } 
    
  }




  bindThumbChangedPos(callback: Function): void {
    this.onThumbChanged = callback;
  }
}

export { Thumb }