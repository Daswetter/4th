import { Line } from '../line/line'

class Satellite {
  satellite: HTMLElement

  constructor(public line: Line) {
    this.satellite = document.createElement('div')
    this.satellite.classList.add('range-slider__satellite')
    this.line.prepend(this.satellite)
  }
  setInitialPos = (part: number, lineWidth: number, initial: number): void => {
    // ? значения здесь и в след методе отличаются

    this.satellite.style.left =  lineWidth * part - this.satellite.offsetWidth / 2 + 'px'
    this.setValue(initial)
  }
  setPos = (pos: string): void => {
    this.satellite.style.left = parseInt(pos, 10) - this.satellite.offsetWidth / 2 + 'px'
  }

  setValue = (value: number): void => {
    this.satellite.innerText = value + ''
  }

}

export { Satellite }