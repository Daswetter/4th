import { Model } from './../model/model'
import { View } from './../view/view'
export class Presenter {
  constructor(private View: View, private Model: Model, private options: object) {
    this.options = options
    this.View.displayMovingHandle(this.handleValue)
  }

  handleValue = () : number => {
    return this.Model.setValue()
  }
  get getOptions() : object{
    return this.options
  }
}