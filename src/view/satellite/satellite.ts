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
  
  definePositionAndValue = (element: HTMLElement, part: number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number ): void => {
    element.style.left = lineLeft + part * lineWidth - element.offsetWidth / 2 + 'px'
    element.style.top = lineBottom - element.offsetHeight - thumbHeight + 'px'
    
  }

  definePositionAndValueForVertical = (element: HTMLElement, part: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbWidth: number): void => {
    element.style.top = lineBottom - part * lineHeight - element.offsetHeight / 2 + 'px'
    element.style.left = lineLeft - element.offsetWidth - thumbWidth + 'px'
    // element.style.left = lineLeft - element.offsetWidth - thumbWidth + 'px'
  }

  setPos = (part: number, res: number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValue(this.satellite, part, lineWidth, lineHeight, lineBottom, lineLeft, thumbHeight)
    this.defineInnerText(this.satellite, res)
  }

  setExtraPos = (part: number, res:number, lineWidth: number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValue(this.satelliteExtra, part, lineWidth, lineHeight, lineBottom, lineLeft, thumbHeight)
    this.defineInnerText(this.satelliteExtra, res)
  }


  setPosForVertical = (part: number, res: number, lineHeight: number,  lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValueForVertical(this.satellite, part, lineHeight, lineBottom, lineLeft, thumbHeight)
    this.defineInnerText(this.satellite, res)
  }
  setExtraPosForVertical = (part: number, res:number, lineHeight: number, lineBottom: number, lineLeft: number, thumbHeight: number): void => {
    this.definePositionAndValueForVertical(this.satelliteExtra, part, lineHeight, lineBottom, lineLeft, thumbHeight)
    this.defineInnerText(this.satelliteExtra, res)
  }

}

export { Satellite }