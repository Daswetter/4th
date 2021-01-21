
export class Model{
  private onStatusChanged!: Function;
  // constructor(){
  //   this.onStatusChanged = this.bindStatusChanged
  // }
  setValue(): number {
    const res = 3
    this.onStatusChanged(res)
    return res
  }
  bindStatusChanged(callback: Function): void {
    this.onStatusChanged = callback;
  }
}
