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
    element.style.position = 'absolute'
    element.style.zIndex = '1'
    return element
  }

  setHorizontalMod = (lineHeight: number): void => {
    this.progress.style.top = (lineHeight - this.progress.offsetHeight) / 2 + 'px'
  }
  setVerticalMod = (lineWidth: number): void => {
    this.progress.style.top = ''
    this.progress.style.left = (lineWidth - this.progress.offsetWidth) / 2 + 'px'
  }
  

  returnAsHTML = (): HTMLElement => {
    return this.progress
  }
  
  setPosition = (part: number, lineSize: {width: number, height: number}, orientation = 'horizontal', element = 'primary') :void => {
    if (element === 'primary' && orientation === 'horizontal'){
      this.part = part
      this.setProgress(lineSize.width)
    } 

    if (element === 'extra' && orientation === 'horizontal'){
      this.partExtra = part
      this.setProgress(lineSize.width)
      
    } 

    if (element === 'primary' && orientation === 'vertical'){
      this.part = part
      this.setProgressForVertical(lineSize.height)
    } 

    if (element === 'extra' && orientation === 'vertical'){
      this.partExtra = part
      this.setProgressForVertical(lineSize.height)
    } 
    
    
  } 

  // setThumbPos = (part: number, lineWidth: number) :void => {
  //   this.part = part
  //   this.setProgress(lineWidth)
  // } 

  // setExtraThumbProp = (partExtra: number, lineWidth: number) :void => {
  //   this.partExtra = partExtra
  //   this.setProgress(lineWidth)
  // }

  // setThumbPosForVertical = (part: number, lineHeight: number) :void => {
  //   this.part = part
  //   this.setProgressForVertical(lineHeight)
  // } 
  // setThumbExtraPosForVertical = (partExtra: number, lineHeight: number) :void => {
  //   this.partExtra = partExtra
  //   this.setProgressForVertical(lineHeight)
  // } 
   

  setProgress = (lineWidth: number): void => {
    if (this.part < this.partExtra){
      this.progress.style.left = this.part * lineWidth + 'px'
      this.progress.style.right = lineWidth - this.partExtra * lineWidth + 'px'
      
    } else {
      this.progress.style.left = this.partExtra * lineWidth + 'px'
      this.progress.style.right = lineWidth - this.part * lineWidth + 'px'
    }
  }

  setProgressForVertical = (lineHeight: number): void => {
    if (this.part < this.partExtra){

      this.progress.style.bottom = this.part * lineHeight + 'px'
      this.progress.style.top = lineHeight - this.partExtra * lineHeight + 'px'
      
    } else {
      this.progress.style.bottom = this.partExtra * lineHeight + 'px'
      this.progress.style.top = lineHeight - this.part * lineHeight + 'px'
    }
  }

}


export { Progress }