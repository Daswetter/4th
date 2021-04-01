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

  setEventListener = (lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}, orientation = 'horizontal', element = 'primary'): void => {
    const sides = this.getOrientationParams(orientation)
    if (orientation === 'horizontal' && element === 'primary'){
      this.setOnMouseDown(this.thumb, sides, lineSide.left, lineSize.width)
    }
    if (orientation === 'horizontal' && element === 'extra'){
      this.setOnMouseDown(this.thumbExtra, sides, lineSide.left, lineSize.width)
    }
    if (orientation === 'vertical' && element === 'primary'){
      this.setOnMouseDown(this.thumb, sides, lineSide.bottom, lineSize.height)
    }
    if (orientation === 'vertical' && element === 'extra'){
      this.setOnMouseDown(this.thumbExtra, sides, lineSide.bottom, lineSize.height)
    }
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
  setPosition = (part: number, lineSize: { width: number, height: number}, orientation = 'horizontal', element = 'primary'): void => {
    if (orientation === 'horizontal' && element === 'primary'){
      this.changeElementPosition(this.thumb, 'left', part, lineSize.width)
    }
    if (orientation === 'horizontal' && element === 'extra'){
      this.changeElementPosition(this.thumbExtra, 'left', part, lineSize.width)
    }
    if (orientation === 'vertical' && element === 'primary'){
      this.changeElementPosition(this.thumb, 'bottom', part, lineSize.height)
    }
    if (orientation === 'vertical' && element === 'extra'){
      this.changeElementPosition(this.thumbExtra, 'bottom', part, lineSize.height)
    }
  }


  countCurrentPartForHorizontal = (element: HTMLElement, lineWidth: number): number => {
    const part = (element.offsetLeft + element.offsetWidth / 2 ) / lineWidth
    return part
  }
  countCurrentPartForVertical = (element: HTMLElement, lineHeight: number): number => {
    const part = 1 - (element.offsetTop + element.offsetHeight / 2 ) / lineHeight
    return part
  }
  countCurrentPart = (lineSize: {width: number, height: number}, orientation = 'horizontal', element = 'primary'): number => {
    let part
    if (orientation === 'horizontal' && element === 'primary'){
      part = this.countCurrentPartForHorizontal(this.thumb, lineSize.width)
    } 
    if (orientation === 'horizontal' && element === 'extra'){
      part = this.countCurrentPartForHorizontal(this.thumbExtra, lineSize.width)
    } 
    if (orientation === 'vertical' && element === 'primary'){
      part = this.countCurrentPartForVertical(this.thumb, lineSize.height)
    } 
    if (orientation === 'vertical' && element === 'extra'){
      part = this.countCurrentPartForVertical(this.thumbExtra, lineSize.height)
    } 
    return part as number
  }

  
  setInitialSettings = (lineSize: {width: number, height: number}, orientation = 'horizontal', element = 'thumb'): void => {
    if (orientation === 'horizontal' && element === 'thumb'){
      this.thumb.style.top = (lineSize.height - this.thumb.offsetHeight) / 2 + 'px'
    }
    if (orientation === 'horizontal' && element === 'extra'){
      this.thumbExtra.style.top = (lineSize.height - this.thumbExtra.offsetHeight) / 2 + 'px'
    }
    if (orientation === 'vertical' && element === 'thumb'){
      this.thumb.style.top = ''
      this.thumb.style.left = (lineSize.width - this.thumb.offsetWidth) / 2 + 'px'
    }
    if (orientation === 'vertical' && element === 'extra'){
      this.thumbExtra.style.top = ''
      this.thumbExtra.style.left = (lineSize.width - this.thumbExtra.offsetWidth) / 2 + 'px'
    }
  }


  size = (): {width: number, height: number} => {
    return {
      width: this.thumb.offsetWidth,
      height: this.thumb.offsetHeight,
    }
  }


  bindThumbChangedPos(callback: (part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  bindExtraThumbChangedPos(callback: (part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }