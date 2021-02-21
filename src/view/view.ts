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

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement
    this.wrapper = new Wrapper(this.initElement)
    this.line = new Line(this.wrapper)
    this.thumb = new Thumb(this.line) 
    this.progress = new Progress(this.line)
    this.scale = new Scale(this.line)
    this.satellite = new Satellite(this.line)
    
    this.line.bindLineClicked(this.lineWasClicked)

    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)

    this.scale.bindScaleWasClicked(this.scaleWasClicked)
    
    this.satellite.setThumbWidth(this.thumb.width())
  }


  setScaleElements(elements: Array<number>): void {
    this.scale.setScaleValues(elements)
  }

  setInitialPos(part: Function): void {
    this.thumb.setInitialPos(part(), this.line.width())
    this.progress.setInitialPos(part(), this.line.width())
    this.satellite.setInitialPos(part(), this.line.width(), this.thumb.width())
  }

  thumbPosWasChanged = (thumbLeftProp: string, part: number): void => {
    if (this.progress){
      this.progress.changeWidth(thumbLeftProp)
    }  
    this.satellite.setPos(thumbLeftProp)
  }
  displayCurrentValue(res: number): void{
    console.log('displayCurrentValue', res)
    this.satellite.setValue(res)
  }
  lineWasClicked = (dist: number, part: number): void => {
    this.thumb.changeThumbPos(dist)
    this.onPartChanged(part)
  }
  thumbWasUpdated = (res: number): void => {
    console.log(res);
  }

  scaleWasClicked = (value: number): void => {
    this.thumb.setScalePos(value)
  }
  bindSendPartToModel(callback: Function): void {
    this.onPartChanged = callback;
  }
}

export { View }