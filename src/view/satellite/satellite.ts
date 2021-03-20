class Satellite {
  satellite!: HTMLElement
  satelliteExtra!: HTMLElement

  constructor() {
    this.satellite = this.init(this.satellite)
  }

  init = (element: HTMLElement): HTMLElement => {
    element = document.createElement('div')
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

  
  definePositionAndValue = (element: HTMLElement, part: number, res: number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number ): void => {
    element.style.left = lineLeft + part * lineWidth - element.offsetWidth / 2 + 'px'
    element.style.top = lineBottom - element.offsetHeight - thumbHeight + 'px'
    element.innerText = res + ''
  }
  definePositionAndValueForVertical = (element: HTMLElement, part: number, res: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbWidth: number): void => {
    element.style.top = lineBottom - part * lineHeight - element.offsetHeight / 2 + 'px'
    element.style.left = lineLeft - element.offsetWidth - thumbWidth + 'px'
    element.innerText = res + ''
    
  }

  setPos = (part: number, res: number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValue(this.satellite, part, res, lineWidth, lineHeight, lineBottom, lineLeft, thumbHeight)
  }

  setExtraPos = (part: number, res:number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValue(this.satelliteExtra, part, res, lineWidth, lineHeight, lineBottom, lineLeft, thumbHeight)
  }


  setPosForVertical = (part: number, res: number, lineHeight: number,  lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValueForVertical(this.satellite, part, res, lineHeight, lineBottom, lineLeft, thumbHeight)
  }
  setExtraPosForVertical = (part: number, res:number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValueForVertical(this.satelliteExtra, part, res, lineHeight, lineBottom, lineLeft, thumbHeight)
  }

}

export { Satellite }