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
  
  definePositionAndValue = (element: HTMLElement, part: number, res: number, lineWidth: number): void => {
    element.style.left = part * lineWidth + 'px'
    element.innerText = res + ''
  }

  setPos = (part: number, res: number, lineWidth: number): void => {
    this.definePositionAndValue(this.satellite, part, res, lineWidth)
  }
  setExtraPos = (part: number, res:number, lineWidth: number): void => {
    this.definePositionAndValue(this.satelliteExtra, part, res, lineWidth)
  }

}

export { Satellite }