class Thumb{
  public thumb!: HTMLElement
  public thumbExtra!: HTMLElement
  public shiftX = 0;
  public shiftY = 0;
  private boundOnMouseMove!: (event: MouseEvent) => void
  private boundOnMouseUp!: () => void

  private onThumbChanged!: (thumbCenterProp: string, part: number) => void;
  private onExtraThumbChanged!: (thumbCenterProp: string, part: number) => void
  
  private lineWidth!: number
  private lineLeftSide!: number
  private lineBottom!: number

  constructor(orientation: string, thumbType: string) {

    this.thumb = this.init(this.thumb, orientation)
    
    if (thumbType === 'double'){
      this.thumbExtra = this.init(this.thumbExtra, orientation)
      this.thumbExtra.classList.add(`range-slider__thumbExtra`)
    }
  }

  returnThumbAsHTML = (): HTMLElement =>  {
    return this.thumb
  }
  returnThumbExtraAsHTML = (): HTMLElement =>  {
    return this.thumbExtra
  }

  init = (element: HTMLElement, orientation: string): HTMLElement =>  {
    element = this.createElement(element)
    this.setOnMouseDown(element, orientation)
    return element
  } 

  createElement = (element: HTMLElement): HTMLElement => {
    element = document.createElement('div')
    element.classList.add(`range-slider__thumb`)
    return element
  }


  setOnMouseDown = (element: HTMLElement, orientation: string): void => {
    element.onmousedown = this.onMouseDown.bind(null, element, orientation)
  }

  countShiftValues = (element: HTMLElement, event: MouseEvent): void => {
    const shiftX = event.clientX - element.getBoundingClientRect().left 
    const shiftY = element.getBoundingClientRect().bottom - event.clientY
    
    this.setShift(shiftX, shiftY)
  }

  onMouseDown = (element: HTMLElement, orientation: string, event: MouseEvent) : void => {
    this.boundOnMouseUp = this.onMouseUp.bind(this)
    this.boundOnMouseMove = this.onMouseMove.bind(this, element, orientation)

    event.preventDefault()
    this.countShiftValues(element, event)
    
    document.addEventListener('mousemove', this.boundOnMouseMove)
    document.addEventListener('mouseup', this.boundOnMouseUp)
  }


  setInitialPos(part: number, lineWidth: number, orientation: string): void{
    this.thumb.style.left =  lineWidth * part - this.thumb.offsetWidth / 2 + 'px'
    this.onThumbChanged(this.thumb.offsetLeft + this.thumb.offsetWidth / 2 + 'px', this.countPart(this.thumb, orientation))
  }

  setExtraInitialPos(part: number, lineWidth: number, orientation: string): void{
    this.thumbExtra.style.left =  lineWidth * part - this.thumbExtra.offsetWidth / 2 + 'px'
    this.onExtraThumbChanged(this.thumbExtra.offsetLeft + this.thumbExtra.offsetWidth / 2 + 'px', this.countPart(this.thumbExtra, orientation))
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

  countLeftStop = (element: HTMLElement, orientation: string, event: MouseEvent): number => {
    if (orientation === 'horizontal'){
      const leftStop = event.pageX - this.shiftX - this.lineLeftSide  + element.offsetWidth / 2
      return leftStop
    } else {
      const leftStop = this.lineBottom - event.pageY - this.shiftY + element.offsetWidth / 2
      return leftStop
    }
  }


  setThumbPos = (element: HTMLElement, orientation: string, event: MouseEvent): void => {
    let leftStop = this.countLeftStop(element, orientation, event)

    const rightStop = this.lineWidth

    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    
    element.style.left = leftStop - element.offsetWidth / 2 + 'px'
  }

  countPart = (element: HTMLElement, orientation: string): number => {
    let part: number
    if (orientation === 'horizontal'){
      part = (element.getBoundingClientRect().left - this.lineLeftSide + element.offsetWidth / 2) / this.lineWidth
    } else {
      part = (this.lineBottom - element.getBoundingClientRect().bottom + element.offsetWidth / 2) / this.lineWidth
    }
    return part
  }

  onMouseMove = ( element: HTMLElement, orientation: string, event: MouseEvent ) : void => {
    this.setThumbPos(element, orientation, event)
    
    if (element === this.thumb){
      this.onThumbChanged(element.offsetLeft + element.offsetWidth / 2 + 'px', this.countPart(element, orientation))
    } else {
      this.onExtraThumbChanged(element.offsetLeft + element.offsetWidth / 2 + 'px', this.countPart(element, orientation))
    }
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


  setScalePos = (lineWidthPart: number): void => {
    this.thumb.style.left = this.lineWidth * lineWidthPart - this.thumb.offsetWidth / 2 + 'px'
    this.onThumbChanged(this.thumb.offsetLeft + this.thumb.offsetWidth / 2 + 'px', lineWidthPart)
  }

  width = (): number => {
    return this.thumb.offsetWidth
  }



  bindThumbChangedPos(callback: (thumbCenterProp: string, part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  bindExtraThumbChangedPos(callback: (thumbCenterProp: string, part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }