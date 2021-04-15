import './../interface/IOptions'
import { IOptions } from './../interface/IOptions'
import { IModel } from './IModel'

class Model implements IModel{
  private valuesWereChanged!: (current: number, part: number) => void
  private extraValuesWereChanged!: (current: number, part: number) => void
  private optionsWereUpdated!: (scaleElements: Array<number>, options: IOptions) => void
  
  constructor(private options: IOptions){
    this.options = options
  }

  private countCurrent(part: number): number {
    const min = this.options.min
    const max = this.options.max
    const stepSize = this.options.stepSize
    let current = +(Math.round((max - min) / stepSize * part) * stepSize + min)
    
    if(!this.isInteger(stepSize)){
      current = +current.toFixed(this.convertStepSizeToDecimal(stepSize))
    } 

    return current
  }

  public setCurrent(element: string, part: number): void {
    const current = this.countCurrent(part)

    if (element === 'primary'){
      this.valuesWereChanged(current, part)
    }
    if (element === 'extra'){
      this.extraValuesWereChanged(current, part)
    }
  }
  
  private countPart(current: number): number {
    const min = this.options.min
    const max = this.options.max
    
    let part = (current - min) / (max - min)

    if (current > max){
      part = 1
    } else if (current < min){
      part = 0
    }
    return part
  }

  private filterCurrent = (current: number): number => {
    const min = this.options.min
    const max = this.options.max
    if (current < min){
      return min
    } else if (current > max) {
      return max
    }
    return current
  }
  
  public setPart(element: string, current: number): void {
    const part = this.countPart(current)
    current = this.filterCurrent(current)

    if (element === 'primary'){
      this.valuesWereChanged(current, part)
    }
    if (element === 'extra'){
      this.extraValuesWereChanged(current, part)
    }
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

  public update = (options: IOptions): void => {
    this.options = options

    const scaleElements = this.countScaleElements()
    this.optionsWereUpdated(scaleElements, options)
  }


  public bindChangedValues(callback: (current: number, part: number) => void): void {
    this.valuesWereChanged = callback;
  }
  public bindChangedExtraValues( callback: (current: number, part: number) => void): void {
    this.extraValuesWereChanged = callback;
  }

  public bindChangedOptions(callback: (scaleElements: Array<number>, options: IOptions) => void): void {
    this.optionsWereUpdated = callback;
  }
}

export { Model } 