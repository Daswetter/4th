class Scale{
  public scale!: HTMLElement 
  public minScale!: HTMLElement
  public quarterScale!: HTMLElement
  public middleScale!: HTMLElement
  public threeQuarterScale!: HTMLElement
  public maxScale!: HTMLElement
  
  public lineWidth!: number
  public lineLeftSide!: number
  public orientation: string
  private onScaleWasClicked!: (arg0: number) => void;

  constructor(orientation: string) {
    this.orientation = orientation
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
    const scaleHTMLElements = [this.minScale, this.quarterScale, this.middleScale, this.threeQuarterScale, this.maxScale];
    [0, 1, 2, 3, 4].forEach( (x: number): void => {
      this.createScaleElement(scaleHTMLElements[x], scaleValues[x], x / 4)
    })
  }
  
  setLineLeftSide( lineLeftSide: number ): void {
    this.lineLeftSide = lineLeftSide
  }
  setLineWidth(lineWidth: number): void{
    this.lineWidth = lineWidth 
  }
  createScaleElement = (element: HTMLElement, scaleValue: number, flag: number): void => {
    element = document.createElement('div')
    this.scale.append(element)
    element.classList.add('range-slider__scale-number')
    element.innerText = scaleValue + ''
    element.dataset.id = flag + ''
    if (this.orientation === 'vertical') {
      element.style.transform = 'rotate(90deg)'
    }
    this.setScaleListener(element)
  } 
  setScaleListener = (element: HTMLElement): void => {
    const dataAttribute = +(element.getAttribute('data-id') as string)
    element.onclick = this.onScaleWasClicked.bind(null, dataAttribute)
  }


  bindScaleWasClicked = (callback: (arg0: number) => void): void => {
    this.onScaleWasClicked = callback;
  }
}


export { Scale }