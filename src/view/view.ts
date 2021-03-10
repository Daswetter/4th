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
  private onExtraPartChanged!: (arg0: number) => void

  private options!: IOptions

  constructor(public initElement: HTMLElement, options: IOptions) {
    this.options = options
    this.initView(initElement)
  }

  initView = (initElement: HTMLElement): void => {
    this.initElement = initElement
    this.initWrapper(this.options.orientation)
    this.initLine(this.options.orientation)
    this.initThumb(this.options.orientation, this.options.thumbType)
    

    this.initSatellite(this.options.satellite, this.options.orientation, this.options.thumbType)
    this.initScale(this.options.scale)
    this.initProgress(this.options.progress, this.options.thumbType)
  }
  initWrapper = (orientation: string): void => {
    this.wrapper = new Wrapper(this.initElement, orientation)
    this.initElement.append(this.wrapper.returnAsHTML())
  }
  initLine = (orientation: string) : void => {
    this.line = new Line(orientation)
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())
    this.line.bindLineClicked(this.lineWasClicked)
    
  }
  initThumb = (orientation: string, thumbType: string) : void => {
    this.thumb = new Thumb(orientation, thumbType) 
    this.line.returnAsHTML().append(this.thumb.returnThumbAsHTML())
    if (thumbType === 'double'){
      this.line.returnAsHTML().append(this.thumb.returnThumbExtraAsHTML())
    }
    this.sendLineParamsToThumb()
    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)
    this.thumb.bindExtraThumbChangedPos(this.extraThumbPosWasChanged)
    
  }

  initSatellite = (isSatellite: boolean, orientation: string, thumbType: string): void => {
    isSatellite ? this.satellite = new Satellite(orientation, thumbType) : ''
    this.line.returnAsHTML().append(this.satellite.returnSatelliteAsHTMLElement())
    if (thumbType === 'double'){
      this.line.returnAsHTML().append(this.satellite.returnSatelliteExtraAsHTMLElement())
    }
    
  }
  initScale = (isScale: boolean): void => {
    isScale ? this.scale = new Scale(this.options.orientation) : ''
    // this.line.after(this.scale.returnAsHTMLElement())
    this.options.scale ? this.scale.bindScaleWasClicked(this.scaleWasClicked) : ''
  }
  initProgress = (isProgress: boolean, thumbType: string): void => {
    isProgress ? this.progress = new Progress(thumbType) : ''
    this.line.returnAsHTML().append(this.progress.returnAsHTMLElement())
  }

  sendLineParamsToThumb = (): void => {
    this.thumb.setLineLeftSide(this.line.left())
    this.thumb.setLineWidth(this.line.width())
    this.thumb.setLineBottom(this.line.bottom())
  }

  setScaleElements(elements: Array<number>): void {
    this.options.scale ? this.scale.setScaleValues(elements) : ''
  }

  setInitialPos(part: () => number): void {
    this.thumb.setInitialPos(part(), this.line.width(), this.options.orientation)
    
  }

  setExtraInitialPos(part: () => number): void {
    this.thumb.setExtraInitialPos(part(), this.line.width(), this.options.orientation)
  }

  thumbPosWasChanged = (thumbCenterProp: string, part: number ): void => {
    this.options.progress ? this.progress.setThumbProp(thumbCenterProp, this.line.width(), this.options.thumbType) : ''
    this.options.satellite ? this.satellite.setPos(thumbCenterProp) : ''
    
    this.onPartChanged(part)
  }
  extraThumbPosWasChanged = (thumbCenterProp: string, part: number): void => {

    this.progress.setExtraThumbProp(thumbCenterProp, this.line.width(), this.options.thumbType)
    this.options.satellite ? this.satellite.setExtraPos(thumbCenterProp) : ''

    this.onExtraPartChanged(part)
    
  }
  currentWasSentFromModel(res: number): void{
    // console.log('current', res)
    this.options.satellite ? this.satellite.setValue(res): ''
    
  }
  extraCurrentWasSentFromModel(res: number): void{
    // console.log('extra current', res)
    this.options.satellite ? this.satellite.setExtraValue(res): ''
  }

  lineWasClicked = (dist: number): void => {
    this.thumb.changeThumbPosBecauseOfLineClick(dist, this.options.thumbType)
  }

  scaleWasClicked = (value: number): void => {
    this.thumb.setScalePos(value)
  }

  
  bindSendPartToModel(callback: (arg0: number) => void): void {
    this.onPartChanged = callback;
  }
  bindSendExtraPartToModel(callback: (arg0: number) => void): void {
    this.onExtraPartChanged = callback;
  }
}

export { View }