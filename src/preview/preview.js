import $ from 'jquery'

$(".js-slider1").customRangeSlider({
  min: 0.2,
  max: 1,
  initial: [0.2, 0.5],
  stepSize: 0.01,
  progress: true,
  satellite: true,
  scale: true,
  orientation: 'horizontal',
  thumbType: 'double',
  input: true
})




$(".js-slider2").customRangeSlider({
  min: -18.1,
  max: 0.9,
  initial: [-16, 0],
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
  initial: [-50],
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
  initial: [5],
  stepSize: 3,
  progress: true,
  satellite: true,
  scale: false,
  // orientation: 'vertical',
  thumbType: 'single',
  input: true
})

