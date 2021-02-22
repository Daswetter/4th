import { Wrapper } from './wrapper/wrapper'
import { Line } from './line/line'
import { Thumb } from './thumb/thumb'
import { Progress } from './progress/progress'
import { Scale } from './scale/scale'
import { Satellite } from './satellite/satellite'

import './../interface/IOptions'
import './../interface/IView'
import { IView } from './../interface/IView'

class View implements IView { 
  public wrapper: Wrapper
  public line: Line
  public thumb: Thumb 
  public progress: Progress 
  public scale: Scale 
  public satellite: Satellite
  private onPartChanged!: Function

  private options!: IOptions

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement
    this.wrapper = new Wrapper(this.initElement)
    this.line = new Line(this.wrapper)
    this.thumb = new Thumb(this.line) 
    this.progress = new Progress(this.line)
    this.scale = new Scale(this.line)
    this.satellite = new Satellite(this.line)
  
    this.sendLineParamsToThumb()
    this.line.bindLineClicked(this.lineWasClicked)

    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)

    this.scale.bindScaleWasClicked(this.scaleWasClicked)
    
  }
  setOptions = (options: IOptions): void => {
    this.options = options
  }
  sendLineParamsToThumb = (): void => {
    this.thumb.setLineLeftSide(this.line.left())
    this.thumb.setLineWidth(this.line.width())
  }

  setScaleElements(elements: Array<number>): void {
    this.scale.setScaleValues(elements)
  }

  setInitialPos(part: Function, options: Function): void {
    this.thumb.setInitialPos(part(), this.line.width())
    this.progress.setInitialPos(part(), this.line.width())
    this.satellite.setInitialPos(part(), this.line.width(), options().initial)
  }

  thumbPosWasChanged = (thumbLeftProp: string, part: number): void => {
    this.progress.changeWidth(thumbLeftProp)
    this.satellite.setPos(thumbLeftProp)
    this.onPartChanged(part)
  }
  currentWasSentFromModel(res: number): void{
    console.log('current', res)
    this.satellite.setValue(res)
  }
  lineWasClicked = (dist: number): void => {
    this.thumb.changeThumbPosBecauseOfLineClick(dist)
  }

  scaleWasClicked = (value: number): void => {
    this.thumb.setScalePos(value)
  }

  
  bindSendPartToModel(callback: Function): void {
    this.onPartChanged = callback;
  }
}

export { View }