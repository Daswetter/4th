import { Wrapper } from './subviews/wrapper/wrapper'
import { Line } from './subviews/line/line'
import { Thumb } from './subviews/thumb/thumb'
import { Progress } from './subviews/progress/progress'
import { Scale } from './subviews/scale/scale'
import { Satellite } from './subviews/satellite/satellite'
import { Input } from './subviews/input/input'

import { IOptions } from './../interface/IOptions'
import { IView } from './IView'
import { SubView } from './subviews/SubView'

class View extends IView { 
  wrapper!: Wrapper
  line!: Line
  thumb!: Thumb 
  progress!: Progress
  scale!: Scale 
  satellite!: Satellite
  input!: Input

  part!: number
  partExtra!: number

  constructor(private initElement: HTMLElement, private options: IOptions) {
    super()
    this.options = options
    this.initElement = initElement
    
  }

  public initView = (scaleElements: number[]): void => {
    
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

    window.addEventListener('resize', this.initElementsForResized)
  }

  private initWrapper = (): void => {
    this.wrapper = new Wrapper()
    
    this.initElement.append(this.wrapper.returnAsHTML())
    if (this.options.orientation === 'vertical'){
      this.wrapper.setVertical()
    }
  }

  private initLine = () : void => {
    const orientation = this.options.orientation

    this.line = new Line()
    
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML())
    this.line.setEventListener(orientation)
    this.add(this.line, 'primary', 'part')

    if (this.options.thumbType === 'double'){
      this.line.bindChangedPosition(this.changePositionForTheNearest)
    }
    
  }

  private initThumb = () : void => {
    const orientation = this.options.orientation 
    let elementName = 'primary'
    this.thumb = new Thumb() 
    this.line.returnAsHTML().append(this.thumb.returnAsHTML())
    
    
    this.thumb.setEventListener(this.line.size(), this.line.side(), orientation, elementName)
    this.thumb.setInitialSettings(this.line.size(), orientation)
    this.add(this.thumb, elementName, 'part')

    if (this.options.thumbType === 'double'){
      elementName = 'extra'
      this.thumb.initExtraElement()
      this.line.returnAsHTML().append(this.thumb.returnExtraAsHTML())
      this.thumb.setEventListener(this.line.size(), this.line.side(), orientation, elementName)
      this.thumb.setInitialSettings(this.line.size(), orientation, elementName)
      this.add(this.thumb, elementName, 'part')
    }    
    
  }

  private initSatellite = (): void => {
    this.satellite = new Satellite()
    this.wrapper.returnAsHTML().append(this.satellite.returnAsHTML())
    
    if (this.options.thumbType === 'double'){
      this.satellite.initExtraElement()
      this.wrapper.returnAsHTML().append(this.satellite.returnExtraAsHTML())
    }
  }
  
  private initScale = (scaleElements: number[]): void => {
    this.scale = new Scale()
    this.line.returnAsHTML().after(this.scale.returnAsHTML())
    this.add(this.scale, 'primary', 'part')
    
    
    if (this.options.orientation === 'vertical') {
      this.scale.setVertical()
    }
    if (this.options.thumbType === 'double'){
      this.scale.bindChangedPosition(this.changePositionForTheNearest)
    }
    this.scale.setScaleValues(scaleElements)
  }

  private initProgress = (): void => {
    const orientation = this.options.orientation
    
    this.progress = new Progress()
    this.line.returnAsHTML().append(this.progress.returnAsHTML()) 
    this.progress.setInitialSettings(this.line.size(), orientation)
  }

  private initInput = (): void => {
    this.input = new Input()
    this.line.returnAsHTML().after(this.input.returnAsHTML())
    this.add(this.input, 'primary', 'value')
    
    if (this.options.thumbType === 'double'){
      this.input.initInputExtra()
      this.input.returnAsHTML().after(this.input.returnExtraAsHTML())
      this.add(this.scale, 'extra', 'value')
    }
  }

  private notify = (current: number, part: number, element: string): void => {
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
    const orientation = this.options.orientation
    let element = 'primary'
    this.partChanged(this.part)
    this.thumb.setEventListener(this.line.size(), this.line.side(), orientation, element)


    if (this.options.thumbType === 'double'){
      element = 'extra'
      this.extraPartChanged(this.partExtra)
      this.thumb.setEventListener(this.line.size(), this.line.side(), orientation, element)
    }

    
  }
}

export {View}