import { SubView } from "../SubView";

class Scale extends SubView{
  public scale!: HTMLElement 

  constructor(){
    super()
    this.initPrimaryElement()
  }

  initPrimaryElement = (): void => {
    this.scale = this.init(this.scale, 'scale')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.scale
  }

  public setScaleValues = (scaleValues: Array<number>): void => {
    
    const scaleHTMLElements: Array<HTMLElement> = [];
    [0, 1, 2, 3, 4].forEach( (i: number): void => {
      const scaleElement = this.initScaleElement(scaleValues[i], i / 4)
      scaleHTMLElements.push(scaleElement)
    })
  }
  
  private initScaleElement = (scaleValue: number, flag: number): HTMLElement => {
    const element = document.createElement('div')
    this.scale.append(element)
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''
    element.dataset.id = flag + ''
    this.setScaleListener(element)
    return element
  } 

  private setScaleListener = (element: HTMLElement): void => {
    const part = +(element.getAttribute('data-id') as string)
    element.onclick = this.onChanged.bind(null, part)
  }

  public setVertical = (): void => {
    this.scale.style.flexDirection = 'column-reverse'
    this.scale.style.alignSelf = 'stretch'
  }
}


export { Scale }