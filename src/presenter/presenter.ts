
import { IModel } from '../model/IModel'

import { IView } from '../view/IView'
import './../interface/IOptions'


class Presenter{
  constructor(private View: IView, private Model: IModel) {

    this.View.bindSendPartToModel(this.sendPartTo)
    this.View.bindSendExtraPartToModel(this.sendExtraPartTo)
    this.View.bindSendValueToModel(this.sendValueTo)
    this.View.bindSendExtraValueToModel(this.sendExtraValueTo)

    

    this.Model.bindCurrentChanged(this.sendResultTo)
    this.Model.bindExtraCurrentChanged(this.sendExtraResultTo)
    this.View.initView(this.Model.countScaleElements())
    
    if (this.Model.getOptions().thumbType === 'double'){
      this.View.setExtraInitialPos(this.Model.setInitialPartForExtra)
    }
    this.View.setInitialPos(this.Model.setInitialPart)
  }

  sendResultTo = (res: number, part: number): void => {
    this.View.currentWasSentFromModel(res, part)
  }
  sendExtraResultTo = (res: number, part: number): void => {
    this.View.extraCurrentWasSentFromModel(res, part)
  }

  sendPartTo = (n: number) : void => {   
    this.Model.setCurrentValue(n)
  }
  sendExtraPartTo = (n: number) : void => {   
    this.Model.setCurrentValueForExtra(n)
  }

  sendValueTo = (n: number) : void => { 
    this.Model.setCurrentPart(n)
  }
  sendExtraValueTo = (n: number) : void => {   
    this.Model.setCurrentPartForExtra(n)
  }

}

export { Presenter }