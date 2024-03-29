import Line from './Line';

describe('Line', () => {
  let line: Line;
  let update: jest.Mock;
  beforeEach(() => {
    const initElement = document.createElement('div');
    line = new Line(initElement);
    update = jest.fn();
    line.subscribe(update);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should create div', () => {
      expect(line.line.nodeName).toEqual('DIV');
    });
    test('should set correct class', () => {
      expect(line.line.classList).toContain('dw-slider__line');
    });
  });

  describe('getLine', () => {
    test('should return line as HTMLElement', () => {
      expect(line.getLine()).toEqual(line.line);
    });
  });

  describe('setEventListener', () => {
    describe('horizontal', () => {
      beforeEach(() => {
        const isVertical = false;
        line.setEventListener(isVertical);
        line.line.getBoundingClientRect = jest.fn(() => ({
          x: 0,
          y: 10,
          width: 300,
          height: 10,
          top: 50,
          right: 730,
          bottom: 100,
          left: 50,
          toJSON: jest.fn(),
        }));
        Object.defineProperty(line.line, 'offsetWidth', {
          value: 800,
        });
        const mouseDown = new MouseEvent('mousedown', {
          clientX: 250,
        });
        line.line.dispatchEvent(mouseDown);

        const mouseUp = new MouseEvent('mouseup', {
          clientX: 250,
        });
        line.line.dispatchEvent(mouseUp);
      });

      test('should set click to line ', () => {
        const click = new MouseEvent('click', {
          clientX: 250,
          clientY: 60,
        });
        Object.defineProperty(line.line, 'offsetTop', {
          value: 50,
        });
        Object.defineProperty(line.line, 'offsetHeight', {
          value: 10,
        });
        Object.defineProperty(click, 'pageY', {
          value: 60,
        });
        line.line.dispatchEvent(click);
        expect(update).toBeCalledWith({
          isCurrent: false, isExtra: false, isNearest: true, value: 0.25,
        });
      });

      test('should set click to line and call update with 0', () => {
        const click = new MouseEvent('click', {
          clientX: -250,
        });
        Object.defineProperty(click, 'pageY', {
          value: 0,
        });
        line.line.dispatchEvent(click);
        expect(update).toBeCalledWith({
          isCurrent: false, isExtra: false, isNearest: true, value: 0,
        });
      });

      test('should set click to horizontal line and call update with 1', () => {
        const click = new MouseEvent('click', {
          clientX: 1000,
        });
        Object.defineProperty(click, 'pageY', {
          value: 0,
        });
        line.line.dispatchEvent(click);
        expect(update).toBeCalledWith({
          isCurrent: false, isExtra: false, isNearest: true, value: 1,
        });
      });

      test('should not call update if scale were clicked', () => {
        Object.defineProperty(line.line, 'offsetTop', {
          value: 800,
        });
        const click = new MouseEvent('click', {
          clientX: 1000,
          clientY: 900,
        });
        Object.defineProperty(click, 'pageY', {
          value: 60,
        });
        line.line.dispatchEvent(click);
        expect(update).not.toHaveBeenCalled();
      });
    });

    describe('vertical', () => {
      beforeEach(() => {
        const isVertical = true;
        line.setEventListener(isVertical);

        line.line.getBoundingClientRect = jest.fn(() => ({
          x: 0,
          y: 10,
          width: 300,
          height: 10,
          top: 50,
          right: 730,
          bottom: 100,
          left: 50,
          toJSON: jest.fn(),
        }));
        Object.defineProperty(line.line, 'offsetHeight', {
          value: 500,
        });

        const mouseDown = new MouseEvent('mousedown', {
          clientY: 250,
        });
        line.line.dispatchEvent(mouseDown);
        const mouseUp = new MouseEvent('mouseup', {
          clientY: 250,
        });
        line.line.dispatchEvent(mouseUp);
      });
      test('should set click to line and call subscriber with 0', () => {
        const click = new MouseEvent('click', {
          clientY: 250,
        });
        Object.defineProperty(click, 'pageX', {
          value: 0,
        });
        line.line.dispatchEvent(click);
        expect(update).toBeCalledWith({
          isCurrent: false, isExtra: false, isNearest: true, value: 0,
        });
      });

      test('should set click to line and call subscriber with 1', () => {
        const click = new MouseEvent('click', {
          clientY: -500,
        });
        Object.defineProperty(click, 'pageX', {
          value: 0,
        });
        line.line.dispatchEvent(click);
        expect(update).toBeCalledWith({
          isCurrent: false, isExtra: false, isNearest: true, value: 1,
        });
      });

      test('should set click to line and call subscriber with 0.2', () => {
        const click = new MouseEvent('click', {
          clientY: 0,
          clientX: 1000,
        });
        Object.defineProperty(click, 'pageX', {
          value: 0,
        });
        line.line.dispatchEvent(click);
        expect(update).toBeCalledWith({
          isCurrent: false, isExtra: false, isNearest: true, value: 0.2,
        });
      });

      test('should not call update if scale were clicked', () => {
        const click = new MouseEvent('click', {
          clientX: 1000,
          clientY: 900,
        });
        Object.defineProperty(click, 'pageX', {
          value: 60,
        });
        line.line.dispatchEvent(click);
        expect(update).not.toHaveBeenCalled();
      });
    });

    test('should not call update if onMouseDown value is not equal to onMouseUp', () => {
      const isVertical = true;
      line.setEventListener(isVertical);

      const mouseDown = new MouseEvent('mousedown', {
        clientX: 20,
        clientY: 20,
      });
      line.line.dispatchEvent(mouseDown);
      const mouseUp = new MouseEvent('mouseup', {
        clientX: 250,
        clientY: 250,
      });
      line.line.dispatchEvent(mouseUp);

      const click = new MouseEvent('click', {
        clientY: 250,
      });
      Object.defineProperty(click, 'pageX', {
        value: 0,
      });
      line.line.dispatchEvent(click);
      expect(update).not.toBeCalled();
    });
  });

  describe('getSize', () => {
    test('should return line.offsetWidth and line.offsetHeight', () => {
      Object.defineProperty(line.line, 'offsetWidth', {
        value: 50,
      });
      Object.defineProperty(line.line, 'offsetHeight', {
        value: 5,
      });
      expect(line.getSize()).toEqual({
        width: 50,
        height: 5,
      });
    });
  });

  describe('getSide', () => {
    test('should return line"s left and line"s bottom', () => {
      Object.defineProperty(line.line, 'offsetLeft', {
        value: 50,
      });
      Object.defineProperty(line.line, 'offsetHeight', {
        value: 100,
      });
      Object.defineProperty(line.line, 'offsetTop', {
        value: 5,
      });
      expect(line.getSide()).toEqual({
        left: 50,
        bottom: 105,
      });
    });
  });

  describe('setInitialSettings', () => {
    test('should set correct width and height', () => {
      const isVertical = true;
      line.setInitialSettings(isVertical);

      expect(line.line.className).toContain('dw-slider__line_vertical');
    });
  });

  describe('setInitialSettings', () => {
    test('should set correct width and height', () => {
      const isVertical = false;
      line.setInitialSettings(isVertical);

      expect(line.line.className).toContain('dw-slider__line_horizontal');
    });
  });
});
