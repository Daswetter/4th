import { Wrapper } from './wrapper/wrapper'
import { Line } from './line/line'
import { Thumb } from './thumb/thumb'
import { Progress } from './progress/progress'
import { Scale } from './scale/scale'
import { Satellite } from './satellite/satellite'
import { Input } from './input/input'

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
  public input!: Input

  private part!: number
  private partExtra!: number
  
  private partChanged!: (arg0: number) => void
  private extraPartChanged!: (arg0: number) => void

  private valueChanged!: (arg0: number) => void
  private extraValueChanged!: (arg0: number) => void

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
    this.options.progress ? this.initProgress() : ''
    this.options.input ? this.initInput() : ''
    this.options.scale ? this.initScale(scaleElements): ''

    this.valueChanged(this.options.initial[0])
    if (this.options.thumbType === 'double'){
      this.extraValueChanged(this.options.initial[1])
    }
  }

  initWrapper = (): void => {
    this.wrapper = new Wrapper(this.initElement)
    this.initElement.append(this.wrapper.returnAsHTML())
    if (this.options.orientation === 'vertical'){
      this.wrapper.setVertical()
    }
    this.wrapper.bindWrapperWasResized(this.windowWasResized)
  }

  initLine = () : void => {
    this.line = new Line()
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())
    this.line.setClickListenerForHorizontal()

    if (this.options.orientation === 'vertical'){
      this.line.setClickListenerForVertical()
    }

    this.line.bindLineClicked(this.partChanged)

    if (this.options.thumbType === 'double'){
      this.line.bindLineClicked(this.changePositionForTheNearest)
    }
  }

  initThumb = () : void => {
    this.thumb = new Thumb() 
    this.line.returnAsHTML().append(this.thumb.returnThumbAsHTML())
    this.thumb.setEventListenerHorizontalForThumb(this.line.left(), this.line.width())
    this.thumb.setHorizontalModForThumb(this.line.height())

    if (this.options.thumbType === 'double'){
      this.thumb.initThumbExtra()
      this.line.returnAsHTML().append(this.thumb.returnThumbExtraAsHTML())
      this.thumb.setEventListenerHorizontalForThumbExtra(this.line.left(), this.line.width())
      this.thumb.setHorizontalModForThumbExtra(this.line.height())
    }

    if (this.options.orientation === 'vertical'){
      this.thumb.setVerticalModForThumb(this.line.width())
      this.thumb.setEventListenerVerticalForThumb(this.line.bottom(), this.line.height())
      if (this.options.thumbType === 'double'){
        this.thumb.setVerticalModForExtra(this.line.width())
        this.thumb.setEventListenerVerticalForThumbExtra(this.line.bottom(), this.line.height())
      }
    }
    this.thumb.bindThumbChangedPos(this.partChanged)
    this.thumb.bindExtraThumbChangedPos(this.extraPartChanged)
    
  }

  initSatellite = (): void => {
    this.satellite = new Satellite()
    this.wrapper.returnAsHTML().append(this.satellite.returnSatelliteAsHTMLElement())
    
    if (this.options.thumbType === 'double'){
      this.satellite.initSatelliteExtra()
      this.wrapper.returnAsHTML().append(this.satellite.returnSatelliteExtraAsHTMLElement())
    }
  }
  
  initScale = (scaleElements: number[]): void => {
    this.scale = new Scale()
    this.line.returnAsHTML().after(this.scale.returnAsHTMLElement())
    this.scale.bindScaleWasClicked(this.partChanged)
    if (this.options.thumbType === 'double'){
      this.scale.bindScaleWasClicked(this.changePositionForTheNearest)
    }
    this.scale.setScaleValues(scaleElements)
    
    if (this.options.orientation === 'vertical') {
      this.scale.setVerticalMod()
    }
  }

  initProgress = (): void => {
    this.progress = new Progress()
    this.line.returnAsHTML().append(this.progress.returnAsHTMLElement()) 
    this.progress.setHorizontalMod(this.line.height())
    if (this.options.orientation === 'vertical') {
      this.progress.setVerticalMod(this.line.width())
    }
  }

  initInput = (): void => {
    this.input = new Input()
    this.line.returnAsHTML().after(this.input.returnAsHTML())
    this.input.bindValueWasChanged(this.valueChanged)

    if (this.options.thumbType === 'double'){
      
      this.input.initInputExtra()
      this.input.returnAsHTML().after(this.input.returnInputExtraAsHTML())
      this.input.bindValueExtraWasChanged(this.extraValueChanged)

    }
  }


  currentWasSentFromModel(res: number, part: number): void{
    const orientation = this.options.orientation
    const element = 'primary'
    this.part = part
    this.options.input ? this.input.displayCurrentValue(res) : ''
    this.options.progress ? this.progress.setPosition(part, this.line.size(), orientation, element) : ''
    this.options.satellite ? this.satellite.setPosition(part, res, this.line.size(), this.line.side(), this.thumb.size()) : ''

    if (this.options.orientation === 'horizontal'){
      this.thumb.changeThumbPosition(part, this.line.width())
    
      
      
    }
    if (this.options.orientation === 'vertical'){
      this.thumb.changeThumbPositionForVertical(part, this.line.height())
    }
  }


  extraCurrentWasSentFromModel(res: number, part: number): void{
    const orientation = this.options.orientation
    const element = 'extra'
    this.partExtra = part
    
    this.options.input ? this.input.displayCurrentValueForExtra(res) : ''
    this.options.progress ? this.progress.setPosition(part, this.line.size(), orientation, element) : ''
    this.options.satellite ? this.satellite.setPosition(part, res, this.line.size(), this.line.side(), this.thumb.size(), orientation, element) : ''

    if (orientation === 'horizontal'){
      this.thumb.changeThumbExtraPosition(part, this.line.width())
    }

    if (orientation === 'vertical'){
      this.thumb.changeThumbExtraPositionForVertical(part, this.line.height())
      
    }
  }

  changePositionForTheNearest = (part: number): void => {
    if (this.options.orientation === 'horizontal'){
      if (Math.abs(this.thumb.countCurrentPartForThumb(this.line.width()) - part) > Math.abs(this.thumb.countCurrentExtraForThumbExtra(this.line.width()) - part)){
        this.extraPartChanged(part)
      } else {
        this.partChanged(part)
      }
    } else if (this.options.orientation === 'vertical'){
      if (Math.abs(this.thumb.countCurrentPartForVerticalForThumb(this.line.height()) - part) > Math.abs(this.thumb.currentPartForVerticalForThumbExtra(this.line.height()) - part)){
        this.extraPartChanged(part)
      } else {
        this.partChanged(part)
      }
    }
  }



  windowWasResized = (): void => {
    this.partChanged(this.part)

    this.thumb.setEventListenerHorizontalForThumb(this.line.left(), this.line.width())

    if (this.options.thumbType === 'double'){
      this.thumb.setEventListenerHorizontalForThumbExtra(this.line.left(), this.line.width())
      this.extraPartChanged(this.partExtra)
    }

    if (this.options.orientation === 'vertical'){
      this.thumb.setEventListenerVerticalForThumb(this.line.bottom(), this.line.height())
      if (this.options.thumbType === 'double'){
        this.thumb.setEventListenerVerticalForThumbExtra(this.line.bottom(), this.line.height())
      }
    }
  }
  


  bindSendPartToModel(callback: (arg0: number) => void): void {
    this.partChanged = callback;
  }
  bindSendExtraPartToModel(callback: (arg0: number) => void): void {
    this.extraPartChanged = callback;
  }

  bindSendValueToModel(callback: (arg0: number) => void): void {
    this.valueChanged = callback;
  }
  bindSendExtraValueToModel(callback: (arg0: number) => void): void {
    this.extraValueChanged = callback;
  }
}

export { View }