import { View } from './../view/view'
import { Model } from './../model/model'
import { Presenter } from './../presenter/presenter'

(function($){
  $.fn.customRangeSlider = function(options){
    options = $.extend({},{
      min: 0,
      max: 100,
      initial: 50,
    }, options);
    // const view = new View()
    const app = new Presenter(new View(this[0]), new Model(options))
    
  }
})(jQuery)