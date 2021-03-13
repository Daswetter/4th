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

  private part!: number
  private partExtra!: number
  
  private onPartChanged!: (arg0: number) => void
  private onExtraPartChanged!: (arg0: number) => void

  private options!: IOptions

  constructor(public initElement: HTMLElement, options: IOptions) {
    this.options = options
    this.initElement = initElement
  }

  initView = (scaleElements: number[]): void => {
    
    this.initWrapper()
    this.initLine()
    this.initThumb()
    
    this.options.satellite ? this.initSatellite(): ''
    this.options.scale ? this.initScale(scaleElements): ''
    this.options.progress ? this.initProgress() : ''
    
  }
  initWrapper = (): void => {
    this.wrapper = new Wrapper(this.initElement)
    this.initElement.append(this.wrapper.returnAsHTML())
    if (this.options.orientation === 'vertical'){
      this.wrapper.setOrientation()
    }
    
    
  }

  initLine = () : void => {
    this.line = new Line()
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())

    if (this.options.orientation === 'vertical'){
      this.line.setClickListenerForVertical()
    } else if (this.options.orientation === 'horizontal'){
      this.line.setClickListenerForHorizontal()
    }
    this.line.bindLineClicked(this.changeThumbPosition)

    window.onresize = this.windowWasResized
  }

  initThumb = () : void => {
    this.thumb = new Thumb() 
    this.line.returnAsHTML().append(this.thumb.returnThumbAsHTML())
    this.thumb.setEventListenerHorizontalForThumb(this.line.left(), this.line.width())

    if (this.options.thumbType === 'double'){
      this.thumb.initThumbExtra()
      this.line.returnAsHTML().append(this.thumb.returnThumbExtraAsHTML())
      this.thumb.setEventListenerHorizontalForThumbExtra(this.line.left(), this.line.width())
    }

    if (this.options.orientation === 'vertical'){
      this.thumb.setEventListenerVerticalForThumb(this.line.bottom(), this.line.width())
      if (this.options.thumbType === 'double'){
        this.thumb.setEventListenerVerticalForThumbExtra(this.line.bottom(), this.line.width())
      }
    }
    this.thumb.bindThumbChangedPos(this.thumbPosWasChanged)
    this.thumb.bindExtraThumbChangedPos(this.extraThumbPosWasChanged)
    
  }

  initSatellite = (): void => {
    this.satellite = new Satellite()
    this.line.returnAsHTML().append(this.satellite.returnSatelliteAsHTMLElement())
    
    if (this.options.thumbType === 'double'){
      this.satellite.initSatelliteExtra()
      this.line.returnAsHTML().append(this.satellite.returnSatelliteExtraAsHTMLElement())
      
      if (this.options.orientation === 'vertical'){
        this.satellite.rotateSatelliteExtra()
      }
    }
    if (this.options.orientation === 'vertical'){
      this.satellite.rotateSatellite()
    }
    
  }
  initScale = (scaleElements: number[]): void => {
    this.scale = new Scale()
    this.line.returnAsHTML().after(this.scale.returnAsHTMLElement())
    this.scale.bindScaleWasClicked(this.changeThumbPosition)
    this.scale.setScaleValues(scaleElements)
    
    if (this.options.orientation === 'vertical') {
      this.scale.rotateScaleElement()
    }
  }

  initProgress = (): void => {
    this.progress = new Progress()
    this.line.returnAsHTML().append(this.progress.returnAsHTMLElement())
  }



  setInitialPos(part: () => number): void {
    this.thumb.setInitialPos(part(), this.line.width())
  }

  setExtraInitialPos(part: () => number): void {
    this.thumb.setExtraInitialPos(part(), this.line.width())
  }

  thumbPosWasChanged = (thumbPos: string, part: number ): void => {
    this.options.progress ? this.progress.setThumbPos(thumbPos, this.line.width()) : ''
    this.options.satellite ? this.satellite.setPos(thumbPos) : ''
    
    this.part = part
    this.onPartChanged(part)
  }
  extraThumbPosWasChanged = (thumbCenterProp: string, part: number): void => {

    this.options.progress ? this.progress.setExtraThumbProp(thumbCenterProp, this.line.width()) : ''
    this.options.satellite ? this.satellite.setExtraPos(thumbCenterProp) : ''

    this.partExtra = part
    this.onExtraPartChanged(part)
  }
  currentWasSentFromModel(res: number): void{
    console.log('current', res)
    this.options.satellite ? this.satellite.setValue(res): ''
    
  }
  extraCurrentWasSentFromModel(res: number): void{
    console.log('extra current', res)
    this.options.satellite ? this.satellite.setExtraValue(res): ''
  }

  changeThumbPosition = (part: number): void => {
    if (this.options.thumbType === 'double'){
      this.thumb.changeThumbsPositions(part, this.line.width())
    } else if (this.options.thumbType === 'single'){
      this.thumb.changeThumbPosition(part, this.line.width())
    }
  }

  windowWasResized = (event: Event): void => {

    this.thumb.setEventListenerHorizontalForThumb(this.line.left(), this.line.width())

    if (this.options.thumbType === 'double'){
      this.thumb.setEventListenerHorizontalForThumbExtra(this.line.left(), this.line.width())
    }

    if (this.options.orientation === 'vertical'){
      this.thumb.setEventListenerVerticalForThumb(this.line.bottom(), this.line.width())
      if (this.options.thumbType === 'double'){
        this.thumb.setEventListenerVerticalForThumbExtra(this.line.bottom(), this.line.width())
      }
    }

    this.changeThumbPosition(this.part)
  }

  
  bindSendPartToModel(callback: (arg0: number) => void): void {
    this.onPartChanged = callback;
  }
  bindSendExtraPartToModel(callback: (arg0: number) => void): void {
    this.onExtraPartChanged = callback;
  }
}

export { View }