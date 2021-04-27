import { BoundaryLabels } from "./boundaryLabels"

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
    let satelliteTop: number
    let lineWidth: number
    let thumbWidth: number
    beforeEach(() => {
      min = 100
      max = 200
      satelliteTop = 150
      lineWidth = 500
      thumbWidth = 500
      _.setInitialSettings(min, max, satelliteTop,lineWidth, thumbWidth)
    })
    test('should set correct style.bottom for min', () => {
      expect(_.min.innerText).toBe(String(min))
    })
    test('should set correct min', () => {
      const vertical = true
      Object.defineProperty(_.min, 'offsetHeight', {
        value: 50
      })
      _.setInitialSettings(min, max, satelliteTop,lineWidth, thumbWidth, vertical)
      
      expect(_.min.style.bottom).toBe('-25px')
    })
  })

  describe('update', () => {
    let vertical: boolean
    type satelliteParamsType = {
      width: number,
      height: number,
      left: number,
      top: number,
    }
    let satelliteParams: satelliteParamsType
    let satelliteExtraParams: satelliteParamsType
    beforeEach(() => {
      satelliteParams = {
        width: 100,
        height: 50,
        left: 10,
        top: -10,
      }
      satelliteExtraParams = {
        width: 80,
        height: 120,
        left: -10,
        top: 2,
      }
      vertical = true
      _.update(satelliteParams, vertical, satelliteExtraParams)
    })
    test('should set correct min opacity', () => {
      expect(_.min.style.opacity).toBe('0')
    })
    test('should set correct max opacity', () => {
      vertical = false
      Object.defineProperty(_.max, 'offsetLeft', {
        value: 500
      })
      _.update(satelliteParams, vertical)
      expect(_.max.style.opacity).toBe('1')
    })
    test('', () => {
      vertical = false
      Object.defineProperty(_.min, 'offsetLeft', {
        value: 500
      })
      _.update(satelliteParams, vertical, satelliteExtraParams)
      expect(_.min.style.opacity).toBe('0')
    })
  })
})