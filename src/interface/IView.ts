import './IOptions'

interface IView {
  setInitialPos(part: Function): void
  thumbPosWasChanged(thumbLeftProp: string): void
  displayCurrentValue(res: number): void
  lineWasClicked (dist: number, part: number): void

  // lineLeftSideWasChanged(lineLeftSide: number): void
  bindSetLineParams() : void
  thumbWasUpdated(res: number): void

  setScaleElements(elements: Array<number>): void
  scaleWasClicked(value: number): void
  bindSendPartToModel(callback: Function): void
}

export { IView }