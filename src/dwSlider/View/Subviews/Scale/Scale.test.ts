import { Scale } from "./Scale"

describe('Scale', () => {
  let _: Scale
  beforeEach(() => {
    const initElement = document.createElement('div')
    const mediator = {
      current: 1,
      currentExtra: 1,
      setMediator: jest.fn(),
      initView: jest.fn(),
      sendDataToSubviews: jest.fn(),
      clearAllView: jest.fn(),
      notify: jest.fn()
    }
    _ = new Scale(initElement, mediator)
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.scale.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.scale.className).toBe('dwSlider__scale')
    })
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

  describe('initScale', () => {
    test('should call mediator.notify', () => {
      const scaleElement1 = document.createElement('div')
      const scaleElement2 = document.createElement('div')
      _.scaleElements = {'0': scaleElement1, '1': scaleElement2}
      _.initScale({'0': '0', '1': '1'}, {width: 1, height: 5}, true)
      const click = new MouseEvent('click')
      _.scaleElements[0].dispatchEvent(click)
      expect(_.mediator.notify).toBeCalled()
    })
  })
})