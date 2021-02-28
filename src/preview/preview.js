$(".js-slider1").customRangeSlider({
  min: -1800,
  max: 200,
  initial: 0,
  stepSize: 100,
  progress: true,
  satellite: true,
  scale: true,
  orientation: 'vertical',
  thumbType: 'double',
})

$(".js-slider2").customRangeSlider({
  min: -18.8,
  max: 0.9,
  initial: 0.1,
  stepSize: 0.2,
  progress: true,
  satellite: true,
  scale: true,
  thumbType: 'single',
  orientation: 'horizontal',
})

$(".js-slider3").customRangeSlider({
  min: -108.8,
  max: 0.9,
  initial: 0.01,
  stepSize: 0.2,
  progress: true,
  satellite: true,
  scale: true,
  thumbType: 'double',
  orientation: 'horizontal',
})

$(".js-slider4").customRangeSlider({
  min: -9,
  max: 9,
  initial: -1,
  stepSize: 3,
  progress: true,
  satellite: true,
  scale: false,
  orientation: 'vertical',
})