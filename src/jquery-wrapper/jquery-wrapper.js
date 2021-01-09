import { View } from './../view/view'
import { Model } from './../model/model'
import { Presenter } from './../presenter/presenter'

(function($){
  $.fn.customRangeSlider = function(options){
    options = $.extend({},{
      initialLabel: 0,
      finalLabel: 100
    }, options);
    const view = new View()
    // const app = new Presenter(new Model(), new View())
  }
})(jQuery)