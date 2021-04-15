import { IOptions } from '../interface/IOptions'

interface IModel {
  setCurrent(element: string, part: number): void
  setPart(element: string, current: number): void

  countScaleElements(): Array<number>
  update (options: IOptions): void

  bindChangedValues(callback: (arg0: number, arg1: number) => void): void
  bindChangedExtraValues(callback: (arg0: number, arg1: number) => void): void

  bindChangedOptions(callback: (scaleElements: Array<number>, options: IOptions) => void): void
}

export { IModel }
