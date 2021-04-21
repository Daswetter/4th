import { View } from '../view/view'
import { Model } from '../model/model'
import { Presenter } from '../presenter/presenter'

import jQuery from 'jquery'
import { IOptions } from '../interface/IOptions'
import { IModel } from '../model/IModel'
import { IView } from '../view/IView'



(function($){
  class customRangeSlider {
    private options: IOptions
    private model!: IModel
    private view!: IView

    constructor(private initElement: HTMLElement, setOptions: IOptions) {
      const options = $.extend({}, {
        min: 0,
        max: 100,
        from: 50,
        to: 0,
        step: 1,
        vertical: false,
        double: false,
        satellite: true,
        scale: true,
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
      new Presenter(this.view, this.model)
    }

    public update(updatedOptions: IOptions): void {
      this.options = $.extend(this.options, updatedOptions)
      this.model.update(this.options)
      this.view.update(this.options)
    }
    
    public returnCurrentOptions(): IOptions {
      return this.options
    }

    public returnCurrentState(): Array<number> {
      return [this.view.current, this.view.currentExtra]
    }

  }


  $.fn.customRangeSlider = function(options: IOptions): JQuery<HTMLElement> {
    return this.each(function () {
      if (!$.data(this, 'customRangeSlider')) {
        $.data(this, 'customRangeSlider', new customRangeSlider(this, options));
      }
    });
  }

})(jQuery)