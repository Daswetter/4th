import '../interface/IOptions'

interface IModel {
  setCurrentValue(part: number): void
  countCurrentValue(part: number): number
  setCurrentValueForExtra(part: number): void
  countInitialPart(): number
  countScaleElements(): Array<number>
  bindCurrentChanged(callback: (arg0: number) => void): void
  bindExtraCurrentChanged(callback: (arg0: number) => void): void
  getOptions(): IOptions

}

export { IModel }
