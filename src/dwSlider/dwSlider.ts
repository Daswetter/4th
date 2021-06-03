import jQuery from 'jquery'

import { IView, IModel, IOptions } from '../types'
import { View } from './View/View'
import { Model } from './Model/Model'
import { Presenter } from './Presenter/Presenter'

(function($){
  class dwSlider {
    private options!: IOptions
    private model!: IModel
    private view!: IView
    private presenter!: Presenter

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
      }

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
      }, optionsFromData, setOptions)
      this.initElement = initElement
      this.init(initElement, options)
    }

    private init(initElement: HTMLElement, options: IOptions): void {
      this.initElement = initElement
      this.model = new Model(options)
      this.view = new View(initElement, options)
      this.presenter = new Presenter(this.view, this.model)
      this.options = this.returnCurrentOptions()
    }

    private toNumber = (option: string | undefined): number | undefined => {
      if (option) {
        return Number(option)
      } else {
        return undefined
      }
    }

    private toBoolean = (option: string | undefined): boolean | undefined => {
      if (option === 'true') {
        return true
      } else if (option === 'false') {
        return false
      } else {
        return undefined
      }
    }

    public update(updatedOptions: IOptions): void {
      this.options = $.extend(this.returnCurrentOptions(), updatedOptions)
      this.presenter.update(this.options)
    }
    
    public returnCurrentOptions(): IOptions {
      return this.presenter.returnOptions()
    }

    public returnCurrentState(): Array<number> {
      return this.presenter.returnCurrentValues()
    }
  }


  $.fn.dwSlider = function(options: IOptions): JQuery<HTMLElement> {
    return this.each(function () {
      if (!$.data(this, 'dwSlider')) {
        $.data(this, 'dwSlider', new dwSlider(this, options));
      }
    });
  }

})(jQuery)