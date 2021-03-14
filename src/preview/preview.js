import $ from 'jquery'

$(".js-slider1").customRangeSlider({
  min: 0,
  max: 1,
  initial: [0.25, 0.5],
  stepSize: 0.05,
  progress: true,
  satellite: true,
  scale: true,
  // orientation: 'vertical',
  thumbType: 'double',
})

$(".js-slider2").customRangeSlider({
  min: -18.8,
  max: 0.9,
  initial: [-16, 0],
  stepSize: 0.2,
  progress: true,
  satellite: true,
  scale: false,
  thumbType: 'double',
  orientation: 'vertical',
  input: true
})

// $(".js-slider3").customRangeSlider({
//   min: -108.8,
//   max: 0.9,
//   initial: [-50],
//   stepSize: 0.2,
//   progress: true,
//   satellite: true,
//   scale: true,
//   thumbType: 'single',
//   orientation: 'horizontal',
//   input: true
// })

$(".js-slider4").customRangeSlider({
  min: -9,
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

// $(".js-slider5").customRangeSlider({
//   min: -9,
//   max: 9,
//   initial: [5],
//   stepSize: 3,
//   progress: true,
//   satellite: true,
//   scale: false,
//   orientation: 'horizontal',
//   thumbType: 'double'
// })

// $(".js-slider6").customRangeSlider({
//   min: -9,
//   max: 9,
//   initial: [5],
//   stepSize: 3,
//   progress: false,
//   satellite: true,
//   scale: true,
//   // orientation: 'vertical',
//   thumbType: 'double'
// })
