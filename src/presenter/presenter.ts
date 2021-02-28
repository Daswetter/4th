import { Model } from './../model/model'
import { IModel } from '../model/IModel'

import { View } from './../view/view'
import { IView } from '../view/IView'
import './../interface/IOptions'


class Presenter{
  constructor(private View: IView, private Model: IModel) {
    this.View.setScaleElements(this.Model.countScaleElements())
    // this.View.setInitialPos(this.Model.countInitialPart, this.Model.getOptions)
    this.View.bindSendPartToModel(this.sendPartTo)
    
    this.Model.bindCurrentChanged(this.sendResultTo)
  }

  sendResultTo = (res: number): void => {
    this.View.currentWasSentFromModel(res)
  }

  sendPartTo = (n: number) : void => {   
    this.Model.countCurrentValue(n)
  }

}

export { Presenter }