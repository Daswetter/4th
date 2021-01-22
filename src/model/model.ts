
interface IOptions {
  initialLabel: number,
  finalLabel: number
}
export class Model{
  private onStatusChanged!: Function;
  constructor(private options: IOptions){
    this.options = options
  }
  setValue(part: number): void {
    const min = this.options.initialLabel
    const max = this.options.finalLabel

    const currentValue = Math.round((max - min) * part + min)
    console.log(currentValue);
    
    this.onStatusChanged(currentValue)
  }
  bindStatusChanged(callback: Function): void {
    this.onStatusChanged = callback;
  }
}
