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

  rotateElement = (element: HTMLElement): void => {
    element.style.transform = 'rotate(90deg)'
  }

  rotateSatellite = (): void => {
    this.rotateElement(this.satellite)
  }
  rotateSatelliteExtra = (): void => {
    this.rotateElement(this.satelliteExtra)
  }
  
  definePosition = (element: HTMLElement, part: number, lineWidth: number): void => {
    element.style.left = part * lineWidth + 'px'
  }

  setPos = (part: number,  lineWidth: number): void => {
    this.definePosition(this.satellite, part, lineWidth)
  }
  setExtraPos = (part: number, lineWidth: number): void => {
    this.definePosition(this.satelliteExtra, part, lineWidth)
  }

  defineValue = (element: HTMLElement, value: number): void => {
    element.innerText = value + ''
  }

  setValue = (value: number): void => {
    this.defineValue(this.satellite, value)
  }

  setExtraValue = (value: number): void => {
    
    this.defineValue(this.satelliteExtra, value)
  }

}

export { Satellite }