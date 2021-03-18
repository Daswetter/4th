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
  }
  initWrapper = (): void => {
    this.wrapper = new Wrapper(this.initElement)
    this.initElement.append(this.wrapper.returnAsHTML())
    if (this.options.orientation === 'vertical'){
      this.wrapper.setOrientation()
    }
    this.wrapper.bindWrapperWasResized(this.windowWasResized)
  }

  initLine = () : void => {
    this.line = new Line()
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())
    this.line.setClickListenerForHorizontal()

    if (this.options.orientation === 'vertical'){
      this.line.verticalMod()
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
    this.thumb.setHorizontalMod()

    if (this.options.thumbType === 'double'){
      this.thumb.initThumbExtra()
      
      this.line.returnAsHTML().append(this.thumb.returnThumbExtraAsHTML())
      this.thumb.setEventListenerHorizontalForThumbExtra(this.line.left(), this.line.width())
      this.thumb.setHorizontalModForExtra()
    }

    if (this.options.orientation === 'vertical'){
      this.thumb.setVerticalMod()
      this.thumb.setEventListenerVerticalForThumb(this.line.bottom(), this.line.height())
      if (this.options.thumbType === 'double'){
        // this.thumb.setVerticalModForExtra()
        this.thumb.setVerticalModForExtra()
        this.thumb.setEventListenerVerticalForThumbExtra(this.line.bottom(), this.line.height())
      }
    }
    this.thumb.bindThumbChangedPos(this.partChanged)
    this.thumb.bindExtraThumbChangedPos(this.extraPartChanged)
    
  }

  initSatellite = (): void => {
    this.satellite = new Satellite()
    this.line.returnAsHTML().append(this.satellite.returnSatelliteAsHTMLElement())
    
    if (this.options.thumbType === 'double'){
      this.satellite.initSatelliteExtra()
      this.line.returnAsHTML().append(this.satellite.returnSatelliteExtraAsHTMLElement())
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



  setInitialPos(part: () => number): void {
    this.thumb.setInitialPosForHorizontal(part(), this.line.width())
    // if (this.options.orientation === 'vertical'){
    //   this.thumb.setInitialPosForVertical(part(), this.line.width())
    // }
  }

  setExtraInitialPos(part: () => number): void {
    this.thumb.setExtraInitialPosForHorizontal(part(), this.line.width())
    // if (this.options.orientation === 'vertical'){
    //   this.thumb.setExtraInitialPosForVertical(part(), this.line.width())
    // }
  }

  currentWasSentFromModel(res: number, part: number): void{
    this.part = part
    this.options.input ? this.input.displayCurrentValue(res) : ''
    if (this.options.orientation === 'horizontal'){
      this.thumb.changeThumbPosition(part, this.line.width())
      this.options.progress ? this.progress.setThumbPos(part, this.line.width()) : ''
      this.options.satellite ? this.satellite.setPos(part, res, this.line.width()) : ''
      
    }
    if (this.options.orientation === 'vertical'){
      this.thumb.changeThumbPositionForVertical(part, this.line.height())
      this.options.progress ? this.progress.setThumbPosForVertical(part, this.line.height()) : ''
      this.options.satellite ? this.satellite.setPosForVertical(part, res, this.line.height()) : ''
    }
  }
  extraCurrentWasSentFromModel(res: number, part: number): void{
    this.partExtra = part
    console.log('extra current', res)
    this.options.input ? this.input.displayCurrentValueForExtra(res) : ''
    if (this.options.orientation === 'horizontal'){
      this.thumb.changeThumbExtraPosition(part, this.line.width())
      this.options.progress ? this.progress.setExtraThumbProp(part, this.line.width()) : ''
      this.options.satellite ? this.satellite.setExtraPos(part, res, this.line.width()) : ''
    }
    if (this.options.orientation === 'vertical'){
      this.thumb.changeThumbExtraPositionForVertical(part, this.line.height())
      this.options.progress ? this.progress.setThumbExtraPosForVertical(part, this.line.height()) : ''
      this.options.satellite ? this.satellite.setExtraPosForVertical(part, res, this.line.height()) : ''
    }
  }

  changePositionForTheNearest = (part: number): void => {
    if (this.options.orientation === 'horizontal'){
      if (Math.abs(this.thumb.currentPart(this.line.width()) - part) > Math.abs(this.thumb.currentExtraPart(this.line.width()) - part)){
        this.extraPartChanged(part)
      } else {
        this.partChanged(part)
      }
    } else if (this.options.orientation === 'vertical'){
      if (Math.abs(this.thumb.currentPartForVertical(this.line.height()) - part) > Math.abs(this.thumb.currentExtraPartForVertical(this.line.height()) - part)){
        this.extraPartChanged(part)
      } else {
        this.partChanged(part)
      }
    }
  }



  windowWasResized = (): void => {
    this.partChanged(this.part)
    if (this.options.thumbType === 'double'){
      this.extraPartChanged(this.partExtra)
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