import $ from 'jquery';
import ConfigPanel from './config-panel/ConfigPanel';
import '../DwSlider/DwSlider';
import './demo.scss';

$('.js-DwSlider1').DwSlider();
new ConfigPanel('.js-DwSlider1');

$('.js-DwSlider2').DwSlider({
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
});
new ConfigPanel('.js-DwSlider2');

$('.js-DwSlider3').DwSlider();
new ConfigPanel('.js-DwSlider3');

$('.js-DwSlider4').DwSlider({
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
});
new ConfigPanel('.js-DwSlider4');
