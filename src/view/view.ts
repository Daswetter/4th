import { Wrapper } from './wrapper/wrapper'
import { Line } from './line/line'
import { Thumb } from './thumb/thumb'
import { Progress } from './progress/progress'
import { Scale } from './scale/scale'
import { Satellite } from './satellite/satellite'

import './../interface/IOptions'
import './IView'
import { IView } from './IView'

class View implements IView { 
  public wrapper!: Wrapper
  public line!: Line
  public thumb!: Thumb 
  public progress!: Progress 
  public scale!: Scale 
  public satellite!: Satellite
  private onPartChanged!: (arg0: number) => void

  private options!: IOptions

  constructor(public initElement: HTMLElement, options: IOptions) {
    this.options = options
    this.initView(initElement)
    
    this.sendLineParamsToThumb()
    this.line.bindLineClicked(this.lineWasClicked)

    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)
    this.thumb.bindExtraThumbChangedPos(this.extraThumbPosWasChanged)

    
    
  }

  initView = (initElement: HTMLElement): void => {
    this.initElement = initElement
    this.initWrapper(this.options.orientation)
    this.initLine(this.options.orientation)
    this.initThumb(this.options.orientation, this.options.thumbType)
    

    this.initSatellite(this.options.satellite, this.options.orientation)
    this.initScale(this.options.scale)
    this.initProgress(this.options.progress, this.options.thumbType)
  }
  initWrapper = (orientation: string): void => {
    this.wrapper = new Wrapper(this.initElement, orientation)
  }
  initLine = (orientation: string) : void => {
    this.line = new Line(this.wrapper, orientation)
  }
  initThumb = (orientation: string, thumbType: string) : void => {
    this.thumb = new Thumb(this.line, orientation, thumbType) 
  }
  initSatellite = (isSatellite: boolean, orientation: string): void => {
    isSatellite ? this.satellite = new Satellite(this.line, orientation) : ''
  }
  initScale = (isScale: boolean): void => {
    isScale ? this.scale = new Scale(this.line, this.options.orientation) : ''
    this.options.scale ? this.scale.bindScaleWasClicked(this.scaleWasClicked) : ''
  }
  initProgress = (isProgress: boolean, thumbType: string): void => {
    isProgress ? this.progress = new Progress(this.line, thumbType) : ''
  }

  sendLineParamsToThumb = (): void => {
    this.thumb.setLineLeftSide(this.line.left())
    this.thumb.setLineWidth(this.line.width())
    this.thumb.setLineBottom(this.line.bottom())
  }

  setScaleElements(elements: Array<number>): void {
    this.options.scale ? this.scale.setScaleValues(elements) : ''
  }

  setInitialPos(part: () => number, options: IOptions): void {
    this.thumb.setInitialPos(part(), this.line.width())
    this.options.progress ? this.progress.setInitialPos(part(), this.line.width()) : ''
    this.options.satellite ? this.satellite.setInitialPos(part(), this.line.width(), options.initial): ''
  }

  thumbPosWasChanged = (thumbLeftProp: string, part: number ): void => {
    this.options.progress ? this.progress.setThumbProp(thumbLeftProp, this.line.width(), this.thumb.width()) : ''
    this.options.satellite ? this.satellite.setPos(thumbLeftProp) : ''

    this.onPartChanged(part)
  }
  extraThumbPosWasChanged = (thumbLeftProp: string, part: number): void => {
    this.progress.setExtraThumbProp(thumbLeftProp, this.line.width(), this.thumb.width())
    
  }
  currentWasSentFromModel(res: number): void{
    console.log('current', res)
    this.options.satellite ? this.satellite.setValue(res): ''
  }
  lineWasClicked = (dist: number): void => {
    this.thumb.changeThumbPosBecauseOfLineClick(dist)
  }

  scaleWasClicked = (value: number): void => {
    this.thumb.setScalePos(value)
  }

  
  bindSendPartToModel(callback: (arg0: number) => void): void {
    this.onPartChanged = callback;
  }
}

export { View }