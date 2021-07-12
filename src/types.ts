import ReducedIOptions from './dwSlider/ReducedIOptions';

interface IdwSlider {
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

export {
  IdwSlider, IOptions, Params,
};
