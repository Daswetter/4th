import { IOptions, IView, Mediator } from '../../types'
import { Wrapper } from './Subviews/Wrapper/Wrapper'
import { Line } from './Subviews/Line/Line'
import { Thumb } from './Subviews/Thumb/Thumb'
import { Progress } from './Subviews/Progress/Progress'
import { Scale } from './Subviews/Scale/Scale'
import { Tip } from './Subviews/Tip/Tip'
import { Input } from './Subviews/Input/Input'
import { BoundaryLabels } from './Subviews/BoundaryLabels/BoundaryLabels'

class View implements IView { 
  public mediator!: Mediator
  public wrapper!: Wrapper
  public line!: Line
  public thumb!: Thumb 
  public progress!: Progress
  public scale!: Scale 
  public tip!: Tip
  public input!: Input
  public boundaryLabels!: BoundaryLabels

  public part!: number
  public partExtra!: number
  public current!: number
  public currentExtra!: number

  constructor(public initElement: HTMLElement, public options: IOptions) {
    this.options = options
    this.initElement = initElement
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  public initView = (scaleElements: { [key: string]: string }, options = this.options): void => {
    this.options = options
    
    this.initWrapper(this.initElement)
    this.initLine(this.wrapper.returnAsHTML())
    this.initThumb(this.line.returnAsHTML())
    this.initBoundaryLabels(this.line.returnAsHTML())
    this.doesInputExist() ? this.initInput() : ''

    this.options.tip ? this.initTip(this.line.returnAsHTML()): ''
    this.options.progress ? this.initProgress(this.line.returnAsHTML()) : ''
    this.options.scale ? this.initScale(this.line.returnAsHTML(), scaleElements): ''
    
    this.mediator.notify({value: this.options.from, current: true, extra: false}, 'data were sent from View')
    this.options.double ? this.mediator.notify({value: this.options.to as number, current: true, extra: true}, 'data were sent from View') : ''
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
    this.line.setMediator(this)
  }

  private initThumb = (initElement: HTMLElement) : void => {
    this.thumb = new Thumb(initElement) 
    
    this.thumb.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical)
    this.thumb.setInitialSettings(this.line.returnSize(), this.options.vertical)
    this.thumb.setMediator(this)

    if (this.options.double){
      this.thumb.initExtra(initElement)
      const extra = true
      this.thumb.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical, extra)
      this.thumb.setInitialSettings(this.line.returnSize(), this.options.vertical, extra)
    }    
    
  }

  private initTip = (initElement: HTMLElement): void => {
    
    this.tip = new Tip(initElement)
    
    this.tip.setInitialSettings(this.line.returnSize().width, this.thumb.returnSize(), this.options.vertical, this.options.min)
    
    const extra = false
    this.tip.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical, extra)
    this.tip.setMediator(this)

    if (this.options.double){
      
      this.tip.initExtra(initElement)
      const extra = true
      this.tip.setInitialSettings(this.line.returnSize().width, this.thumb.returnSize(), this.options.vertical, this.options.max, extra)
      this.tip.setEventListener(this.line.returnSize(), this.line.returnSide(), this.options.vertical, extra)
      this.tip.setEventListenerForUnited(this.line.returnSize(), this.line.returnSide(), this.options.vertical)
    }
  }
  
  private initScale = (initElement: HTMLElement, scaleElements: { [key: string]: string }): void => {
    this.scale = new Scale(initElement, this)
    this.scale.setMediator(this)
    this.scale.initScale(scaleElements, this.line.returnSize(), this.options.vertical)
  }

  private initProgress = (initElement: HTMLElement): void => {
    this.progress = new Progress(initElement)
    this.progress.setInitialSettings(this.line.returnSize(), this.options.vertical)
  }

  private doesInputExist = (extra = false): boolean => {
    let inputClass = '.js-dwSlider__input_from'
    if (extra) {
      inputClass = '.js-dwSlider__input_to'
    }
    const input: HTMLInputElement | null = this.initElement.querySelector(inputClass)
    if (input) {
      return true
    } 
    return false
  }

  private initInput = (): void => {
    this.input = new Input(this.initElement)
    this.input.setMediator(this)
    const extra = true
    if (this.options.double && this.doesInputExist(extra)){
      this.input.initExtra()
    }
  }

  private initBoundaryLabels = (initElement: HTMLElement): void => {
    this.boundaryLabels = new BoundaryLabels(initElement)
    this.boundaryLabels.setInitialSettings(this.options.min, this.options.max, this.line.returnSize().width, this.thumb.returnSize(), this.options.vertical)
  }

  public clearAllView = (): void => {
    this.wrapper.returnAsHTML().remove()
  }

  public sendDataToSubviews = (current: number, part: number, extra = false): void => {
    
    if (extra) {
      this.partExtra = part
      this.currentExtra = current
      this.options.to = current
    } else {
      this.part = part
      this.current = current
      this.options.from = current
    }

    this.thumb.update(part, this.line.returnSize(), this.options.vertical, extra)

    let doesInputsExist = (extra && this.doesInputExist(extra)) || (!extra && this.doesInputExist())
    
    doesInputsExist ? this.input.update(current, extra): ''
    
    this.options.progress ? this.progress.update(part, this.line.returnSize(), this.options.vertical, extra) : ''

    if (this.options.tip) {
      this.tip.update(part, current, this.line.returnSize(), this.thumb.returnSize(), this.options.vertical, this.options.double, extra)

      if (this.options.double) {
        this.boundaryLabels.update(this.tip.returnPrimaryParameters(), this.options.vertical, this.tip.returnExtraParameters())
      } else {
        this.boundaryLabels.update(this.tip.returnPrimaryParameters(), this.options.vertical)
      }
    }
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
      this.mediator.notify({ value: part, current: false, extra: true }, 'data were sent from View')
    } else {
      this.mediator.notify({ value: part, current: false, extra: false }, 'data were sent from View')
    }
  }

  public notify = (data: {value: number, current: boolean, extra: boolean, nearest: boolean}): void => {
    if (data.nearest) {
      this.changePositionForTheNearest(data.value)
    } else {
      this.mediator.notify({ value: data.value, current: data.current, extra: data.extra }, 'data were sent from View')
    }
  }
}

export { View }