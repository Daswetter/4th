import { IOptions } from './../interface/IOptions'

import { Wrapper } from './subViews/wrapper/wrapper'
import { Line } from './subViews/line/line'
import { Thumb } from './subViews/thumb/thumb'
import { Progress } from './subViews/progress/progress'
import { Scale } from './subViews/scale/scale'
import { Satellite } from './subViews/satellite/satellite'
import { Input } from './subViews/input/input'
import { BoundaryLabels } from './subViews/boundaryLabels/boundaryLabels'

import { IView } from './IView'

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
    this.initBoundaryLabels(this.line.returnAsHTML())
    // ? What if input doest exist
    this.initInput()

    this.options.satellite ? this.initSatellite(this.line.returnAsHTML()): ''
    this.options.progress ? this.initProgress(this.line.returnAsHTML()) : ''
    this.options.scale ? this.initScale(this.line.returnAsHTML(), scaleElements): ''
    
    this.currentChanged(this.options.from)
    this.options.double ? this.extraCurrentChanged(this.options.to as number): ''
    
    window.addEventListener('resize', this.handleWindowResizing)
  }

  private initWrapper = (initElement: HTMLElement): void => {
    this.wrapper = new Wrapper(initElement)
    this.initElement.append(this.wrapper.returnAsHTML())
    this.wrapper.setInitialSettings(this.options.vertical)
  }

  private initLine = (initElement: HTMLElement) : void => {
    this.line = new Line(initElement)
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())
    this.line.setInitialSettings(this.options.vertical)

    this.line.setEventListener(this.options.vertical)
    this.line.bindChangedState(this.partChanged)

    if (this.options.double){
      this.line.bindChangedState(this.changePositionForTheNearest)
    }
    
  }

  private initThumb = (initElement: HTMLElement) : void => {
    this.thumb = new Thumb(initElement) 
    
    this.thumb.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical)
    this.thumb.setInitialSettings(this.line.returnSize(), this.options.vertical)
    this.thumb.bindChangedState(this.partChanged)

    if (this.options.double){
      this.thumb.initExtra(initElement)
      const extra = true
      this.thumb.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical, extra)
      this.thumb.setInitialSettings(this.line.returnSize(), this.options.vertical, extra)
      this.thumb.bindExtraChangedState(this.extraPartChanged)
    }    
    
  }

  private initSatellite = (initElement: HTMLElement): void => {
    this.satellite = new Satellite(initElement)
    this.satellite.setInitialSettings(this.line.returnSize().width, this.thumb.returnSize(), this.options.vertical, this.options.min)

    if (this.options.double){
      this.satellite.initExtra(initElement)
      const extra = true
      this.satellite.setInitialSettings(this.line.returnSize().width, this.thumb.returnSize(), this.options.vertical, this.options.max, extra)
    }
  }
  
  private initScale = (initElement: HTMLElement, scaleElements: { [key: string]: string }): void => {
    this.scale = new Scale(initElement)
    if (this.options.double){
      this.scale.bindChangedState(this.changePositionForTheNearest)
    } else {
      this.scale.bindChangedState(this.partChanged)
    }
    this.scale.initScale(scaleElements, this.line.returnSize(), this.options.vertical)
  }

  private initProgress = (initElement: HTMLElement): void => {
    this.progress = new Progress(initElement)
    this.progress.setInitialSettings(this.line.returnSize(), this.options.vertical)
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
    this.boundaryLabels.setInitialSettings(this.options.min, this.options.max, this.line.returnSize().width, this.thumb.returnSize(), this.options.vertical)
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

    this.thumb.update(part, this.line.returnSize(), this.options.vertical, extra)
    this.input.update(current, extra)
    this.options.progress ? this.progress.update(part, this.line.returnSize(), this.options.vertical, extra) : ''

    if (this.options.satellite) {
      this.satellite.update(part, current, this.line.returnSize(), this.thumb.returnSize(), this.options.vertical, this.options.double, extra)

      if (this.options.double) {
        this.boundaryLabels.update(this.satellite.returnPrimaryParameters(), this.options.vertical, this.satellite.returnExtraParameters())
      } else {
        this.boundaryLabels.update(this.satellite.returnPrimaryParameters(), this.options.vertical)
      }
    }
  }

  public notifyPrimary(current: number, part: number): void{
    this.notify(current, part)
  }

  public notifyExtra(current: number, part: number): void{
    const extra = true
    this.notify(current, part, extra)
  }

  private countDistance = (part: number, extra = false): number => {
    let currentPart = this.part
    if (extra){
      currentPart = this.partExtra
    }
    const dist = Math.abs(currentPart - part)
    return dist
  }

  private changePositionForTheNearest = (part: number): void => {
    const distFromActionToPrimary = this.countDistance(part)
    const extra = true
    const distFromActionToExtra = this.countDistance(part, extra)

    if (distFromActionToPrimary > distFromActionToExtra){
      this.extraPartChanged(part)
    } else {
      this.partChanged(part)
    }
  }



  private handleWindowResizing = (): void => {
    this.partChanged(this.part)
    this.thumb.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical)
    this.options.scale ? this.scale.setPosition(this.line.returnSize(), this.options.vertical) : ''


    if (this.options.double){
      this.extraPartChanged(this.partExtra)
      const extra = true
      this.thumb.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical, extra)
    }
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