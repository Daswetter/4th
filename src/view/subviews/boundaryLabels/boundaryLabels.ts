import { Subview } from '../Subview'

class BoundaryLabels extends Subview {
  public min!: HTMLElement
  public max!: HTMLElement

  constructor(initElement: HTMLElement){
    super()
    this.initElements(initElement)
  }

  private initElements = (initElement: HTMLElement): void => {
    this.min = this.init(initElement, this.min, 'boundary-labels_min')
    this.max = this.init(initElement, this.min, 'boundary-labels_max')
  }

  private printInnerText = (element: HTMLElement, text: number): void => {
    element.innerText = String(text)
  }

  private setPositionToHorizontal = (element: HTMLElement, thumbHeight: number): void => {
    element.style.top = - element.offsetHeight - thumbHeight / 2 + 'px'
    const side = - element.offsetWidth / 2 + 'px'

    if (element === this.min){
      element.style.left = side
    } else {
      element.style.right = side
    }
  }

  private setPositionToVertical = (element: HTMLElement, lineWidth: number, thumbWidth: number): void => {
    element.style.right = lineWidth + thumbWidth / 3 + 'px'
    const side = - element.offsetHeight / 2 + 'px'

    if (element === this.min){
      element.style.bottom = side
    } else {
      element.style.top = side
    }
  }

  public setInitialSettings = (min: number, max: number, lineWidth: number, thumbSize: { width: number, height: number}, vertical = false): void => {
    this.printInnerText(this.min, min)
    this.printInnerText(this.max, max)

    if (vertical) {
      this.setPositionToVertical(this.min, lineWidth, thumbSize.width)
      this.setPositionToVertical(this.max, lineWidth, thumbSize.width)
    } else {
      this.setPositionToHorizontal(this.min, thumbSize.height)
      this.setPositionToHorizontal(this.max, thumbSize.height)
    }
    
  }

  private switchOpacity = (element: HTMLElement, condition: boolean, optionalCondition?: boolean): void => {
    let opacity: string 
    if (condition || optionalCondition) {
      opacity = '0'
    } else {
      opacity = '1'
    }
    element.style.opacity = opacity
  }

  private isPrimaryTouchingMin = (satelliteParams: { width: number, height: number, left: number, top: number }, vertical: boolean): boolean => {
    if (vertical) {
      return satelliteParams.top + satelliteParams.height >= this.min.offsetTop
    }
    return satelliteParams.left <= (this.min.offsetLeft + this.min.offsetWidth)
  }

  private isPrimaryTouchingMax = (satelliteParams: { width: number, height: number, left: number, top: number }, vertical: boolean): boolean => {
    if (vertical) {
      return satelliteParams.top <= (this.max.offsetTop + this.max.offsetHeight)
    }
    return satelliteParams.left + satelliteParams.width >= this.max.offsetLeft
  }
  
  private isExtraTouchingMin = (satelliteExtraParams: { width: number, height: number, left: number, top: number }, vertical: boolean): boolean => {
    if (vertical) {
      return satelliteExtraParams.top + satelliteExtraParams.height >= this.min.offsetTop
    }
    return satelliteExtraParams.left <= (this.min.offsetLeft + this.min.offsetWidth)
  }

  private isExtraTouchingMax = (satelliteExtraParams: { width: number, height: number, left: number, top: number }, vertical: boolean): boolean => {
    if (vertical) {
      return satelliteExtraParams.top <= (this.max.offsetTop + this.max.offsetHeight)
    }
    return satelliteExtraParams.left + satelliteExtraParams.width >= this.max.offsetLeft
  }



  private setOpacityToDouble = (satelliteParams: { width: number, height: number, left: number, top: number }, satelliteExtraParams: { width: number, height: number, left: number, top: number }, vertical: boolean): void => {
    const isPrimaryTouchingMin = this.isPrimaryTouchingMin(satelliteParams, vertical)
    const isExtraTouchingMin = this.isExtraTouchingMin(satelliteExtraParams, vertical)
    this.switchOpacity(this.min, isPrimaryTouchingMin, isExtraTouchingMin)

    const isPrimaryTouchingMax = this.isPrimaryTouchingMax(satelliteParams, vertical)
    const isExtraTouchingMax = this.isExtraTouchingMax(satelliteExtraParams, vertical)
    this.switchOpacity(this.max, isPrimaryTouchingMax, isExtraTouchingMax)
  }


  private setOpacityToSingle = (satelliteParams: { width: number, height: number, left: number, top: number }, vertical: boolean): void => {
    const isPrimaryTouchingMin = this.isPrimaryTouchingMin(satelliteParams, vertical)
    this.switchOpacity(this.min, isPrimaryTouchingMin)

    const isPrimaryTouchingMax = this.isPrimaryTouchingMax(satelliteParams, vertical)
    this.switchOpacity(this.max, isPrimaryTouchingMax)
  }
  
  public update = (satelliteParams: { width: number, height: number, left: number, top: number }, vertical: boolean, satelliteExtraParams?: { width: number, height: number, left: number, top: number }): void => {
    
    if (satelliteExtraParams) {
      this.setOpacityToDouble(satelliteParams, satelliteExtraParams, vertical)
    } else {
      this.setOpacityToSingle(satelliteParams, vertical)
    }
  }
}

export { BoundaryLabels }