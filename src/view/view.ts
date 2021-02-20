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
  public progress?: Progress 
  public scale: Scale 
  public satellite: Satellite
  private onPartChanged!: Function

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement
    this.wrapper = new Wrapper(this.initElement)
    this.line = new Line(this.wrapper)
    this.thumb = new Thumb(this.line) 
    this.scale = new Scale(this.line)
    this.satellite = new Satellite(this.line)
    
    // this.line.bindWidthChanged(this.lineWidthWasChanged)
    // this.line.bindLeftSideChanged(this.lineLeftSideWasChanged)
    this.line.bindLineClicked(this.lineWasClicked)

    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)

    this.scale.bindScaleWasClicked(this.scaleWasClicked)
    // this.scale.bindScaleWasClicked

    this.bindSetLineParams()
    
    this.satellite.setThumbWidth(this.thumb.thumbWidth())

    
  }
  isProgressExist = (isExist: boolean): void => {
    if (isExist) {
      this.progress = new Progress(this.line) 
    }
  }
  setScaleElements(elements: Array<number>): void {
    this.scale.setScaleValues(elements)
  }
  setInitialPos(part: Function): void {
    this.thumb.setInitialPos(part(), this.line.width())
  }
  thumbPosWasChanged = (thumbLeftProp: string): void => {
    if (this.progress){
      this.progress.changeWidth(thumbLeftProp)
    }  
    this.satellite.setPos(thumbLeftProp)
    // this.onPartChanged(part)
  }
  displayCurrentValue(res: number): void{
    console.log('displayCurrentValue', res)
    this.satellite.setValue(res)
  }
  lineWasClicked = (dist: number, part: number): void => {
    this.thumb.changeThumbPos(dist)
    this.onPartChanged(part)
  }
  // lineWidthWasChanged = (lineWidth: number) : void => {
  //   this.thumb.setLineWidth(lineWidth)
  //   this.scale.setLineWidth(lineWidth)
  // }

  // lineLeftSideWasChanged = (lineLeftSide: number): void => {
  //   this.thumb.setLineLeftSide( lineLeftSide)
  //   this.scale.setLineLeftSide( lineLeftSide)
  // }
  bindSetLineParams = () : void => {
    this.line.width()
    this.line.left()
  }
  thumbWasUpdated = (res: number): void => {
    console.log(res);
  }

  // bindThumbParam =(width: number): void => {
  //   this.thumb.thumbWidth()
  // }
  scaleWasClicked = (value: number): void => {
    this.thumb.setScalePos(value)
  }
  bindSendPartToModel(callback: Function): void {
    this.onPartChanged = callback;
  }
}

export { View }