import { IOptions } from "./IOptions";
import { reducedIOptions } from "./reducedIOptions";

interface IRangeSlider {
  options: IOptions,
  init(initElement: HTMLElement, options: IOptions): void,
  update(options: reducedIOptions): void,
  returnCurrentState(): IOptions
}

export { IRangeSlider }