import { Line } from './line'

describe('Line', () => {
  let _: Line
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Line(initElement)
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.line.nodeName).toEqual('DIV')
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
    let callback: jest.Mock
    beforeEach(() => {
      callback = jest.fn();
      _.bindChangedState(callback)
    })

    describe('horizontal', () => {
      beforeEach(() => {
        const vertical = false
        _.setEventListener(vertical)
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
        const mouseDown = new MouseEvent('mousedown', {
          clientX: 250
        });
        _.line.dispatchEvent(mouseDown);
        
        const mouseUp = new MouseEvent('mouseup', {
          clientX: 250
        });
        _.line.dispatchEvent(mouseUp);
      })

      test('should set click to line ', () => {
        const click = new MouseEvent('click', {
          clientX: 250,
          clientY: 60
        });
        Object.defineProperty(_.line, 'offsetTop', {
          value: 50
        })
        Object.defineProperty(_.line, 'offsetHeight', {
          value: 10
        })
        Object.defineProperty(click, 'pageY', {
          value: 60
        })
        _.line.dispatchEvent(click);
        expect(callback).toBeCalledWith(0.25);
      });
  
      test('should set click to line and call callback with 0', () => {
        const click = new MouseEvent('click', {
          clientX: -250,
        });
        Object.defineProperty(click, 'pageY', {
          value: 0
        })
        _.line.dispatchEvent(click);
        expect(callback).toBeCalledWith(0);
      });
  
      test('should set click to horizontal line and call callback with 1', () => {
        const click = new MouseEvent('click', {
          clientX: 1000,
        });
        Object.defineProperty(click, 'pageY', {
          value: 0
        })
        _.line.dispatchEvent(click);
        expect(callback).toBeCalledWith(1);
      });

      test('should not call callback if scale were clicked', () => {
        Object.defineProperty(_.line, 'offsetTop', {
          value: 800
        })
        const click = new MouseEvent('click', {
          clientX: 1000,
          clientY: 900,
        });
        Object.defineProperty(click, 'pageY', {
          value: 60
        })
        _.line.dispatchEvent(click);
        expect(callback).not.toHaveBeenCalled()
      });
    })

    describe('vertical', () => {
      beforeEach(() => {
        const vertical = true
        _.setEventListener(vertical)
        
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

        const mouseDown = new MouseEvent('mousedown', {
          clientY: 250,
        });
        _.line.dispatchEvent(mouseDown);
        const mouseUp = new MouseEvent('mouseup', {
          clientY: 250,
        });
        _.line.dispatchEvent(mouseUp);
      })
      test('should set click to line and call subscriber with 0', () => {
      
        const click = new MouseEvent('click', {
          clientY: 250,
        });
        Object.defineProperty(click, 'pageX', {
          value: 0
        })
        _.line.dispatchEvent(click);
        expect(callback).toBeCalledWith(0);
      });

      test('should set click to line and call subscriber with 1', () => {
        const click = new MouseEvent('click', {
          clientY: -500,
        });
        Object.defineProperty(click, 'pageX', {
          value: 0
        })
        _.line.dispatchEvent(click);
        expect(callback).toBeCalledWith(1);
      });

      test('should set click to line and call subscriber with 0.2', () => {
        const click = new MouseEvent('click', {
          clientY: 0,
          clientX: 1000
        });
        Object.defineProperty(click, 'pageX', {
          value: 0
        })
        _.line.dispatchEvent(click);
        expect(callback).toBeCalledWith(0.2);
      });

      test('should not call callback if scale were clicked', () => {
        const click = new MouseEvent('click', {
          clientX: 1000,
          clientY: 900,
        });
        Object.defineProperty(click, 'pageX', {
          value: 60
        })
        _.line.dispatchEvent(click);
        expect(callback).not.toHaveBeenCalled()
      });
    })

    test('should not call callback if onMouseDown value is not equal to onMouseUp', () => {
      
      const vertical = true
      _.setEventListener(vertical)

      const mouseDown = new MouseEvent('mousedown', {
        clientX: 20,
        clientY: 20,
      });
      _.line.dispatchEvent(mouseDown);
      const mouseUp = new MouseEvent('mouseup', {
        clientX: 250,
        clientY: 250,
      });
      _.line.dispatchEvent(mouseUp);
      
      const click = new MouseEvent('click', {
        clientY: 250,
      });
      Object.defineProperty(click, 'pageX', {
        value: 0
      })
      _.line.dispatchEvent(click);
      expect(callback).not.toBeCalled();
    })
  
      
  })
  

  describe('returnSize', () => {
    test('should return line.offsetWidth and line.offsetHeight', () => {
      Object.defineProperty(_.line, 'offsetWidth', {
        value: 50,
      })
      Object.defineProperty(_.line, 'offsetHeight', {
        value: 5,
      })
      expect(_.returnSize()).toEqual({
        width: 50,
        height: 5
      })
    })
  })

  describe('returnSide', () => {
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
      expect(_.returnSide()).toEqual({
        left: 50,
        bottom: 105 
      })
    })
  })

  describe('setInitialSettings', () => {
    test('should set correct width and height', () => {
      const vertical = true
      _.setInitialSettings(vertical)

      expect(_.line.className).toContain('range-slider__line_vertical')

    })
  })

  describe('setInitialSettings', () => {
    test('should set correct width and height', () => {
      const vertical = false
      _.setInitialSettings(vertical)

      expect(_.line.className).toContain('range-slider__line_horizontal')

    })
  })

})