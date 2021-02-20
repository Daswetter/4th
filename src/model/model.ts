import './../interface/IOptions'
import { IModel } from './../interface/IModel'

class Model implements IModel{
  private onCurrentChanged!: Function;
  private onInitialValue!: Function
  private onScaleElements!: Function
  
  constructor(private options: IOptions){
    this.options = options
  }

  countCurrentValue(part: number): void {
    const min = this.options.min
    const max = this.options.max
    const step = this.options.stepSize

    const currentValue = Math.round((max - min) / step * part) * step + min
    this.onCurrentChanged(currentValue)
    
  }
  countInitialPart = (): number => {
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
    scaleElements.push(this.options.min)
    scaleElements.push((this.options.max - this.options.min) / 4 + this.options.min)
    scaleElements.push((this.options.max - this.options.min) / 2 + this.options.min)
    scaleElements.push((this.options.max - this.options.min) / 4 * 3 + this.options.min)
    scaleElements.push(this.options.max)
    return scaleElements
  }

  bindCurrentChanged(callback: Function): void {
    this.onCurrentChanged = callback;
  }
  bindInitialValue(callback: Function): void {
    this.onInitialValue = callback;
  }
}

export { Model } 