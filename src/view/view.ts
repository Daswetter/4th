import { Line } from './line'
import { Thumb } from './thumb'

class View { 
  public line: Line
  public thumb: Thumb
  private onPartChanged!: Function

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement
    this.line = new Line(this.initElement)
    this.thumb = new Thumb(this.line)  

    this.line.bindLineChanged(this.lineWasUpdated)
    this.line.bindLineClicked(this.lineWasClicked)
    this.bindSetLineParams()
  }

  displayCurrentValue(res: number): void{
    console.log('displayCurrentValue', res)
  }
  lineWasClicked = (dist: number, part: number): void => {
    this.thumb.changeThumbPos(dist)
    this.onPartChanged(part)
  }
  lineWasUpdated = (lineLeftSide: number, lineWidth: number): void => {
    this.thumb.setLineParams( lineLeftSide, lineWidth)
  }
  bindSetLineParams = () : void => {
    this.line.width()
  }
  thumbWasUpdated = (res: number): void => {
    console.log(res);
  }
  bindSendPartToModel(callback: Function): void {
    this.onPartChanged = callback;
  }
}

export { View }