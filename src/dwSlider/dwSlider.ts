/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import jQuery from 'jquery';

import { IOptions, IdwSlider, ReducedIOptions } from '../types';
import View from './View/View';
import Model from './Model/Model';
import Presenter from './Presenter/Presenter';

((function ($) {
  class DwSlider implements IdwSlider {
    private options!: IOptions;

    private model!: Model;

    private view!: View;

    private presenter!: Presenter;

    constructor(private initElement: HTMLElement, setOptions: IOptions) {
      const optionsFromData = {
        min: this.toNumber(initElement.dataset.min),
        max: this.toNumber(initElement.dataset.max),
        from: this.toNumber(initElement.dataset.from),
        to: this.toNumber(initElement.dataset.to),
        step: this.toNumber(initElement.dataset.step),
        vertical: this.toBoolean(initElement.dataset.vertical),
        double: this.toBoolean(initElement.dataset.double),
        tip: this.toBoolean(initElement.dataset.tip),
        scale: this.toBoolean(initElement.dataset.scale),
        scaleSize: this.toNumber(initElement.dataset.scaleSize),
        progress: this.toBoolean(initElement.dataset.progress),
      };
      const options = $.extend({}, {
        min: 0,
        max: 100,
        from: 50,
        to: 0,
        step: 1,
        vertical: false,
        double: false,
        tip: true,
        scale: true,
        scaleSize: 5,
        progress: true,
      }, optionsFromData, setOptions);
      this.initElement = initElement;
      this.init(initElement, options);
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

    public update(updatedOptions?: ReducedIOptions): void {
      this.options = $.extend(this.returnCurrentOptions(), updatedOptions);
      this.presenter.refreshAll(this.options);
    }

    public returnCurrentOptions(): IOptions {
      return this.presenter.returnOptions();
    }

    public returnCurrentState(): Array<number> {
      return this.presenter.returnCurrentValues();
    }
  }

  $.fn.dwSlider = function (options: IOptions): JQuery<HTMLElement> {
    return this.each(function () {
      if (!$.data(this, 'dwSlider')) {
        $.data(this, 'dwSlider', new DwSlider(this, options));
      }
    });
  };
})(jQuery));
