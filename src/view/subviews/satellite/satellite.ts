import { SubView } from "../SubView"

class Satellite extends SubView {
  satellite!: HTMLElement
  satelliteExtra!: HTMLElement
  unitedSatellite!: HTMLElement

  current!: number
  currentExtra!: number

  constructor(initElement: HTMLElement){
    super()
    this.initPrimaryElement(initElement)
    this.unitedSatellite = this.initUnitedSatellite()
    
  }

  initPrimaryElement = (initElement: HTMLElement): void => {
    this.satellite = this.init(initElement, this.satellite, 'satellite')
  }

  public initExtraElement = (initElement: HTMLElement): void => {
    this.satelliteExtra = this.init(initElement, this.satelliteExtra, 'satellite')
  }

  private defineInnerText = (element: HTMLElement, current: number | string): void => {
    element.innerText = String(current)
  }
  
  private setPosition = (element: HTMLElement, part: number, lineSize: {width: number, height: number}, thumbSize: {width: number, height: number}, vertical: boolean ): void => {

    if (vertical){
      element.style.top = lineSize.height - part * lineSize.height - element.offsetHeight / 2 + 'px'    

      if (lineSize.width >= thumbSize.width){
        element.style.left = - 1.2 * element.offsetWidth + 'px'
      } else {
        element.style.left = - 1.2 * element.offsetWidth - (thumbSize.width - lineSize.width) / 2 + 'px'
      }
    } else {
      element.style.left = part * lineSize.width - element.offsetWidth / 2 + 'px'

      if (lineSize.height >= thumbSize.height){
        element.style.top = - lineSize.height - element.offsetHeight + 'px'
      } else {
        element.style.top =  - element.offsetHeight - thumbSize.height / 2 + 'px'
      }
    }

    
  }

  initUnitedSatellite = (): HTMLElement => {
    const element = document.createElement('div')
    element.classList.add('range-slider__satellite')
    this.satellite.after(element)
    return element
  }

  private joinSatellites = (element: HTMLElement, lineWidth: number, thumbWidth: number,  vertical: boolean): void => {
    let secondElement: HTMLElement
    if (element === this.satellite){
      secondElement = this.satelliteExtra
    } else {
      secondElement = this.satellite
    }
    this.defineInnerTextToUnitedSatellite(vertical)

    if (vertical){
      this.setPositionToUnitedSatellite(element, secondElement, lineWidth, thumbWidth, vertical)
    } else {
      this.setPositionToUnitedSatellite(element, secondElement, lineWidth, thumbWidth, vertical)
      
      if (this.unitedSatellite.offsetLeft + this.unitedSatellite.offsetWidth >= lineWidth){
        this.unitedSatellite.style.left = ''
        this.unitedSatellite.style.right = -this.satellite.offsetWidth / 2 + 'px'
      } else {
        this.setPositionToUnitedSatellite(element, secondElement, lineWidth, thumbWidth, vertical)
      }
      
    }
    this.switchElements(element, secondElement, vertical)
  }

  defineInnerTextToUnitedSatellite = (vertical: boolean): void => {
    if (this.current === this.currentExtra){
      this.defineInnerText(this.unitedSatellite, this.current)
    } else {

      if (vertical) {
        this.unitedSatellite.style.textAlign = 'center'
        this.defineInnerText(this.unitedSatellite, Math.max(this.current, this.currentExtra) + ' — '+ Math.min(this.current, this.currentExtra))
      } else {
        this.defineInnerText(this.unitedSatellite, Math.min(this.current, this.currentExtra) + ' — '+ Math.max(this.current, this.currentExtra))
      }
      
      
    }
  }

  private switchElements = (primary: HTMLElement, extra: HTMLElement, vertical: boolean) => {
    let primarySide = primary.offsetLeft
    let primarySize = primary.offsetWidth
    let extraSide = extra.offsetLeft
    let extraSize = extra.offsetWidth

    if (vertical){
      primarySide = primary.offsetTop
      primarySize = primary.offsetHeight
      extraSide = extra.offsetTop
      extraSize = extra.offsetHeight
    } 

    if (primarySide <= extraSide + extraSize && primarySide + primarySize >= extraSide){
      this.switchOpacity(this.unitedSatellite, true)
      this.switchOpacity(this.satellite, false)
      this.switchOpacity(this.satelliteExtra, false)
    } else {
      this.switchOpacity(this.unitedSatellite, false)
      this.switchOpacity(this.satellite, true)
      this.switchOpacity(this.satelliteExtra, true)
    } 
    
  }

  private setPositionToUnitedSatellite = (element: HTMLElement, secondElement: HTMLElement, lineWidth: number, thumbWidth: number, vertical: boolean): void => {
    if (vertical){
      this.unitedSatellite.style.right = lineWidth + thumbWidth / 3 + 'px'
      this.unitedSatellite.style.width = Math.min(element.offsetWidth, secondElement.offsetWidth) + 'px'
      this.unitedSatellite.style.top = Math.min(element.offsetTop, secondElement.offsetTop) + 'px'
    } else {
      this.unitedSatellite.style.top = element.offsetTop + 'px'
      this.unitedSatellite.style.left = Math.min(element.offsetLeft, secondElement.offsetLeft) + 'px'
      this.unitedSatellite.style.right = ''
    }
    
  }
  private switchOpacity = (element: HTMLElement, on: boolean): void => {
    let opacity = '0'
    if (on){
      opacity = '1' 
    }
    element.style.opacity = opacity
  }

  public update = (part: number, current: number, lineSize: {width: number, height: number}, thumbSize: {width: number, height: number}, vertical = false, double: boolean, elementName = 'primary'): void => {
    
    let element = this.satellite

    if (elementName === 'primary'){
      this.current = current
    }
    if (elementName === 'extra'){
      element = this.satelliteExtra
      this.currentExtra = current
    }
    this.defineInnerText(element, current)
    this.setPosition(element, part, lineSize, thumbSize, vertical)
    if (double){
      this.joinSatellites(element, lineSize.width, thumbSize.width, vertical)
    }
    
    
  }
  
}

export { Satellite }