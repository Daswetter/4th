import { Line } from './line'

describe('Line', () => {
  let _: Line
  beforeEach(() => {
    _ = new Line()
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.line.nodeName).toEqual('DIV')
    });
    test('should set relative position', () => {
      expect(window.getComputedStyle(_.line).getPropertyValue("position")).toEqual('relative')
    });
    test('should set correct class', () => {
      expect(_.line.classList).toContain('range-slider__line')
    });
  })

  describe('returnAsHTML', () => {
    test('should return line as HTMLElement', () => {
      expect(_.returnAsHTML()).toEqual(_.line)
    })
  })

  describe('setEventListener', () => {
    test('should set click to line ', () => {
      _.setEventListener('horizontal')
      const callback = jest.fn();
      _.bindLineClicked(callback)
      _.line.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 10,
        width: 300,
        height: 10,
        top: 50,
        right: 730,
        bottom: 100,
        left: 50,
        toJSON: jest.fn(),
      }))
      Object.defineProperty(_.line, 'offsetWidth', {
        value: 800
      })
      const click = new MouseEvent('click', {
        bubbles: true,
        clientX: 250,
      });
      _.line.dispatchEvent(click);
      expect(callback).toBeCalledWith(0.25);
    });

    test('should set click to vertical line and call subscriber with 0', () => {
      _.setEventListener('vertical')
      const callback = jest.fn();
      _.bindLineClicked(callback)
      _.line.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 10,
        width: 300,
        height: 10,
        top: 50,
        right: 730,
        bottom: 100,
        left: 50,
        toJSON: jest.fn(),
      }))
      Object.defineProperty(_.line, 'offsetHeight', {
        value: 500
      })
      const click = new MouseEvent('click', {
        bubbles: true,
        clientY: 250,
      });
      _.line.dispatchEvent(click);
      expect(callback).toBeCalledWith(0);
    });

    test('should call subscriber if it is true click ', () => {
      _.setEventListener('horizontal')
      const callback = jest.fn();
      _.bindLineClicked(callback)
      _.line.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 10,
        width: 300,
        height: 10,
        top: 50,
        right: 730,
        bottom: 300,
        left: 50,
        toJSON: jest.fn(),
      }))
      Object.defineProperty(_.line, 'offsetWidth', {
        value: 249
      })
      const click = new MouseEvent('click', {
        bubbles: true,
        clientX: 50,
      });
      _.line.dispatchEvent(click);
      const mouseDown = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: 50,
      });
      _.line.dispatchEvent(mouseDown);
      const mouseUp = new MouseEvent('mouseup', {
        bubbles: true,
        clientX: 50,
      });
      _.line.dispatchEvent(mouseUp);
      expect(callback).toBeCalled();
    });

    test('should not call subscriber if it is not click but thumb moving', () => {
      _.setEventListener('horizontal')
      const callback = jest.fn();
      _.bindLineClicked(callback)
      _.line.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 10,
        width: 300,
        height: 10,
        top: 50,
        right: 730,
        bottom: 300,
        left: 50,
        toJSON: jest.fn(),
      }))
      Object.defineProperty(_.line, 'offsetWidth', {
        value: 249
      })
      
      const mouseDown = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: 50,
      });
      _.line.dispatchEvent(mouseDown);
      const mouseUp = new MouseEvent('mouseup', {
        bubbles: true,
        clientX: 51,
      });
      _.line.dispatchEvent(mouseUp);
      const click = new MouseEvent('click', {
        bubbles: true,
      });
      _.line.dispatchEvent(click);
      expect(callback).not.toBeCalled();
    });


    test('should set click to vertical line and call subscriber with 1', () => {
      _.setEventListener('vertical')
      const callback = jest.fn();
      _.bindLineClicked(callback)
      _.line.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 10,
        width: 300,
        height: 10,
        top: 50,
        right: 730,
        bottom: 300,
        left: 50,
        toJSON: jest.fn(),
      }))
      Object.defineProperty(_.line, 'offsetHeight', {
        value: 249
      })
      const click = new MouseEvent('click', {
        bubbles: true,
        clientY: 50,
      });
      _.line.dispatchEvent(click);
      expect(callback).toBeCalledWith(1);
    });
  })

  describe('size', () => {
    test('should return line.offsetWidth and line.offsetHeight', () => {
      Object.defineProperty(_.line, 'offsetWidth', {
        value: 50,
      })
      Object.defineProperty(_.line, 'offsetHeight', {
        value: 5,
      })
      expect(_.size()).toEqual({
        width: 50,
        height: 5
      })
    })
  })

  describe('side', () => {
    test('should return line"s left and line"s bottom', () => {
      Object.defineProperty(_.line, 'offsetLeft', {
        value: 50,
      })
      Object.defineProperty(_.line, 'offsetHeight', {
        value: 100,
      })
      Object.defineProperty(_.line, 'offsetTop', {
        value: 5,
      })
      expect(_.side()).toEqual({
        left: 50,
        bottom: 105 
      })
    })
  })
})