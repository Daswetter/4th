import { View } from './../view/view'
import { Model } from './../model/model'
import { Presenter } from './../presenter/presenter'

(function($){
  $.fn.customRangeSlider = function(options){
    const initE = this[0]
    options = $.extend({},{
      min: 0,
      max: 100,
      initial: 50,
      stepSize: 1,
      orientation: 'horizontal',
      thumbType: 'single',
      underThumbElement: true,
      scale: true,
      progressBar: true,
    }, options);
    new Presenter(new View(initE), new Model(options))
  }
})(jQuery)