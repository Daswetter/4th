import { Model } from './../model/model'
import { View } from './../view/view'
export class Presenter{
  constructor(private View: View, private Model: Model, private options: object) {
    this.options = options
    this.Model.bindStatusChanged(this.update)
    this.View.testForNum(this.bindSetValue)
    // this.mainView.displayMovingHandle(this.handleValue)
    
  }
  
  update = (res: number): void => {
    this.View.testForObserver(res)
  }
  bindSetValue = () : void => {   
    this.Model.setValue()
  }
  // handleValue = () : number => {
  //   return this.Model.setValue()
  // }
  get getOptions() : object{
    return this.options
  }
}