interface IdwSlider {
  update(options: reducedIOptions): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
}

interface IView {
  current: number
  currentExtra: number
  
  initView(scaleElements: { [key: string]: string }): void

  notifyPrimary(current: number, part: number): void
  notifyExtra(current: number, part: number): void

  clearAllView(): void,

  bindChangedPart(callback: (arg0: number) => void): void
  bindChangedExtraPart(callback: (arg0: number) => void): void
  bindChangedCurrent(callback: (arg0: number) => void): void
  bindChangedExtraCurrent(callback: (arg0: number) => void): void
}

interface IModel {
  setCurrent(part: number, extra?: boolean): void
  setPart(current: number, extra?: boolean): void

  countScaleElements(): { [key: string]: string }
  update (options: IOptions): void

  bindChangedValues(callback: (current: number, part: number) => void): void
  bindChangedExtraValues(callback: (current: number, part: number) => void): void

  bindChangedOptions(callback: (scaleElements: { [key: string]: string }, options: IOptions) => void): void
}

interface IOptions {
  min: number,
  max: number,
  from: number, 
  to?: number, 
  step: number,
  vertical: boolean,
  double: boolean,
  tip: boolean,
  scale: boolean,
  scaleSize: number
  progress: boolean,
}

interface reducedIOptions {
  min?: number,
  max?: number,
  from?: number, 
  to?: number, 
  step?: number,
  vertical?: boolean,
  double?: boolean,
  tip?: boolean,
  scale?: boolean,
  progress?: boolean,
  input?: boolean
}

export { reducedIOptions, IOptions, IdwSlider, IModel, IView }