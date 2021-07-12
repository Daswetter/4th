import Scale from './Scale';

describe('Scale', () => {
  let scale: Scale;
  let update: jest.Mock;
  beforeEach(() => {
    const initElement = document.createElement('div');
    scale = new Scale(initElement);
  });

  describe('constructor', () => {
    test('should create div', () => {
      expect(scale.scale.nodeName).toBe('DIV');
    });
    test('should add correct class', () => {
      expect(scale.scale.className).toBe('dw-slider__scale');
    });
  });

  describe('initScale', () => {
    test('should call mediator.notify', () => {
      update = jest.fn();
      scale.subscribe(update);
      const scaleElement1 = document.createElement('div');
      const scaleElement2 = document.createElement('div');
      scale.scaleElements = { 0: scaleElement1, 1: scaleElement2 };
      scale.initScale({ 0: '0', 1: '1' }, { width: 1, height: 5 }, true);
      const click = new MouseEvent('click');
      scale.scaleElements[0].dispatchEvent(click);
      expect(update).toBeCalled();
    });
  });
});
