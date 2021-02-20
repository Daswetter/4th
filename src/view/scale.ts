import { Line } from './line'
import './../interface/IOptions'

class Scale{
  public scale: HTMLElement 
  public minScale!: HTMLElement
  public quarterScale!: HTMLElement
  public middleScale!: HTMLElement
  public threeQuarterScale!: HTMLElement
  public maxScale!: HTMLElement
  
  public lineWidth!: number
  public lineLeftSide!: number
  public options!: IOptions
  private onScaleWasClicked!: Function;

  constructor(public line: Line) {
    this.scale = document.createElement('div')
    this.scale.classList.add('range-slider__scale')
    this.line.after(this.scale)

  }
  setOptions = (options: IOptions): void => {
    this.options = options
  }
  setScaleValues = (scaleElements: Array<number>): void => {
    this.createScaleElement(this.minScale, scaleElements[0])
    this.createScaleElement(this.quarterScale, scaleElements[1])
    this.createScaleElement(this.middleScale, scaleElements[2])
    this.createScaleElement(this.threeQuarterScale, scaleElements[3])
    this.createScaleElement(this.maxScale, scaleElements[4])
    
  }
  
  setLineLeftSide( lineLeftSide: number ): void {
    this.lineLeftSide = lineLeftSide
  }
  setLineWidth(lineWidth: number): void{
    this.lineWidth = lineWidth 
  }
  createScaleElement = (element: HTMLElement, scaleValue: number): void => {
    element = document.createElement('div')
    this.scale.append(element)
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''
    
  } 
  setMinScale = (min: number): void => {
    this.createScaleElement(this.minScale, min)
    this.minScale.onclick = this.onMinScaleWasClicked
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
//   changeWidth = (thumbLeftProp: string): void => {
//     this.progress.style.width = thumbLeftProp
//   }

  bindScaleWasClicked = (callback: Function): void => {
    this.onScaleWasClicked = callback;
  }
}


export { Scale }