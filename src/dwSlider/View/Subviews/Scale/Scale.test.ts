import { Scale } from "./Scale"

describe('Scale', () => {
  let _: Scale
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Scale(initElement)
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.scale.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.scale.className).toBe('dwSlider__scale')
    })
  })

  describe('initScale', () => {
    let callback: jest.Mock
    const scaleValues = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
    beforeEach(() => {
      callback = jest.fn()
      _.bindChangedState(callback)
      
      const lineSize = {
        width: 100,
        height: 10
      }
      const vertical = true

      _.initScale(scaleValues, lineSize, vertical)
    })
    
    test('should create at least one div', () => {
        expect(_.scale.childNodes[0].nodeName).toBe('DIV')
      }
    )

    test('should call event listener', () => {
      const click = new MouseEvent('click');
      _.scale.childNodes[0].dispatchEvent(click);
      expect(callback).toBeCalled()
      }
    )
  })

  describe('setPosition', () => {
    test('should set correct top and left to vertical', () => {
      _.scaleElements[1] = document.createElement('div')
      const lineSize = {
        width: 0.2,
        height: 0.1
      }
      
      Object.defineProperty(_.scaleElements[1], 'offsetHeight', {
        value: 5
      })
      _.setPosition(lineSize, true)
      expect(_.scaleElements[1].style.top).toBe('-2.5px')
    })
    test('should set correct top and left to horizontal', () => {
      _.scaleElements[1] = document.createElement('div')
      const lineSize = {
        width: 0.2,
        height: 0.1
      }
      _.setPosition(lineSize, false)
      expect(_.scaleElements[1].style.top).toBe('0.2px')
    })
  })
})