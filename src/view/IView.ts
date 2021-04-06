import '../interface/IOptions'
import { Thumb } from './thumb/thumb'
import { Wrapper } from './wrapper/wrapper'
import { Line } from './line/line'
import { Progress } from './progress/progress'
import { Scale } from './scale/scale'
import { Satellite } from './satellite/satellite'
import { Input } from './input/input'

interface IView {
  wrapper: Wrapper
  line: Line
  thumb: Thumb 
  progress: Progress 
  scale: Scale 
  satellite: Satellite
  input: Input

  part: number
  partExtra: number

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