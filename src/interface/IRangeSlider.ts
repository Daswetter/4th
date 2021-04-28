import { IOptions } from "./IOptions";
import { reducedIOptions } from "./reducedIOptions";

interface IRangeSlider {
  update(options: reducedIOptions): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
}

export { IRangeSlider }