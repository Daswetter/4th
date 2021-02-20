import { Line } from '../line/line'

class Satellite {
  satellite: HTMLElement
  thumbWidth!: number

  constructor(public line: Line) {
    this.satellite = document.createElement('div')
    this.satellite.classList.add('range-slider__satellite')
    this.line.prepend(this.satellite)
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