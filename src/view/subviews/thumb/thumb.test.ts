import { Thumb } from "./thumb"

describe('Thumb', () =>{
  let _: Thumb
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Thumb(initElement)
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.thumb.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.thumb.className).toBe('range-slider__thumb')
    })
  })


  describe('initExtraElement', () => {
    beforeEach(() => {
      const initElement = document.createElement('div')
      _.initExtraElement(initElement)
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
      _.bindChangedState(callback)
      const lineSize ={
        width: 600,
        height: 6
      }
      const lineSide ={
        left: 6000,
        bottom: 100
      }
      _.setEventListener(lineSize, lineSide)

      const mouseDown = new MouseEvent('mousedown');
      Object.defineProperty(mouseDown, 'pageX', {
        value: 380
      })
      Object.defineProperty(_.thumb, 'offsetLeft', {
        value: 360,
      })
      Object.defineProperty(_.thumb, 'offsetWidth', {
        value: 10,
      })
      
      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageX', {
        value: 1000
      })


      _.thumb.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(callback).toBeCalledWith(1)
    })

    test('should set mouse down and mouse move for vertical and extra', () => {
      const vertical = true
      const callback = jest.fn()
      _.bindExtraChangedState(callback)
      const initElement = document.createElement('div')
      _.initExtraElement(initElement)
      const lineSize ={
        width: 50,
        height: 6
      }
      const lineSide ={
        left: 60,
        bottom: 100
      }
      _.setEventListener(lineSize, lineSide, vertical, 'extra')

      const mouseDown = new MouseEvent('mousedown');
      Object.defineProperty(mouseDown, 'pageY', {
        value: 380
      })
      Object.defineProperty(_.thumbExtra, 'offsetTop', {
        value: 360,
      })
      Object.defineProperty(_.thumbExtra, 'offsetHeight', {
        value: 10,
      })


      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageY', {
        value: 250
      })

      _.thumbExtra.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(callback).toBeCalled()
      expect(callback).toBeCalledWith(0)

      const mouseUp = new MouseEvent('mouseup')

      // *check if mouseUp works

      document.dispatchEvent(mouseUp)
      document.dispatchEvent(mouseMove);
      expect(callback).toBeCalledTimes(1)
    })

    describe('update', () => {
      test('should set correct style.left to thumb and horizontal', () => {
        const vertical = false
        const extra = false
        const lineSize = {
          width: 50,
          height: 10
        }
        Object.defineProperty(_.thumb, 'offsetWidth', {
          value: '10'
        })
        _.update(0.6, lineSize, vertical, extra)
        expect(_.thumb.style.left).toBe('25px')
      })

      test('should set correct style.left to thumbExtra and horizontal', () => {
        const vertical = false
        const extra = true
        const initElement = document.createElement('div')
        _.initExtraElement(initElement)
        const lineSize = {
          width: 300,
          height: 20
        }
        Object.defineProperty(_.thumbExtra, 'offsetWidth', {
          value: '15'
        }) 
        _.update(0.8, lineSize, vertical, extra)
        expect(_.thumbExtra.style.left).toBe('232.5px')
      })

      test('should set correct style.left to thumb and vertical', () => {
        const vertical = true
        const extra = false
        const lineSize = {
          width: 5,
          height: 100
        }
        Object.defineProperty(_.thumb, 'offsetHeight', {
          value: '10'
        })
        _.update(1, lineSize, vertical, extra)
        expect(_.thumb.style.bottom).toBe('95px')
      })

      test('should set correct style.left to thumbExtra and vertical', () => {
        const vertical = true
        const extra = true
        const initElement = document.createElement('div')
        _.initExtraElement(initElement)
        const lineSize = {
          width: 50,
          height: 1000
        }
        Object.defineProperty(_.thumbExtra, 'offsetHeight', {
          value: '5'
        })
        _.update(0.6, lineSize, vertical, extra)
        expect(_.thumbExtra.style.bottom).toBe('597.5px')
      })
      
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
      const vertical = false
      const initElement = document.createElement('div')
      _.initExtraElement(initElement)
      const lineSize = {
        width: 256,
        height: 12
      }
      Object.defineProperty(_.thumbExtra, 'offsetHeight', {
        value: 5
      })
      _.setInitialSettings(lineSize, vertical, 'extra')
      expect(_.thumbExtra.style.top).toBe('3.5px')
    })

    test('should set style top for thumb and vertical mod', () => {
      const vertical = true
      const lineSize = {
        width: 500,
        height: 4
      }
      Object.defineProperty(_.thumb, 'offsetWidth', {
        value: 10
      })
      _.setInitialSettings(lineSize, vertical)
      expect(_.thumb.style.top).toBe('')
      expect(_.thumb.style.left).toBe('245px')
    })

    test('should set style top for thumbExtra and vertical mod', () => {
      const vertical = true
      const initElement = document.createElement('div')
      _.initExtraElement(initElement)
      const lineSize = {
        width: 1200,
        height: 2
      }
      Object.defineProperty(_.thumbExtra, 'offsetWidth', {
        value: 5
      })
      _.setInitialSettings(lineSize, vertical, 'extra')
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