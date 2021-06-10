import { Thumb } from "./Thumb"

describe('Thumb', () =>{
  let _: Thumb
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Thumb(initElement)
    _.mediator = {
      current: 1,
      currentExtra: 1,
      setMediator: jest.fn(),
      initView: jest.fn(),
      sendDataToSubviews: jest.fn(),
      clearAllView: jest.fn(),
      notify: jest.fn()
    }
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.primary.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.primary.className).toBe('dwSlider__thumb')
    })
  })


  describe('initExtraElement', () => {
    beforeEach(() => {
      const initElement = document.createElement('div')
      _.initExtra(initElement)
    })
    test('should create div', () => {
      expect(_.extra.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.extra.classList).toContain('dwSlider__thumb')
    })
  })

  describe('setEventListener', () => {
    test('should set mouse down and mouse move for horizontal and primary', () => {
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
      Object.defineProperty(_.primary, 'offsetLeft', {
        value: 360,
      })
      Object.defineProperty(_.primary, 'offsetWidth', {
        value: 10,
      })
      
      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageX', {
        value: 1000
      })


      _.primary.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(_.mediator.notify).toBeCalledWith({"current": false, "extra": false, "nearest": false, "value": 1})
    })

    test('should set mouse down and mouse move for vertical and extra', () => {
      const vertical = true
      const initElement = document.createElement('div')
      _.initExtra(initElement)
      const lineSize ={
        width: 50,
        height: 6
      }
      const lineSide ={
        left: 60,
        bottom: 100
      }
      _.setEventListener(lineSize, lineSide, vertical, true)

      const mouseDown = new MouseEvent('mousedown');
      Object.defineProperty(mouseDown, 'pageY', {
        value: 380
      })
      Object.defineProperty(_.extra, 'offsetTop', {
        value: 360,
      })
      Object.defineProperty(_.extra, 'offsetHeight', {
        value: 10,
      })


      const mouseMove = new MouseEvent('mousemove');
      Object.defineProperty(mouseMove, 'pageY', {
        value: 250
      })

      _.extra.dispatchEvent(mouseDown);
      document.dispatchEvent(mouseMove);

      expect(_.mediator.notify).toBeCalled()
      expect(_.mediator.notify).toBeCalledWith({"current": false, "extra": true, "nearest": false, "value": 0})

      const mouseUp = new MouseEvent('mouseup')

      document.dispatchEvent(mouseUp)
      document.dispatchEvent(mouseMove);
      expect(_.mediator.notify).toBeCalledTimes(1)
    })

    describe('update', () => {
      test('should set correct style.left to primary and horizontal', () => {
        const vertical = false
        const extra = false
        const lineSize = {
          width: 50,
          height: 10
        }
        Object.defineProperty(_.primary, 'offsetWidth', {
          value: '10'
        })
        _.update(0.6, lineSize, vertical, extra)
        expect(_.primary.style.left).toBe('25px')
      })

      test('should set correct style.left to extra and horizontal', () => {
        const vertical = false
        const extra = true
        const initElement = document.createElement('div')
        _.initExtra(initElement)
        const lineSize = {
          width: 300,
          height: 20
        }
        Object.defineProperty(_.extra, 'offsetWidth', {
          value: '15'
        }) 
        _.update(0.8, lineSize, vertical, extra)
        expect(_.extra.style.left).toBe('232.5px')
      })

      test('should set correct style.left to primary and vertical', () => {
        const vertical = true
        const extra = false
        const lineSize = {
          width: 5,
          height: 100
        }
        Object.defineProperty(_.primary, 'offsetHeight', {
          value: '10'
        })
        _.update(1, lineSize, vertical, extra)
        expect(_.primary.style.bottom).toBe('95px')
      })

      test('should set correct style.left to extra and vertical', () => {
        const vertical = true
        const extra = true
        const initElement = document.createElement('div')
        _.initExtra(initElement)
        const lineSize = {
          width: 50,
          height: 1000
        }
        Object.defineProperty(_.extra, 'offsetHeight', {
          value: '5'
        })
        _.update(0.6, lineSize, vertical, extra)
        expect(_.extra.style.bottom).toBe('597.5px')
      })
      
    })
  })

  describe('setInitialSetting', () => {
    test('should set style top for primary and horizontal mod', () => {
      const lineSize = {
        width: 120,
        height: 12
      }
      Object.defineProperty(_.primary, 'offsetHeight', {
        value: 15
      })
      _.setInitialSettings(lineSize)
      expect(_.primary.style.top).toBe('-1.5px')
    })

    test('should set style top for extra and horizontal mod', () => {
      const vertical = false
      const initElement = document.createElement('div')
      _.initExtra(initElement)
      const lineSize = {
        width: 256,
        height: 12
      }
      Object.defineProperty(_.extra, 'offsetHeight', {
        value: 5
      })
      _.setInitialSettings(lineSize, vertical, true)
      expect(_.extra.style.top).toBe('3.5px')
    })

    test('should set style top for primary and vertical mod', () => {
      const vertical = true
      const lineSize = {
        width: 500,
        height: 4
      }
      Object.defineProperty(_.primary, 'offsetWidth', {
        value: 10
      })
      _.setInitialSettings(lineSize, vertical)
      expect(_.primary.style.top).toBe('')
      expect(_.primary.style.left).toBe('245px')
    })

    test('should set style top for extra and vertical mod', () => {
      const vertical = true
      const initElement = document.createElement('div')
      _.initExtra(initElement)
      const lineSize = {
        width: 1200,
        height: 2
      }
      Object.defineProperty(_.extra, 'offsetWidth', {
        value: 5
      })
      _.setInitialSettings(lineSize, vertical, true)
      expect(_.extra.style.top).toBe('')
      expect(_.extra.style.left).toBe('597.5px')
    })
  })

  describe('returnSize', () => {
    test('should return an object with primary size', () => {
      Object.defineProperty(_.primary, 'offsetWidth', {
        value: 150
      })
      Object.defineProperty(_.primary, 'offsetHeight', {
        value: 50
      })
      expect(_.returnSize()).toEqual({
        width: 150,
        height: 50
      })
    })
  })


  
})