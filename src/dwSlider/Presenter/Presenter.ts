
import { IModel, IView, IOptions } from '../../types'

class Presenter {
  constructor(public view: IView, public model: IModel) {
    this.bindView()
    this.bindModel()

    this.initView()
  }

  private bindView = (): void => {
    this.view.bindChangedPrimaryPart(this.sendPrimaryCurrentToModel)
    this.view.bindChangedExtraPart(this.sendExtraCurrentToModel)

    this.view.bindChangedPrimaryCurrent(this.sendPrimaryPartToModel)
    this.view.bindChangedExtraCurrent(this.sendExtraPartToModel)
  }

  private bindModel = (): void => {
    this.model.bindChangedPrimaryValues(this.sendPrimaryCurrentToView)
    this.model.bindChangedExtraValues(this.sendExtraCurrentToView)

    this.model.bindChangedOptions(this.initNewView)
  }

  private initView = (): void => {
    this.view.initView(this.model.countScaleElements())
  }
  
  private initNewView = (): void => {
    this.view.clearAllView()
    this.view.initView(this.model.countScaleElements())
  }

  
  private sendPrimaryCurrentToView = (current: number, part: number): void => {
    this.view.notifyPrimary(current, part)
  }
  private sendExtraCurrentToView = (current: number, part: number): void => {
    this.view.notifyExtra(current, part)
  }

  private sendPrimaryCurrentToModel = (part: number) : void => {  
    this.model.setCurrent(part)
  }
  private sendExtraCurrentToModel = (part: number) : void => {  
    const extra = true 
    this.model.setCurrent(part, extra)
  }

  private sendPrimaryPartToModel = (part: number) : void => { 
    this.model.setPart(part)
  }
  private sendExtraPartToModel = (part: number) : void => {
    const extra = true    
    this.model.setPart(part, extra)
  }

  public update = (options: IOptions): void => {
    this.model.update(options)
  }

  public returnCurrentValues = (): Array<number> => {
    return [this.view.current, this.view.currentExtra]
  }
  public returnOptions = (): IOptions => {
    return this.model.options
  }
}

export { Presenter }