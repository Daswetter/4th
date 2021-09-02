/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import jQuery from 'jquery';

import { IOptions, IDwSlider } from '../types';
import Model from './Model/Model';
import Presenter from './Presenter/Presenter';
import View from './View/View';

((function ($) {
  class DwSlider implements IDwSlider {
    private options!: IOptions;

    private model!: Model;

    private view!: View;

    private presenter!: Presenter;

    constructor(public setOptions: IOptions, private initElement: HTMLElement) {
      const optionsFromData = {
        min: this.toNumber(initElement.dataset.min),
        max: this.toNumber(initElement.dataset.max),
        from: this.toNumber(initElement.dataset.from),
        to: this.toNumber(initElement.dataset.to),
        step: this.toNumber(initElement.dataset.step),
        isVertical: this.toBoolean(initElement.dataset.isVertical),
        isDouble: this.toBoolean(initElement.dataset.isDouble),
        hasTip: this.toBoolean(initElement.dataset.hasTip),
        hasScale: this.toBoolean(initElement.dataset.hasScale),
        scaleSize: this.toNumber(initElement.dataset.scaleSize),
        hasProgress: this.toBoolean(initElement.dataset.hasProgress),
      };
      const options = $.extend({}, {
        min: 0,
        max: 100,
        from: 50,
        to: 0,
        step: 1,
        isVertical: false,
        isDouble: false,
        hasTip: true,
        hasScale: true,
        scaleSize: 5,
        hasProgress: true,
      }, optionsFromData, setOptions);
      this.initElement = initElement;
      this.init(initElement, options);
    }

    public update(updatedOptions?: Partial<IOptions>): void {
      this.options = $.extend(this.returnCurrentOptions(), updatedOptions);
      this.presenter.refreshAll(this.options);
    }

    public returnCurrentOptions(): IOptions {
      return this.presenter.returnOptions();
    }

    public returnCurrentState(): Array<number> {
      return this.presenter.returnCurrentValues();
    }

    private init(initElement: HTMLElement, options: IOptions): void {
      this.initElement = initElement;
      this.model = new Model(options);
      this.view = new View(initElement, options);
      this.presenter = new Presenter(this.view, this.model);
      this.options = this.returnCurrentOptions();

      window.addEventListener('resize', this.handleWindowResizing);
    }

    private toNumber = (option: string | undefined): number | undefined => {
      if (option) {
        return Number(option);
      }
      return undefined;
    };

    private toBoolean = (option: string | undefined): boolean | undefined => {
      if (option === 'true') {
        return true;
      }
      if (option === 'false') {
        return false;
      }
      return undefined;
    };

    private handleWindowResizing = (): void => {
      this.update();
    };
  }

  $.fn.DwSlider = function (options: IOptions): JQuery<HTMLElement> {
    return this.each(function () {
      if (!$.data(this, 'DwSlider')) {
        $.data(this, 'DwSlider', new DwSlider(options, this));
      }
    });
  };
})(jQuery));
