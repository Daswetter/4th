class Thumb{
  public thumb!: HTMLElement
  public thumbExtra!: HTMLElement
  private boundOnMouseMove!: (event: MouseEvent) => void
  private boundOnMouseUp!: () => void

  private onThumbChanged!: (thumbCenterProp: string, part: number) => void;
  private onExtraThumbChanged!: (thumbCenterProp: string, part: number) => void
  

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
    // this.setEventListenerForVertical(this.thumb)
  }

  initThumbExtra = (): void => {
    this.thumbExtra = this.init(this.thumbExtra)
    // this.setEventListenerForVertical(this.thumbExtra)
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
  
  countInitialPos = (element: HTMLElement, part: number, lineWidth: number, orientation: string): void => {
    element.style.left =  lineWidth * part - element.offsetWidth / 2 + 'px'
    // if (element === this.thumb){
    //   this.onThumbChanged(element.offsetLeft + element.offsetWidth / 2 + 'px', this.countPart(element, orientation))
    // } else if (element === this.thumbExtra){
    //   this.onExtraThumbChanged(this.thumbExtra.offsetLeft + this.thumbExtra.offsetWidth / 2 + 'px', this.countPart(this.thumbExtra, orientation))
    // }
  }

  setInitialPos(part: number, lineWidth: number, orientation: string): void{
    this.countInitialPos(this.thumb, part, lineWidth, orientation)
  }

  setExtraInitialPos(part: number, lineWidth: number, orientation: string): void{
    this.countInitialPos(this.thumbExtra, part, lineWidth, orientation)
  }

  countPartForHorizontal = (element: HTMLElement, lineLeft: number, lineWidth: number): number => {
    return (element.getBoundingClientRect().left - lineLeft + element.offsetWidth / 2) / lineWidth
  }

  countPartForVertical = (element: HTMLElement, lineBottom: number, lineWidth: number): number => {
    return (lineBottom - element.getBoundingClientRect().bottom - document.documentElement.scrollTop + element.offsetWidth / 2) / lineWidth
  }

  onMouseMove = ( element: HTMLElement, leftStop: number, countPart:(element: HTMLElement, lineParam: number, lineWidth: number) => number, lineParam: number, lineWidth: number): void => {
    const rightStop = lineWidth

    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    
    element.style.left = leftStop - element.offsetWidth / 2 + 'px'
    const elementPosition = element.offsetLeft + element.offsetWidth / 2 + 'px'
    
    if (element === this.thumb){
      this.onThumbChanged(elementPosition, countPart(element, lineParam, lineWidth))
    } else {
      this.onExtraThumbChanged(elementPosition, countPart(element, lineParam, lineWidth))
    }
  }

  onMouseMoveForHorizontal = ( element: HTMLElement, shiftX: number, lineLeft: number, lineWidth: number, event: MouseEvent ) : void => {
    const leftStop = event.pageX - shiftX - lineLeft  + element.offsetWidth / 2
    this.onMouseMove(element, leftStop, this.countPartForHorizontal,  lineLeft, lineWidth )
  }

  onMouseMoveForVertical = ( element: HTMLElement, shiftY: number, lineBottom: number, lineWidth: number, event: MouseEvent  ) : void => {
    const leftStop = lineBottom - event.pageY - shiftY + element.offsetWidth / 2
    this.onMouseMove(element, leftStop, this.countPartForVertical,  lineBottom, lineWidth )
  }


  changeThumbPosition = (part: number, lineWidth: number): void => {
    this.thumb.style.left = part * lineWidth - this.thumb.offsetWidth / 2 + 'px'
    this.onThumbChanged(this.thumb.offsetLeft + this.thumb.offsetWidth / 2 + 'px', part)
  }

  
  changeThumbsPositions = (part: number, lineWidth: number): void => {
    const eventPosition = part * lineWidth
    const distFromThumbToEvent = eventPosition - this.thumb.offsetLeft
    const distFromThumbExtraToEvent = eventPosition - this.thumbExtra.offsetLeft

    if (Math.abs(distFromThumbToEvent) > Math.abs(distFromThumbExtraToEvent)){
      
      this.thumbExtra.style.left = eventPosition - this.thumbExtra.offsetWidth / 2 + 'px'
      this.onExtraThumbChanged(this.thumbExtra.offsetLeft + this.thumbExtra.offsetWidth / 2 + 'px', part)
    } else {
      this.changeThumbPosition(part, lineWidth)
    }
  }

  onMouseUp = () : void => {
    document.removeEventListener('mousemove', this.boundOnMouseMove)
    document.removeEventListener('mouseup', this.boundOnMouseUp)
  }


  bindThumbChangedPos(callback: (thumbCenterProp: string, part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  bindExtraThumbChangedPos(callback: (thumbCenterProp: string, part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }