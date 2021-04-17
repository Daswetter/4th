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

  public setScaleValues = (scaleValues: Array<number>, lineSize: { width: number; height: number}, vertical: boolean): void => {
    [0, 1, 2, 3, 4].forEach( (i: number): void => {
      this.initScaleElement(scaleValues[i], i / 4, lineSize, vertical)
    })
  }
  
  private initScaleElement = (scaleValue: number, flag: number, lineSize: { width: number; height: number }, vertical: boolean): HTMLElement => {
    const element = document.createElement('div')
    this.scale.append(element)
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''
    element.dataset.id = flag + ''
    this.setPosition(element, flag, lineSize, vertical)
    this.setScaleListener(element) 
    return element
  } 

  private setPosition = (element: HTMLElement, flag: number, lineSize: { width: number; height: number }, vertical: boolean): void => {
    element.style.left = flag * lineSize.width - element.offsetWidth / 2 + 'px'
    element.style.top = lineSize.height * 2 + 'px'

    if (vertical){
      element.style.top = lineSize.height - flag * lineSize.height - element.offsetHeight / 2 + 'px'
      element.style.left = lineSize.width * 2 + 'px'
    }
  }

  private setScaleListener = (element: HTMLElement): void => {
    const part = +(element.getAttribute('data-id') as string)
    element.onclick = this.onChanged.bind(null, part)
  }
}


export { Scale }