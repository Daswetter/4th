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
    this.setScaleValues()
    console.log('this.maxScale', this.maxScale);
  }
  setScaleValues = (): void => {
    this.setScaleNumber(this.minScale, this.options.min, 1)
    this.setScaleNumber(this.quarterScale, (this.options.max - this.options.min) / 4 + this.options.min, 2)
    this.setScaleNumber(this.middleScale, (this.options.max - this.options.min) / 2 + this.options.min, 3)
    this.setScaleNumber(this.threeQuarterScale, (this.options.max - this.options.min) / 4 * 3 + this.options.min, 4)
    this.setScaleNumber(this.maxScale, this.options.max, 5)
    
  }
  
  setLineLeftSide( lineLeftSide: number ): void {
    this.lineLeftSide = lineLeftSide
    this.setScaleLeftSide()
  }
  setLineWidth(lineWidth: number): void{
    this.lineWidth = lineWidth  
    this.setScaleWidth()  
  }
  setScaleLeftSide = () :void => {
    // this.scale.style.left = this.lineLeftSide + 'px'
  }
  setScaleWidth = (): void => {
    this.scale.style.width = this.lineWidth + 20 + 'px'
  }
  setScaleNumber = (element: HTMLElement, scaleValue: number, flag: number): void => {
    element = document.createElement('div')
    this.scale.append(element)
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''

    if (flag === 1){
      element.onclick = this.onMinScaleWasClicked
    } else if (flag === 2) {
      element.onclick = this.onQuarterScaleWasClicked
    } else if (flag === 3) {
      element.onclick = this.onMiddleScaleWasClicked
    } else if (flag === 4) {
      element.onclick = this.onThreeQuarterScaleWasClicked
    } else if (flag === 5) {
      element.onclick = this.onMaxScaleWasClicked
    }    
  } 

  setEventListener = ():void => {
    this.middleScale.onclick = this.onMiddleScaleWasClicked
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