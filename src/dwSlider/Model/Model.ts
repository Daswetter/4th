import { IOptions, IModel } from '../../types'

class Model implements IModel{
  private currentWereChanged!: (current: number, part: number) => void
  private extraCurrentWereChanged!: (current: number, part: number) => void
  private optionsWereChanged!: (scaleElements: { [key: string]: string }, options: IOptions) => void
  
  constructor(public options: IOptions){
    this.options = this.filterOptions(options)
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

    const isCurrentGreaterThanScale = Math.abs(this.options.max - this.options.min) * part > this.getNumberOfSections() * this.options.step

    let current = Math.abs(this.options.max - this.options.min) * newPart + this.options.min
    
    
    if (!this.isScaleFullSize() && isCurrentGreaterThanScale) {
      [current, newPart] = this.countRestCurrent(current, newPart, rest, stepAsPart)
    }
    
    current = this.roundValueTo(current, this.options.step)
    
    return [ current, newPart ]
  }

  private filterOptions = (options: IOptions): IOptions => {
    let filteredOptions = options
    if (options.step > Math.abs(options.max) + Math.abs(options.min)) {
      filteredOptions.step = Math.abs(options.max) + Math.abs(options.min)
    }

    if (options.step < 0) {
      filteredOptions.step = Math.abs(options.step)
    } else if (options.step === 0) {
      filteredOptions.step = 1
    }
    
    if (options.max < options.min || options.max === options.min) {
      filteredOptions.max = options.min + options.step
    } 

    if (options.scaleSize as number > 20 ) {
      filteredOptions.scaleSize = 20
    } else if (options.scaleSize as number < 2) {
      filteredOptions.scaleSize = 2
    }

    return filteredOptions
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
  
  private createFullSizeScale = (): { [key: string]: string } => {
    const numberOfScaleSections = this.options.scaleSize as number - 1
    let scaleElements: { [key: string]: string } = {}

    for (let i = 0; i <= numberOfScaleSections; i++){
      const scaleStep = 1 / numberOfScaleSections
      const scaleValue = (this.options.max - this.options.min) * scaleStep * i + this.options.min
      const roundScaleValues = String(this.roundValueTo(scaleValue, this.options.step))
      scaleElements = {...scaleElements, [i / numberOfScaleSections]: String(roundScaleValues)}
    }

    return scaleElements
  }
  
  private createPartSizeScale = (): { [key: string]: string } => {
    const numberOfScaleSections = this.options.scaleSize as number - 1
    let scaleElements: { [key: string]: string } = {}

    for (let i = 0; i <= numberOfScaleSections; i++){
      const step = this.options.step
      const min = this.options.min
      const newMax = this.getNumberOfSections() * step + min
      const scaleStep = 1 / numberOfScaleSections

      let scaleValue: number
      scaleValue = (newMax - min) * scaleStep * i + min
      scaleValue = this.roundValueTo(scaleValue, step)

      const max = this.options.max
      scaleElements = {...scaleElements, [i / numberOfScaleSections * (1 - (Math.abs(max - min) - step * this.getNumberOfSections()) / Math.abs(max - min))]: String(scaleValue)}
    }

    return scaleElements
  }



  public countScaleElements = (): { [key: string]: string } => {

    if (this.isScaleFullSize()) {
      return this.createFullSizeScale()
    }
    return this.createPartSizeScale()     
  }

  

  private roundValueTo = (value: number, roundTo: number): number => {
    
    const dividedRoundTo = roundTo.toString().split('.')

    let decimal: number
    if (dividedRoundTo[0] === '0')
      if (!dividedRoundTo[1]){
        decimal = - dividedRoundTo[0].length + 1
      } else {
        decimal = dividedRoundTo[1].length
      }
    else {
      decimal = dividedRoundTo[0].length
    }
    
    return (Math.round( value * Math.pow(10, decimal) ) / Math.pow(10, decimal))  
  }


  private isInteger = (num: number) : boolean => {
    return (num ^ 0) === num
  } 

  public update = (options: IOptions): void => {
    this.options = this.filterOptions(options)
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