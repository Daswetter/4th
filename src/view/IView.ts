import '../interface/IOptions'

interface IView {
  initView(scaleElements: number[]): void
  initWrapper(): void
  initLine(): void
  initThumb(): void
  initSatellite(): void
  initScale(scaleElements: number[]): void
  initProgress(): void
  initInput(): void

  currentWasSentFromModel(res: number, part: number): void
  extraCurrentWasSentFromModel(res: number, part: number): void
  
  changePositionForTheNearest(part: number): void
  windowWasResized(): void

  bindSendPartToModel(callback: (arg0: number) => void): void
  bindSendExtraPartToModel(callback: (arg0: number) => void): void
  bindSendValueToModel(callback: (arg0: number) => void): void
  bindSendExtraValueToModel(callback: (arg0: number) => void): void
  
}

export { IView }