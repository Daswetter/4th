import { IOptions, IModel, Mediator } from '../../types'

class Model implements IModel{
  public mediator!: Mediator
  
  constructor(public options: IOptions){
    this.options = this.filterOptions(options)    
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
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
    let step = options.step
    if (Math.abs(step) > Math.abs(options.max - options.min)) {
      step = Math.abs(options.max - options.min)
    }
    
    if (options.step < 0) {
      step = Math.abs(step)
    } else if (step === 0) {
      step = 1
    }
    
    if (options.max < options.min || options.max === options.min) {
      filteredOptions.max = options.min + step
    } 

    if (options.scaleSize as number > 20 ) {
      filteredOptions.scaleSize = 20
    } else if (options.scaleSize as number < 2) {
      filteredOptions.scaleSize = 2
    }
    filteredOptions.step = step
    return filteredOptions
  }

  public setCurrent(part: number, extra = false): void {
    const [current, newPart] = this.countCurrent(part)
    this.dataWereChanged(current, newPart, extra)
  }

  private dataWereChanged = (current: number, part: number, extra: boolean): void => {
    this.mediator.notify({current, part, extra}, 'current and part were sent from Model')
  }

  private filterPart = (part: number): number => {
    if (part > 1) {
      return 1
    } else if (part < 0) {
      return 0
    } 
    return part
  }

  private countPart = (current: number): number => {
    let part = (current - this.options.min) / (this.options.max - this.options.min)
    part = this.filterPart(part)
    return part
  }
  
  public setPart(current: number, extra = false): void {
    const part = this.countPart(current)
    const [newCurrent, newPart] = this.countCurrent(part)
    this.dataWereChanged(newCurrent, newPart, extra)
  }
  
  private createFullSizeScale = (): { [key: string]: string } => {
    const numberOfScaleSections = this.options.scaleSize as number - 1
    let scaleElements: { [key: string]: string } = {}

    for (let i = 0; i <= numberOfScaleSections; i++){
      const scaleStep = 1 / numberOfScaleSections
      const scaleValue = (this.options.max - this.options.min) * scaleStep * i + this.options.min
      const roundScaleValues = this.roundValueTo(scaleValue, this.options.step)
      const partForRound = this.countPart(roundScaleValues)
      scaleElements = {...scaleElements, [String(partForRound)]: String(roundScaleValues)}
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

      const newPart = this.countPart(scaleValue)
      scaleElements = {...scaleElements, [newPart]: String(scaleValue)}
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
        decimal = dividedRoundTo[1].length - 1
      }
    else {
      decimal = dividedRoundTo[0].length - 1
    }  
    return (Math.round( value * Math.pow(10, decimal) ) / Math.pow(10, decimal))  
  }


  private isInteger = (num: number) : boolean => {
    return (num ^ 0) === num
  } 

  public update = (options: IOptions): void => {
    this.options = this.filterOptions(options)
    const scaleElements = this.countScaleElements()
    this.mediator.notify({scaleElements}, 'options were sent from Model')
  }
}

export { Model } 