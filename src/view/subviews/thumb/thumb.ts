import { SubView } from './../SubView'
class Thumb extends SubView{
  public thumb!: HTMLElement
  public thumbExtra!: HTMLElement
  private boundOnMouseMove!: (event: MouseEvent) => void
  private boundOnMouseUp!: () => void

  constructor(initElement: HTMLElement){
    super()
    this.initPrimaryElement(initElement)
  }
  

  initPrimaryElement = (initElement: HTMLElement): void => {
    this.thumb = this.init(initElement, this.thumb, 'thumb')
  }

  public initExtraElement = (initElement: HTMLElement): void => {
    this.thumbExtra = this.init(initElement, this.thumbExtra, 'thumb')
  }

  public returnAsHTML = (): HTMLElement =>  {
    return this.thumb
  }
  public returnExtraAsHTML = (): HTMLElement =>  {
    return this.thumbExtra
  }

  private getOrientationParams = (vertical: boolean, lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}): {pageName: keyof MouseEvent, sideName: keyof HTMLElement, sizeName: keyof HTMLElement, lineSize: number, lineSide: number} => {
    let params = {
      pageName: 'pageX' as keyof MouseEvent,
      sideName: 'offsetLeft' as keyof HTMLElement,
      sizeName: 'offsetWidth' as keyof HTMLElement,
      lineSize: lineSize.width, 
      lineSide: lineSide.left, 
    }
    if (vertical){
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

  public setEventListener = (lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}, vertical = false, elementName = 'primary'): void => {
    const params = this.getOrientationParams(vertical, lineSize, lineSide)
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
      this.onChanged(part)
    }
    if (element === this.thumbExtra){
      this.onExtraChanged(part)
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

  public update = (part: number, lineSize: { width: number, height: number}, vertical: boolean, extra: boolean): void => {
    let element = this.thumb
    let side = 'left'
    let elementSizeName = 'offsetWidth' as keyof HTMLElement
    let lineParameter = lineSize.width
  
    if (!vertical && extra){
      element = this.thumbExtra
    }
    if (vertical && !extra){
      side = 'bottom'
      elementSizeName = 'offsetHeight'
      lineParameter = lineSize.height
    }
    if (vertical && extra){
      element = this.thumbExtra
      side = 'bottom'
      elementSizeName = 'offsetHeight'
      lineParameter = lineSize.height
    }
    this.changeElementPosition(element, side, part, lineParameter, elementSizeName)
  }

  private countInitialParameter = (element: HTMLElement, lineSize: number, thumbSizeName: keyof HTMLElement): string => {
    const initParameter = (lineSize - (element[thumbSizeName] as number)) / 2 + 'px'
    return initParameter
  }
  
  public setInitialSettings = (lineSize: {width: number, height: number}, vertical = false, elementName = 'primary'): void => {
    let lineSizeParam = lineSize.height
    let element = this.thumb
    let thumbSizeName = 'offsetHeight' as keyof HTMLElement

    if (!vertical){
      if (elementName === 'extra'){
        element = this.thumbExtra
      }
      element.style.top = this.countInitialParameter(element, lineSizeParam, thumbSizeName)
    }

    if (vertical){
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

}

export { Thumb }