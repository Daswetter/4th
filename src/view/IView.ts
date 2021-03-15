import '../interface/IOptions'

interface IView {
  initView(scaleElements: number[]): void
  setInitialPos(part: () => number): void
  setExtraInitialPos(part: () => number): void
  // thumbPosWasChanged(part: number): void
  currentWasSentFromModel(res: number, part: number): void
  extraCurrentWasSentFromModel(res: number, part: number): void
  // changeThumbsPosition (dist: number, part: number): void

  // scaleElements: number[]
  // setScaleElements(elements: Array<number>): void
  bindSendPartToModel(callback: (arg0: number) => void): void
  bindSendExtraPartToModel(callback: (arg0: number) => void): void
  bindSendValueToModel(callback: (arg0: number) => void): void
  bindSendExtraValueToModel(callback: (arg0: number) => void): void
  // setOptions(options: IOptions): void
}

export { IView }