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

  
  init = (element: HTMLElement, style: string): HTMLElement => {
    element = document.createElement('div')
    element.style.position = 'absolute'
    element.style.zIndex = '2'
    element.classList.add(`range-slider__${style}`)
    return element
  }
  initThumb = (): void => {
    this.thumb = this.init(this.thumb, 'thumb')
  }
  initThumbExtra = (): void => {
    this.thumbExtra = this.init(this.thumbExtra, 'thumb')
    this.thumbExtra.classList.add('range-slider__thumbExtra')
  }


  getOrientationParams = (orientation = 'horizontal'): [keyof MouseEvent, keyof DOMRect, keyof HTMLElement] => {
    const sides = [
      'pageX',
      'left',
      'scrollLeft',
    ] as [
      keyof MouseEvent,
      keyof DOMRect,
      keyof HTMLElement,
    ]
    if (orientation === 'vertical'){
      sides[0] = 'pageY'
      sides[1] = 'bottom'
      sides[2] = 'scrollTop'
    }
    return sides
  }
  setOnMouseDown = (element: HTMLElement, sides: [keyof MouseEvent, keyof DOMRect, keyof HTMLElement ], lineSide: number, lineSize: number): void => {
    element.onmousedown = this.onMouseDown.bind(null, element, sides, lineSide, lineSize)   
  }
  setEventListenerHorizontalForThumb = (lineLeft: number, lineWidth: number): void => {
    const sides = this.getOrientationParams()
    this.setOnMouseDown(this.thumb, sides, lineLeft, lineWidth)
  }
  setEventListenerVerticalForThumb = (lineBottom: number, lineHeight: number): void => {
    const sides = this.getOrientationParams('vertical')
    this.setOnMouseDown(this.thumb, sides, lineBottom, lineHeight)
  }
  setEventListenerHorizontalForThumbExtra = (lineLeft: number, lineWidth: number): void => {
    const sides = this.getOrientationParams()
    this.setOnMouseDown(this.thumbExtra, sides, lineLeft, lineWidth)
  }
  setEventListenerVerticalForThumbExtra = (lineBottom: number, lineHeight: number): void => {
    const sides = this.getOrientationParams('vertical')
    this.setOnMouseDown(this.thumbExtra, sides, lineBottom, lineHeight)
  }


  onMouseDown = (element: HTMLElement, array: [keyof MouseEvent, keyof DOMRect, keyof HTMLElement], lineSide: number, lineSize: number, event: MouseEvent) : void => { 

    event.preventDefault()

    let shift = (event[array[0]] as number) - (element.getBoundingClientRect()[array[1]] as number) - (document.documentElement[array[2]] as number)

    if (array[0] === 'pageY'){
      shift = - shift
    }

    this.boundOnMouseUp = this.onMouseUp.bind(this)

    const params: Array<number> = [lineSide, lineSize, shift]
    this.boundOnMouseMove = this.onMouseMove.bind(this, element, params, array[0])
    
    document.addEventListener('mousemove', this.boundOnMouseMove)
    document.addEventListener('mouseup', this.boundOnMouseUp)
  }


  onMouseMove = (element: HTMLElement, params: Array<number>, page: keyof MouseEvent, event: MouseEvent): void => {

    let part = (event[page] as number - params[0] - params[2]) / params[1]

    if (page === 'pageY'){
      part = -part
    }
    
    if (part < 0){
      part = 0;
    } else if (part > 1){
      part = 1
    }

    if (element === this.thumb){
      this.onThumbChanged(part)
    } else if (element === this.thumbExtra){
      this.onExtraThumbChanged(part)
    }
  }


  onMouseUp = () : void => {
    document.removeEventListener('mousemove', this.boundOnMouseMove)
    document.removeEventListener('mouseup', this.boundOnMouseUp)
  }

  changeElementPosition = (element: HTMLElement, side: string, part: number, lineSize: number): void => {
    if (side === 'left'){
      element.style[side] = part * lineSize - element.offsetWidth / 2 + 'px'
    } else if(side === 'bottom') {
      element.style[side] = part * lineSize - element.offsetHeight / 2 + 'px'
    }
  }
  changeThumbPosition = (part: number, lineWidth: number): void => {
    this.changeElementPosition(this.thumb, 'left', part, lineWidth)
  }
  changeThumbExtraPosition = (part: number, lineWidth: number): void => {
    this.changeElementPosition(this.thumbExtra, 'left', part, lineWidth)
  }
  changeThumbPositionForVertical = (part: number, lineHeight: number): void => {
    this.changeElementPosition(this.thumb, 'bottom', part, lineHeight)
  }
  changeThumbExtraPositionForVertical = (part: number, lineHeight: number): void => {
    this.changeElementPosition(this.thumbExtra, 'bottom', part, lineHeight)
  }


  countCurrentPart = (element: HTMLElement, lineWidth: number): number => {
    const part = (element.offsetLeft + element.offsetWidth / 2 ) / lineWidth
    return part
  }
  countCurrentPartForThumb = (lineWidth: number): number => {
    return this.countCurrentPart(this.thumb, lineWidth)
  }
  countCurrentExtraForThumbExtra = (lineWidth: number): number => {
    return this.countCurrentPart(this.thumbExtra, lineWidth)
  }
  

  countCurrentPartForVertical = (element: HTMLElement, lineHeight: number): number => {
    const part = 1 - (element.offsetTop + element.offsetHeight / 2 ) / lineHeight
    return part
  }
  countCurrentPartForVerticalForThumb = (lineHeight: number): number => {
    return this.countCurrentPartForVertical(this.thumb, lineHeight)
  }
  currentPartForVerticalForThumbExtra = (lineHeight: number): number => {
    return this.countCurrentPartForVertical(this.thumbExtra, lineHeight)
  }


  setVerticalMod = (element: HTMLElement, lineWidth: number): void => {
    element.style.top = ''
    element.style.left = (lineWidth - element.offsetWidth) / 2 + 'px'
  }
  setVerticalModForThumb = (lineWidth: number): void => {
    this.setVerticalMod(this.thumb, lineWidth)
  }
  setVerticalModForExtra = (lineWidth: number): void => {
    this.setVerticalMod(this.thumbExtra, lineWidth)
  }


  setHorizontalMod = (element: HTMLElement, lineHeight: number): void => {
    element.style.top = (lineHeight - element.offsetHeight) / 2 + 'px'
  }
  setHorizontalModForThumb = (lineHeight: number): void => {
    this.setHorizontalMod(this.thumb, lineHeight)
  }
  setHorizontalModForThumbExtra = (lineHeight: number): void => {
    this.setHorizontalMod(this.thumbExtra, lineHeight)
  }


  size = (): {width: number, height: number} => {
    return {
      width: this.thumb.offsetWidth,
      height: this.thumb.offsetHeight,
    }
  }

  width = (): number => {
    return this.thumb.offsetWidth
  }
  height = (): number => {
    return this.thumb.offsetHeight
  }


  bindThumbChangedPos(callback: (part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  bindExtraThumbChangedPos(callback: (part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }