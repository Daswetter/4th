import { View } from '../view/view'
import { Model } from '../model/model'
import { Presenter } from '../presenter/presenter'

import jQuery from 'jquery'
import { IOptions } from '../interface/IOptions'
import { IModel } from '../model/IModel'
import { IView } from '../view/IView'



(function($){
  class customRangeSlider {
    options: IOptions
    initElement: HTMLElement
    model!: IModel
    view!: IView

    constructor(initElement: HTMLElement, setOptions: IOptions) {
      const options = $.extend({}, {
        min: 0,
        max: 100,
        from: 50,
        stepSize: 1,
        orientation: 'horizontal',
        thumbType: 'single',
        satellite: true,
        scale: true,
        progress: true,
        input: true
      }, setOptions)
      this.options = options
      this.initElement = initElement
      this.init(initElement, options)
    }

    init(initElement: HTMLElement, options: IOptions) {
      this.initElement = initElement
      this.model = new Model(options)
      this.view = new View(initElement, options)
      new Presenter(this.view, this.model)
    }

    update(updatedOptions: IOptions): void {
      this.options = $.extend(this.options, updatedOptions)
      this.model.update(this.options)
      this.view.update(this.options)
    }
    
    returnCurrentState(): IOptions {
      return this.options
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