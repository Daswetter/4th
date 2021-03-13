
import { IModel } from '../model/IModel'

import { IView } from '../view/IView'
import './../interface/IOptions'


class Presenter{
  constructor(private View: IView, private Model: IModel) {

    this.View.bindSendPartToModel(this.sendPartTo)
    this.View.bindSendExtraPartToModel(this.sendExtraPartTo)

    

    this.Model.bindCurrentChanged(this.sendResultTo)
    this.Model.bindExtraCurrentChanged(this.sendExtraResultTo)
    this.View.initView(this.Model.countScaleElements())
    
    if (this.Model.getOptions().thumbType === 'double'){
      this.View.setExtraInitialPos(this.Model.setInitialPartForExtra)
    }
    this.View.setInitialPos(this.Model.setInitialPart)
  }

  sendResultTo = (res: number): void => {
    this.View.currentWasSentFromModel(res)
  }
  sendExtraResultTo = (res: number): void => {
    this.View.extraCurrentWasSentFromModel(res)
  }

  sendPartTo = (n: number) : void => {   
    this.Model.setCurrentValue(n)
  }
  sendExtraPartTo = (n: number) : void => {   
    this.Model.setCurrentValueForExtra(n)
  }

}

export { Presenter }