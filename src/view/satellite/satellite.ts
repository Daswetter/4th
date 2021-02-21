import { Line } from '../line/line'

class Satellite {
  satellite: HTMLElement
  thumbWidth!: number

  constructor(public line: Line) {
    this.satellite = document.createElement('div')
    this.satellite.classList.add('range-slider__satellite')
    this.line.prepend(this.satellite)
  }
  setInitialPos = (part: number, lineWidth: number, thumbhWidth: number): void => {
    this.satellite.style.left =  lineWidth * part - thumbhWidth / 2 + 'px'
  }
  setPos = (pos: string): void => {
    this.satellite.style.left = parseInt(pos, 10) - this.thumbWidth / 2 + 'px'
  }

  setValue = (value: number): void => {
    this.satellite.innerText = value + ''
  }

  setThumbWidth = (thumbWidth: number): void => {
    this.thumbWidth = thumbWidth
  }
}

export { Satellite }