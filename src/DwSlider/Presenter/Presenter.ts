import { IOptions } from '../../types';
import View from '../View/View';
import Model from '../Model/Model';

class Presenter {
  constructor(public view: View, public model: Model) {
    this.view.subscribe(this.handleDataFromView);
    this.model.subscribe(this.handleDataFromModel);

    this.view.initView(this.model.countScaleElements());
  }

  public handleDataFromView = (data: { value: number, current: boolean, extra: boolean }): void => {
    if (data.current) {
      this.model.setPart(data.value, data.extra);
    } else {
      this.model.setCurrent(data.value, data.extra);
    }
  };

  public handleDataFromModel = (data: {
    current?: number,
    part?: number,
    extra?: boolean,
    scaleElements?: { [key: string]: string },
    eventName: string,
  }): void => {
    if (data.eventName === 'data') {
      this.view.sendDataToSubviews(
        data.current as number, data.part as number, data.extra as boolean,
      );
    }
    if (data.eventName === 'scale') {
      this.view.clearAllView();
      this.view.initView(data.scaleElements as { [key: string]: string; });
    }
  };

  public refreshAll = (options: IOptions): void => {
    this.model.refreshAll(options);
  };

  public returnCurrentValues = (): Array<number> => [this.view.current, this.view.currentExtra];

  public returnOptions = (): IOptions => this.model.options;
}

export default Presenter;
