import './../interface/IOptions'
import { IOptions } from './../interface/IOptions'
import { IModel } from './IModel'

class Model implements IModel{
  private valuesWereChanged!: (current: number, part: number) => void
  private extraValuesWereChanged!: (current: number, part: number) => void
  private optionsWereChanged!: (scaleElements: { [key: string]: string }, options: IOptions) => void
  
  constructor(private options: IOptions){
    this.options = options
  }

  private countCurrent(part: number): number {
    const min = this.options.min
    const max = this.options.max
    const step = this.options.step
    let current = +(Math.round((max - min) / step * part) * step + min)
    
    if(!this.isInteger(step)){
      current = +current.toFixed(this.convertStepToDecimal(step))
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

  public countScaleElements = (): { [key: string]: string } => {
    const scaleElements: { [key: string]: string } = {}
    const step = this.options.step
    const min = this.options.min
    const max = this.options.max

    const quarter = (max - min) / 4 + min 
    const half = (max - min) / 2 + min
    const threeQuarter = (max - min) / 4 * 3 + min 
    
    Object.assign(scaleElements, {0: String(min)})
    Object.assign(scaleElements, {1: String(max)})

    if (((max - min) / step) > 3){
      Object.assign(scaleElements, {0.25: String(quarter)})
      Object.assign(scaleElements, {0.75: String(threeQuarter)})
    } 
    if (((max - min) / step) > 1) {
      Object.assign(scaleElements, {0.5: String(half)})
    }
    
    for (const part in scaleElements){
      scaleElements[part] = this.roundToDecimal(scaleElements[part], this.convertStepToDecimal(step)) + ''
    }

    return scaleElements
  }

  private convertStepToDecimal = (step: number) : number => {
    const digits = step.toString().split('')
    let decimal: number
    if ( step > 0 && step < 1){
      decimal =   digits.length - 2
      return decimal
    } else { 
      decimal = - (digits.length - 1)
      return decimal
    }
  }

  private roundToDecimal = (value: string, decimal: number): number => {
    return (Math.round( +value * Math.pow(10, decimal) ) / Math.pow(10, decimal))
  }

  private isInteger = (num: number) : boolean => {
    return (num ^ 0) === num
  } 

  public update = (options: IOptions): void => {
    this.options = options

    const scaleElements = this.countScaleElements()
    this.optionsWereChanged(scaleElements, options)
  }


  public bindChangedValues(callback: (current: number, part: number) => void): void {
    this.valuesWereChanged = callback;
  }
  public bindChangedExtraValues( callback: (current: number, part: number) => void): void {
    this.extraValuesWereChanged = callback;
  }

  public bindChangedOptions(callback: (scaleElements: { [key: string]: string }, options: IOptions) => void): void {
    this.optionsWereChanged = callback;
  }
}

export { Model } 