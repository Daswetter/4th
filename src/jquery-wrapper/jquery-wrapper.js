import { View } from '../view/view'
import { Model } from '../model/model'
import { Presenter } from '../presenter/presenter'

import jQuery from 'jquery'

(function($){
  const customRangeSlider = function(initElement, setOptions) {
    const options = $.extend({},{
      min: 0,
      max: 100,
      initial: 50,
      stepSize: 1,
      orientation: 'horizontal',
      thumbType: 'single',
      satellite: true,
      scale: true,
      progress: true,
      input: true
    }, setOptions);
    this.options = options
    this.init(initElement, options)
  }

  customRangeSlider.prototype = {

    init: function(initElement, options){
      this.initElement = initElement
      this.model = new Model(options)
      this.view = new View(initElement, options)
      new Presenter(this.view, this.model)
    },
    update: function(updatedOptions){
      this.options = $.extend(this.options, updatedOptions);
      this.model.update(this.options)
      this.view.update(this.options)
    }

  }

  $.fn.customRangeSlider = function(options){
    return this.each(function () {
      if (!$.data(this, 'customRangeSlider')) {
        $.data(this, 'customRangeSlider', new customRangeSlider(this, options));
      }
    });
  }

})(jQuery)