import { Subview } from '../Subview'
import { paramsType } from '../../../types'
class Thumb extends Subview{
  public primary!: HTMLElement
  public extra!: HTMLElement
  private unsubscribeMove!: () => void
  private unsubscribeUp!: () => void

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)

    this.subscribeEvent<{element: HTMLElement, params: paramsType, event: MouseEvent}>('thumb: mouseDown', ({element, params, event}) => this.handleMouseDown(element, params, event))    
  }
  
  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = this.init(initElement, this.primary, 'thumb')
  }

  public initExtra = (initElement: HTMLElement): void => {
    this.extra = this.init(initElement, this.extra, 'thumb')
  }

  private getOrientationParams = (vertical: boolean, lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}): paramsType => {
    let params: paramsType = {
      pageName: 'pageX',
      sideName: 'offsetLeft',
      sizeName: 'offsetWidth',
      lineSize: lineSize.width, 
      lineSide: lineSide.left, 
    }
    if (vertical){
      params = {
        pageName: 'pageY',
        sideName: 'offsetTop',
        sizeName:'offsetHeight',
        lineSize: lineSize.height, 
        lineSide: lineSide.bottom, 
      }
    }
    return params
  }


  public setEventListener = (lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}, vertical = false, extra = false): void => {
    let element = this.primary

    if (extra){
      element = this.extra
    }
    const params = this.getOrientationParams(vertical, lineSize, lineSide)
    
    element.addEventListener('mousedown', (event) => this.emitEvent('thumb: mouseDown', {element, params, event}))
  }

  private handleMouseDown = (element: HTMLElement, params: paramsType, event: MouseEvent) : void => { 
    event.preventDefault()

    let shift = (event[params.pageName] as number) - (element[params.sideName] as number) - params.lineSide
    
    if (params.pageName === 'pageY'){
      shift = shift + params.lineSize
    }
    
    
    this.unsubscribeMove = this.subscribeEvent<{element: HTMLElement, params: paramsType, shift: number, event: MouseEvent}>('thumb: mouseMove', ({element, params, shift, event}) => this.handleMouseMove({element, params, shift, event}))

    this.unsubscribeUp = this.subscribeEvent<null>('thumb: mouseUp', () => this.handleMouseUp())

    document.addEventListener('mousemove', (event) => this.emitEvent<{element: HTMLElement, params: paramsType, shift: number, event: MouseEvent}>('thumb: mouseMove', {element, params, shift, event}))

    document.addEventListener('mouseup', () => this.emitEvent<null>('thumb: mouseUp', null))
  }


  private handleMouseMove = (data: {element: HTMLElement, params: paramsType, shift: number, event: MouseEvent}): void => {
    let part = (data.event[data.params.pageName] as number - data.params.lineSide - data.shift + (data.element[data.params.sizeName] as number) / 2) / data.params.lineSize    

    if (data.params.pageName === 'pageY'){
      part = - part 
    }
    
    if (part < 0){
      part = 0;
    } else if (part > 1){
      part = 1
    }

    if (data.element === this.primary){
      this.onChanged(part)
    }
    if (data.element === this.extra){
      this.onExtraChanged(part)
    }
  }


  private handleMouseUp = () : void => {
    this.unsubscribeMove()
    this.unsubscribeUp()
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