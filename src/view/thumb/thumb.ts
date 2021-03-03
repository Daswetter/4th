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

    if (thumbType === 'double'){
      this.initExtraThumb()
    }
  }

  initThumb = (): void =>  {
    this.createElement()
    this.bindEvent()
    this.setOnMouseDown()
  } 

  initExtraThumb = (): void => {
    this.createExtraElement()
    this.bindExtraEvent()
    this.setOnMouseDownExtra()
  }
  createElement = (): void => {
    this.thumb = document.createElement('div')
    this.thumb.classList.add(`range-slider__thumb`)
    this.line.append(this.thumb)
  }

  createExtraElement = (): void => {    
    this.thumbExtra = document.createElement('div')
    this.thumbExtra.classList.add(`range-slider__thumbExtra`)
    this.line.append(this.thumbExtra)
  }
  bindEvent = (): void => {
    this.boundOnMouseUp = this.onMouseUp.bind(this)
    this.boundOnMouseMove = this.onMouseMove.bind(this, this.thumb)
  }

  bindExtraEvent = (): void => {
    this.boundOnMouseUpExtra = this.onMouseUpExtra.bind(this)
    this.boundOnMouseMoveExtra = this.onMouseMoveExtra.bind(this, this.thumbExtra)
  }

  setOnMouseDown = (): void => {
    this.thumb.onmousedown = this.onMouseDown.bind(null, this.thumb)
  }

  setOnMouseDownExtra = (): void => {
    this.thumbExtra.onmousedown = this.onMouseDownExtra.bind(null, this.thumbExtra)
  }
  countShiftValues = (element: HTMLElement, event: MouseEvent): void => {
    const shiftX = event.clientX - element.getBoundingClientRect().left 
    const shiftY = element.getBoundingClientRect().bottom - event.clientY
    
    this.setShift(shiftX, shiftY)
    event.preventDefault()
  }

  onMouseDown = (element: HTMLElement, event: MouseEvent) : void => {
    this.countShiftValues(element, event)

    document.addEventListener('mousemove', this.boundOnMouseMove)
    document.addEventListener('mouseup', this.boundOnMouseUp)
  }

  onMouseDownExtra = (element: HTMLElement, event: MouseEvent) : void => {
    this.countShiftValues(element, event)
    document.addEventListener('mousemove', this.boundOnMouseMoveExtra)
    document.addEventListener('mouseup', this.boundOnMouseUpExtra)
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
  countLeftStopForHorizontal = (element: HTMLElement, event: MouseEvent): number => {
    return event.pageX - this.shiftX - this.lineLeftSide  + element.offsetWidth / 2
  }
  countPartForHorizontal = (element: HTMLElement): number => {
    return (element.getBoundingClientRect().left - this.lineLeftSide + element.offsetWidth / 2) / this.lineWidth
  }
  countLeftStopForVertical = (element: HTMLElement, event: MouseEvent): number => {
    return this.lineBottom - event.pageY - this.shiftY + element.offsetWidth / 2
  }
  countPartForVertical = (element: HTMLElement): number => {
    return (this.lineBottom - element.getBoundingClientRect().bottom + element.offsetWidth / 2) / this.lineWidth
  }

  setThumbPos = (element: HTMLElement, event: MouseEvent): void => {
    let leftStop: number

    if (this.orientation === 'horizontal'){
      leftStop = this.countLeftStopForHorizontal(element, event)
    } else {
      leftStop = this.countLeftStopForVertical(element, event)
    }
    const rightStop = this.lineWidth

    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    
    element.style.left = leftStop - element.offsetWidth / 2 + 'px'
  }

  countPart = (element: HTMLElement): number => {
    let part: number
    if (this.orientation === 'horizontal'){
      part = this.countPartForHorizontal(element)
    } else {
      part = this.countPartForVertical(element)
    }
    return part
  }

  onMouseMove = ( element: HTMLElement, event: MouseEvent) : void => {
    this.setThumbPos(element, event)
    this.onThumbChanged(element.offsetLeft + element.offsetWidth / 2 + 'px', this.countPart(element))
  }

  onMouseMoveExtra = ( element: HTMLElement, event: MouseEvent) : void => {
    this.setThumbPos(element, event)
    this.onExtraThumbChanged(element.offsetLeft - element.offsetWidth / 2 + 'px', this.countPart(element))
  }
  
  changeThumbPosBecauseOfLineClick = (dist: number): void => {

    // this.thumb.style.left = dist - this.thumb.offsetWidth / 2 + 'px'
    // const part = dist / this.lineWidth
    
    // this.onThumbChanged(parseInt(this.thumb.style.left, 10) + this.thumb.offsetWidth / 2 + 'px', part)
  }

  onMouseUp = () : void => {
    document.removeEventListener('mousemove', this.boundOnMouseMove)
    document.removeEventListener('mouseup', this.boundOnMouseUp)
  }

  onMouseUpExtra = (): void => {
    document.removeEventListener('mousemove', this.boundOnMouseMoveExtra)
    document.removeEventListener('mouseup', this.boundOnMouseUpExtra)
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