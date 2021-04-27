import { SubView } from "../SubView"

class Satellite extends SubView {
  primary!: HTMLElement
  extra!: HTMLElement
  united!: HTMLElement

  current!: number
  currentExtra!: number

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
    this.united = this.initUnited()
  }

  initPrimary = (initElement: HTMLElement): void => {
    this.primary = this.init(initElement, this.primary, 'satellite')
  }

  public initExtra = (initElement: HTMLElement): void => {
    this.extra = this.init(initElement, this.extra, 'satellite')
  }

  private printInnerText = (element: HTMLElement, current: number | string): void => {
    element.innerText = String(current)
  }

  private setRightToVertical = (element: HTMLElement, lineWidth: number, thumbWidth: number): void => {
    element.style.right = lineWidth + thumbWidth / 3 + 'px'
  }

  private setTopToHorizontal = (element: HTMLElement, thumbHeight: number): void => {
    element.style.top =  - element.offsetHeight - thumbHeight / 2 + 'px'
  }
  
  public setInitialSettingsToPrimary = (lineWidth: number, thumbSize: {width: number, height: number }, vertical: boolean, min: number ): void => {
    this.printInnerText(this.primary, min)
    if (vertical) {
      this.setRightToVertical(this.primary, lineWidth, thumbSize.width)
    } else {
      this.setTopToHorizontal(this.primary, thumbSize.height)
    }
  }

  public setInitialSettingsToExtra = (lineWidth: number, thumbSize: {width: number, height: number }, vertical: boolean, max: number): void => {
    this.printInnerText(this.extra, max)
    if (vertical) {
      this.setRightToVertical(this.extra, lineWidth, thumbSize.width)
    } else {
      this.setTopToHorizontal(this.extra, thumbSize.height)
    }
  }



  private setPosition = (element: HTMLElement, part: number, lineSize: {width: number, height: number}, vertical: boolean ): void => {

    if (vertical){
      element.style.top = lineSize.height - part * lineSize.height - element.offsetHeight / 2 + 'px'  
      
    } else {
      element.style.left = Math.round(part * lineSize.width - element.offsetWidth / 2) + 'px'
    }
  }

  initUnited = (): HTMLElement => {
    const element = document.createElement('div')
    element.classList.add('range-slider__satellite')
    this.primary.after(element)
    element.style.opacity = '0'
    return element
  }

  private joinSatellites = (lineWidth: number, thumbWidth: number,  vertical: boolean): void => {
    this.defineContent(vertical)

    this.setPositionToUnited(lineWidth, thumbWidth, vertical)

    if (!vertical) {
      const lineEdge = this.united.offsetLeft + this.united.offsetWidth >= lineWidth

      if (lineEdge){
        this.united.style.left = ''
        this.united.style.right = - this.primary.offsetWidth / 2 + 'px'
      } else {
        this.setPositionToUnited(lineWidth, thumbWidth, vertical)
      }
      
    }
    this.switchElements(vertical)
  }

  defineContent = (vertical: boolean): void => {
    if (this.current === this.currentExtra){
      this.printInnerText(this.united, this.current)
    } else {
      if (vertical) {
        this.united.style.textAlign = 'center'
        this.printInnerText(this.united, Math.max(this.current, this.currentExtra) + ' — '+ Math.min(this.current, this.currentExtra))
      } else {
        this.printInnerText(this.united, Math.min(this.current, this.currentExtra) + ' — '+ Math.max(this.current, this.currentExtra))
      }
    }
  }

  private switchElements = (vertical: boolean) => {
    let stickTogether = this.primary.offsetLeft <= this.extra.offsetLeft + this.extra.offsetWidth && this.primary.offsetLeft + this.primary.offsetWidth >= this.extra.offsetLeft
    
    
    if (vertical){
      stickTogether = this.primary.offsetTop <= this.extra.offsetTop + this.extra.offsetHeight && this.primary.offsetTop + this.primary.offsetHeight >= this.extra.offsetTop
    } 

    if (stickTogether){
      this.switchOpacity(this.united, true)
      this.switchOpacity(this.primary, false)
      this.switchOpacity(this.extra, false)
    } else {
      this.switchOpacity(this.united, false)
      this.switchOpacity(this.primary, true)
      this.switchOpacity(this.extra, true)
    } 
    
  }

  private setPositionToUnited = (lineWidth: number, thumbWidth: number, vertical: boolean): void => {

    if (vertical){
      this.united.style.right = lineWidth + thumbWidth / 3 + 'px'
      this.united.style.width = Math.min(this.primary.offsetWidth, this.extra.offsetWidth) + 'px'
      this.united.style.top = Math.min(this.primary.offsetTop, this.extra.offsetTop) + 'px'
    } else {
      this.united.style.top = this.primary.offsetTop + 'px'
      this.united.style.left = Math.min(this.primary.offsetLeft, this.extra.offsetLeft) + 'px'
      this.united.style.right = ''
    } 
  }

  private switchOpacity = (element: HTMLElement, on: boolean): void => {
    let opacity = '0'
    if (on){
      opacity = '1' 
    }
    element.style.opacity = opacity
  }

  public update = (part: number, current: number, lineSize: {width: number, height: number}, thumbSize: {width: number, height: number}, vertical: boolean, double: boolean, extra: boolean): void => {
    let element = this.primary

    if (extra) {
      element = this.extra
      this.currentExtra = current
    } else {
      this.current = current
    }
    
    this.printInnerText(element, current)
    this.setPosition(element, part, lineSize, vertical)

    if (double){
      this.joinSatellites(lineSize.width, thumbSize.width, vertical)
    }
  }

  public returnPrimaryParameters = (): { width: number, height: number, left: number, top: number } => {
    return {
      width: this.primary.offsetWidth,
      height: this.primary.offsetHeight,
      left: this.primary.offsetLeft,
      top: this.primary.offsetTop,
    }
  }

  public returnExtraParameters = (): { width: number, height: number, left: number, top: number } => {
    return {
      width: this.extra.offsetWidth,
      height: this.extra.offsetHeight,
      left: this.extra.offsetLeft,
      top: this.extra.offsetTop,
    }
  }
  
}

export { Satellite }