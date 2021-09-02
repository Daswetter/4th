import Thumb from './Thumb';

describe('Thumb', () => {
  let thumb: Thumb;
  let update: jest.Mock;
  beforeEach(() => {
    const initElement = document.createElement('div');
    thumb = new Thumb(initElement);
    update = jest.fn();
    thumb.subscribe(update);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should create div', () => {
      expect(thumb.primary.nodeName).toBe('DIV');
    });
    test('should add correct class', () => {
      expect(thumb.primary.className).toBe('dw-slider__thumb');
    });
  });

  describe('initExtraElement', () => {
    beforeEach(() => {
      const initElement = document.createElement('div');
      thumb.initExtra(initElement);
    });
    test('should create div', () => {
      expect(thumb.extra.nodeName).toBe('DIV');
    });
    test('should add correct class', () => {
      expect(thumb.extra.classList).toContain('dw-slider__thumb');
    });
  });

  describe('setEventListener', () => {
    test('should set mouse down and mouse move for horizontal and primary', () => {
      const lineSize = {
        width: 600,
        height: 6,
      };
      const lineSide = {
        left: 6000,
        bottom: 100,
      };
      thumb.setEventListener(lineSize, lineSide);

      const mouseDown = new MouseEvent('mousedown');
      Object.defineProperty(mouseDown, 'pageX', {
        value: 380,
      });
      Object.defineProperty(thumb.primary, 'offsetLeft', {
        value: 360,
      });
      Object.defineProperty(thumb.primary, 'offsetWidth', {
        value: 10,
      });

      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageX', {
        value: 1000,
      });

      thumb.primary.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(update).toBeCalledWith({
        isCurrent: false, isExtra: false, isNearest: false, value: 1,
      });
    });

    test('should set mouse down and mouse move for vertical and extra', () => {
      const isVertical = true;
      const initElement = document.createElement('div');
      thumb.initExtra(initElement);
      const lineSize = {
        width: 50,
        height: 6,
      };
      const lineSide = {
        left: 60,
        bottom: 100,
      };
      thumb.setEventListener(lineSize, lineSide, isVertical, true);

      const mouseDown = new MouseEvent('mousedown');
      Object.defineProperty(mouseDown, 'pageY', {
        value: 380,
      });
      Object.defineProperty(thumb.extra, 'offsetTop', {
        value: 360,
      });
      Object.defineProperty(thumb.extra, 'offsetHeight', {
        value: 10,
      });

      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageY', {
        value: 250,
      });

      thumb.extra.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(update).toBeCalled();
      expect(update).toBeCalledWith({
        isCurrent: false, isExtra: true, isNearest: false, value: 0,
      });

      const mouseUp = new MouseEvent('mouseup');

      document.dispatchEvent(mouseUp);
      document.dispatchEvent(mouseMove);
      expect(update).toBeCalledTimes(1);
    });

    describe('update', () => {
      test('should set correct style.left to primary and horizontal', () => {
        const isVertical = false;
        const isExtra = false;
        const lineSize = {
          width: 50,
          height: 10,
        };
        Object.defineProperty(thumb.primary, 'offsetWidth', {
          value: '10',
        });
        thumb.update(0.6, lineSize, isVertical, isExtra);
        expect(thumb.primary.style.left).toBe('25px');
      });

      test('should set correct style.left to extra and horizontal', () => {
        const isVertical = false;
        const isExtra = true;
        const initElement = document.createElement('div');
        thumb.initExtra(initElement);
        const lineSize = {
          width: 300,
          height: 20,
        };
        Object.defineProperty(thumb.extra, 'offsetWidth', {
          value: '15',
        });
        thumb.update(0.8, lineSize, isVertical, isExtra);
        expect(thumb.extra.style.left).toBe('232.5px');
      });

      test('should set correct style.left to primary and isVertical', () => {
        const isVertical = true;
        const isExtra = false;
        const lineSize = {
          width: 5,
          height: 100,
        };
        Object.defineProperty(thumb.primary, 'offsetHeight', {
          value: '10',
        });
        thumb.update(1, lineSize, isVertical, isExtra);
        expect(thumb.primary.style.bottom).toBe('95px');
      });

      test('should set correct style.left to extra and vertical', () => {
        const isVertical = true;
        const isExtra = true;
        const initElement = document.createElement('div');
        thumb.initExtra(initElement);
        const lineSize = {
          width: 50,
          height: 1000,
        };
        Object.defineProperty(thumb.extra, 'offsetHeight', {
          value: '5',
        });
        thumb.update(0.6, lineSize, isVertical, isExtra);
        expect(thumb.extra.style.bottom).toBe('597.5px');
      });
    });
  });

  describe('setInitialSetting', () => {
    test('should set style top for primary and horizontal mod', () => {
      const lineSize = {
        width: 120,
        height: 12,
      };
      Object.defineProperty(thumb.primary, 'offsetHeight', {
        value: 15,
      });
      thumb.setInitialSettings(lineSize);
      expect(thumb.primary.style.top).toBe('-1.5px');
    });

    test('should set style top for extra and horizontal mod', () => {
      const isVertical = false;
      const initElement = document.createElement('div');
      thumb.initExtra(initElement);
      const lineSize = {
        width: 256,
        height: 12,
      };
      Object.defineProperty(thumb.extra, 'offsetHeight', {
        value: 5,
      });
      thumb.setInitialSettings(lineSize, isVertical, true);
      expect(thumb.extra.style.top).toBe('3.5px');
    });

    test('should set style top for primary and vertical mod', () => {
      const isVertical = true;
      const lineSize = {
        width: 500,
        height: 4,
      };
      Object.defineProperty(thumb.primary, 'offsetWidth', {
        value: 10,
      });
      thumb.setInitialSettings(lineSize, isVertical);
      expect(thumb.primary.style.top).toBe('');
      expect(thumb.primary.style.left).toBe('245px');
    });

    test('should set style top for extra and vertical mod', () => {
      const isVertical = true;
      const initElement = document.createElement('div');
      thumb.initExtra(initElement);
      const lineSize = {
        width: 1200,
        height: 2,
      };
      Object.defineProperty(thumb.extra, 'offsetWidth', {
        value: 5,
      });
      thumb.setInitialSettings(lineSize, isVertical, true);
      expect(thumb.extra.style.top).toBe('');
      expect(thumb.extra.style.left).toBe('597.5px');
    });
  });

  describe('returnSize', () => {
    test('should return an object with primary size', () => {
      Object.defineProperty(thumb.primary, 'offsetWidth', {
        value: 150,
      });
      Object.defineProperty(thumb.primary, 'offsetHeight', {
        value: 50,
      });
      expect(thumb.returnSize()).toEqual({
        width: 150,
        height: 50,
      });
    });
  });
});
