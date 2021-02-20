import './../interface/IOptions'
import { IModel } from './../interface/IModel'

class Model implements IModel{
  private onStatusChanged!: Function;
  private onInitialValue!: Function
  private onScaleElements!: Function
  
  constructor(private options: IOptions){
    this.options = options
  }

  get getOptions(): IOptions {
    return this.options
  }
  setCurrentValue(part: number): void {
    const min = this.options.min
    const max = this.options.max
    const step = this.options.stepSize

    const currentValue = Math.round((max - min) / step * part) * step + min
    this.onStatusChanged(currentValue)
    
  }
  countInitialPart = (): number => {
    const min = this.options.min
    const max = this.options.max
    const initial = this.options.initial

    const initialPart = (initial - min) / Math.abs( max - min )
    return initialPart
  }
  countScaleElements = (): void => {
    const scaleElements = []
    scaleElements.push(this.options.min)
    scaleElements.push((this.options.max - this.options.min) / 4 + this.options.min)
    scaleElements.push((this.options.max - this.options.min) / 2 + this.options.min)
    scaleElements.push((this.options.max - this.options.min) / 4 * 3 + this.options.min)
    scaleElements.push(this.options.max)
    this.onScaleElements(scaleElements)
  }

  bindStatusChanged(callback: Function): void {
    this.onStatusChanged = callback;
  }
  bindInitialValue(callback: Function): void {
    this.onInitialValue = callback;
  }
  bindScaleElements(callback: Function): void {
    this.onScaleElements = callback;
  }
}

export { Model } 