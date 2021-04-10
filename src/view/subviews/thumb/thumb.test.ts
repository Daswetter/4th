import { Thumb } from "./thumb"

describe('Thumb', () =>{
  let _: Thumb
  beforeEach(() => {
    _ = new Thumb()
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.thumb.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.thumb.className).toBe('range-slider__thumb')
    })
  })

  describe('returnAsHTML', () => {
    test('should return thumb', () => {
      expect(_.returnAsHTML()).toBe(_.thumb)
    })
  })

  describe('returnExtraAsHTML', () => {
    test('should return thumb', () => {
      _.initThumbExtra()
      expect(_.returnExtraAsHTML()).toBe(_.thumbExtra)
    })
  })

  describe('initThumbExtra', () => {
    beforeEach(() => {
      _.initThumbExtra()
    })
    test('should create div', () => {
      expect(_.thumbExtra.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.thumbExtra.classList).toContain('range-slider__thumb')
    })
  })

  describe('setEventListener', () => {
    test('should set mouse down and mouse move for horizontal and primary', () => {
      const callback = jest.fn()
      _.bindThumbChangedPos(callback)
      const lineSize ={
        width: 600,
        height: 6
      }
      const lineSide ={
        left: 6000,
        bottom: 100
      }
      _.setEventListener(lineSize, lineSide)

      const mouseDown = new MouseEvent('mousedown', {
        bubbles: true,
      });
      Object.defineProperty(mouseDown, 'pageX', {
        value: 380
      })
      Object.defineProperty(_.thumb, 'offsetLeft', {
        value: 360,
      })
      Object.defineProperty(_.thumb, 'offsetWidth', {
        value: 10,
      })
      
      const mouseMove = new MouseEvent('mousemove', {
        bubbles: true,
      });
      Object.defineProperty(mouseMove, 'pageX', {
        value: 1000
      })


      _.thumb.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(callback).toBeCalledWith(1)
    })

    test('should set mouse down and mouse move for vertical and extra', () => {
      const callback = jest.fn()
      _.bindExtraThumbChangedPos(callback)
      _.initThumbExtra()
      const lineSize ={
        width: 50,
        height: 6
      }
      const lineSide ={
        left: 60,
        bottom: 100
      }
      _.setEventListener(lineSize, lineSide, 'vertical', 'extra')

      const mouseDown = new MouseEvent('mousedown', {
        bubbles: true,
      });
      Object.defineProperty(mouseDown, 'pageY', {
        value: 380
      })
      Object.defineProperty(_.thumbExtra, 'offsetTop', {
        value: 360,
      })
      Object.defineProperty(_.thumbExtra, 'offsetHeight', {
        value: 10,
      })


      const mouseMove = new MouseEvent('mousemove', {
        bubbles: true,
      });
      Object.defineProperty(mouseMove, 'pageY', {
        value: 250
      })

      _.thumbExtra.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(callback).toBeCalled()
      expect(callback).toBeCalledWith(0)

      const mouseUp = new MouseEvent('mouseup', {
        bubbles: true,
      })

      // *check if mouseUp works

      document.dispatchEvent(mouseUp)
      document.dispatchEvent(mouseMove);
      expect(callback).toBeCalledTimes(1)
    })

    describe('update', () => {
      test('should set correct style.left to thumb and horizontal', () => {
        const lineSize = {
          width: 50,
          height: 10
        }
        Object.defineProperty(_.thumb, 'offsetWidth', {
          value: '10'
        })
        _.update(0.6, lineSize)
        expect(_.thumb.style.left).toBe('25px')
      })

      test('should set correct style.left to thumbExtra and horizontal', () => {
        _.initThumbExtra()
        const lineSize = {
          width: 300,
          height: 20
        }
        Object.defineProperty(_.thumbExtra, 'offsetWidth', {
          value: '15'
        }) 
        _.update(0.8, lineSize, 'horizontal', 'extra')
        expect(_.thumbExtra.style.left).toBe('232.5px')
      })

      test('should set correct style.left to thumb and vertical', () => {
        const lineSize = {
          width: 5,
          height: 100
        }
        Object.defineProperty(_.thumb, 'offsetHeight', {
          value: '10'
        })
        _.update(1, lineSize, 'vertical')
        expect(_.thumb.style.bottom).toBe('95px')
      })

      test('should set correct style.left to thumbExtra and vertical', () => {
        _.initThumbExtra()
        const lineSize = {
          width: 50,
          height: 1000
        }
        Object.defineProperty(_.thumbExtra, 'offsetHeight', {
          value: '5'
        })
        _.update(0.6, lineSize, 'vertical', 'extra')
        expect(_.thumbExtra.style.bottom).toBe('597.5px')
      })
      
    })
  })

  describe('countCurrentPart', () => {
    test('should return correct part for thumb and horizontal mod', () => {
      const lineSize = {
        width: 100,
        height: 3
      }
      Object.defineProperty(_.thumb, 'offsetLeft', {
        value: 60
      })
      Object.defineProperty(_.thumb, 'offsetWidth', {
        value: 50
      })
      expect(_.countCurrentPart(lineSize)).toBeCloseTo(0.85)
    })
    test('should return correct part for thumbExtra and horizontal mod', () => {
      _.initThumbExtra()
      const lineSize = {
        width: 150,
        height: 5
      }
      Object.defineProperty(_.thumbExtra, 'offsetLeft', {
        value: 90
      })
      Object.defineProperty(_.thumbExtra, 'offsetWidth', {
        value: 20
      })
      expect(_.countCurrentPart(lineSize, 'horizontal', 'extra')).toBeCloseTo(0.666)
    })

    test('should return correct part for thumb and vertical mod', () => {
      const lineSize = {
        width: 10,
        height: 300
      }
      Object.defineProperty(_.thumb, 'offsetTop', {
        value: 50
      })
      Object.defineProperty(_.thumb, 'offsetHeight', {
        value: 50
      })
      expect(_.countCurrentPart(lineSize, 'vertical')).toBeCloseTo(0.75)
    })

    test('should return correct part for thumbExtra and vertical mod', () => {
      _.initThumbExtra()
      const lineSize = {
        width: 10,
        height: 500
      }
      Object.defineProperty(_.thumbExtra, 'offsetTop', {
        value: 250
      })
      Object.defineProperty(_.thumbExtra, 'offsetHeight', {
        value: 10
      })
      expect(_.countCurrentPart(lineSize, 'vertical', 'extra')).toBeCloseTo(0.49)
    })
  })

  describe('setInitialSetting', () => {
    test('should set style top for thumb and horizontal mod', () => {
      const lineSize = {
        width: 120,
        height: 12
      }
      Object.defineProperty(_.thumb, 'offsetHeight', {
        value: 15
      })
      _.setInitialSettings(lineSize)
      expect(_.thumb.style.top).toBe('-1.5px')
    })

    test('should set style top for thumbExtra and horizontal mod', () => {
      _.initThumbExtra()
      const lineSize = {
        width: 256,
        height: 12
      }
      Object.defineProperty(_.thumbExtra, 'offsetHeight', {
        value: 5
      })
      _.setInitialSettings(lineSize, 'horizontal', 'extra')
      expect(_.thumbExtra.style.top).toBe('3.5px')
    })

    test('should set style top for thumb and vertical mod', () => {
      const lineSize = {
        width: 500,
        height: 4
      }
      Object.defineProperty(_.thumb, 'offsetWidth', {
        value: 10
      })
      _.setInitialSettings(lineSize, 'vertical')
      expect(_.thumb.style.top).toBe('')
      expect(_.thumb.style.left).toBe('245px')
    })

    test('should set style top for thumbExtra and vertical mod', () => {
      _.initThumbExtra()
      const lineSize = {
        width: 1200,
        height: 2
      }
      Object.defineProperty(_.thumbExtra, 'offsetWidth', {
        value: 5
      })
      _.setInitialSettings(lineSize, 'vertical', 'extra')
      expect(_.thumbExtra.style.top).toBe('')
      expect(_.thumbExtra.style.left).toBe('597.5px')
    })
  })

  describe('size', () => {
    test('should return an object with thumb size', () => {
      Object.defineProperty(_.thumb, 'offsetWidth', {
        value: 150
      })
      Object.defineProperty(_.thumb, 'offsetHeight', {
        value: 50
      })
      expect(_.size()).toEqual({
        width: 150,
        height: 50
      })
    })
  })


  
})