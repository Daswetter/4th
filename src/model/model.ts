interface IOptions {
  min: number,
  max: number,
  initial: number
}
class Model{
  private onStatusChanged!: Function;

  constructor(private options: IOptions){
    this.options = options
  }

  setCurrentValue(part: number): void {
    const min = this.options.min
    const max = this.options.max

    const currentValue = Math.round((max - min) * part + min)
    this.onStatusChanged(currentValue)
    
  }

  
  bindStatusChanged(callback: Function): void {
    this.onStatusChanged = callback;
  }
}

export { Model } 