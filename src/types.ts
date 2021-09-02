interface IDwSlider {
  update(updatedOptions?: Partial<IOptions>): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
}

interface IOptions {
  min: number,
  max: number,
  from: number,
  to: number,
  step: number,
  isVertical: boolean,
  isDouble: boolean,
  hasTip: boolean,
  hasScale: boolean,
  scaleSize: number
  hasProgress: boolean,
}

type Params = {
  pageName: keyof MouseEvent,
  sideName: keyof HTMLElement,
  sizeName: keyof HTMLElement,
  lineSize: number,
  lineSide: number,
};

type ViewData = {
  value: number,
  isCurrent: boolean,
  isExtra: boolean
};

type DataUpdate = {
  current: number,
  part: number,
  isExtra: boolean,
  eventName: 'data'
};

type ScaleUpdate = {
  scaleElements: Record<string, string>,
  options: IOptions,
  eventName: 'scale'
};

type ModelUpdate = DataUpdate | ScaleUpdate;

export {
  IDwSlider, IOptions, Params, ViewData, ModelUpdate,
};
