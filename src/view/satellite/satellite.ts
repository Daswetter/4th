class Satellite {
  satellite!: HTMLElement
  satelliteExtra!: HTMLElement

  constructor() {
    this.satellite = this.init(this.satellite)
  }

  init = (element: HTMLElement): HTMLElement => {
    element = document.createElement('div')
    element.style.position = 'absolute'
    element.classList.add('range-slider__satellite')
    return element
  }

  initSatelliteExtra = (): void => {
    this.satelliteExtra = this.init(this.satelliteExtra)
  }

  returnSatelliteAsHTMLElement = (): HTMLElement => {
    return this.satellite
  }

  returnSatelliteExtraAsHTMLElement = (): HTMLElement => {
    return this.satelliteExtra
  }

  defineInnerText = (element: HTMLElement, res: number): void => {
    element.innerText = res + ''
  }
  
  definePosition = (element: HTMLElement, part: number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number ): void => {

    element.style.left = lineLeft + part * lineWidth - element.offsetWidth / 2 + 'px'
    if (lineHeight >= thumbHeight){
      element.style.top = lineBottom - lineHeight - 1.2 * element.offsetHeight + 'px'
    } else {
      element.style.top = lineBottom - lineHeight - 1.2 * element.offsetHeight - (thumbHeight - lineHeight) / 2 + 'px'
    }
  }

  definePositionForVertical = (element: HTMLElement, part: number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbWidth: number): void => {

    element.style.top = lineBottom - part * lineHeight - element.offsetHeight / 2 + 'px'    
    if (lineWidth >= thumbWidth){
      element.style.left = lineLeft - 1.2 * element.offsetWidth + 'px'
    } else {
      element.style.left = lineLeft - 1.2 * element.offsetWidth - (thumbWidth - lineWidth) / 2 + 'px'
    }
  }

  setPosition = (part: number, res: number, lineSize: {width: number, height: number}, lineSide: {left: number, bottom: number}, thumbSize: {width: number, height: number}, orientation = 'horizontal', element = ''): void => {
    if (orientation === 'horizontal' && element === ''){
      
      this.defineInnerText(this.satellite, res)
      this.definePosition(this.satellite, part, lineSize.width, lineSize.height, lineSide.bottom, lineSide.left, thumbSize.height)
    }

    if (orientation === 'horizontal' && element === 'extra'){
      this.defineInnerText(this.satelliteExtra, res)
      this.definePosition(this.satelliteExtra, part, lineSize.width, lineSize.height, lineSide.bottom, lineSide.left, thumbSize.height)
    }

    if (orientation === 'vertical' && element === ''){
      this.defineInnerText(this.satellite, res)
      this.definePositionForVertical(this.satellite, part, lineSize.width, lineSize.height, lineSide.bottom, lineSide.left, thumbSize.width)
    }

    if (orientation === 'vertical' && element === 'extra'){
      this.defineInnerText(this.satelliteExtra, res)
      this.definePositionForVertical(this.satelliteExtra, part, lineSize.width, lineSize.height, lineSide.bottom, lineSide.left, thumbSize.width)
    }  
  }
}

export { Satellite }