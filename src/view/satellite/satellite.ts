class Satellite {
  satellite!: HTMLElement
  satelliteExtra!: HTMLElement
  orientation: string

  constructor(orientation: string, thumbType: string) {
    this.orientation = orientation
    this.init()
    if (thumbType === 'double'){
      this.initExtra()
    }
  }

  init = (): void => {
    this.satellite = document.createElement('div')
    this.satellite.classList.add('range-slider__satellite')
  }
  initExtra = (): void => {
    this.satelliteExtra = document.createElement('div')
    this.satelliteExtra.classList.add('range-slider__satellite')
  }

  returnSatelliteAsHTMLElement = (): HTMLElement => {
    return this.satellite
  }

  returnSatelliteExtraAsHTMLElement = (): HTMLElement => {
    return this.satelliteExtra
  }

  setPos = (pos: string): void => {
    this.satellite.style.left = parseInt(pos, 10) + 'px'
  }
  setExtraPos = (pos: string): void => {
    this.satelliteExtra.style.left = parseInt(pos, 10) + 'px'
  }

  setValue = (value: number): void => {
    this.satellite.innerText = value + ''
    if (this.orientation === 'vertical'){
      this.satellite.style.transform = 'rotate(90deg)'
    }
  }

  setExtraValue = (value: number): void => {
    this.satelliteExtra.innerText = value + ''
    if (this.orientation === 'vertical'){
      this.satelliteExtra.style.transform = 'rotate(90deg)'
    }
  }

}

export { Satellite }