import './IOptions'

interface IView {
  setInitialPos(part: Function, options: Function): void
  thumbPosWasChanged(thumbLeftProp: string, part: number): void
  currentWasSentFromModel(res: number): void
  lineWasClicked (dist: number, part: number): void


  setScaleElements(elements: Array<number>): void
  scaleWasClicked(value: number): void
  bindSendPartToModel(callback: Function): void
  setOptions(options: IOptions): void
}

export { IView }