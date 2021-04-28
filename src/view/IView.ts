import { IOptions } from "../interface/IOptions";

interface IView {
  current: number
  currentExtra: number
  
  initView(scaleElements: { [key: string]: string }): void

  notifyPrimary(current: number, part: number): void
  notifyExtra(current: number, part: number): void

  clearAllView(): void,
  update(options: IOptions): void

  bindChangedPart(callback: (arg0: number) => void): void
  bindChangedExtraPart(callback: (arg0: number) => void): void
  bindChangedCurrent(callback: (arg0: number) => void): void
  bindChangedExtraCurrent(callback: (arg0: number) => void): void
}

export { IView }