
import { IModel, IView, IOptions, Mediator} from '../../types'

class Presenter implements Mediator{
  constructor(public view: IView, public model: IModel) {
    this.view.setMediator(this)
    this.model.setMediator(this)

    this.view.initView(this.model.countScaleElements())
  }

  public notify = (data: any, event: string): void => {
    if (event === 'current and part were sent from Model' ) {
      this.view.sendDataToSubviews(data.current, data.part, data.extra)
    }

    if (event === 'options were sent from Model') {
      this.view.clearAllView()
      this.view.initView(data.scaleElements)
    }

    if (event === 'data were sent from View') {
      if (data.current) {
        this.model.setPart(data.value, data.extra)
      } else {
        this.model.setCurrent(data.value, data.extra)
      }
    }
  } 

  public update = (options: IOptions): void => {
    this.model.update(options)
  }

  public returnCurrentValues = (): Array<number> => {
    return [this.view.current, this.view.currentExtra]
  }
  public returnOptions = (): IOptions => {
    return this.model.options
  }
}

export { Presenter }