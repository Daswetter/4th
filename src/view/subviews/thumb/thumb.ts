import { SubView } from '../SubView'
class Thumb extends SubView{
  public primary!: HTMLElement
  public extra!: HTMLElement
  private boundOnMouseMove!: (event: MouseEvent) => void
  private boundOnMouseUp!: () => void

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
  }
  
  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = this.init(initElement, this.primary, 'thumb')
  }

  public initExtra = (initElement: HTMLElement): void => {
    this.extra = this.init(initElement, this.extra, 'thumb')
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

  public setEventListener = (lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}, vertical = false, extra = false): void => {
    let element = this.primary

    if (extra){
      element = this.extra
    }
    const params = this.getOrientationParams(vertical, lineSize, lineSide)
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

    if (element === this.primary){
      this.onChanged(part)
    }
    if (element === this.extra){
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
    let element = this.primary
  
    if (!vertical && extra){
      element = this.extra
    }
    
    let side = 'left'
    let elementSizeName = 'offsetWidth' as keyof HTMLElement
    let lineParameter = lineSize.width

    if (vertical && !extra){
      side = 'bottom'
      elementSizeName = 'offsetHeight'
      lineParameter = lineSize.height
    }
    if (vertical && extra){
      element = this.extra
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
  
  public setInitialSettings = (lineSize: {width: number, height: number}, vertical = false, extra = false): void => {
    let lineSizeParam = lineSize.height
    let element = this.primary
    let thumbSizeName = 'offsetHeight' as keyof HTMLElement

    if (!vertical){
      if (extra){
        element = this.extra
      }
      element.style.top = this.countInitialParameter(element, lineSizeParam, thumbSizeName)
    }

    if (vertical){
      lineSizeParam = lineSize.width
      thumbSizeName = 'offsetWidth'
      if (extra){
        element = this.extra
      }
      element.style.top = ''
      element.style.left = this.countInitialParameter(element, lineSizeParam, thumbSizeName)
    }
  }


  public returnSize = (): {width: number, height: number} => {
    return {
      width: this.primary.offsetWidth,
      height: this.primary.offsetHeight,
    }
  }

}

export { Thumb }