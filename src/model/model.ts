import './../interface/IOptions'
import { IModel } from './IModel'

class Model implements IModel{
  public onCurrentChanged!: (arg0: number) => void
  
  constructor(private options: IOptions){
    this.options = options
    
  }
  getOptions = (): IOptions => {
    return this.options
  }
  countCurrentValue(part: number): void {
    const min = this.options.min
    const max = this.options.max
    const stepSize = this.options.stepSize

    const currentValue = Math.round((max - min) / stepSize * part) * stepSize + min
    
    // this.onCurrentChanged(this.roundToDecimal(currentValue, this.convertStepSizeToDecimal(stepSize)))
    this.onCurrentChanged(currentValue)
    
  }
  countInitialPart = (): number => {
    // TODO: независимость значения от макс и мин
    const min = this.options.min
    const max = this.options.max
    const initial = this.options.initial
    
    if (initial > max || initial < min){
      throw new Error('Initial value is bigger than max value or smaller than min value')
    }
    const initialPart = (initial - min) / Math.abs( max - min )
    return initialPart
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

  bindCurrentChanged(callback: (arg0: number) => void): void {
    this.onCurrentChanged = callback;
  }
}

export { Model } 