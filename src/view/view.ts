import { Line } from './line'
import { Thumb } from './thumb'
import { Progress } from './progress'

class View { 
  public line: Line
  public thumb: Thumb
  public progress: Progress
  private onPartChanged!: Function
  private options!: object

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement

    this.line = new Line(this.initElement)
    this.thumb = new Thumb(this.line) 
    this.progress = new Progress(this.line) 

    this.line.bindWidthChanged(this.lineWidthWasChanged)
    this.line.bindLeftSideChanged(this.lineLeftSideWasChanged)
    this.line.bindLineClicked(this.lineWasClicked)

    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)

    this.bindSetLineParams()
  }
  setInitialPos(part: number): void {
    console.log(part);
  }
  setOptions(options: object): void {
    this.options = options
  }
  thumbPosWasChanged = (thumbLeftProp: string): void => {
    this.progress.changeWidth(thumbLeftProp)
  }
  displayCurrentValue(res: number): void{
    console.log('displayCurrentValue', res)
  }
  lineWasClicked = (dist: number, part: number): void => {
    this.thumb.changeThumbPos(dist)
    this.onPartChanged(part)
  }
  lineWidthWasChanged = (lineWidth: number) : void => {
    this.thumb.setLineWidth(lineWidth)
  }

  lineLeftSideWasChanged = (lineLeftSide: number): void => {
    this.thumb.setLineLeftSide( lineLeftSide)
  }
  bindSetLineParams = () : void => {
    this.line.countWidth()
    this.line.countLeftSide()
  }
  thumbWasUpdated = (res: number): void => {
    console.log(res);
  }

  bindSendPartToModel(callback: Function): void {
    this.onPartChanged = callback;
  }
}

export { View }