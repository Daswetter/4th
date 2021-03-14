import '../interface/IOptions'

interface IModel {
  setCurrentValue(part: number): void
  countCurrentValue(part: number): number
  setCurrentValueForExtra(part: number): void

  countInitialPart(initial: number): number
  setInitialPart(): number
  setInitialPartForExtra(): number
  countScaleElements(): Array<number>
  bindCurrentChanged(callback: (arg0: number, arg1: number) => void): void
  bindExtraCurrentChanged(callback: (arg0: number, arg1: number) => void): void
  getOptions(): IOptions

}

export { IModel }
