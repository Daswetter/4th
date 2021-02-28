import { Line } from '../line/line'

class Progress{
  public progress!: HTMLElement 
  private thumbType: string
  private extraThumbRight = '0px'
  private thumbLeft = '0px'

  constructor(public line: Line, thumbType: string) {
    this.thumbType = thumbType
    this.createProgress()
  }
  createProgress = (): void => {
    this.progress = document.createElement('div')
    this.progress.classList.add('range-slider__progress')
    this.line.append(this.progress)
  }
  setInitialPos = (part: number, lineWidth: number): void => {
    this.progress.style.width =  lineWidth * part + 'px'
  }
  setThumbProp = (thumbLeft: string) :void => {
    this.thumbLeft = thumbLeft
    this.setProgress()
  } 
  setExtraThumbProp = (extraThumbRight: string) :void => {
    this.extraThumbRight = extraThumbRight
    this.setProgress()
  } 
  setProgress = (): void => {
    if (this.thumbType === 'single'){
      this.progress.style.width = this.thumbLeft
    } else if (this.thumbType === 'double') {
      this.progress.style.left = this.thumbLeft
      this.progress.style.right = this.extraThumbRight
    }
     
  }
  changeWidth = (thumbLeftProp: string): void => {
    // this.progress.style.width = thumbLeftProp
  }
}

export { Progress }