import { Wrapper } from './subviews/wrapper/wrapper'
import { Line } from './subviews/line/line'
import { Thumb } from './subviews/thumb/thumb'
import { Progress } from './subviews/progress/progress'
import { Scale } from './subviews/scale/scale'
import { Satellite } from './subviews/satellite/satellite'
import { Input } from './subviews/input/input'

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

  notifyPrimaryElement(res: number, part: number): void
  notifyExtraElement(res: number, part: number): void
  

  bindSendPartToModel(callback: (arg0: number) => void): void
  bindSendExtraPartToModel(callback: (arg0: number) => void): void
  bindSendValueToModel(callback: (arg0: number) => void): void
  bindSendExtraValueToModel(callback: (arg0: number) => void): void
  
}

export { IView }