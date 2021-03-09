class Satellite {
  satellite!: HTMLElement
  satelliteExtra!: HTMLElement

  constructor(orientation: string, thumbType: string) {
    this.satellite = this.init(this.satellite)

    if (thumbType === 'double'){
      this.satelliteExtra = this.init(this.satelliteExtra)
      if (orientation === 'vertical'){
        this.satelliteExtra.style.transform = 'rotate(90deg)'
      }
    }
    
    if (orientation === 'vertical'){
      this.satellite.style.transform = 'rotate(90deg)'
    }
  }

  init = (element: HTMLElement): HTMLElement => {
    element = document.createElement('div')
    element.classList.add('range-slider__satellite')
    return element
  }

  returnSatelliteAsHTMLElement = (): HTMLElement => {
    return this.satellite
  }

  returnSatelliteExtraAsHTMLElement = (): HTMLElement => {
    return this.satelliteExtra
  }

  definePosition = (element: HTMLElement, position: string): void => {
    element.style.left = position
  }

  setPos = (pos: string): void => {
    this.definePosition(this.satellite, pos)
  }
  setExtraPos = (pos: string): void => {
    this.definePosition(this.satelliteExtra, pos)
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