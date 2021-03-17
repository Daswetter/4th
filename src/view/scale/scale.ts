class Scale{
  private scale!: HTMLElement 
  private scaleHTMLElements!: Array<HTMLElement>
  private onScaleWasClicked!: (arg0: number) => void;

  constructor() {
    this.init()
  }
  
  init = (): void => {
    this.scale = document.createElement('div')
    this.scale.classList.add('range-slider__scale')
  }

  returnAsHTMLElement = (): HTMLElement => {
    return this.scale
  }

  setScaleValues = (scaleValues: Array<number>): void => {
    const scaleHTMLElements: Array<HTMLElement> = [];
    [0, 1, 2, 3, 4].forEach( (i: number): void => {
      const value = this.initScaleElement(scaleValues[i], i / 4)
      scaleHTMLElements.push(value)
    })
    this.scaleHTMLElements = scaleHTMLElements
  }
  
  initScaleElement = (scaleValue: number, flag: number): HTMLElement => {
    const element = document.createElement('div')
    this.scale.append(element)
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''
    element.dataset.id = flag + ''
    this.setScaleListener(element)
    return element
  } 
  setScaleListener = (element: HTMLElement): void => {
    const dataAttribute = +(element.getAttribute('data-id') as string)
    element.onclick = this.onScaleWasClicked.bind(null, dataAttribute)
  }

  rotateScaleElement = (): void => {
    this.scaleHTMLElements.forEach( (elem: HTMLElement): string => elem.style.transform = 'rotate(90deg)')
  }
  setVerticalMod = (): void => {
    this.scale.style.flexDirection = 'column-reverse'
    this.scale.style.alignSelf = 'stretch'
  }
  bindScaleWasClicked = (callback: (arg0: number) => void): void => {
    this.onScaleWasClicked = callback;
  }
}


export { Scale }