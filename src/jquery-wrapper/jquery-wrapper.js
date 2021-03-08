import { View } from './../view/view'
import { Model } from './../model/model'
import { Presenter } from './../presenter/presenter'

(function($){
  $.fn.customRangeSlider = function(options){
    const initE = this[0]
    options = $.extend({},{
      min: 0,
      max: 100,
      initial: [(this.min - this.max) / 2],
      stepSize: 1,
      orientation: 'horizontal',
      thumbType: 'single',
      satellite: true,
      scale: true,
      progress: true,
    }, options);
    new Presenter(new View(initE, options), new Model(options))
  }
})(jQuery)