import { Model } from './../model/model'
import { View } from './../view/view'

class Presenter{
  constructor(private View: View, private Model: Model) {
    this.Model.bindStatusChanged(this.update)
    this.View.bindSendPartToModel(this.bindSetCurrentValue)
    // this.Thumb.moveThumbByClicking(this.bindSetCurrentValue) 
    // this.View.moveThumbByDragAndDrop()
  
  }
  
  update = (res: number): void => {
    this.View.displayCurrentValue(res)
  }

  bindSetCurrentValue = (n: number) : void => {   
    this.Model.setCurrentValue(n)
  }
}

export { Presenter }