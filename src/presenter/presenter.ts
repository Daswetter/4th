import { Model } from './../model/model'
import { IModel } from './../interface/IModel'

import { View } from './../view/view'
import { IView } from './../interface/IView'
import './../interface/IOptions'


class Presenter{
  constructor(private View: IView, private Model: IModel) {
    
    this.Model.countInitialPart()
    this.Model.bindScaleElements(this.bindSetScaleElements)
    this.Model.countScaleElements()

    this.Model.bindStatusChanged(this.updateTest)
    


    this.View.setInitialPos(this.Model.countInitialPart)
    this.View.bindSendPartToModel(this.bindSetCurrentValue)
    
    this.sendOptionsToView(this.Model.getOptions)


  }

  updateTest = (res: number): void => {
    this.View.displayCurrentValue(res)
  }

  bindSetScaleElements = (elements: Array<number>): void => {
    this.View.setScaleElements(elements)
  }

  bindSetCurrentValue = (n: number) : void => {   
    this.Model.setCurrentValue(n)
  }
  sendOptionsToView = (options: IOptions): void => {
    this.View.setOptions(options)
  } 

}

export { Presenter }