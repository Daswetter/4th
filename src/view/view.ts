import { Wrapper } from './wrapper/wrapper'
import { Line } from './line/line'
import { Thumb } from './thumb/thumb'
import { Progress } from './progress/progress'
import { Scale } from './scale/scale'
import { Satellite } from './satellite/satellite'
import { Input } from './input/input'

import './../interface/IOptions'
import { IView } from './IView'

class View implements IView { 
  wrapper!: Wrapper
  line!: Line
  thumb!: Thumb 
  progress!: Progress
  scale!: Scale 
  satellite!: Satellite
  input!: Input

  part!: number
  partExtra!: number
  
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

    window.addEventListener('resize', this.windowWasResized)
  }

  initWrapper = (): void => {
    this.wrapper = new Wrapper(this.initElement)
    this.initElement.append(this.wrapper.returnAsHTML())
    if (this.options.orientation === 'vertical'){
      this.wrapper.setVertical()
    }
  }

  initLine = () : void => {
    const orientation = this.options.orientation

    this.line = new Line()
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())
    this.line.setEventListener(orientation)
    this.line.bindLineClicked(this.partChanged)

    if (this.options.thumbType === 'double'){
      this.line.bindLineClicked(this.changePositionForTheNearest)
    }
    
  }

  initThumb = () : void => {
    const orientation = this.options.orientation 
    this.thumb = new Thumb() 
    this.line.returnAsHTML().append(this.thumb.returnAsHTML())
    
    
    this.thumb.setEventListener(this.line.size(), this.line.side(), orientation, 'primary')
    
    this.thumb.setInitialSettings(this.line.size(), orientation)
    
    if (this.options.thumbType === 'double'){
      this.thumb.initThumbExtra()
      this.line.returnAsHTML().append(this.thumb.returnExtraAsHTML())
      this.thumb.setEventListener(this.line.size(), this.line.side(), orientation, 'extra')
      this.thumb.setInitialSettings(this.line.size(), orientation, 'extra')
    }
    this.thumb.bindThumbChangedPos(this.partChanged)
    this.thumb.bindExtraThumbChangedPos(this.extraPartChanged)
    
  }

  initSatellite = (): void => {
    this.satellite = new Satellite()
    this.wrapper.returnAsHTML().append(this.satellite.returnAsHTML())
    
    if (this.options.thumbType === 'double'){
      this.satellite.initSatelliteExtra()
      this.wrapper.returnAsHTML().append(this.satellite.returnExtraAsHTML())
    }
  }
  
  initScale = (scaleElements: number[]): void => {
    this.scale = new Scale()
    this.line.returnAsHTML().after(this.scale.returnAsHTML())

    this.scale.bindScaleWasClicked(this.partChanged)
    if (this.options.thumbType === 'double'){
      this.scale.bindScaleWasClicked(this.changePositionForTheNearest)
    }
    this.scale.setScaleValues(scaleElements)
    
    if (this.options.orientation === 'vertical') {
      this.scale.setVertical()
    }
  }

  initProgress = (): void => {
    const orientation = this.options.orientation
    
    this.progress = new Progress()
    this.line.returnAsHTML().append(this.progress.returnAsHTML()) 
    this.progress.setInitialSettings(this.line.size(), orientation)
  }

  initInput = (): void => {
    this.input = new Input()
    this.line.returnAsHTML().after(this.input.returnAsHTML())
    this.input.bindValueWasChanged(this.valueChanged)

    if (this.options.thumbType === 'double'){
      this.input.initInputExtra()
      this.input.returnAsHTML().after(this.input.returnExtraAsHTML())
      this.input.bindValueExtraWasChanged(this.extraValueChanged)

    }
  }

  notify = (current: number, part: number, element: string): void => {
    const orientation = this.options.orientation

    if (element === 'primary'){
      this.part = part
    }

    if (element === 'extra'){
      this.partExtra = part
    }

    this.thumb.update(part, this.line.size(), orientation, element)
    this.options.input ? this.input.update(current, element) : ''
    this.options.progress ? this.progress.update(part, this.line.size(), orientation, element) : ''
    this.options.satellite ? this.satellite.update(part, current, this.line.size(), this.line.side(), this.thumb.size(), orientation, element) : ''
  }

  currentWasSentFromModel(current: number, part: number): void{
    const element = 'primary'
    this.notify(current, part, element)
  }

  extraCurrentWasSentFromModel(current: number, part: number): void{
    const element = 'extra'
    this.notify(current, part, element)
  }

  countDistance = (part: number, element: string): number => {
    const orientation = this.options.orientation
    return Math.abs(this.thumb.countCurrentPart(this.line.size(), orientation, element) - part)
  }

  changePositionForTheNearest = (part: number): void => {
    const distFromActionToPrimary = this.countDistance(part, 'primary')
    const distFromActionToExtra = this.countDistance(part, 'extra')

    if (distFromActionToPrimary > distFromActionToExtra){
      this.extraPartChanged(part)
    } else {
      this.partChanged(part)
    }
  }



  windowWasResized = (): void => {
    const orientation = this.options.orientation
    this.partChanged(this.part)

    this.thumb.setEventListener(this.line.size(), this.line.side(), orientation)

    if (this.options.thumbType === 'double'){
      this.thumb.setEventListener(this.line.size(), this.line.side(), orientation, 'extra')
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