import { Line } from '../line/line'

class Thumb{
  public thumb!: HTMLElement
  public thumbExtra!: HTMLElement
  public shiftX = 0;
  public shiftY = 0;
  private boundOnMouseMove!: (event: MouseEvent) => void
  private boundOnMouseMoveExtra!: (event: MouseEvent) => void
  private boundOnMouseUp!: () => void
  private boundOnMouseUpExtra!: () => void

  private onThumbChanged!: (thumbLeftProp: string, part: number) => void;
  private onExtraThumbChanged!: (thumbLeftProp: string, part: number) => void
  
  private lineWidth!: number
  private lineLeftSide!: number
  private lineBottom!: number
  private orientation: string
  private thumbType: string

  constructor(public line: Line, orientation: string, thumbType: string) {
    this.orientation = orientation
    this.thumbType = thumbType
    this.initThumb()
  }

  initThumb = (): void =>  {
    this.createElement()
    this.boundEvent()
    this.setOnMouseDown()
  } 

  createElement = (): void => {
    this.thumb = document.createElement('div')
    this.thumb.classList.add(`range-slider__thumb`)
    this.line.append(this.thumb)
    
    if (this.thumbType === 'double'){
      this.thumbExtra = document.createElement('div')
      this.thumbExtra.classList.add(`range-slider__thumbExtra`)
      this.line.append(this.thumbExtra)
    }
  }

  boundEvent = (): void => {
    this.boundOnMouseUp = this.onMouseUp.bind(this, 'thumb')
    this.boundOnMouseMove = this.onMouseMove.bind(this, this.thumb)

    if (this.thumbType === 'double') {
      this.boundOnMouseUpExtra = this.onMouseUp.bind(this, 'thumbExtra')
      this.boundOnMouseMoveExtra = this.onMouseMove.bind(this, this.thumbExtra)
    }
  }

  setOnMouseDown = (): void => {
    this.thumb.onmousedown = this.onMouseDown.bind(null, this.thumb)
    if (this.thumbType === 'double'){
      this.thumbExtra.onmousedown = this.onMouseDown.bind(null, this.thumbExtra)
    }
  }

  onMouseDown = (element: HTMLElement, event: MouseEvent) : void => {
    const shiftX = event.clientX - element.getBoundingClientRect().left 
    const shiftY = element.getBoundingClientRect().bottom - event.clientY
    
    this.setShift(shiftX, shiftY)
    event.preventDefault()
    if (element.className === 'range-slider__thumb'){
      document.addEventListener('mousemove', this.boundOnMouseMove)
      document.addEventListener('mouseup', this.boundOnMouseUp)
    } else {
      document.addEventListener('mousemove', this.boundOnMouseMoveExtra)
      document.addEventListener('mouseup', this.boundOnMouseUpExtra)
    }
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

  onMouseMove = ( element: HTMLElement, event: MouseEvent) : void => {
    let leftStop: number
    let part: number

    if (this.orientation === 'horizontal'){
      leftStop = event.pageX - this.shiftX - this.lineLeftSide  + element.offsetWidth / 2
      part = (element.getBoundingClientRect().left - this.lineLeftSide + element.offsetWidth / 2) / this.lineWidth
    
    } else {
      leftStop = this.lineBottom - event.pageY - this.shiftY + element.offsetWidth / 2
      part = (this.lineBottom - element.getBoundingClientRect().bottom + element.offsetWidth / 2) / this.lineWidth
    }
    const rightStop = this.lineWidth

    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    
    element.style.left = leftStop - element.offsetWidth / 2 + 'px'

    if (element.className === 'range-slider__thumb'){
      this.onThumbChanged(element.offsetLeft + element.offsetWidth / 2 + 'px', part)
    } else if (element.className === 'range-slider__thumbExtra'){
      this.onExtraThumbChanged(this.lineWidth - element.offsetLeft- element.offsetWidth / 2 + 'px', part)
    }
  }

  
  changeThumbPosBecauseOfLineClick = (dist: number): void => {

    // this.thumb.style.left = dist - this.thumb.offsetWidth / 2 + 'px'
    // const part = dist / this.lineWidth
    
    // this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', part)
  }

  onMouseUp = (element: string) : void => {
    if (element === 'thumb'){
      document.removeEventListener('mousemove', this.boundOnMouseMove)
      document.removeEventListener('mouseup', this.boundOnMouseUp)
    }
    if (element === 'thumbExtra'){
      document.removeEventListener('mousemove', this.boundOnMouseMoveExtra)
      document.removeEventListener('mouseup', this.boundOnMouseUpExtra)
    }
  }

  setScalePos = (lineWidthPart: number): void => {
    this.thumb.style.left = this.lineWidth * lineWidthPart - this.thumb.offsetWidth / 2 + 'px'
    this.onThumbChanged(this.thumb.offsetLeft + 'px', lineWidthPart)
  }

  width = (): number => {
    return this.thumb.offsetWidth
  }



  bindThumbChangedPos(callback: (thumbLeftProp: string, part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  bindExtraThumbChangedPos(callback: (thumbLeftProp: string, part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }