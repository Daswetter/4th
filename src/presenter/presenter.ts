import { Model } from './../model/model'
import { View } from './../view/view'

class Presenter{
  constructor(private View: View, private Model: Model) {
    this.Model.getOptions
    this.Model.bindStatusChanged(this.update)
    this.Model.bindInitialValue(this.sendInitialValue)


    this.View.bindSendPartToModel(this.bindSetCurrentValue)
    
    // this.Thumb.moveThumbByClicking(this.bindSetCurrentValue) 
    // this.View.moveThumbByDragAndDrop()
    
  
  }
  sendInitialValue = (part: number): void => {
    this.View.setInitialPos(part)
  }
  update = (res: number): void => {
    this.View.displayCurrentValue(res)
  }

  bindSetCurrentValue = (n: number) : void => {   
    this.Model.setCurrentValue(n)
  }
}

export { Presenter }