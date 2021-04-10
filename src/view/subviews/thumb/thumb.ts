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

  public returnAsHTML = (): HTMLElement =>  {
    return this.thumb
  }
  public returnExtraAsHTML = (): HTMLElement =>  {
    return this.thumbExtra
  }

  
  private init = (element: HTMLElement, style: string): HTMLElement => {
    element = document.createElement('div')
    element.classList.add(`range-slider__${style}`)
    return element
  }
  private initThumb = (): void => {
    this.thumb = this.init(this.thumb, 'thumb')
  }

  public initThumbExtra = (): void => {
    this.thumbExtra = this.init(this.thumbExtra, 'thumb')
    this.thumbExtra.classList.add('range-slider__thumbExtra')
  }


  private getOrientationParams = (orientation: string, lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}): {pageName: keyof MouseEvent, sideName: keyof HTMLElement, sizeName: keyof HTMLElement, lineSize: number, lineSide: number} => {
    let params = {
      pageName: 'pageX' as keyof MouseEvent,
      sideName: 'offsetLeft' as keyof HTMLElement,
      sizeName: 'offsetWidth' as keyof HTMLElement,
      lineSize: lineSize.width, 
      lineSide: lineSide.left, 
    }
    if (orientation === 'vertical'){
      params = {
        pageName: 'pageY' as keyof MouseEvent,
        sideName: 'offsetTop' as keyof HTMLElement,
        sizeName:'offsetHeight' as keyof HTMLElement,
        lineSize: lineSize.height, 
        lineSide: lineSide.bottom, 
      }
      
    }
    
    return params
  }

  private setOnMouseDown = (element: HTMLElement, params: {pageName: keyof MouseEvent, sideName: keyof HTMLElement, sizeName: keyof HTMLElement, lineSide: number, lineSize: number}): void => {
    element.onmousedown = this.onMouseDown.bind(null, element, params)   
  }

  public setEventListener = (lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}, orientation = 'horizontal', elementName = 'primary'): void => {
    const params = this.getOrientationParams(orientation, lineSize, lineSide)
    let element = this.thumb

    if (elementName === 'extra'){
      element = this.thumbExtra
    }
    this.setOnMouseDown(element, params)
  }

  private onMouseDown = (element: HTMLElement, params: {pageName: keyof MouseEvent, sideName: keyof HTMLElement, sizeName: keyof HTMLElement, lineSize: number, lineSide: number}, event: MouseEvent) : void => { 

    event.preventDefault()

    let shift = (event[params.pageName] as number) - (element[params.sideName] as number) - params.lineSide
    
    if (params.pageName === 'pageY'){
      shift = shift + params.lineSize
    }
   
    this.boundOnMouseUp = this.onMouseUp.bind(this)
    this.boundOnMouseMove = this.onMouseMove.bind(this, element, {...params, shift})
    
    document.addEventListener('mousemove', this.boundOnMouseMove)
    document.addEventListener('mouseup', this.boundOnMouseUp)
  }


  private onMouseMove = (element: HTMLElement, params: {pageName: keyof MouseEvent, sideName: keyof HTMLElement, sizeName: keyof HTMLElement, lineSize: number, lineSide: number, shift: number}, event: MouseEvent): void => {
    
    let part = (event[params.pageName] as number - params.lineSide - params.shift + (element[params.sizeName] as number) / 2) / params.lineSize    

    if (params.pageName === 'pageY'){
      part = - part 
    }
    
    if (part < 0){
      part = 0;
    } else if (part > 1){
      part = 1
    }

    if (element === this.thumb){
      this.onThumbChanged(part)
    }
    if (element === this.thumbExtra){
      this.onExtraThumbChanged(part)
    }
  }


  private onMouseUp = () : void => {
    document.removeEventListener('mouseup', this.boundOnMouseUp)
    document.removeEventListener('mousemove', this.boundOnMouseMove)
  }

  private changeElementPosition = (element: HTMLElement, sideName: string, part: number, lineSize: number, elementSizeName: keyof HTMLElement): void => {
    const side = part * lineSize - (element[elementSizeName] as number) / 2 + 'px'
    element.style.setProperty(`${sideName}`, `${side}`)
  }

  public update = (part: number, lineSize: { width: number, height: number}, orientation = 'horizontal', elementName = 'primary'): void => {
    let element = this.thumb
    let side = 'left'
    let elementSizeName = 'offsetWidth' as keyof HTMLElement
    let lineParameter = lineSize.width
  
    if (orientation === 'horizontal' && elementName === 'extra'){
      element = this.thumbExtra
    }
    if (orientation === 'vertical' && elementName === 'primary'){
      side = 'bottom'
      elementSizeName = 'offsetHeight'
      lineParameter = lineSize.height
    }
    if (orientation === 'vertical' && elementName === 'extra'){
      element = this.thumbExtra
      side = 'bottom'
      elementSizeName = 'offsetHeight'
      lineParameter = lineSize.height
    }
    this.changeElementPosition(element, side, part, lineParameter, elementSizeName)
  }


  private currentPart = (element: HTMLElement, lineSize: number, orientation: string): number => {

    let part = (element.offsetLeft + element.offsetWidth / 2 ) / lineSize

    if (orientation === 'vertical'){
      part = 1 - (element.offsetTop + element.offsetHeight / 2 ) / lineSize
    }
    return part
  }

  public countCurrentPart = (lineSize: {width: number, height: number}, orientation = 'horizontal', elementName = 'primary'): number => {
    let element = this.thumb
    let lineParameter = lineSize.width

    if (orientation === 'horizontal' && elementName === 'extra'){
      element = this.thumbExtra
    } 
    if (orientation === 'vertical' && elementName === 'primary'){
      lineParameter = lineSize.height
    } 
    if (orientation === 'vertical' && elementName === 'extra'){
      element = this.thumbExtra
      lineParameter = lineSize.height
    } 
    const part = this.currentPart(element, lineParameter, orientation)
    return part as number
  }

  private countInitialParameter = (element: HTMLElement, lineSize: number, thumbSizeName: keyof HTMLElement): string => {
    const initParameter = (lineSize - (element[thumbSizeName] as number)) / 2 + 'px'
    return initParameter
  }
  
  public setInitialSettings = (lineSize: {width: number, height: number}, orientation = 'horizontal', elementName = 'primary'): void => {
    let lineSizeParam = lineSize.height
    let element = this.thumb
    let thumbSizeName = 'offsetHeight' as keyof HTMLElement

    if (orientation === 'horizontal'){
      if (elementName === 'extra'){
        element = this.thumbExtra
      }
      element.style.top = this.countInitialParameter(element, lineSizeParam, thumbSizeName)
    }

    if (orientation === 'vertical'){
      lineSizeParam = lineSize.width
      thumbSizeName = 'offsetWidth'
      if (elementName === 'extra'){
        element = this.thumbExtra
      }
      element.style.top = ''
      element.style.left = this.countInitialParameter(element, lineSizeParam, thumbSizeName)
    }
  }


  public size = (): {width: number, height: number} => {
    return {
      width: this.thumb.offsetWidth,
      height: this.thumb.offsetHeight,
    }
  }


  public bindThumbChangedPos(callback: (part: number) => void ): void {
    this.onThumbChanged = callback;
  }
  public bindExtraThumbChangedPos(callback: (part: number) => void ): void {
    this.onExtraThumbChanged = callback;
  }
}

export { Thumb }