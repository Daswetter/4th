import { Wrapper } from './wrapper'
import { Line } from './line'
import { Thumb } from './thumb'
import { Progress } from './progress'
import { Scale } from './scale'
import './../interface/IOptions'


class View { 
  public wrapper: Wrapper
  public line: Line
  public thumb: Thumb
  public progress!: Progress
  public scale: Scale
  private onPartChanged!: Function
  private options!: IOptions

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement

    this.wrapper = new Wrapper(this.initElement)
    this.line = new Line(this.wrapper)
    this.thumb = new Thumb(this.line) 
    // if (this.options.progressBar === true){
      this.progress = new Progress(this.line) 
    // }  
    this.scale = new Scale(this.line) 

    
    this.line.bindWidthChanged(this.lineWidthWasChanged)
    this.line.bindLeftSideChanged(this.lineLeftSideWasChanged)
    this.line.bindLineClicked(this.lineWasClicked)

    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)

    this.scale.bindScaleWasClicked(this.scaleWasClicked)

    this.bindSetLineParams()
    

  }

  setInitialPos(part: Function): void {
    this.thumb.setInitialPos(part())
  }
  setOptions(options: IOptions): void {
    this.options = options
    this.scale.setOptions( options )
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
    this.scale.setLineWidth(lineWidth)
  }

  lineLeftSideWasChanged = (lineLeftSide: number): void => {
    this.thumb.setLineLeftSide( lineLeftSide)
    this.scale.setLineLeftSide( lineLeftSide)
  }
  bindSetLineParams = () : void => {
    this.line.countWidth()
    this.line.countLeftSide()
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