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

  setEventListenerForVertical = (element: HTMLElement, lineBottom: number, lineHeight: number): void =>  {
    element.onmousedown = this.onMouseDownForVertical.bind(null, element, lineBottom, lineHeight)
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
  setEventListenerVerticalForThumb = (lineBottom: number, lineHeight: number): void => {
    this.setEventListenerForVertical(this.thumb, lineBottom, lineHeight)
  }
  setEventListenerHorizontalForThumbExtra = (lineLeft: number, lineWidth: number): void => {
    this.setEventListenerForHorizontal(this.thumbExtra, lineLeft, lineWidth)
  }
  setEventListenerVerticalForThumbExtra = (lineBottom: number, lineHeight: number): void => {
    this.setEventListenerForVertical(this.thumbExtra, lineBottom, lineHeight)
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

  onMouseDownForVertical = (element: HTMLElement, lineBottom: number, lineHeight: number, event: MouseEvent) : void => {
    const shiftY = element.getBoundingClientRect().bottom - event.clientY
    this.onMouseDown(element, event, this.onMouseMoveForVertical, shiftY, lineBottom, lineHeight)
  }
  

  countPartForHorizontal = (element: HTMLElement, lineLeft: number, lineWidth: number, event: MouseEvent): number => {
    let part = (event.pageX - lineLeft) / lineWidth
    if (event.pageX < lineLeft) {
      part = 0
      element.style.left = - element.offsetWidth / 2 + 'px'
    } else if (event.pageX > lineLeft + lineWidth){
      part = 1
      element.style.left = lineWidth + 'px'
    }
    
    return part
  }

  countPartForVertical = (element: HTMLElement, lineBottom: number, lineHeight: number, event: MouseEvent): number => {
    let part = (- event.pageY + lineBottom) / lineHeight
    if (event.pageY > lineBottom) {
      part = 0
      element.style.bottom = - element.offsetWidth / 2 + 'px'
    } else if (event.pageY < lineBottom - lineHeight){
      part = 1
      element.style.bottom = lineHeight + 'px'
    }
    
    
    return part
  }

  onMouseMove = ( element: HTMLElement, leftStop: number, countPart:(element: HTMLElement, lineParam: number, lineWidth: number, event: MouseEvent) => number, lineParam: number, lineWidth: number, event: MouseEvent): void => {
    // const rightStop = 1
    // if (leftStop < 0) {
    //   leftStop = 0
    //   element.style.left = - element.offsetWidth / 2 + 'px'
    // } else if (leftStop > rightStop) {
    //   leftStop = rightStop
    //   element.style.left = lineWidth + 'px'
    // }
    
    if (element === this.thumb){
      this.onThumbChanged(countPart(element, lineParam, lineWidth, event))
    } else {
      this.onExtraThumbChanged(countPart(element, lineParam, lineWidth, event))
    }
  }

  onMouseMoveForHorizontal = ( element: HTMLElement, shiftX: number, lineLeft: number, lineWidth: number, event: MouseEvent ) : void => {
    const leftStop = (event.pageX - shiftX - lineLeft  + element.offsetWidth / 2) / lineWidth
    this.onMouseMove(element, leftStop, this.countPartForHorizontal,  lineLeft, lineWidth, event )
  }

  onMouseMoveForVertical = ( element: HTMLElement, shiftY: number, lineBottom: number, lineHeight: number, event: MouseEvent  ) : void => {
    const leftStop = lineBottom - event.pageY - shiftY + element.offsetWidth / 2
    this.onMouseMove(element, leftStop, this.countPartForVertical,  lineBottom, lineHeight, event )
  }


  changeElementPosition = (element: HTMLElement, part: number, lineWidth: number): void => {
    element.style.left = part * lineWidth - element.offsetWidth / 2 + 'px'
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

  changeThumbPositionForVertical = (part: number, lineHeight: number): void => {
    this.thumb.style.bottom = part * lineHeight - this.thumb.offsetWidth / 2 + 'px'
  }
  changeThumbExtraPositionForVertical = (part: number, lineHeight: number): void => {
    this.thumbExtra.style.bottom = part * lineHeight - this.thumbExtra.offsetWidth / 2 + 'px'
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
  currentPartForVertical = (lineHeight: number): number => {
    const part = 1 - (this.thumb.offsetTop + this.thumb.offsetHeight / 2 ) / lineHeight   
     
    return part
  }
  currentExtraPartForVertical = (lineHeight: number): number => {
    const part = 1 - (this.thumbExtra.offsetTop + this.thumbExtra.offsetHeight / 2 ) / lineHeight
    return part
  }
  setVerticalMod = (): void => {
    this.thumb.style.top = ''
    this.thumb.style.left = `-${this.thumb.offsetWidth / 4}px`
  }
  setVerticalModForExtra = (): void => {
    this.thumbExtra.style.top = ''
    this.thumbExtra.style.left = `-${this.thumbExtra.offsetWidth / 4}px`
  }
  setHorizontalMod = (): void => {
    this.thumb.style.top = `-${this.thumb.offsetWidth / 4}px`
  }
  setHorizontalModForExtra = (): void => {
    this.thumbExtra.style.top = `-${this.thumbExtra.offsetWidth / 4}px`
  }

  bindThumbChangedPos(callback: (part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  bindExtraThumbChangedPos(callback: (part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }