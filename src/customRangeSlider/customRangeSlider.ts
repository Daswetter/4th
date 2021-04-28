import jQuery from 'jquery'

import { View } from '../view/view'
import { Model } from '../model/model'
import { Presenter } from '../presenter/presenter'


import { IOptions } from '../interface/IOptions'
import { IModel } from '../model/IModel'
import { IView } from '../view/IView'



(function($){
  class customRangeSlider {
    private options: IOptions
    private Model!: IModel
    private View!: IView
    private Presenter!: Presenter

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
        numberOfScaleElements: 5,
        progress: true,
      }, setOptions)
      this.options = options
      this.initElement = initElement
      this.init(initElement, options)
    }

    private init(initElement: HTMLElement, options: IOptions): void {
      this.initElement = initElement
      this.Model = new Model(options)
      this.View = new View(initElement, options)
      this.Presenter = new Presenter(this.View, this.Model)
    }

    public update(updatedOptions: IOptions): void {
      this.options = $.extend(this.options, updatedOptions)
      this.Presenter.update(this.options)
    }
    
    public returnCurrentOptions(): IOptions {
      return this.options
    }

    public returnCurrentState(): Array<number> {
      return this.Presenter.returnCurrentValues()
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