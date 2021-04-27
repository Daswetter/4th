import { Wrapper } from './subViews/wrapper/wrapper'
import { Line } from './subViews/line/line'
import { Thumb } from './subViews/thumb/thumb'
import { Progress } from './subViews/progress/progress'
import { Scale } from './subViews/scale/scale'
import { Satellite } from './subViews/satellite/satellite'
import { Input } from './subViews/input/input'

import { IOptions } from './../interface/IOptions'
import { IView } from './IView'
import { BoundaryLabels } from './subViews/boundaryLabels/boundaryLabels'
class View implements IView { 
  public wrapper!: Wrapper
  public line!: Line
  public thumb!: Thumb 
  public progress!: Progress
  public scale!: Scale 
  public satellite!: Satellite
  public input!: Input
  public boundaryLabels!: BoundaryLabels

  public part!: number
  public partExtra!: number
  public current!: number
  public currentExtra!: number

  private partChanged!: (part: number) => void
  private extraPartChanged!: (partExtra: number) => void

  private currentChanged!: (current: number) => void
  private extraCurrentChanged!: (currentExtra: number) => void

  constructor(private initElement: HTMLElement, public options: IOptions) {
    this.options = options
    this.initElement = initElement
  }

  public initView = (scaleElements: { [key: string]: string }, options = this.options): void => {
    this.options = options
    
    this.initWrapper(this.initElement)
    this.initLine(this.wrapper.returnAsHTML())
    this.initThumb(this.line.returnAsHTML())
    
    this.options.satellite ? this.initSatellite(this.line.returnAsHTML()): ''
    this.options.progress ? this.initProgress(this.line.returnAsHTML()) : ''
    this.initInput()
    this.options.scale ? this.initScale(this.line.returnAsHTML(), scaleElements): ''
    this.initBoundaryLabels(this.line.returnAsHTML())
  
    
    this.currentChanged(this.options.from)
    if (this.options.double){
      this.extraCurrentChanged(this.options.to as number)
    }

    window.addEventListener('resize', this.initElementsForResized)
    
  }

  private initWrapper = (initElement: HTMLElement): void => {
    this.wrapper = new Wrapper(initElement)
    
    this.initElement.append(this.wrapper.returnAsHTML())
    if (this.options.vertical){
      this.wrapper.setVertical()
    }
  }

