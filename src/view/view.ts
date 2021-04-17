import { Wrapper } from './subviews/wrapper/wrapper'
import { Line } from './subviews/line/line'
import { Thumb } from './subviews/thumb/thumb'
import { Progress } from './subviews/progress/progress'
import { Scale } from './subviews/scale/scale'
import { Satellite } from './subviews/satellite/satellite'
import { Input } from './subviews/input/input'

import { IOptions } from './../interface/IOptions'
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
  current!: number
  currentExtra!: number

  private partChanged!: (arg0: number) => void
  private extraPartChanged!: (arg0: number) => void

  private currentChanged!: (arg0: number) => void
  private extraCurrentChanged!: (arg0: number) => void

  constructor(private initElement: HTMLElement, private options: IOptions) {
    this.options = options
    this.initElement = initElement
    
  }

  public initView = (scaleElements: number[], options = this.options): void => {
    this.options = options
    
    this.initWrapper()
    this.initLine()
    this.initThumb()
    
    this.options.satellite ? this.initSatellite(): ''
    this.options.progress ? this.initProgress() : ''
    this.initInput()
    this.options.scale ? this.initScale(scaleElements): ''
    
    this.currentChanged(this.options.from)
    if (this.options.double){
      this.extraCurrentChanged(this.options.to as number)
    }

    window.addEventListener('resize', this.initElementsForResized)
    
  }

  private initWrapper = (): void => {
    this.wrapper = new Wrapper()
    
    this.initElement.append(this.wrapper.returnAsHTML())
    if (this.options.vertical){
      this.wrapper.setVertical()
    }
  }

  private initLine = () : void => {
    this.line = new Line()
    
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

  private initThumb = () : void => {
    let elementName = 'primary'
    this.thumb = new Thumb() 
    this.line.returnAsHTML().append(this.thumb.returnAsHTML())
    
    
    this.thumb.setEventListener(this.line.size(), this.line.side(), this.options.vertical, elementName)
    this.thumb.setInitialSettings(this.line.size(), this.options.vertical)
    this.thumb.bindChangedState(this.partChanged)

    if (this.options.double){
      elementName = 'extra'
      this.thumb.initExtraElement()
      this.line.returnAsHTML().append(this.thumb.returnExtraAsHTML())
      this.thumb.setEventListener(this.line.size(), this.line.side(), this.options.vertical, elementName)
      this.thumb.setInitialSettings(this.line.size(), this.options.vertical, elementName)
      this.thumb.bindExtraChangedPosition(this.extraPartChanged)
    }    
    
  }

  private initSatellite = (): void => {
    this.satellite = new Satellite()
    this.line.returnAsHTML().append(this.satellite.returnAsHTML())
    
    if (this.options.double){
      this.satellite.initExtraElement()
      this.line.returnAsHTML().append(this.satellite.returnExtraAsHTML())
    }
  }
  
  private initScale = (scaleElements: number[]): void => {
    this.scale = new Scale()
    this.line.returnAsHTML().after(this.scale.returnAsHTML())
    this.scale.bindChangedState(this.partChanged)
    
    if (this.options.vertical) {
      this.scale.setVertical()
    }
    if (this.options.double){
      this.scale.bindChangedState(this.changePositionForTheNearest)
    }
    this.scale.setScaleValues(scaleElements)
  }

  private initProgress = (): void => {
    this.progress = new Progress()
    this.line.returnAsHTML().append(this.progress.returnAsHTML()) 
    if (this.options.vertical){
      this.progress.setVertical()
    }
    this.progress.setInitialSettings(this.line.size(), this.options.vertical)
    
  }

  private initInput = (): void => {
    this.input = new Input()
    this.input.bindChangedState(this.currentChanged)
    
    if (this.options.double){
      this.input.initInputExtra()
      this.input.bindExtraChangedPosition(this.extraCurrentChanged)
    }
  }

  public clearAllView = (): void => {
    this.wrapper.returnAsHTML().remove()
  }

  private notify = (current: number, part: number, element: string): void => {
    
    if (element === 'primary'){
      this.part = part
      this.current = current
    }

    if (element === 'extra'){
      this.partExtra = part
      this.currentExtra = current
    }

    this.thumb.update(part, this.line.size(), this.options.vertical, element)
    this.options.input ? this.input.update(current, element) : ''
    this.options.progress ? this.progress.update(part, this.line.size(), this.options.vertical, element) : ''
    this.options.satellite ? this.satellite.update(part, current, this.line.size(), this.line.side(), this.thumb.size(), this.options.vertical, element) : ''
  }

  public notifyPrimaryElement(current: number, part: number): void{
    const element = 'primary'
    this.notify(current, part, element)
  }

  public notifyExtraElement(current: number, part: number): void{
    const element = 'extra'
    this.notify(current, part, element)
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


    if (this.options.double){
      element = 'extra'
      this.extraPartChanged(this.partExtra)
      this.thumb.setEventListener(this.line.size(), this.line.side(), this.options.vertical, element)
    }

    
  }
  update = (options: IOptions): void => {
    this.options = options
  }


  public bindChangedPart = (callback: (arg0: number) => void):void  =>  {
    this.partChanged = callback
  }
  public bindChangedExtraPart = (callback: (arg0: number) => void):void  =>  {
    this.extraPartChanged = callback
  }
  public bindChangedCurrent = (callback: (arg0: number) => void):void  =>  {
    this.currentChanged = callback
  }
  public bindChangedExtraCurrent = (callback: (arg0: number) => void):void  =>  {
    this.extraCurrentChanged = callback
  }
}

export {View}