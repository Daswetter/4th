
import { IModel, IView, IOptions } from '../types'

class Presenter{
  constructor(private View: IView, private Model: IModel) {
    this.bindView()
    this.bindModel()

    this.initView()
  }

  private bindView = (): void => {
    this.View.bindChangedPart(this.sendCurrentToModel)
    this.View.bindChangedExtraPart(this.sendExtraToModel)

    this.View.bindChangedCurrent(this.sendPartToModel)
    this.View.bindChangedExtraCurrent(this.sendExtraPartToModel)
  }

  private bindModel = (): void => {
    this.Model.bindChangedValues(this.sendCurrentToView)
    this.Model.bindChangedExtraValues(this.sendExtraToView)

    this.Model.bindChangedOptions(this.initNewView)
  }

  private initView = (): void => {
    this.View.initView(this.Model.countScaleElements())
  }
  
  private initNewView = (): void => {
    this.View.clearAllView()
    this.View.initView(this.Model.countScaleElements())
  }

  
  private sendCurrentToView = (current: number, part: number): void => {
    this.View.notifyPrimary(current, part)
  }
  private sendExtraToView = (current: number, part: number): void => {
    this.View.notifyExtra(current, part)
  }

  

  private sendCurrentToModel = (part: number) : void => {   
    this.Model.setCurrent(part)
  }
  private sendExtraToModel = (part: number) : void => {  
    const extra = true 
    this.Model.setCurrent(part, extra)
  }

  private sendPartToModel = (part: number) : void => { 
    this.Model.setPart(part)
  }
  private sendExtraPartToModel = (part: number) : void => {
    const extra = true    
    this.Model.setPart(part, extra)
  }

  

  public update = (options: IOptions): void => {
    this.Model.update(options)
  }

  public returnCurrentValues = (): Array<number> => {
    return [this.View.current, this.View.currentExtra]
  }
  public returnOptions = (): IOptions => {
    return this.Model.options
  }

}

export { Presenter }