  private initLine = (initElement: HTMLElement) : void => {
    this.line = new Line(initElement)
    
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())
    if (this.options.vertical){
      this.line.setVertical()
    }
    this.line.setEventListener(this.options.vertical)
    this.line.bindChangedState(this.partChanged)

    
    if (this.options.double){
      this.line.bindChangedState(this.changePositionForTheNearest)
    }
    
  }

  private initThumb = (initElement: HTMLElement) : void => {
    let elementName = 'primary'
    this.thumb = new Thumb(initElement) 
    
    
    this.thumb.setEventListener(this.line.size(), this.line.side(), this.options.vertical, elementName)
    this.thumb.setInitialSettings(this.line.size(), this.options.vertical)
    this.thumb.bindChangedState(this.partChanged)

    if (this.options.double){
      elementName = 'extra'
      this.thumb.initExtraElement(initElement)
      this.thumb.setEventListener(this.line.size(), this.line.side(), this.options.vertical, elementName)
      this.thumb.setInitialSettings(this.line.size(), this.options.vertical, elementName)
      this.thumb.bindExtraChangedState(this.extraPartChanged)
    }    
    
  }

  private initSatellite = (initElement: HTMLElement): void => {
    this.satellite = new Satellite(initElement)
    this.satellite.setInitialSettingsToPrimary(this.line.size().width, this.thumb.size(), this.options.vertical, this.options.min)

    if (this.options.double){
      this.satellite.initExtra(initElement)
      this.satellite.setInitialSettingsToExtra(this.line.size().width, this.thumb.size(), this.options.vertical, this.options.max)
    }
  }
  
  private initScale = (initElement: HTMLElement, scaleElements: { [key: string]: string }): void => {
    this.scale = new Scale(initElement)
    this.scale.bindChangedState(this.partChanged)
    this.scale.initScale(scaleElements, this.line.size(), this.options.vertical)

    if (this.options.double){
      this.scale.bindChangedState(this.changePositionForTheNearest)
    }
    
  }

  private initProgress = (initElement: HTMLElement): void => {
    this.progress = new Progress(initElement) 
    if (this.options.vertical){
      this.progress.setVertical()
    }
    this.progress.setInitialSettings(this.line.size(), this.options.vertical)
    
  }

  private initInput = (): void => {
    this.input = new Input(this.initElement)
    this.input.bindChangedState(this.currentChanged)
    
    if (this.options.double){
      this.input.initExtra()
      this.input.bindExtraChangedState(this.extraCurrentChanged)
    }
  }

  private initBoundaryLabels = (initElement: HTMLElement): void => {
    this.boundaryLabels = new BoundaryLabels(initElement)
    this.boundaryLabels.setInitialSettings(this.options.min, this.options.max, this.satellite.returnPrimaryParameters().top, this.line.size().width, this.thumb.size().width, this.options.vertical)
  }

  public clearAllView = (): void => {
    this.wrapper.returnAsHTML().remove()
  }

  private notify = (current: number, part: number, extra = false): void => {
    
    if (extra) {
      this.partExtra = part
      this.currentExtra = current
    } else {
      this.part = part
      this.current = current
    }

    this.thumb.update(part, this.line.size(), this.options.vertical, extra)
    this.input.update(current, extra)
    this.options.progress ? this.progress.update(part, this.line.size(), this.options.vertical, extra) : ''
    this.options.satellite ? this.satellite.update(part, current, this.line.size(), this.thumb.size(), this.options.vertical, this.options.double, extra) : ''

    if (this.options.double) {
      this.boundaryLabels.update(this.satellite.returnPrimaryParameters(), this.options.vertical, this.satellite.returnExtraParameters())
    } else {
      this.boundaryLabels.update(this.satellite.returnPrimaryParameters(), this.options.vertical)
    }
    
    
  }

  public notifyPrimaryElement(current: number, part: number): void{
    this.notify(current, part)
  }

  public notifyExtraElement(current: number, part: number): void{
    const extra = true
    this.notify(current, part, extra)
    
  }

  private countDistance = (part: number, element: string): number => {
    let currentPart = this.part
    if (element === 'extra'){
      currentPart = this.partExtra
    }
    const dist = Math.abs(currentPart - part)
    return dist
  }

  private changePositionForTheNearest = (part: number): void => {
    const distFromActionToPrimary = this.countDistance(part, 'primary')
    const distFromActionToExtra = this.countDistance(part, 'extra')

    if (distFromActionToPrimary > distFromActionToExtra){
      this.extraPartChanged(part)
    } else {
      this.partChanged(part)
    }
  }



  private initElementsForResized = (): void => {
    let element = 'primary'
    this.partChanged(this.part)
    this.thumb.setEventListener(this.line.size(), this.line.side(), this.options.vertical, element)
    this.options.scale ? this.scale.setPosition(this.line.size(), this.options.vertical) : ''


    if (this.options.double){
      element = 'extra'
      this.extraPartChanged(this.partExtra)
      this.thumb.setEventListener(this.line.size(), this.line.side(), this.options.vertical, element)
    }

    
  }
  public update = (options: IOptions): void => {
    this.options = options
  }


  public bindChangedPart = (callback: (part: number) => void):void  =>  {
    this.partChanged = callback
  }
  public bindChangedExtraPart = (callback: (partExtra: number) => void):void  =>  {
    this.extraPartChanged = callback
  }
  public bindChangedCurrent = (callback: (current: number) => void):void  =>  {
    this.currentChanged = callback
  }
  public bindChangedExtraCurrent = (callback: (currentExtra: number) => void):void  =>  {
    this.extraCurrentChanged = callback
  }
}

export { View }