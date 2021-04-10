import { SubView } from "../SubView"

class Progress extends SubView{
  public progress!: HTMLElement 
  private partExtra = 0
  private part = 0

  constructor(){
    super()
    this.initPrimaryElement()
  }

  initPrimaryElement = (): void => {
    this.progress = this.init(this.progress, 'progress')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.progress
  }

  public setInitialSettings = (lineSize: {width: number, height: number}, orientation = 'horizontal'): void => {

    this.progress.style.top = (lineSize.height - this.progress.offsetHeight) / 2 + 'px'

    if (orientation === 'vertical'){
      this.progress.style.top = ''
      this.progress.style.left = (lineSize.width - this.progress.offsetWidth) / 2 + 'px'
    }
  }
  

  
  
  public update = (part: number, lineSize: {width: number, height: number}, orientation = 'horizontal', element = 'primary') :void => {
    let lineOneSize = lineSize.width
    let generalSide = 'left'
    let secondSide = 'right'

    if (element === 'primary' && orientation === 'horizontal'){
      this.part = part
    } 

    if (element === 'extra' && orientation === 'horizontal'){
      this.partExtra = part
    } 

    if (element === 'primary' && orientation === 'vertical'){
      this.part = part
      lineOneSize = lineSize.height
      generalSide = 'bottom'
      secondSide = 'top'
    } 

    if (element === 'extra' && orientation === 'vertical'){
      this.partExtra = part
      lineOneSize = lineSize.height
      generalSide = 'bottom'
      secondSide = 'top'
    } 

    this.setProgress(lineOneSize, generalSide, secondSide)
  } 
   

  private setProgress = (lineSide: number, generalSideName: string, secondSideName: string ): void => {
    let partForGeneral = this.part
    let partForSecond = this.partExtra

    if (this.part >= this.partExtra){
      partForGeneral = this.partExtra
      partForSecond = this.part
    } 

    const generalSide = partForGeneral * lineSide
    const secondSide = lineSide - partForSecond * lineSide

    this.progress.style.setProperty(`${generalSideName}`, `${generalSide}px`);
    this.progress.style.setProperty(`${secondSideName}`, `${secondSide}px`);
  }

}


export { Progress }