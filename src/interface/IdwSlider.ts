import { IOptions } from "./IOptions";
import { reducedIOptions } from "./reducedIOptions";

interface IdwSlider {
  update(options: reducedIOptions): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
}

export { IdwSlider }