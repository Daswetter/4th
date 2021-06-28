import { IView } from '../../../../types';
import { Subview } from '../Subview';

class Scale extends Subview{
  public scale!: HTMLElement 
  public scaleElements:{ [key: string]: HTMLElement } = {}

  constructor(public initElement: HTMLElement, public mediator: IView){
    super()
    this.initPrimary(initElement)
    this.mediator = mediator
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.scale = this.init(initElement, this.scale, '__scale')
  }
  
  public initScale = (scaleValues: { [key: string]: string }, lineSize: { width: number; height: number}, vertical: boolean): void => {
    this.createScaleElements(scaleValues)
    this.printScaleValues(scaleValues)
    this.setPosition(lineSize, vertical)
    this.subscribe<number>('scale: clicked', part => this.mediator.notify({value: part, current: false, extra: false, nearest: true}));
    this.setScaleListener()
  }
  
  private createScaleElements = (scaleValues: { [key: string]: string }): void => {
    for (const part in scaleValues) {
      const element = document.createElement('div')
      this.scale.append(element)
      element.classList.add('dwSlider__scale-number')
      this.scaleElements = { ...this.scaleElements, [part]: element}
    }
  }

  private printScaleValues = (scaleValues: { [key: string]: string }): void => {
    for (const part in this.scaleElements) {
      this.scaleElements[part].innerText = scaleValues[part]
    }
  }
  
  public setPosition = (lineSize: { width: number; height: number }, vertical: boolean): void => {
    for (const part in this.scaleElements){
      this.scaleElements[part].style.left = Number(part) * lineSize.width - this.scaleElements[part].offsetWidth / 2 + 'px'
      this.scaleElements[part].style.top = lineSize.height * 2 + 'px'

      if (vertical){
        this.scaleElements[part].style.top = lineSize.height - Number(part) * lineSize.height - this.scaleElements[part].offsetHeight / 2 + 'px'
        this.scaleElements[part].style.left = lineSize.width * 2 + 'px'
      }
    }
  }

  private setScaleListener = (): void => {
    for (const part in this.scaleElements){
      this.scaleElements[part].addEventListener('click', () => this.emit<number>('scale: clicked', Number(part)))
    }
  }
}


export { Scale }