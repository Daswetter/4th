import './IOptions'

interface IModel {
  countCurrentValue(part: number): void
  countInitialPart(): number
  countScaleElements(): Array<number>
  bindCurrentChanged(callback: Function): void
  bindInitialValue(callback: Function): void

  getOptions(): IOptions

}

export { IModel }
