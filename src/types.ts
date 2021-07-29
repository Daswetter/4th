import ReducedIOptions from './DwSlider/DwSlider.types';

interface IDwSlider {
  update(updatedOptions?: ReducedIOptions): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
}

interface IOptions {
  min: number,
  max: number,
  from: number,
  to: number,
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

type DataUpdate = {
  current: number,
  part: number,
  extra: boolean,
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
