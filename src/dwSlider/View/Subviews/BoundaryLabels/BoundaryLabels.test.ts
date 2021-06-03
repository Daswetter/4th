import { BoundaryLabels } from "./BoundaryLabels"

describe('BoundaryLabels', () => {
  let _: BoundaryLabels
  const initElement = document.createElement('div')
  beforeEach(() => {
    _ = new BoundaryLabels(initElement)
  })

  describe('constructor', () => {
    test('should create this.min and this.max', () => {
      expect(_.min).toBeTruthy()
      expect(_.max).toBeTruthy()
    })
  })

  describe('setInitialSettings', () => {
    let min: number
    let max: number
    let lineWidth: number
    let thumbSize: {
      width: number,
      height: number
    }
    beforeEach(() => {
      min = 100
      max = 200
      lineWidth = 500
      thumbSize = {
        width: 500,
        height: 10
      }
      _.setInitialSettings(min, max, lineWidth, thumbSize)
    })
    test('should set correct style.bottom for min', () => {
      expect(_.min.innerText).toBe(String(min))
    })
    test('should set correct min', () => {
      const vertical = true
      Object.defineProperty(_.min, 'offsetHeight', {
        value: 50
      })
      _.setInitialSettings(min, max,lineWidth, thumbSize, vertical)
      
      expect(_.min.style.bottom).toBe('-25px')
    })
  })

  describe('update', () => {
    let vertical: boolean
    type tipParamsType = {
      width: number,
      height: number,
      left: number,
      top: number,
    }
    let tipParams: tipParamsType
    let tipExtraParams: tipParamsType
    beforeEach(() => {
      tipParams = {
        width: 100,
        height: 50,
        left: 10,
        top: -10,
      }
      tipExtraParams = {
        width: 80,
        height: 120,
        left: -10,
        top: 2,
      }
      vertical = true
      _.update(tipParams, vertical, tipExtraParams)
    })
    test('should set correct min opacity', () => {
      expect(_.min.style.opacity).toBe('0')
    })
    test('should set correct max opacity', () => {
      vertical = false
      Object.defineProperty(_.max, 'offsetLeft', {
        value: 500
      })
      _.update(tipParams, vertical)
      expect(_.max.style.opacity).toBe('1')
    })
    test('should set correct min opacity', () => {
      vertical = false
      Object.defineProperty(_.min, 'offsetLeft', {
        value: 500
      })
      _.update(tipParams, vertical, tipExtraParams)
      expect(_.min.style.opacity).toBe('0')
    })
  })
})