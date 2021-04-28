import { Wrapper } from './wrapper'

describe('Wrapper', () => {
  let _: Wrapper
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Wrapper(initElement)
  })
  
  describe('constructor', () => {
    test('should create div', () => {
      expect(_.wrapper.nodeName).toBe('DIV')
    })
    test('should set class', () => {
      expect(_.wrapper.className).toBe('range-slider__wrapper')
    })
  })

  describe('returnAsHTML', () => {
    test('should return wrapper as HTMLElement', () => {
      expect(_.returnAsHTML()).toEqual(_.wrapper)
    })
  })
  
  describe('setVertical', () => {
    test('should add new styles', () => {
      _.setVertical()
      expect(_.wrapper.className).toContain('range-slider__wrapper_vertical')
    })
  })
  
})
