class Thumb{
  public thumb!: HTMLElement
  public thumbExtra!: HTMLElement
  private boundOnMouseMove!: (event: MouseEvent) => void
  private boundOnMouseUp!: () => void

  private onThumbChanged!: (part: number) => void;
  private onExtraThumbChanged!: (part: number) => void
  

  constructor() {
    this.initThumb()
  }

  returnThumbAsHTML = (): HTMLElement =>  {
    return this.thumb
  }
  returnThumbExtraAsHTML = (): HTMLElement =>  {
    return this.thumbExtra
  }

  
  init = (element: HTMLElement): HTMLElement => {
    element = document.createElement('div')
    element.classList.add(`range-slider__thumb`)
    return element
  }

  setEventListenerForHorizontal = (element: HTMLElement, lineLeft: number, lineWidth: number): void =>  {
    element.onmousedown = this.onMouseDownForHorizontal.bind(null, element, lineLeft, lineWidth)
    
  } 

  setEventListenerForVertical = (element: HTMLElement, lineBottom: number, lineWidth: number): void =>  {
    element.onmousedown = this.onMouseDownForVertical.bind(null, element, lineBottom, lineWidth)
  } 


  initThumb = (): void => {
    this.thumb = this.init(this.thumb)
  }

  initThumbExtra = (): void => {
    this.thumbExtra = this.init(this.thumbExtra)
    this.thumbExtra.classList.add('range-slider__thumbExtra')
  }

  setEventListenerHorizontalForThumb = (lineLeft: number, lineWidth: number): void => {
    this.setEventListenerForHorizontal(this.thumb, lineLeft, lineWidth)
  }
  setEventListenerVerticalForThumb = (lineBottom: number, lineWidth: number): void => {
    this.setEventListenerForVertical(this.thumb, lineBottom, lineWidth)
  }
  setEventListenerHorizontalForThumbExtra = (lineLeft: number, lineWidth: number): void => {
    this.setEventListenerForHorizontal(this.thumbExtra, lineLeft, lineWidth)
  }
  setEventListenerVerticalForThumbExtra = (lineBottom: number, lineWidth: number): void => {
    this.setEventListenerForVertical(this.thumbExtra, lineBottom, lineWidth)
  }
  

  onMouseDown = (element: HTMLElement, event: MouseEvent, onMouseMove: ( element: HTMLElement, shift: number, lineParam: number, lineWidth: number, event: MouseEvent ) => void, shift: number, lineParam: number, lineWidth: number) : void => {
    this.boundOnMouseUp = this.onMouseUp.bind(this)
    this.boundOnMouseMove = onMouseMove.bind(this, element, shift, lineParam, lineWidth)

    event.preventDefault()
    
    document.addEventListener('mousemove', this.boundOnMouseMove)
    document.addEventListener('mouseup', this.boundOnMouseUp)
  }

  onMouseDownForHorizontal = (element: HTMLElement, lineLeft: number, lineWidth: number, event: MouseEvent) : void => {
    const shiftX = event.clientX - element.getBoundingClientRect().left 
    this.onMouseDown(element, event, this.onMouseMoveForHorizontal, shiftX, lineLeft, lineWidth)
  }

  onMouseDownForVertical = (element: HTMLElement, lineBottom: number, lineWidth: number, event: MouseEvent) : void => {
    const shiftY = element.getBoundingClientRect().bottom - event.clientY
    this.onMouseDown(element, event, this.onMouseMoveForVertical, shiftY, lineBottom, lineWidth)
  }
  
  countInitialPos = (element: HTMLElement, part: number, lineWidth: number, countPart: (element: HTMLElement, part: number, lineWidth: number) => number, callbackFn: (thumbCenterProp: string, part: number) => void ): void => {
    // element.style.left =  lineWidth * part - element.offsetWidth / 2 + 'px'
    // callbackFn(element.offsetLeft + element.offsetWidth / 2 + 'px', countPart(element, part, lineWidth))
    
  }

  setInitialPosForHorizontal(part: number, lineWidth: number): void{
    // this.countInitialPos(this.thumb, part, lineWidth, this.countPartForHorizontal, this.onThumbChanged )
  }

  setExtraInitialPosForHorizontal(part: number, lineWidth: number): void{
    // this.countInitialPos(this.thumbExtra, part, lineWidth, this.countPartForHorizontal, this.onExtraThumbChanged )
  }

