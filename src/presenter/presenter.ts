import { Model } from './../model/model'
import { View } from './../view/view'
export class Presenter{
  constructor(private View: View, private Model: Model) {
    this.Model.bindStatusChanged(this.update)
    this.View.thumbMoving(this.bindSetValue) 

  }
  
  update = (res: number): void => {
    this.View.displayCurrentValue(res)
  }
  bindSetValue = (n: number) : void => {   
    this.Model.setValue(n)
  }
}