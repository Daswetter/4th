import { Satellite } from "./satellite"

describe('Satellite', () => {
  let _: Satellite
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Satellite(initElement)
  })
  describe('constructor', () => {
    test('should create div', () => {
      expect(_.primary.nodeName).toBe('DIV')
    })
    test('should create correct class', () => {
      expect(_.primary.className).toBe('range-slider__satellite')
    })
  })

  describe('initSatelliteExtra', () => {
    beforeEach(() => {
      const initElement = document.createElement('div')
      _.initExtra(initElement)
    })
    test('should create div', () => {
      expect(_.extra.nodeName).toBe('DIV')
    })
    test('should create correct class', () => {
      expect(_.extra.className).toBe('range-slider__satellite')
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
        width: 20,
        height: 20,
      }
      _.update(1, 125, lineSize, thumbSize, vertical, double, extra)
      expect(_.primary.innerText).toBe('125')
      expect(_.primary.style.left).toBe('-40px')
      expect(_.primary.style.top).toBe('-10px')
    })

    test('should set position and innerText to united', () => {
      const vertical = false
      const double = true
      const extra = true
      
      _.current = 100
      _.currentExtra = 100
      Object.defineProperty(_.united, 'offsetLeft', {
        value: 200
      })
      _.update(1, 100, lineSize, thumbSize, vertical, double, extra)
      expect(_.united.style.left).toBe('')
      expect(_.united.innerText).toBe('100')
    })

    test('should set inner text to primary', () => {
      const vertical = false
      const double = false
      const extra = false
      
      _.update(1, 10, lineSize, thumbSize, vertical, double, extra)
      expect(_.primary.innerText).toBe('10')
    })
  })
})