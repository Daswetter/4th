import '../interface/IOptions'

interface IModel {
  countCurrentValue(part: number): void
  countInitialPart(): number
  countScaleElements(): Array<number>
  bindCurrentChanged(callback: (arg0: number) => void): void

  getOptions(): IOptions

}

export { IModel }
