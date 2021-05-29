import { Tip } from "./tip"

describe('Tip', () => {
  let _: Tip
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Tip(initElement)
  })
  describe('constructor', () => {
    test('should create div', () => {
      expect(_.primary.nodeName).toBe('DIV')
    })
    test('should create correct class', () => {
      expect(_.primary.className).toBe('dwSlider__tip')
    })
  })

  describe('initTipExtra', () => {
    beforeEach(() => {
      const initElement = document.createElement('div')
      _.initExtra(initElement)
    })
    test('should create div', () => {
      expect(_.extra.nodeName).toBe('DIV')
    })
    test('should create correct class', () => {
      expect(_.extra.className).toBe('dwSlider__tip')
    })
  })


  describe('update', () => {
    type ISize = {
      width: number
      height: number
    }
    let lineSize: ISize
    let thumbSize: ISize

    beforeEach(() => {
      lineSize = {
        width: 150,
        height: 9,
      }
      thumbSize = {
        width: 30,
        height: 10,
      }
      Object.defineProperty(_.primary, 'offsetWidth', {
        value: '30'
      })
      Object.defineProperty(_.primary, 'offsetHeight', {
        value: '20'
      })
      const initElement = document.createElement('div')
      _.initExtra(initElement)
      Object.defineProperty(_.extra, 'offsetWidth', {
        value: '30'
      })
      Object.defineProperty(_.extra, 'offsetHeight', {
        value: '20'
      })
    })

    test('should set position for extra and horizontal mod', () => {
      const vertical = false
      const double = true
      const extra = true
      lineSize = {
        width: 150,
        height: 20
      }
      _.setInitialSettings(lineSize.width, thumbSize, vertical, 500, extra)
      _.update(0.5, 500, lineSize, thumbSize, vertical, double, extra)
      expect(_.extra.innerText).toBe('500')
      expect(_.extra.style.left).toBe('60px')
      expect(_.extra.style.top).toBe('-25px')
    })

    test('should set position for primary and vertical mod', () => {
      const vertical = true
      const double = true
      const extra = false

      lineSize = {
        width: 10,
        height: 300,
      }
      thumbSize = {
        width: 21,
        height: 20,
      }
      _.setInitialSettings(lineSize.width, thumbSize, vertical, 100)
      _.update(1, 125, lineSize, thumbSize, vertical, double, extra)
      expect(_.primary.innerText).toBe('125')
      expect(_.primary.style.right).toBe('17px')
      expect(_.primary.style.top).toBe('-10px')
    })

    test('should set position and innerText to united', () => {
      const vertical = false
      const double = true
      const extra = true
      const lineSize = {
        width: 10,
        height: 10
      }
      const thumbSize = {
        width: 10,
        height: 10
      }
      _.update(0.1, 100, lineSize, thumbSize, vertical, double, extra)
      _.update(0.1, 100, lineSize, thumbSize, vertical, double, false)
      
      Object.defineProperty(_.united, 'offsetLeft', {
        value: 200
      })
      _.update(1, 100, lineSize, thumbSize, vertical, double, extra)
      expect(_.united.style.left).toBe('')
      expect(_.united.innerText).toBe('100')
    })

    test('should set inner text to primary', () => {
      const vertical = false
      const double = true
      const extra = false
      Object.defineProperty(_.primary, 'offsetLeft', {
        value: 1000
      })
      
      _.update(1, 10, lineSize, thumbSize, vertical, double, extra)
      expect(_.primary.innerText).toBe('10')
    })

    test('should set inner text to primary if single', () => {
      const vertical = false
      const double = false
      const extra = false
      
      _.update(1, 10, lineSize, thumbSize, vertical, double, extra)
      expect(_.primary.innerText).toBe('10')
    })
  })

  describe('returnPrimaryParameters', () => {
    test('should return correct object', () => {
      Object.defineProperty(_.primary, 'offsetWidth', {
        value: 10
      })
      Object.defineProperty(_.primary, 'offsetHeight', {
        value: 20
      })
      Object.defineProperty(_.primary, 'offsetLeft', {
        value: 30
      })
      Object.defineProperty(_.primary, 'offsetTop', {
        value: 40
      })
      expect(_.returnPrimaryParameters()).toEqual({
        width: 10,
        height: 20,
        left: 30,
        top: 40,
      })
    })
  })

  describe('returnExtraParameters', () => {
    test('should return correct object', () => {
      const initElement = document.createElement('div')
      _.initExtra(initElement)
      Object.defineProperty(_.extra, 'offsetWidth', {
        value: 10
      })
      Object.defineProperty(_.extra, 'offsetHeight', {
        value: 20
      })
      Object.defineProperty(_.extra, 'offsetLeft', {
        value: 30
      })
      Object.defineProperty(_.extra, 'offsetTop', {
        value: 40
      })
      expect(_.returnExtraParameters()).toEqual({
        width: 10,
        height: 20,
        left: 30,
        top: 40,
      })
    })
  })
})