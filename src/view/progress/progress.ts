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
  setThumbProp = (thumbLeft: string, lineWidth: number, thumbWidth: number) :void => {
    this.thumbLeft = thumbLeft
    this.setProgress(lineWidth, thumbWidth)
  } 
  setExtraThumbProp = (extraThumbLeft: string, lineWidth: number, thumbWidth: number) :void => {
    this.extraThumbLeft = extraThumbLeft
    this.setProgress(lineWidth, thumbWidth)
  } 
  setProgressForSingle = (): void => {
    this.progress.style.width = this.thumbLeft
  }
  setProgress = (lineWidth: number, thumbWidth: number): void => {
    if (this.thumbType === 'single'){
      this.progress.style.width = this.thumbLeft
    } else if (this.thumbType === 'double') {
      if (parseInt(this.thumbLeft) < parseInt(this.extraThumbLeft)){
        this.progress.style.left = this.thumbLeft
        this.progress.style.right = lineWidth - parseInt(this.extraThumbLeft) - thumbWidth + 'px'
      } else {
        this.progress.style.left = parseInt(this.extraThumbLeft) + thumbWidth + 'px'
        this.progress.style.right = lineWidth - parseInt(this.thumbLeft) + 'px'
      }
    }
  }
  
}

export { Progress }