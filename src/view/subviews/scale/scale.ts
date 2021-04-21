import { SubView } from "../SubView";

class Scale extends SubView{
  public scale!: HTMLElement 
  scaleElements:{ [key: string]: HTMLElement } = {}
  constructor(initElement: HTMLElement){
    super()
    this.initPrimaryElement(initElement)
  }

  initPrimaryElement = (initElement: HTMLElement): void => {
    this.scale = this.init(initElement, this.scale, 'scale')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.scale
  }

  public initScale = (scaleValues: { [key: string]: string }, lineSize: { width: number; height: number}, vertical: boolean): void => {
    this.createScaleElements(scaleValues)
    this.printScaleValues(scaleValues)
    this.setPosition(lineSize, vertical)
    this.setScaleListener() 
  }
  
  private createScaleElements = (scaleValues: { [key: string]: string }): void => {
    for (const part in scaleValues) {
      const element = document.createElement('div')
      this.scale.append(element)
      element.classList.add('range-slider__scale-number')
      Object.assign(this.scaleElements, {[part]: element}) 
    }
  } 

  private printScaleValues = (scaleValues: { [key: string]: string }): void => {
    for (const part in this.scaleElements) {
      this.scaleElements[part].innerText = scaleValues[part]
    }
  }
  


  public setPosition = (lineSize: { width: number; height: number }, vertical: boolean): void => {
    for (const part in this.scaleElements){
      this.scaleElements[part].style.left = (+part) * lineSize.width - this.scaleElements[part].offsetWidth / 2 + 'px'
      this.scaleElements[part].style.top = lineSize.height * 2 + 'px'

      if (vertical){
        this.scaleElements[part].style.top = lineSize.height - (+part) * lineSize.height - this.scaleElements[part].offsetHeight / 2 + 'px'
        this.scaleElements[part].style.left = lineSize.width * 2 + 'px'
      }
    }
  }

  private setScaleListener = (): void => {
    for (const part in this.scaleElements){
      this.scaleElements[part].onclick = this.onChanged.bind(null, +part)
    }
  }
}


export { Scale }