class Progress{
  public progress!: HTMLElement 
  private extraThumbPos = '0px'
  private thumbPos = '0px'

  constructor() {
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
  setThumbPos = (thumbPos: string, lineWidth: number) :void => {
    this.thumbPos = thumbPos
    this.setProgress(lineWidth)
  } 
  setExtraThumbProp = (extraThumbPos: string, lineWidth: number) :void => {
    this.extraThumbPos = extraThumbPos
    this.setProgress(lineWidth)
  } 

  setProgress = (lineWidth: number): void => {
    if (parseInt(this.thumbPos) < parseInt(this.extraThumbPos)){
      this.progress.style.left = this.thumbPos
      this.progress.style.right = lineWidth - parseInt(this.extraThumbPos) + 'px'
      
    } else {
      this.progress.style.left = parseInt(this.extraThumbPos) + 'px'
      this.progress.style.right = lineWidth - parseInt(this.thumbPos) + 'px'
    }
  }
}


export { Progress }