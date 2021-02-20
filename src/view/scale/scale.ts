import { Line } from '../line/line'
import '../../interface/IOptions'

class Scale{
  public scale: HTMLElement 
  public minScale!: HTMLElement
  public quarterScale!: HTMLElement
  public middleScale!: HTMLElement
  public threeQuarterScale!: HTMLElement
  public maxScale!: HTMLElement
  
  public lineWidth!: number
  public lineLeftSide!: number
  private onScaleWasClicked!: Function;

  constructor(public line: Line) {
    this.scale = document.createElement('div')
    this.scale.classList.add('range-slider__scale')
    this.line.after(this.scale)

  }
  setScaleValues = (scaleElements: Array<number>): void => {
    this.createScaleElement(this.minScale, scaleElements[0], 1)
    this.createScaleElement(this.quarterScale, scaleElements[1], 2)
    this.createScaleElement(this.middleScale, scaleElements[2], 3)
    this.createScaleElement(this.threeQuarterScale, scaleElements[3], 4)
    this.createScaleElement(this.maxScale, scaleElements[4], 5)
    
  }
  
  setLineLeftSide( lineLeftSide: number ): void {
    this.lineLeftSide = lineLeftSide
  }
  setLineWidth(lineWidth: number): void{
    this.lineWidth = lineWidth 
  }
  createScaleElement = (element: HTMLElement, scaleValue: number, flag: number): void => {
    element = document.createElement('div')
    this.scale.append(element)
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''
    element.dataset.id = flag + ''
    this.setScaleListener(element)
  } 
  setScaleListener = (element: HTMLElement): void => {
    if (element.getAttribute('data-id') === '1'){
      element.onclick = this.onMinScaleWasClicked
    } else if (element.getAttribute('data-id') === '2'){
      element.onclick = this.onQuarterScaleWasClicked
    } else if (element.getAttribute('data-id') === '3'){
      element.onclick = this.onMiddleScaleWasClicked
    } else if (element.getAttribute('data-id') === '4'){
      element.onclick = this.onThreeQuarterScaleWasClicked
    } else if (element.getAttribute('data-id') === '5'){
      element.onclick = this.onMaxScaleWasClicked
    }
  }
  onMinScaleWasClicked = (event: MouseEvent): void => {
    this.onScaleWasClicked(1)
  }
  onQuarterScaleWasClicked = (event: MouseEvent): void => {
    this.onScaleWasClicked(2)
  }
  onMiddleScaleWasClicked = (event: MouseEvent): void => {
    this.onScaleWasClicked(3)
  }
  onThreeQuarterScaleWasClicked = (event: MouseEvent): void => {
    this.onScaleWasClicked(4)
  } 
  onMaxScaleWasClicked = (event: MouseEvent): void => {
    this.onScaleWasClicked(5)
  }

  bindScaleWasClicked = (callback: Function): void => {
    this.onScaleWasClicked = callback;
  }
}


export { Scale }