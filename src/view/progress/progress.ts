class Progress{
  public progress!: HTMLElement 
  private extraThumbLeft = '0px'
  private thumbLeft = '0px'

  constructor(thumbType: string) {
    this.progress = this.init(this.progress)
  }

  init = (element: HTMLElement): HTMLElement => {
    element = document.createElement('div')
    element.classList.add('range-slider__progress')
    return element
  }
  returnAsHTMLElement = (): HTMLElement => {
    return this.progress
  }
  setThumbProp = (thumbLeft: string, lineWidth: number, thumbType: string) :void => {
    this.thumbLeft = thumbLeft
    this.setProgress(lineWidth, thumbType)
  } 
  setExtraThumbProp = (extraThumbLeft: string, lineWidth: number, thumbType: string) :void => {
    this.extraThumbLeft = extraThumbLeft
    this.setProgress(lineWidth, thumbType)
  } 
  setProgressForSingle = (): void => {
    this.progress.style.width = this.thumbLeft
  }
  setProgress = (lineWidth: number, thumbType: string): void => {
    if (thumbType === 'single'){
      this.progress.style.width = this.thumbLeft
    } else if (thumbType === 'double') {
      if (parseInt(this.thumbLeft) < parseInt(this.extraThumbLeft)){
        this.progress.style.left = this.thumbLeft
        this.progress.style.right = lineWidth - parseInt(this.extraThumbLeft) + 'px'
        
      } else {
        this.progress.style.left = parseInt(this.extraThumbLeft) + 'px'
        this.progress.style.right = lineWidth - parseInt(this.thumbLeft) + 'px'
      }
    }
  }
  
}

export { Progress }