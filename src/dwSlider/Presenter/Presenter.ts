import { IOptions, Observer } from '../../types';
import View from '../View/View';
import Model from '../Model/Model';

class Presenter implements Observer {
  constructor(public view: View, public model: Model) {
    this.view.subscribe(this);
    this.model.subscribe(this);

    this.view.initView(this.model.countScaleElements());
  }

  public update = (arg0: { data: any, event: string }): void => {
    if (arg0.event === 'current and part were sent from Model') {
      this.view.sendDataToSubviews(arg0.data.current, arg0.data.part, arg0.data.extra);
    }

    if (arg0.event === 'options were sent from Model') {
      this.view.clearAllView();
      this.view.initView(arg0.data.scaleElements);
    }

    if (arg0.event === 'data were sent from View') {
      if (arg0.data.current) {
        this.model.setPart(arg0.data.value, arg0.data.extra);
      } else {
        this.model.setCurrent(arg0.data.value, arg0.data.extra);
      }
    }
  };

  public refreshAll = (options: IOptions): void => {
    this.model.refreshAll(options);
  };

  public returnCurrentValues = (): Array<number> => [this.view.current, this.view.currentExtra];

  public returnOptions = (): IOptions => this.model.options;
}

export default Presenter;
