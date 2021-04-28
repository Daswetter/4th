import { SubView } from "../SubView"

class Progress extends SubView{
  public progress!: HTMLElement 
  private partExtra = 0
  private part = 0

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
  }

  initPrimary = (initElement: HTMLElement): void => {
    this.progress = this.init(initElement, this.progress, 'progress')
  }
  
  public setVertical = (): void => {
    this.progress.style.width = this.progress.offsetHeight + 'px'
    this.progress.style.height = 'auto'
  }

  public setInitialSettings = (lineSize: {width: number, height: number}, vertical = false): void => {

    this.progress.style.top = (lineSize.height - this.progress.offsetHeight) / 2 + 'px'

    if (vertical){
      this.progress.style.top = ''
      this.progress.style.left = (lineSize.width - this.progress.offsetWidth) / 2 + 'px'
    }
  }
  
  public update = (part: number, lineSize: {width: number, height: number}, vertical: boolean, extra: boolean) :void => {
    let lineOneSize = lineSize.width
    let generalSide = 'left'
    let secondSide = 'right'

    if (!extra && !vertical){
      this.part = part
    } 

    if (extra && !vertical){
      this.partExtra = part
    } 
    
    if (!extra && vertical){
      this.part = part
      lineOneSize = lineSize.height
      generalSide = 'bottom'
      secondSide = 'top'
    } 

    if (extra && vertical){
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