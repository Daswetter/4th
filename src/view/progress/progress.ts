class Progress{
  public progress!: HTMLElement 
  private thumbType: string
  private extraThumbLeft = '0px'
  private thumbLeft = '0px'

  constructor(thumbType: string) {
    this.thumbType = thumbType
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
  setThumbProp = (thumbLeft: string, lineWidth: number) :void => {
    this.thumbLeft = thumbLeft
    this.setProgress(lineWidth)
  } 
  setExtraThumbProp = (extraThumbLeft: string, lineWidth: number) :void => {
    this.extraThumbLeft = extraThumbLeft
    this.setProgress(lineWidth)
  } 
  setProgressForSingle = (): void => {
    this.progress.style.width = this.thumbLeft
  }
  setProgress = (lineWidth: number): void => {
    if (this.thumbType === 'single'){
      this.progress.style.width = this.thumbLeft
    } else if (this.thumbType === 'double') {
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