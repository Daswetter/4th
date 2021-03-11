import '../interface/IOptions'

interface IView {
  initView(scaleElements: number[]): void
  setInitialPos(part: () => number): void
  setExtraInitialPos(part: () => number): void
  thumbPosWasChanged(thumbCenterProp: string, part: number): void
  currentWasSentFromModel(res: number): void
  extraCurrentWasSentFromModel(res: number): void
  changeThumbPosition (dist: number, part: number): void

  // scaleElements: number[]
  // setScaleElements(elements: Array<number>): void
  bindSendPartToModel(callback: (arg0: number) => void): void
  bindSendExtraPartToModel(callback: (arg0: number) => void): void
  // setOptions(options: IOptions): void
}

export { IView }