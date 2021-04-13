
interface IView {
  initView(scaleElements: number[]): void,

  notifyPrimaryElement(current: number, part: number): void,
  notifyExtraElement(current: number, part: number): void,
  notifyScale(scaleElements: Array<number>): void,


  bindChangedPart(callback: (arg0: number) => void):void,
  bindChangedExtraPart(callback: (arg0: number) => void):void,
  bindChangedCurrent(callback: (arg0: number) => void):void,
  bindChangedExtraCurrent(callback: (arg0: number) => void):void
}

export { IView }