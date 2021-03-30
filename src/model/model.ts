import './../interface/IOptions'
import { IModel } from './IModel'

class Model implements IModel{
  public onCurrentChanged!: (arg0: number, arg1: number) => void
  public onExtraCurrentChanged!: (arg0: number, arg1: number) => void
  
  constructor(private options: IOptions){
    this.options = options
  }

  countCurrentValue(part: number): number {
    const min = this.options.min
    const max = this.options.max
    const stepSize = this.options.stepSize
    let currentValue = +(Math.round((max - min) / stepSize * part) * stepSize + min)
    
    if(!this.isInteger(stepSize)){
      currentValue = +currentValue.toFixed(this.convertStepSizeToDecimal(stepSize))
    } 
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

    scaleElements.push(min, quarter, half, threeQuarter, max)
    const roundScaleElements: Array<number> = scaleElements.map( x => this.roundToDecimal(x, this.convertStepSizeToDecimal(stepSize)))

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

  isInteger = (num: number) : boolean => {
    return (num ^ 0) === num
  } 

  bindCurrentChanged(callback: (arg0: number, arg1: number) => void): void {
    this.onCurrentChanged = callback;
  }
  bindExtraCurrentChanged(callback: (arg0: number, arg1: number) => void): void {
    this.onExtraCurrentChanged = callback;
  }
}

export { Model } 