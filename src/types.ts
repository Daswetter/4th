import ReducedIOptions from './DwSlider/ReducedIOptions';

interface IDwSlider {
  update(updatedOptions?: ReducedIOptions): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
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

type Params = {
  pageName: keyof MouseEvent,
  sideName: keyof HTMLElement,
  sizeName: keyof HTMLElement,
  lineSize: number,
  lineSide: number,
};

type ViewData = {
  value: number,
  current: boolean,
  extra: boolean
};

type ModelData = {
  current?: number,
  part?: number,
  extra?: boolean,
  scaleElements?: Record<string, string>,
  eventName: string,
};

export {
  IDwSlider, IOptions, Params, ViewData, ModelData,
};
