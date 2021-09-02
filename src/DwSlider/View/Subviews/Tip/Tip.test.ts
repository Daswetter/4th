import Tip from './Tip';

describe('Tip', () => {
  let tip: Tip;
  let update: jest.Mock;
  beforeEach(() => {
    const initElement = document.createElement('div');
    tip = new Tip(initElement);
    update = jest.fn();
    tip.subscribe(update);
  });
  describe('constructor', () => {
    test('should create div', () => {
      expect(tip.primary.nodeName).toBe('DIV');
    });
    test('should create correct class', () => {
      expect(tip.primary.className).toBe('dw-slider__tip');
    });
  });

  describe('initTipExtra', () => {
    beforeEach(() => {
      const initElement = document.createElement('div');
      tip.initExtra(initElement);
    });
    test('should create div', () => {
      expect(tip.extra.nodeName).toBe('DIV');
    });
    test('should create correct class', () => {
      expect(tip.extra.className).toBe('dw-slider__tip');
    });
  });

  describe('update', () => {
    type ISize = {
      width: number
      height: number
    };
    let lineSize: ISize;
    let thumbSize: ISize;

    beforeEach(() => {
      lineSize = {
        width: 150,
        height: 9,
      };
      thumbSize = {
        width: 30,
        height: 10,
      };
      Object.defineProperty(tip.primary, 'offsetWidth', {
        value: '30',
      });
      Object.defineProperty(tip.primary, 'offsetHeight', {
        value: '20',
      });
      const initElement = document.createElement('div');
      tip.initExtra(initElement);
      Object.defineProperty(tip.extra, 'offsetWidth', {
        value: '30',
      });
      Object.defineProperty(tip.extra, 'offsetHeight', {
        value: '20',
      });
    });

    test('should set position for extra and horizontal mod', () => {
      const isVertical = false;
      const isDouble = true;
      const isExtra = true;
      lineSize = {
        width: 150,
        height: 20,
      };
      tip.setInitialSettings(lineSize.width, thumbSize, isVertical, 500, isExtra);
      tip.update(0.5, 500, lineSize, thumbSize, isVertical, isDouble, isExtra);
      expect(tip.extra.innerText).toBe('500');
      expect(tip.extra.style.left).toBe('60px');
      expect(tip.extra.style.top).toBe('-25px');
    });

    test('should set position for primary and isVertical mod', () => {
      const isVertical = true;
      const isDouble = true;
      const isExtra = false;

      lineSize = {
        width: 10,
        height: 300,
      };
      thumbSize = {
        width: 21,
        height: 20,
      };
      tip.setInitialSettings(lineSize.width, thumbSize, isVertical, 100);
      tip.update(1, 125, lineSize, thumbSize, isVertical, isDouble, isExtra);
      expect(tip.primary.innerText).toBe('125');
      expect(tip.primary.style.right).toBe('17px');
      expect(tip.primary.style.top).toBe('-10px');
    });

    test('should set position and innerText to united', () => {
      const isVertical = false;
      const isDouble = true;
      const isExtra = true;
      lineSize = {
        width: 10,
        height: 10,
      };
      thumbSize = {
        width: 10,
        height: 10,
      };
      tip.update(0.1, 100, lineSize, thumbSize, isVertical, isDouble, isExtra);
      tip.update(0.1, 100, lineSize, thumbSize, isVertical, isDouble, false);

      Object.defineProperty(tip.united, 'offsetLeft', {
        value: 200,
      });
      tip.update(1, 100, lineSize, thumbSize, isVertical, isDouble, isExtra);
      expect(tip.united.style.left).toBe('');
      expect(tip.united.innerText).toBe('100');
    });

    test('should set inner text to primary', () => {
      const isVertical = false;
      const isDouble = true;
      const isExtra = false;
      Object.defineProperty(tip.primary, 'offsetLeft', {
        value: 1000,
      });

      tip.update(1, 10, lineSize, thumbSize, isVertical, isDouble, isExtra);
      expect(tip.primary.innerText).toBe('10');
    });

    test('should set inner text to primary if single', () => {
      const isVertical = false;
      const isDouble = false;
      const isExtra = false;

      tip.update(1, 10, lineSize, thumbSize, isVertical, isDouble, isExtra);
      expect(tip.primary.innerText).toBe('10');
    });
  });

  describe('setEventListenerForUnited', () => {
    let lineSize: {
      width: number,
      height: number
    };
    let lineSide: {
      left: number,
      bottom: number
    };
    let isVertical: boolean;
    beforeEach(() => {
      lineSize = {
        width: 0,
        height: 0,
      };
      lineSide = {
        left: 0,
        bottom: 0,
      };
      isVertical = false;
      const initElement = document.createElement('div');
      tip.initExtra(initElement);
    });
    test('should call tip.notify for primary', () => {
      tip.setEventListenerForUnited(lineSize, lineSide, isVertical);
      Object.defineProperty(tip.extra, 'offsetLeft', {
        value: 600,
      });
      const mouseDown = new MouseEvent('mousedown');
      tip.united.dispatchEvent(mouseDown);

      const mouseMove = new MouseEvent('mousemove');
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      expect(update).toBeCalled();
    });
    test('should call tip.notify for primary', () => {
      tip.setEventListenerForUnited(lineSize, lineSide, isVertical);
      Object.defineProperty(tip.extra, 'offsetLeft', {
        value: 600,
      });

      const mouseDown = new MouseEvent('mousedown');
      Object.defineProperty(mouseDown, 'pageX', {
        value: 600,
      });
      tip.united.dispatchEvent(mouseDown);

      const mouseMove = new MouseEvent('mousemove');
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      expect(update).toBeCalled();
    });
    test('should call tip.notify for primary', () => {
      tip.setEventListenerForUnited(lineSize, lineSide, isVertical);
      const mouseDown = new MouseEvent('mousedown');
      Object.defineProperty(mouseDown, 'pageX', {
        value: 0,
      });
      tip.united.dispatchEvent(mouseDown);

      const mouseMove = new MouseEvent('mousemove');
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      expect(update).toBeCalled();
    });
    test('should call tip.notify for extra (isVertical)', () => {
      isVertical = true;
      Object.defineProperty(tip.extra, 'offsetTop', {
        value: 600,
      });
      tip.setEventListenerForUnited(lineSize, lineSide, isVertical);
      const mouseDown = new MouseEvent('mousedown', {
        clientX: 500,
      });
      Object.defineProperty(mouseDown, 'pageY', {
        value: 600,
      });
      tip.united.dispatchEvent(mouseDown);

      const mouseMove = new MouseEvent('mousemove');
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      expect(update).toBeCalled();
    });
    test('should call tip.notify for extra with part = 1', () => {
      isVertical = true;
      Object.defineProperty(tip.extra, 'offsetTop', {
        value: -60000,
      });
      tip.setEventListenerForUnited(lineSize, lineSide, isVertical);
      const mouseDown = new MouseEvent('mousedown', {
        clientX: 500,
      });
      Object.defineProperty(mouseDown, 'pageY', {
        value: 600,
      });
      tip.united.dispatchEvent(mouseDown);

      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageY', {
        value: 0,
      });
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      expect(update).toBeCalled();
    });
    test('should call tip.notify for extra with part = 0', () => {
      isVertical = true;
      Object.defineProperty(tip.primary, 'offsetTop', {
        value: 60000,
      });
      Object.defineProperty(tip.united, 'offsetTop', {
        value: 60000,
      });
      tip.setEventListenerForUnited(lineSize, lineSide, isVertical);
      const mouseDown = new MouseEvent('mousedown', {
        clientX: 500,
      });
      Object.defineProperty(mouseDown, 'pageY', {
        value: 600,
      });
      tip.united.dispatchEvent(mouseDown);

      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageY', {
        value: 100000,
      });
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      expect(update).toBeCalled();
    });
    test('should call tip.notify for primary', () => {
      isVertical = true;
      tip.setEventListener(lineSize, lineSide, isVertical, false);
      const mouseDown = new MouseEvent('mousedown');
      tip.primary.dispatchEvent(mouseDown);

      const mouseMove = new MouseEvent('mousemove');
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      expect(update).toBeCalled();
    });
  });

  describe('returnPrimaryParameters', () => {
    test('should return correct object', () => {
      Object.defineProperty(tip.primary, 'offsetWidth', {
        value: 10,
      });
      Object.defineProperty(tip.primary, 'offsetHeight', {
        value: 20,
      });
      Object.defineProperty(tip.primary, 'offsetLeft', {
        value: 30,
      });
      Object.defineProperty(tip.primary, 'offsetTop', {
        value: 40,
      });
      expect(tip.returnPrimaryParameters()).toEqual({
        width: 10,
        height: 20,
        left: 30,
        top: 40,
      });
    });
  });

  describe('returnExtraParameters', () => {
    test('should return correct object', () => {
      const initElement = document.createElement('div');
      tip.initExtra(initElement);
      Object.defineProperty(tip.extra, 'offsetWidth', {
        value: 10,
      });
      Object.defineProperty(tip.extra, 'offsetHeight', {
        value: 20,
      });
      Object.defineProperty(tip.extra, 'offsetLeft', {
        value: 30,
      });
      Object.defineProperty(tip.extra, 'offsetTop', {
        value: 40,
      });
      expect(tip.returnExtraParameters()).toEqual({
        width: 10,
        height: 20,
        left: 30,
        top: 40,
      });
    });
  });
});