  setInitialPosForVertical(part: number, lineWidth: number): void{
    // this.countInitialPos(this.thumb, part, lineWidth, this.countPartForVertical, this.onThumbChanged )
  }

  setExtraInitialPosForVertical(part: number, lineWidth: number): void{
    // this.countInitialPos(this.thumbExtra, part, lineWidth, this.countPartForVertical, this.onExtraThumbChanged )
  }

  countPartForHorizontal = (lineLeft: number, lineWidth: number, event: MouseEvent): number => {
    let part = (event.clientX - lineLeft) / lineWidth
    if (event.clientX < lineLeft) {
      part = 0
    } else if (event.clientX > lineLeft + lineWidth){
      part = 1
    }
    
    return part
  }

  countPartForVertical = (lineBottom: number, lineWidth: number, event: MouseEvent): number => {
    const part = (event.clientX - lineBottom) / lineWidth
    return part
  }

  onMouseMove = ( element: HTMLElement, leftStop: number, countPart:(lineParam: number, lineWidth: number, event: MouseEvent) => number, lineParam: number, lineWidth: number, event: MouseEvent): void => {
    const rightStop = 1
    
    if (leftStop < 0) {
      leftStop = 0
      element.style.left = - element.offsetWidth / 2 + 'px'
    } else if (leftStop > rightStop) {
      leftStop = rightStop
      element.style.left = lineWidth + 'px'
    }
    // element.style.left = leftStop - element.offsetWidth / 2 + 'px'
    // const elementPosition = element.offsetLeft + element.offsetWidth / 2 + 'px'
    
    if (element === this.thumb){
      this.onThumbChanged(countPart(lineParam, lineWidth, event))
    } else {
      this.onExtraThumbChanged(countPart(lineParam, lineWidth, event))
    }
  }

  onMouseMoveForHorizontal = ( element: HTMLElement, shiftX: number, lineLeft: number, lineWidth: number, event: MouseEvent ) : void => {
    const leftStop = (event.pageX - shiftX - lineLeft  + element.offsetWidth / 2) / lineWidth
    this.onMouseMove(element, leftStop, this.countPartForHorizontal,  lineLeft, lineWidth, event )
  }

  onMouseMoveForVertical = ( element: HTMLElement, shiftY: number, lineBottom: number, lineWidth: number, event: MouseEvent  ) : void => {
    const leftStop = lineBottom - event.pageY - shiftY + element.offsetWidth / 2
    this.onMouseMove(element, leftStop, this.countPartForVertical,  lineBottom, lineWidth, event )
  }


  changeElementPosition = (element: HTMLElement, part: number, lineWidth: number): void => {
    element.style.left = part * lineWidth - element.offsetWidth / 2 + 'px'
    // callbackFn(part)
  }

  
  changeThumbsPositions = (part: number, lineWidth: number): void => {
    const eventPosition = part * lineWidth
    const distFromThumbToEvent = eventPosition - this.thumb.offsetLeft
    const distFromThumbExtraToEvent = eventPosition - this.thumbExtra.offsetLeft

    if (Math.abs(distFromThumbToEvent) > Math.abs(distFromThumbExtraToEvent)){
      this.changeElementPosition(this.thumbExtra, part, lineWidth)
    } else {
      this.changeElementPosition(this.thumb, part, lineWidth)
    }
  }

  changeThumbPosition = (part: number, lineWidth: number): void => {
    this.changeElementPosition(this.thumb, part, lineWidth)
  }

  changeThumbExtraPosition = (part: number, lineWidth: number): void => {
    this.changeElementPosition(this.thumbExtra, part, lineWidth)
  }
  onMouseUp = () : void => {
    document.removeEventListener('mousemove', this.boundOnMouseMove)
    document.removeEventListener('mouseup', this.boundOnMouseUp)
  }
  currentPart = (lineWidth: number): number => {
    const part = (this.thumb.offsetLeft + this.thumb.offsetWidth / 2 ) / lineWidth
    return part
  }
  currentExtraPart = (lineWidth: number): number => {
    const part = (this.thumbExtra.offsetLeft + this.thumbExtra.offsetWidth / 2 ) / lineWidth
    return part
  }

  bindThumbChangedPos(callback: (part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  bindExtraThumbChangedPos(callback: (part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }