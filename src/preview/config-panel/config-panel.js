import $ from 'jquery'
import './components/toggle/toggle'
import './components/input/input'

import './config-panel.scss'

const inputMin = document.querySelector('.config-panel__min')
inputMin.addEventListener('change', changeMin)
function changeMin(){
  let my_range = $(".js-slider1").data("customRangeSlider");
  my_range.update({
    min: Number(inputMin.value)
  })
}



