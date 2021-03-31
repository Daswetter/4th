import $ from 'jquery'

$(".js-slider1").customRangeSlider({
  min: -150,
  max: 1000,
  initial: [200, 500],
  stepSize: 100,
  progress: true,
  satellite: true,
  scale: true,
  orientation: 'horizontal',
  thumbType: 'double',
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

$(".js-slider5").customRangeSlider({
  min: 0.11,
  max: 0.15,
  initial: [0.11, 0.13],
  stepSize: 0.01,
  progress: true,
  satellite: true,
  scale: true,
  orientation: 'horizontal',
  thumbType: 'double'
})

$(".js-slider6").customRangeSlider({
  min: -1050,
  max: 100,
  initial: [-500, -100],
  stepSize: 100,
  progress: true,
  satellite: true,
  scale: true,
  orientation: 'horizontal',
  thumbType: 'double'
})

$(".js-slider7").customRangeSlider({
  min: -1050,
  max: 100,
  initial: [-500, -100],
  stepSize: 100,
  progress: true,
  satellite: true,
  scale: true,
  orientation: 'vertical',
  thumbType: 'double'
})
