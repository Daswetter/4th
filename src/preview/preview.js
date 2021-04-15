import $ from 'jquery'
import { configPanel } from './config-panel/config-panel.ts'
import './preview.scss'

$(".js-slider1").customRangeSlider({
  min: 0.2,
  max: 1,
  from: 0.2,
  to: 0.5,
  stepSize: 0.01,
  progress: true,
  satellite: true,
  scale: true,
  orientation: 'horizontal',
  thumbType: 'double',
  input: true
})
const config = new configPanel('.js-slider1')




$(".js-slider2").customRangeSlider({
  min: -18.1,
  max: 0.9,
  from: -16,
  to: 0,
  stepSize: 0.2,
  progress: true,
  satellite: true,
  scale: true,
  thumbType: 'double',
  orientation: 'vertical',
  input: true
})

$(".js-slider3").customRangeSlider({
  min: -108.8,
  max: 0.9,
  from: -50,
  stepSize: 0.2,
  progress: true,
  satellite: true,
  scale: true,
  thumbType: 'single',
  orientation: 'horizontal',
  input: true
})

$(".js-slider4").customRangeSlider({
  min: -10,
  max: 9,
  from: 5,
  stepSize: 3,
  progress: true,
  satellite: true,
  scale: false,
  // orientation: 'vertical',
  thumbType: 'single',
  input: true
})

