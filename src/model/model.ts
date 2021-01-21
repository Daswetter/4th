
export class Model{
  private onStatusChanged!: Function;
  constructor(){
    
  }
  setValue(part: number): void {
    const min = 100
    const max = 500
    const currentValue = (max - min) * part 
    this.onStatusChanged(currentValue)
    // return currentValue
  }
  bindStatusChanged(callback: Function): void {
    this.onStatusChanged = callback;
  }
}
