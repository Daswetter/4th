import '../interface/IOptions'

interface IModel {
  setCurrentValue(part: number): void
  countCurrentValue(part: number): number
  setCurrentValueForExtra(part: number): void

  setCurrentPart(part: number): void
  countCurrentPart(part: number): number
  setCurrentPartForExtra(part: number): void

  roundToDecimal(value: number, decimal: number): number
  // countInitialPart(initial: number): number
  // setInitialPart(): number
  // setInitialPartForExtra(): number
  countScaleElements(): Array<number>
  bindCurrentChanged(callback: (arg0: number, arg1: number) => void): void
  bindExtraCurrentChanged(callback: (arg0: number, arg1: number) => void): void
  convertStepSizeToDecimal(stepSize: number) : number
  // getOptions(): IOptions

}

export { IModel }
