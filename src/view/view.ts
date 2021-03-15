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
  }

  initLine = () : void => {
    this.line = new Line()
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())

    if (this.options.orientation === 'vertical'){
      this.line.setClickListenerForVertical()
    } else if (this.options.orientation === 'horizontal'){
      this.line.setClickListenerForHorizontal()
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
    this.thumb.bindThumbChangedPos(this.partChanged)
    this.thumb.bindExtraThumbChangedPos(this.extraPartChanged)
    
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
    this.scale.bindScaleWasClicked(this.partChanged)
    if (this.options.thumbType === 'double'){
      this.scale.bindScaleWasClicked(this.changePositionForTheNearest)
    }
    this.scale.setScaleValues(scaleElements)
    
    if (this.options.orientation === 'vertical') {
      this.scale.rotateScaleElement()
    }
    
  }

  initProgress = (): void => {
    this.progress = new Progress()
    this.line.returnAsHTML().append(this.progress.returnAsHTMLElement())
  }

  initInput = (): void => {
    this.input = new Input()
    this.line.returnAsHTML().after(this.input.returnAsHTMLElement())
    this.input.bindValueWasChanged(this.valueChanged)
    if (this.options.thumbType === 'double'){
      this.input.bindValueWasChanged(this.changePositionForTheNearest)
    }
  }



  setInitialPos(part: () => number): void {
    this.thumb.setInitialPosForHorizontal(part(), this.line.width())
    if (this.options.orientation === 'vertical'){
      this.thumb.setInitialPosForVertical(part(), this.line.width())
    }
  }

  setExtraInitialPos(part: () => number): void {
    this.thumb.setExtraInitialPosForHorizontal(part(), this.line.width())
    if (this.options.orientation === 'vertical'){
      this.thumb.setExtraInitialPosForVertical(part(), this.line.width())
    }
  }

  currentWasSentFromModel(res: number, part: number): void{
    console.log('current', res)
    this.thumb.changeThumbPosition(part, this.line.width())
    this.options.progress ? this.progress.setThumbPos(part, this.line.width()) : ''
    this.options.satellite ? this.satellite.setPos(part, res, this.line.width()) : ''
    this.options.input ? this.input.displayCurrentValue(res) : ''

    
  }
  extraCurrentWasSentFromModel(res: number, part: number): void{
    console.log('extra current', res)
    this.thumb.changeThumbExtraPosition(part, this.line.width())
    this.options.progress ? this.progress.setExtraThumbProp(part, this.line.width()) : ''
    this.options.satellite ? this.satellite.setExtraPos(part, res, this.line.width()) : ''

  }

  changePositionForTheNearest = (value: number): void => {

    if (Math.abs(this.thumb.currentPart(this.line.width()) - value) > Math.abs(this.thumb.currentExtraPart(this.line.width()) - value)){
      this.extraPartChanged(value)
    } else {
      this.partChanged(value)
    }
  }



  // windowWasResized = (event: Event): void => {

  //   this.thumb.setEventListenerHorizontalForThumb(this.line.left(), this.line.width())

  //   if (this.options.thumbType === 'double'){
  //     this.thumb.setEventListenerHorizontalForThumbExtra(this.line.left(), this.line.width())
  //   }

  //   if (this.options.orientation === 'vertical'){
  //     this.thumb.setEventListenerVerticalForThumb(this.line.bottom(), this.line.width())
  //     if (this.options.thumbType === 'double'){
  //       this.thumb.setEventListenerVerticalForThumbExtra(this.line.bottom(), this.line.width())
  //     }
  //   }

  //   console.log('this.part', this.part);
    
  //   this.thumb.changeThumbPosition(this.part, this.line.width())

  //   if (this.options.thumbType === 'double'){
  //     this.thumb.changeThumbExtraPosition(this.partExtra, this.line.width())
  
  //   }
  // }
  


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