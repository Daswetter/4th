import { Line } from '../line/line'

class Thumb{
  public thumb: HTMLElement
  public shiftX = 0;
  public shiftY= 0;
  private boundOnMouseMove: (event: MouseEvent) => void
  private boundOnMouseUp: () => void
  private onThumbChanged!: Function;
  // private onInitialValue!: Function;
  private lineWidth!: number
  private lineLeftSide!: number
  private lineBottom!: number
  private orientation: string

  constructor(public line: Line, orientation: string) {
    this.orientation = orientation

    this.thumb = document.createElement('div')
    this.thumb.classList.add('range-slider__thumb')
    this.line.append(this.thumb)
 
    this.boundOnMouseUp = this.onMouseUp.bind(this)
    this.boundOnMouseMove = this.onMouseMove.bind(this)
    
    this.thumb.onmousedown = this.onMouseDown

  }

  onMouseDown = (event: MouseEvent) : void => {
    const shiftX = event.clientX - this.thumb.getBoundingClientRect().left 
    const shiftY = this.thumb.getBoundingClientRect().bottom - event.clientY
    
    this.setShift(shiftX, shiftY)
    event.preventDefault()

    document.addEventListener('mousemove', this.boundOnMouseMove)
    document.addEventListener('mouseup', this.boundOnMouseUp)
  }

  setInitialPos(part: number, lineWidth: number): void{
    this.thumb.style.left =  lineWidth * part - this.thumb.offsetWidth / 2 + 'px'
  }

  setLineLeftSide(lineLeftSide: number): void{
    this.lineLeftSide = lineLeftSide
  }
  setLineBottom(lineBottom: number): void{
    this.lineBottom = lineBottom
  }
  setLineWidth(lineWidth: number): void{
    this.lineWidth = lineWidth
  }
  setShift(shiftX: number, shiftY: number): void{
    this.shiftX = shiftX
    this.shiftY = shiftY
  } 

  onMouseMove = (event: MouseEvent) : void => {
    let leftStop: number
    if (this.orientation === 'horizontal'){
      leftStop = event.pageX - this.shiftX - this.lineLeftSide  + this.thumb.offsetWidth / 2
      // console.log('leftStop', leftStop);
    } else {
      leftStop = this.lineBottom - event.pageY - this.shiftY + this.thumb.offsetWidth / 2
    }
    const rightStop = this.lineWidth
    console.log('leftStop', leftStop);
    
    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    
    this.thumb.style.left = leftStop - this.thumb.offsetWidth / 2 + 'px'

    const part = (this.thumb.getBoundingClientRect().left - this.lineLeftSide + this.thumb.offsetWidth / 2) / this.lineWidth
    
    this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', part)
  }

  changeThumbPosBecauseOfLineClick = (dist: number): void => {
    this.thumb.style.left = dist - this.thumb.offsetWidth / 2 + 'px'
    const part = dist / this.lineWidth
    this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', part)
  }

  onMouseUp = () : void => {
    document.removeEventListener('mousemove', this.boundOnMouseMove)
    document.removeEventListener('mouseup', this.boundOnMouseUp)
  }

  setScalePos = (value: number): void => {
    if (value === 1){
      this.thumb.style.left = - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', 0)
    } else if (value === 2) {
      this.thumb.style.left = this.lineWidth / 4 - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', 0.25)
    }  else if (value === 3) {
      this.thumb.style.left = this.lineWidth / 2 - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', 0.5)
    }  else if (value === 4) {
      this.thumb.style.left = this.lineWidth / 4 * 3 - this.thumb.offsetWidth / 2 +  'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', 0.75)
    }  else if (value === 5) {
      this.thumb.style.left = this.lineWidth - this.thumb.offsetWidth / 2 + 'px'
      this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', 1)
    } 
    
  }

  width = (): number => {
    return this.thumb.offsetWidth
  }



  bindThumbChangedPos(callback: Function): void {
    this.onThumbChanged = callback;
  }
}

export { Thumb }