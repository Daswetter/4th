import '../interface/IOptions'

interface IModel {
  setCurrent(element: string, part: number): void
  setPart(element: string, current: number): void

  countScaleElements(): Array<number>

  bindChangedValues(callback: (arg0: number, arg1: number) => void): void
  bindChangedExtraValues(callback: (arg0: number, arg1: number) => void): void

  bindChangedScaleElements(callback: (scaleElements: Array<number>) => void): void
}

export { IModel }
