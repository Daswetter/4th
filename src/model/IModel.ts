import '../interface/IOptions'

interface IModel {
  setCurrentValue(part: number): void
  setCurrentValueForExtra(part: number): void

  setCurrentPart(part: number): void
  setCurrentPartForExtra(part: number): void

  countScaleElements(): Array<number>
  bindCurrentChanged(callback: (arg0: number, arg1: number) => void): void
  bindExtraCurrentChanged(callback: (arg0: number, arg1: number) => void): void
}

export { IModel }
