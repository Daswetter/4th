import $ from 'jquery'
import { configPanel } from './config-panel/config-panel'
import '../dwSlider/dwSlider.ts'
import './demo.scss'

$('.js-dwSlider1').dwSlider()
new configPanel('.js-dwSlider1')

$('.js-dwSlider2').dwSlider({
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
new configPanel('.js-dwSlider2')

$('.js-dwSlider3').dwSlider()
new configPanel('.js-dwSlider3')

$('.js-dwSlider4').dwSlider({
  min: 10,
  max: 20,
  from: 12.2,
  to: 12.4,
  step: 0.000001,
  progress: true,
  tip: true,
  scale: true,
  scaleSize: -1,
  double: true,
})
new configPanel('.js-dwSlider4')

