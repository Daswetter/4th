import '../interface/IOptions'

interface IModel {
  setCurrent(element: string, part: number): void
  setPart(element: string, current: number): void

  countScaleElements(): Array<number>

  bindChangedState(element: string, callback: (arg0: number, arg1: number) => void): void
}

export { IModel }
