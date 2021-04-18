import { SubView } from "../SubView"

class Satellite extends SubView {
  satellite!: HTMLElement
  satelliteExtra!: HTMLElement

  constructor(){
    super()
    this.initPrimaryElement()
  }

  initPrimaryElement = (): void => {
    this.satellite = this.init(this.satellite, 'satellite')
  }

  public initExtraElement = (): void => {
    this.satelliteExtra = this.init(this.satelliteExtra, 'satellite')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.satellite
  }

  public returnExtraAsHTML = (): HTMLElement => {
    return this.satelliteExtra
  }

  private defineInnerText = (element: HTMLElement, result: number): void => {
    element.innerText = result + ''
  }
  
  private setPosition = (element: HTMLElement, part: number, lineSize: {width: number, height: number}, thumbHeight: number ): void => {

    element.style.left = part * lineSize.width - element.offsetWidth / 2 + 'px'

    if (lineSize.height >= thumbHeight){
      element.style.top = - lineSize.height - element.offsetHeight + 'px'
    } else {
      element.style.top =  - element.offsetHeight - thumbHeight / 2 + 'px'
    }
  }

  private setPositionForVertical = (element: HTMLElement, part: number, lineSize: {width: number, height: number}, thumbWidth: number): void => {
  
    element.style.top = lineSize.height - part * lineSize.height - element.offsetHeight / 2 + 'px'    

    if (lineSize.width >= thumbWidth){
      element.style.left = - 1.2 * element.offsetWidth + 'px'
    } else {
      element.style.left = - 1.2 * element.offsetWidth - (thumbWidth - lineSize.width) / 2 + 'px'
    }
  }

  public update = (part: number, result: number, lineSize: {width: number, height: number}, thumbSize: {width: number, height: number}, vertical = false, elementName = 'primary'): void => {

    let element = this.satellite
    let thumbParameter = thumbSize.height

    if (!vertical){
      if (elementName === 'extra'){
        element = this.satelliteExtra
      } 
      this.defineInnerText(element, result)
      this.setPosition(element, part, lineSize, thumbParameter)
    }
    

    if (vertical){
      if (elementName === 'primary'){
        thumbParameter = thumbSize.width
      }
      if (elementName === 'extra'){
        element = this.satelliteExtra
        thumbParameter = thumbSize.width
      }  
      this.defineInnerText(element, result)
      this.setPositionForVertical(element, part, lineSize, thumbSize.width)
    }
    
  }
}

export { Satellite }