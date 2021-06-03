import jQuery from 'jquery'

import { IView, IModel, IOptions } from '../types'
import { View } from './View/View'
import { Model } from './Model/Model'
import { Presenter } from './Presenter/Presenter'

(function($){
  class dwSlider {
    private options: IOptions
    private model!: IModel
    private view!: IView
    private presenter!: Presenter

    constructor(private initElement: HTMLElement, setOptions: IOptions) {
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
      }, setOptions)
      this.options = options
      this.initElement = initElement
      this.init(initElement, options)
    }

    private init(initElement: HTMLElement, options: IOptions): void {
      this.initElement = initElement
      this.model = new Model(options)
      this.view = new View(initElement, options)
      this.presenter = new Presenter(this.view, this.model)
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