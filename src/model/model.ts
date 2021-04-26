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

  // private countCurrent(part: number): number {
  //   let current 

  //   const min = this.options.min
  //   const max = this.options.max
  //   const step = this.options.step

  //   current = +((max - min) * part) + min
  //   // current = +(Math.round((max - min) / step * part) * step + min)

  //   if (!this.isInteger(step)) {
  //     current = +current.toFixed(this.convertStepToDecimal(step))
  //   } 

  //   if (!this.isInteger(Math.abs(max - min))) {
  //     current = +current.toFixed(this.countNumberOfDecimals(Math.abs(min - max)))
  //   }

  //   if (!this.isInteger(Math.abs(this.options.max - this.options.min) / this.options.step)) {
  //     current = this.countExoticCurrent(current, part)
  //   }
  //   return current
  // }


  

  private getNumberOfSections = (): number => {
    return Math.floor(Math.abs(this.options.max - this.options.min) / this.options.step)
  }

  private countExoticCurrent = (current: number, part: number): number => {
    const min = this.options.min
    const max = this.options.max
    const step = this.options.step
    const isValueGreaterThanScale = ((max - min) * part + min) > Math.floor(this.getNumberOfSections()) * step + min
    
    if (isValueGreaterThanScale){
      return max
    }
    return current
  }

  countCurrentTest = (part: number): Array<number> => {
    const stepAsPart = this.options.step / Math.abs(this.options.max - this.options.min)
    const rest = part - stepAsPart * Math.trunc(part / stepAsPart)
    
    let newPart: number
    if (rest < stepAsPart / 2) {
      newPart = part - rest
    } else {
      newPart = part + (stepAsPart - rest)
    } 

    let current = (this.options.max - this.options.min) * newPart + this.options.min
    current = this.roundValueTo(current, this.options.step)
    return [ current, newPart ]
  }

  public setCurrent(part: number, extra = false): void {
    const [current, newPart] = this.countCurrentTest(part)
    this.dataWereChanged(current, newPart, extra)
  }

  private dataWereChanged = (current: number, part: number, extra: boolean): void => {
    if (extra){
      this.extraValuesWereChanged(current, part)
    } else {
      this.valuesWereChanged(current, part)
    }
  }
  
  private countPart(current: number): number {
    const min = this.options.min
    const max = this.options.max
    
    let part = (current - min) / (max - min)

    if (current > max){
      part = 1
      current =  max
    } else if (current < min){
      part = 0
      current = min
    }
    return part
  }
  
  public setPart(current: number, extra = false): void {
    const part = this.countPart(current)
    this.dataWereChanged(current, part, extra)
  }

  

  public countScaleElements = (): { [key: string]: string } => {
    let scaleElements: { [key: string]: string } = {}
    let scaleValue: number
    const numberOfScaleElements = this.options.numberOfScaleElements
    const numberOfScaleSections = numberOfScaleElements as number - 1
    const scaleStep = 1 / numberOfScaleSections
    const step = this.options.step
    const min = this.options.min
    const max = this.options.max

    if (numberOfScaleElements as number > 20){
      throw new Error('number of scale elements is too big')
    }
    
    for (let i = 0; i <= numberOfScaleSections; i++){
      if (this.isInteger(Math.abs(this.options.max - this.options.min) / this.options.step)) {
        scaleValue = (max - min) * scaleStep * i + min
        const roundScaleValues = String(this.roundValueTo(scaleValue, step))
        scaleElements = {...scaleElements, [i / numberOfScaleSections]: String(roundScaleValues)}
      } else {
        const newMax = this.getNumberOfSections() * step + min
        scaleValue = (newMax - min) * scaleStep * i + min
        // ! 
        scaleValue = Number(this.roundValueTo(scaleValue, Math.abs(max - min)))
        scaleElements = {...scaleElements, [i / numberOfScaleSections * (1 - (Math.abs(max - min) - step * this.getNumberOfSections()) / Math.abs(max - min))
        ]: String(scaleValue)}
      }
    }
    return scaleElements
  }

  

  private roundValueTo = (value: number, roundTo: number): number => {
    let decimal: number
    const dividedRoundTo = roundTo.toString().split(".")
    if (!dividedRoundTo[1]){
      decimal = - dividedRoundTo[0].length + 1
    } else {
      decimal = dividedRoundTo[1].length
    }
    
    return (Math.round( value * Math.pow(10, decimal) ) / Math.pow(10, decimal))
    
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