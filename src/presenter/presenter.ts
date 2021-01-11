import { Model } from './../model/model'
import { View } from './../view/view'
export class Presenter {
  constructor(private View: View, private Model: Model) {
    this.View.testViewMethod(this.testInput)
    
    
  }
  testInput = (n: number) => {
    return this.Model.giveNum(n)
  }
}