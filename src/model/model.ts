import './../interface/IOptions'
import { IOptions } from './../interface/IOptions'
import { IModel } from './IModel'

class Model implements IModel{
  private onCurrentChanged!: (arg0: number, arg1: number) => void
  private onExtraCurrentChanged!: (arg0: number, arg1: number) => void
  
  constructor(private options: IOptions){
    this.options = options
  }

  private countCurrentValue(part: number): number {
    const min = this.options.min
    const max = this.options.max
    const stepSize = this.options.stepSize
    let currentValue = +(Math.round((max - min) / stepSize * part) * stepSize + min)
    
    if(!this.isInteger(stepSize)){
      currentValue = +currentValue.toFixed(this.convertStepSizeToDecimal(stepSize))
    } 

    return currentValue
  }

  public setCurrentValue(part: number): void {
    const currentValue = this.countCurrentValue(part)
    this.onCurrentChanged(currentValue, part)
  }
  
  public setCurrentValueForExtra(part: number): void {
    const currentValue = this.countCurrentValue(part)
    this.onExtraCurrentChanged(currentValue, part)
  }
  
  
  private countCurrentPart(currentValue: number): number {
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

  private filterCurrentValue = (currentValue: number): number => {
    const min = this.options.min
    const max = this.options.max
    if (currentValue < min){
      return min
    } else if (currentValue > max) {
      return max
    }
    return currentValue
  }
  
  public setCurrentPart(currentValue: number): void {
    const part = this.countCurrentPart(currentValue)
    currentValue = this.filterCurrentValue(currentValue)
    this.onCurrentChanged(currentValue, part)
  }
  
  public setCurrentPartForExtra(currentValue: number): void {
    const part = this.countCurrentPart(currentValue)
    currentValue = this.filterCurrentValue(currentValue)
    this.onExtraCurrentChanged(currentValue, part)
  }

  public countScaleElements = (): Array<number> => {
    const scaleElements = []
    const stepSize = this.options.stepSize
    const min = this.options.min
    const max = this.options.max 
    const quarter = (max - min) / 4 + min
    const half = (max - min) / 2 + min
    const threeQuarter = (max - min) / 4 * 3 + min 

    scaleElements.push(quarter, half, threeQuarter)
    const roundScaleElements: Array<number> = scaleElements.map( x => this.roundToDecimal(x, this.convertStepSizeToDecimal(stepSize)))

    roundScaleElements.push(max)
    roundScaleElements.unshift(min)

    return roundScaleElements
  }

  private convertStepSizeToDecimal = (stepSize: number) : number => {
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

  private roundToDecimal = (value: number, decimal: number): number => {
    return (Math.round( value * Math.pow(10, decimal) ) / Math.pow(10, decimal))
  }

  private isInteger = (num: number) : boolean => {
    return (num ^ 0) === num
  } 

  public bindCurrentChanged(callback: (arg0: number, arg1: number) => void): void {
    this.onCurrentChanged = callback;
  }
  public bindExtraCurrentChanged(callback: (arg0: number, arg1: number) => void): void {
    this.onExtraCurrentChanged = callback;
  }
}

export { Model } 