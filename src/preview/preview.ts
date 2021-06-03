import $ from 'jquery'
import { configPanel } from './config-panel/config-panel'
import './preview.scss'


$(".js-slider1").dwSlider()
new configPanel('.js-slider1')

$(".js-slider2").dwSlider({
  min: -18.1,
  max: 0.9,
  from: -16,
  to: 0,
  step: 0.2,
  progress: true,
  tip: true,
  scale: true,
  double: true,
  vertical: true,
  scaleSize: 4,
})
new configPanel('.js-slider2')

$(".js-slider3").dwSlider({
  min: -108.8,
  max: 0.9,
  from: -50,
  step: 0.2,
  progress: true,
  tip: true,
  scale: true,
  scaleSize: 10,
  double: false,
  vertical: false,
})
new configPanel('.js-slider3')

$(".js-slider4").dwSlider({
  min: -10,
  max: 9,
  from: 5,
  step: 3,
  progress: true,
  tip: true,
  scale: true,
  scaleSize: 7,
  double: false,
})
new configPanel('.js-slider4')

