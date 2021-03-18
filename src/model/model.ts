import './../interface/IOptions'
import { IModel } from './IModel'

class Model implements IModel{
  public onCurrentChanged!: (arg0: number, arg1: number) => void
  public onExtraCurrentChanged!: (arg0: number, arg1: number) => void
  
  constructor(private options: IOptions){
    this.options = options
    
  }
  getOptions = (): IOptions => {
    return this.options
  }
  countCurrentValue(part: number): number {
    const min = this.options.min
    const max = this.options.max
    const stepSize = this.options.stepSize

    const currentValue = Math.round((max - min) / stepSize * part) * stepSize + min
    return currentValue
  }
  setCurrentValue(part: number): void {
    const currentValue = this.countCurrentValue(part)
    this.onCurrentChanged(currentValue, part)
  }
  
  setCurrentValueForExtra(part: number): void {
    const currentValue = this.countCurrentValue(part)
    this.onExtraCurrentChanged(currentValue, part)
  }
  countCurrentPart(currentValue: number): number {
    const min = this.options.min
    const max = this.options.max
    // const stepSize = this.options.stepSize
    
    let part = (currentValue - min) / (max - min)
    if (currentValue > max){
      part = 1
    } else if (currentValue < min){
      part = 0
    }
    return part
  }
  setCurrentPart(currentValue: number): void {
    const part = this.countCurrentPart(currentValue)
    this.onCurrentChanged(currentValue, part)
  }
  
  setCurrentPartForExtra(currentValue: number): void {
    const part = this.countCurrentPart(currentValue)
    this.onExtraCurrentChanged(currentValue, part)
  }

  countScaleElements = (): Array<number> => {
    const scaleElements = []
    const stepSize = this.options.stepSize
    const min = this.options.min
    const max = this.options.max 
    const quarter = (max - min) / 4 + min
    const half = (max - min) / 2 + min
    const threeQuarter = (max - min) / 4 * 3 + min 

    scaleElements.push( quarter, half, threeQuarter)
    const roundScaleElements: Array<number> = scaleElements.map( x => this.roundToDecimal(x, this.convertStepSizeToDecimal(stepSize)))

    roundScaleElements.push(max)
    roundScaleElements.unshift(min)

    return roundScaleElements
  }

  convertStepSizeToDecimal = (stepSize: number) : number => {
    const digits = stepSize.toString().split('')
    let decimal: number
    if ( stepSize > 0 && stepSize < 1){
      decimal =   digits.length - 2
      return decimal
    } else { 
      decimal = - (digits.length - 1)
      return decimal
    }
  }

  roundToDecimal = (value: number, decimal = 0): number => {
    return (Math.round( value * Math.pow(10, decimal) ) / Math.pow(10, decimal))
  }

  bindCurrentChanged(callback: (arg0: number, arg1: number) => void): void {
    this.onCurrentChanged = callback;
  }
  bindExtraCurrentChanged(callback: (arg0: number, arg1: number) => void): void {
    this.onExtraCurrentChanged = callback;
  }
}

export { Model } 