interface IdwSlider {
  update(options: reducedIOptions): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
}

interface Mediator {
  notify(data: any, event: string): void,
}
interface IView {
  current: number
  currentExtra: number
  
  setMediator(mediator: Mediator): void
  initView(scaleElements: { [key: string]: string }): void

  sendDataToSubviews(current: number, part: number, extra: boolean): void

  clearAllView(): void,
  notify(data: {value: number, current: boolean, extra: boolean, nearest: boolean}): void
}

interface IModel {
  mediator: Mediator
  options: IOptions
  setMediator(mediator: Mediator): void
  setCurrent(part: number, extra?: boolean): void
  setPart(current: number, extra?: boolean): void

  countScaleElements(): { [key: string]: string }
  update (options: IOptions): void
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

interface IEvent<T> {
  [eventName: string]: Array<(arg0: T) => void>
}

type paramsType = {
  pageName: keyof MouseEvent,
  sideName: keyof HTMLElement,
  sizeName: keyof HTMLElement,
  lineSize: number, 
  lineSide: number,
}


export { Mediator, reducedIOptions, IOptions, IdwSlider, IModel, IView, IEvent, paramsType }