import './../interface/IOptions'
class Model{
  private onStatusChanged!: Function;
  private onInitialValue!: Function

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
  countNothing(part: number) {
    return part * 2
  }
  bla() {
    return "bla";
  }
  


  bindStatusChanged(callback: Function): void {
    this.onStatusChanged = callback;
  }
  bindInitialValue(callback: Function): void {
    this.onInitialValue = callback;
  }
}

export { Model } 