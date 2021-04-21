import $ from 'jquery'
import { configPanel } from './config-panel/config-panel.ts'
import './preview.scss'


$(".js-slider1").customRangeSlider({
  min: 0,
  max: 10,
  from: 0,
  to: 2,
  step: 1,
  progress: true,
  satellite: true,
  scale: true,
  vertical: false,
  double: true,
})
new configPanel('.js-slider1')




$(".js-slider2").customRangeSlider({
  min: -18.1,
  max: 0.9,
  from: -16,
  to: 0,
  step: 0.2,
  progress: true,
  satellite: true,
  scale: true,
  double: true,
  vertical: true,
})
new configPanel('.js-slider2')

$(".js-slider3").customRangeSlider({
  min: -108.8,
  max: 0.9,
  from: -50,
  step: 0.2,
  progress: true,
  satellite: true,
  scale: true,
  double: false,
  vertical: false,
})
new configPanel('.js-slider3')

$(".js-slider4").customRangeSlider({
  min: -10,
  max: 9,
  from: 5,
  step: 3,
  progress: true,
  satellite: true,
  scale: false,
  double: false,
})
new configPanel('.js-slider4')

