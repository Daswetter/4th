import { Satellite } from "./satellite"

describe('Satellite', () => {
  let _: Satellite
  beforeEach(() => {
    _ = new Satellite()
  })
  describe('constructor', () => {
    test('should create div', () => {
      expect(_.satellite.nodeName).toBe('DIV')
    })
    test('should create correct class', () => {
      expect(_.satellite.className).toBe('range-slider__satellite')
    })
  })

  describe('initSatelliteExtra', () => {
    beforeEach(() => {
      _.initSatelliteExtra()
    })
    test('should create div', () => {
      expect(_.satelliteExtra.nodeName).toBe('DIV')
    })
    test('should create correct class', () => {
      expect(_.satelliteExtra.className).toBe('range-slider__satellite')
    })
  })

  describe('update', () => {
    
    test('should set position for primary satellite and horizontal mod', () => {
      const lineSize = {
        width: 150,
        height: 9,
      }
      const lineSide = {
        left: 50,
        bottom: 60,
      }
      const thumbSize = {
        width: 30,
        height: 10,
      }
      Object.defineProperty(_.satellite, 'offsetWidth', {
        value: '30'
      })
      Object.defineProperty(_.satellite, 'offsetHeight', {
        value: '20'
      })
      _.update(0.1, 5, lineSize, lineSide, thumbSize)
      expect(_.satellite.innerText).toBe('5')
      expect(_.satellite.style.left).toBe('50px')
      expect(_.satellite.style.top).toBe('26.5px')
    })

    test('should set position for extra satellite and horizontal mod', () => {
      const lineSize = {
        width: 150,
        height: 10,
      }
      const lineSide = {
        left: 50,
        bottom: 60,
      }
      const thumbSize = {
        width: 30,
        height: 10,
      }
      _.initSatelliteExtra()
      Object.defineProperty(_.satelliteExtra, 'offsetWidth', {
        value: '30'
      })
      Object.defineProperty(_.satelliteExtra, 'offsetHeight', {
        value: '20'
      })
      _.update(0.5, 500, lineSize, lineSide, thumbSize, 'horizontal', 'extra')
      expect(_.satelliteExtra.innerText).toBe('500')
      expect(_.satelliteExtra.style.left).toBe('110px')
      expect(_.satelliteExtra.style.top).toBe('26px')
    })

    test('should set position for primary satellite and vertical mod', () => {
      const lineSize = {
        width: 10,
        height: 300,
      }
      const lineSide = {
        left: 100,
        bottom: 500,
      }
      const thumbSize = {
        width: 20,
        height: 20,
      }
      Object.defineProperty(_.satellite, 'offsetWidth', {
        value: '30'
      })
      Object.defineProperty(_.satellite, 'offsetHeight', {
        value: '20'
      })
      _.update(1, 125, lineSize, lineSide, thumbSize, 'vertical')
      expect(_.satellite.innerText).toBe('125')
      expect(_.satellite.style.left).toBe('59px')
      expect(_.satellite.style.top).toBe('190px')
    })

    test('should set position for extra satellite and horizontal mod', () => {
      const lineSize = {
        width: 40,
        height: 100,
      }
      const lineSide = {
        left: 50,
        bottom: 300,
      }
      const thumbSize = {
        width: 30,
        height: 10,
      }
      _.initSatelliteExtra()
      Object.defineProperty(_.satelliteExtra, 'offsetWidth', {
        value: '30'
      })
      Object.defineProperty(_.satelliteExtra, 'offsetHeight', {
        value: '20'
      })
      _.update(0.1, 170, lineSize, lineSide, thumbSize, 'vertical', 'extra')
      expect(_.satelliteExtra.innerText).toBe('170')
      expect(_.satelliteExtra.style.left).toBe('14px')
      expect(_.satelliteExtra.style.top).toBe('280px')
    })
  })
})