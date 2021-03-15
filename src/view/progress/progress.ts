class Progress{
  public progress!: HTMLElement 
  private partExtra = 0
  private part = 0

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
  setThumbPos = (part: number, lineWidth: number) :void => {
    this.part = part
    this.setProgress(lineWidth)
  } 
  setExtraThumbProp = (partExtra: number, lineWidth: number) :void => {
    this.partExtra = partExtra
    this.setProgress(lineWidth)
  } 

  setProgress = (lineWidth: number): void => {
    if (this.part < this.partExtra){
      this.progress.style.left = this.part * lineWidth + 'px'
      this.progress.style.right = lineWidth - this.partExtra * lineWidth + 'px'
      
    } else {
      this.progress.style.left = this.partExtra * lineWidth + 'px'
      this.progress.style.right = lineWidth - this.part * lineWidth + 'px'
    }
  }
}


export { Progress }