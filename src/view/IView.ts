import { IOptions } from "../interface/IOptions";

interface IView {
  current: number
  currentExtra: number
  
  initView(scaleElements: number[]): void,

  notifyPrimaryElement(current: number, part: number): void,
  notifyExtraElement(current: number, part: number): void,

  clearAllView(): void,
  update(options: IOptions): void

  bindChangedPart(callback: (arg0: number) => void):void,
  bindChangedExtraPart(callback: (arg0: number) => void):void,
  bindChangedCurrent(callback: (arg0: number) => void):void,
  bindChangedExtraCurrent(callback: (arg0: number) => void):void
}

export { IView }