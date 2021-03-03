import { Line } from '../line/line'

class Progress{
  public progress!: HTMLElement 
  private thumbType: string
  private extraThumbLeft = '0px'
  private thumbLeft = '0px'

  constructor(public line: Line, thumbType: string) {
    this.thumbType = thumbType
    this.init()
  }

  init = (): void => {
    this.progress = document.createElement('div')
    this.progress.classList.add('range-slider__progress')
    this.line.append(this.progress)
  }
  
  setInitialPos = (part: number, lineWidth: number): void => {
    this.progress.style.width =  lineWidth * part + 'px'
  }
  setThumbProp = (thumbLeft: string) :void => {
    this.thumbLeft = thumbLeft
    this.setProgress(this.lineWidth)
  } 
  setExtraThumbProp = (extraThumbLeft: string, lineWidth: number) :void => {
    this.extraThumbLeft = extraThumbLeft
    this.lineWidth = lineWidth
    this.setProgress(lineWidth)
  } 
  setProgressForSingle = (): void => {
    this.progress.style.width = this.thumbLeft
  }
  setProgress = (lineWidth: number): void => {
    
    
    if (this.thumbType === 'single'){
      this.progress.style.width = this.thumbLeft
    } else if (this.thumbType === 'double') {
      this.progress.style.left = this.thumbLeft
      // ! add thumb width
      this.progress.style.right = lineWidth - parseInt(this.extraThumbLeft) - 20 + 'px'
    }
  }
  
}

export { Progress }