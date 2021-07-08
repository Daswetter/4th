import { IOptions, Observer } from '../../types'
import { Model } from './Model'

describe('Model', () => {
  let _: Model
  let options: IOptions
  let observer: Observer
  beforeEach(() => {
    options = {
      min: -1800,
      max: 200,
      from: 0,
      to: 100,
      step: 100,
      progress: true,
      tip: true,
      scale: true,
      scaleSize: 5,
      vertical: true,
      double: true,
    }
    _ = new Model(options)
    observer = {
      update: jest.fn()
    }
    _.subscribe(observer)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })


  describe('setCurrent', () => {
    test('call mock', () => {
      _.setCurrent(0.1)
      expect(observer.update).toHaveBeenCalled()
    })
    test('call mock', () => {
      options = {
        min: 0.1,
        max: 0.9,
        from: 0.5,
        to: 0.1,
        step: 0.1123,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      }
      _ = new Model(options)
      observer = {
        update: jest.fn()
      }
      _.subscribe(observer)
      _.setCurrent(0.1)
      expect(observer.update).toHaveBeenCalled()
    })
    test('should work for part size scale', () => {
      options = {
        min: 0,
        max: 120,
        from: 118,
        to: 120,
        step: 50,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      }
      _ = new Model(options)
      observer = {
        update: jest.fn()
      }
      _.subscribe(observer)
      _.setCurrent(120)
      expect(observer.update).toHaveBeenCalledTimes(1)
    })
    test('should work for part size scale', () => {
      options = {
        min: 0,
        max: 130,
        from: 118,
        to: 120,
        step: 33,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      }
      _ = new Model(options)
      observer = {
        update: jest.fn()
      }
      _.subscribe(observer)
      _.setCurrent(1)
      expect(observer.update).toHaveBeenCalledTimes(1)
    })
  })

  describe('setPart', () => {
    test('should call mock', () => {
      _.setPart(21)
      expect(observer.update).toHaveBeenCalled()
    })
    test('should call mock 1 time', () => {
      options = {
        min: 0,
        max: 120,
        from: 118,
        to: 120,
        step: 50,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      }
      _ = new Model(options)
      observer = {
        update: jest.fn()
      }
      _.subscribe(observer)
      _.setPart(120)
      expect(observer.update).toHaveBeenCalledTimes(1)
    })
    test('should filter big part correctly ', () => {
      _.setPart(1200, false)
      expect(observer.update).toHaveBeenCalledWith({data: {current: 200, part: 1, extra: false}, event: 'current and part were sent from Model'})
    })
    test('should filter small part correctly', () => {
      _.setPart(-10000, false)
      expect(observer.update).toHaveBeenCalledWith({data: {current: -1800, part: 0, extra: false}, event: 'current and part were sent from Model'})
    })
  })

  describe('countScaleElements', () => {
    test('should return a correct object', () => {
      options.min = 0
      options.max = 100
      options.step = 1
      options.scaleSize = 2
      expect(_.countScaleElements()).toEqual({"0": "0", "1": "100"})
    })
    test('should round correctly', () => {
      options.min = 0
      options.max = 50
      options.step = 1
      options.scaleSize = 5
      expect(_.countScaleElements()).toEqual({"0": "0", "0.26": "13", "0.5": "25", "0.76": "38", "1": "50"})
    })
    test('should set correct part size scale', () => {
      options.min = 0
      options.max = 5
      options.step = 2
      options.scaleSize = 2
      expect(_.countScaleElements()).toEqual({"0": "0", "0.8": "4"})
    })
  })

  describe('refreshAll', () => {
    test('should call callback', () => {
      _.refreshAll(options)
      expect(observer.update).toHaveBeenCalled()
    })
    test('should filter options', () => {
      options.step = 0
      options.min = -1
      options.max = -10
      options.scaleSize = 1
      _.refreshAll(options)
      expect(observer.update).toHaveBeenCalled()
    })
    test('should filter options', () => {
      options.step = -200
      options.min = -1
      options.max = -1
      options.scaleSize = 21
      _.refreshAll(options)
      expect(observer.update).toHaveBeenCalled()
    })
  })
})




