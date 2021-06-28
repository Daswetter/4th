import { Wrapper } from "./Wrapper"

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
      expect(_.wrapper.className).toBe('dwSlider')
    })
  })

  describe('returnAsHTML', () => {
    test('should return wrapper as HTMLElement', () => {
      expect(_.returnAsHTML()).toEqual(_.wrapper)
    })
  })
  
  describe('setInitialSettings', () => {
    test('should add class for vertical', () => {
      _.setInitialSettings(true)
      expect(_.wrapper.className).toContain('dwSlider_vertical')
    })
    test('should add class for horizontal', () => {
      _.setInitialSettings(false)
      expect(_.wrapper.className).toContain('dwSlider_horizontal')
    })
  })
})
