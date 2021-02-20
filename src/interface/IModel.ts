import './IOptions'

interface IModel {
  readonly getOptions: IOptions
  setCurrentValue(part: number): void
  countInitialPart(): number
  countScaleElements(): void
  bindStatusChanged(callback: Function): void
  bindInitialValue(callback: Function): void
  bindScaleElements(callback: Function): void
}

export { IModel }
