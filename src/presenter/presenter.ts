
import { IModel } from '../model/IModel'
import { IView } from '../view/IView'
import './../interface/IOptions'


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

    this.Model.bindChangedScaleElements(this.sendScaleElementsToView)


  }

  private initView = (): void => {
    this.View.initView(this.Model.countScaleElements())
  }

  
  private sendCurrentToView = (current: number, part: number): void => {
    this.View.notifyPrimaryElement(current, part)
  }
  private sendExtraToView = (current: number, part: number): void => {
    this.View.notifyExtraElement(current, part)
  }

  private sendScaleElementsToView = (scaleElements: Array<number>): void => {
    this.View.notifyScale(scaleElements)
  }
  

  private sendCurrentToModel = (part: number) : void => {   
    this.Model.setCurrent('primary', part)
  }
  private sendExtraToModel = (part: number) : void => {   
    this.Model.setCurrent('extra', part)
  }

  private sendPartToModel = (part: number) : void => { 
    this.Model.setPart('primary', part)
  }
  private sendExtraPartToModel = (part: number) : void => {   
    this.Model.setPart('extra', part)
  }

}

export { Presenter }