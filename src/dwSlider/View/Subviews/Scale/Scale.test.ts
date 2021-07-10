import View from '../../View';
import Scale from './Scale';

describe('Scale', () => {
  let scale: Scale;
  beforeEach(() => {
    const initElement = document.createElement('div');
    const options = {
      min: 0,
      max: 100,
      from: 50,
      to: 0,
      step: 1,
      vertical: false,
      double: false,
      tip: true,
      scale: true,
      scaleSize: 5,
      progress: true,
    };
    const view = new View(initElement, options);
    scale = new Scale(initElement, view);
  });

  describe('constructor', () => {
    test('should create div', () => {
      expect(scale.scale.nodeName).toBe('DIV');
    });
    test('should add correct class', () => {
      expect(scale.scale.className).toBe('dwSlider__scale');
    });
  });

  describe('initScale', () => {
    test('should call mediator.notify', () => {
      const observer = {
        update: jest.fn(),
      };
      scale.subscribe(observer);
      const scaleElement1 = document.createElement('div');
      const scaleElement2 = document.createElement('div');
      scale.scaleElements = { 0: scaleElement1, 1: scaleElement2 };
      scale.initScale({ 0: '0', 1: '1' }, { width: 1, height: 5 }, true);
      const click = new MouseEvent('click');
      scale.scaleElements[0].dispatchEvent(click);
      expect(observer.update).toBeCalled();
    });
  });
});
