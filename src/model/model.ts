import './../interface/IOptions'
import { IOptions } from './../interface/IOptions'
import { IModel } from './IModel'

class Model implements IModel{
  private currentWereChanged!: (current: number, part: number) => void
  private extraCurrentWereChanged!: (current: number, part: number) => void
  private optionsWereChanged!: (scaleElements: { [key: string]: string }, options: IOptions) => void
  
  constructor(private options: IOptions){
    this.options = options
  }

  private getNumberOfSections = (): number => {
    return Math.floor(Math.abs(this.options.max - this.options.min) / this.options.step)
  }

  private countRestCurrent = (current: number, part: number, rest: number, stepAsPart: number): number[] => {
    const restAtTheEnd = 1 - stepAsPart * Math.trunc(1 / stepAsPart)
    
    if (rest > restAtTheEnd / 2) {
      current = this.options.max
      return [current, 1]
    } 
    return [current, part]
  }

  private isScaleFullSize = (): boolean => {
    return this.isInteger(Math.abs(this.options.max - this.options.min) / this.options.step)
  }

  private countCurrent = (part: number): Array<number> => {
    const stepAsPart = this.options.step / Math.abs(this.options.max - this.options.min)
    const rest = part - stepAsPart * Math.trunc(part / stepAsPart)
    let newPart: number

    if (rest < stepAsPart / 2) {
      newPart = part - rest
    } else {
      newPart = part + (stepAsPart - rest)
    } 

    let current = Math.abs(this.options.max - this.options.min) * newPart + this.options.min


    const isCurrentGreaterThanScale = Math.abs(this.options.max - this.options.min) * part > this.getNumberOfSections() * this.options.step

    if (!this.isScaleFullSize() && isCurrentGreaterThanScale) {
      [current, newPart] = this.countRestCurrent(current, newPart, rest, stepAsPart)
    }

    current = this.roundValueTo(current, this.options.step)
    
    return [ current, newPart ]
  }

  public setCurrent(part: number, extra = false): void {
    const [current, newPart] = this.countCurrent(part)
    this.dataWereChanged(current, newPart, extra)
  }

  private dataWereChanged = (current: number, part: number, extra: boolean): void => {
    if (extra){
      this.extraCurrentWereChanged(current, part)
    } else {
      this.currentWereChanged(current, part)
    }
  }

  private filterPart = (part: number): number => {
    if (part > 1) {
      return 1
    } else if (part < 0) {
      return 0
    } 
    return part
  }
  
  public setPart(current: number, extra = false): void {
    let part = (current - this.options.min) / (this.options.max - this.options.min)
    part = this.filterPart(part)
    const [newCurrent, newPart] = this.countCurrent(part)
    this.dataWereChanged(newCurrent, newPart, extra)
  }

  private filterScaleElements = (): void => {
    if (this.options.numberOfScaleElements as number > 20){
      throw new Error('number of scale elements is too big')
    }
  }
  
  private createFullSizeScale = (): { [key: string]: string } => {
    let scaleValue: number
    let scaleElements: { [key: string]: string } = {}

    const numberOfScaleSections = this.options.numberOfScaleElements as number - 1
    const scaleStep = 1 / numberOfScaleSections

    for (let i = 0; i <= numberOfScaleSections; i++){
      scaleValue = (this.options.max - this.options.min) * scaleStep * i + this.options.min
      const roundScaleValues = String(this.roundValueTo(scaleValue, this.options.step))
      scaleElements = {...scaleElements, [i / numberOfScaleSections]: String(roundScaleValues)}
    }

    return scaleElements
  }
  
  private createPartSizeScale = (): { [key: string]: string } => {
    let scaleValue: number
    let scaleElements: { [key: string]: string } = {}

    const numberOfScaleSections = this.options.numberOfScaleElements as number - 1
    const scaleStep = 1 / numberOfScaleSections
    const step = this.options.step
    const min = this.options.min
    const max = this.options.max

    for (let i = 0; i <= numberOfScaleSections; i++){
      const newMax = this.getNumberOfSections() * step + min
      scaleValue = (newMax - min) * scaleStep * i + min
      scaleValue = this.roundValueTo(scaleValue, step)
      scaleElements = {...scaleElements, [i / numberOfScaleSections * (1 - (Math.abs(max - min) - step * this.getNumberOfSections()) / Math.abs(max - min))]: String(scaleValue)}
    }

    return scaleElements
  }



  public countScaleElements = (): { [key: string]: string } => {
    this.filterScaleElements()

    if (this.isScaleFullSize()) {
      return this.createFullSizeScale()
    }
    return this.createPartSizeScale()     
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
    this.currentWereChanged = callback;
  }
  public bindChangedExtraValues( callback: (current: number, part: number) => void): void {
    this.extraCurrentWereChanged = callback;
  }
  public bindChangedOptions(callback: (scaleElements: { [key: string]: string }, options: IOptions) => void): void {
    this.optionsWereChanged = callback;
  }
}

export { Model } 