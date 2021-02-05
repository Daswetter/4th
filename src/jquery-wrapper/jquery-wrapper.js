import { View } from './../view/view'
import { Model } from './../model/model'
import { Presenter } from './../presenter/presenter'

(function($){
  $.fn.customRangeSlider = function(options){
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
    // const view = new View()
    const app = new Presenter(new View(this[0]), new Model(options))
    
  }
})(jQuery)