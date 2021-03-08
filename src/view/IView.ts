import '../interface/IOptions'

interface IView {
  setInitialPos(part: () => number): void
  thumbPosWasChanged(thumbLeftProp: string, part: number): void
  currentWasSentFromModel(res: number): void
  extraCurrentWasSentFromModel(res: number): void
  lineWasClicked (dist: number, part: number): void


  setScaleElements(elements: Array<number>): void
  scaleWasClicked(value: number): void
  bindSendPartToModel(callback: (arg0: number) => void): void
  bindSendExtraPartToModel(callback: (arg0: number) => void): void
  // setOptions(options: IOptions): void
}

export { IView }