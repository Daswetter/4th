import Wrapper from './Wrapper';

describe('Wrapper', () => {
  let wrapper: Wrapper;
  beforeEach(() => {
    const initElement = document.createElement('div');
    wrapper = new Wrapper(initElement);
  });

  describe('constructor', () => {
    test('should create div', () => {
      expect(wrapper.wrapper.nodeName).toBe('DIV');
    });
    test('should set class', () => {
      expect(wrapper.wrapper.className).toBe('dw-slider');
    });
  });

  describe('getWrapper', () => {
    test('should return wrapper as HTMLElement', () => {
      expect(wrapper.getWrapper()).toEqual(wrapper.wrapper);
    });
  });

  describe('setInitialSettings', () => {
    test('should add class for vertical', () => {
      wrapper.setInitialSettings(true);
      expect(wrapper.wrapper.className).toContain('dw-slider_vertical');
    });
    test('should add class for horizontal', () => {
      wrapper.setInitialSettings(false);
      expect(wrapper.wrapper.className).toContain('dw-slider_horizontal');
    });
  });
});
