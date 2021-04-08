class Scale{
  public scale!: HTMLElement 
  private onScaleWasClicked!: (arg0: number) => void;

  constructor() {
    this.init()
  }
  
  private init = (): void => {
    this.scale = document.createElement('div')
    this.scale.style.display = 'flex'
    this.scale.style.justifyContent = 'space-between'
    this.scale.classList.add('range-slider__scale')
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
    element.style.cursor = 'pointer'
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''
    element.dataset.id = flag + ''
    this.setScaleListener(element)
    return element
  } 

  private setScaleListener = (element: HTMLElement): void => {
    const dataAttribute = +(element.getAttribute('data-id') as string)
    element.onclick = this.onScaleWasClicked.bind(null, dataAttribute)
  }

  public setVertical = (): void => {
    this.scale.style.flexDirection = 'column-reverse'
    this.scale.style.alignSelf = 'stretch'
  }
  
  public bindScaleWasClicked = (callback: (arg0: number) => void): void => {
    this.onScaleWasClicked = callback;
  }
}


export { Scale }