import { IOptions } from '../interface/IOptions'
import { Model } from './model'

describe('Model', () => {
  let callback: jest.Mock
  let callbackExtra: jest.Mock
  let _: Model
  let options: IOptions
  beforeEach(() => {
    options = {
      min: -1800,
      max: 200,
      from: 0,
      to: 100,
      step: 100,
      progress: true,
      satellite: true,
      scale: true,
      scaleSize: 5,
      vertical: true,
      double: true,
    }
    _ = new Model(options)
    callback = jest.fn()
    callbackExtra = jest.fn()
  })

  describe('setCurrent', () => {
    beforeEach(() => {
      _.bindChangedValues(callback)
      _.bindChangedExtraValues(callbackExtra)
    })
    test('call mock', () => {
      _.setCurrent(0.1)
      expect(callback).toHaveBeenCalled()
    })
    test('should round currentValue according to step period nd call mock with correct parameters', () => {
      options.step = 0.2
      _.setCurrent( 0.1)
      expect(callback).toHaveBeenCalledWith(-1600, 0.1)
    })
    test('should set correct current if scale is not full size', () => {
      options.min = 0
      options.max = 21
      options.step = 2
      _.setCurrent(1)
      expect(callback).toHaveBeenCalledWith(21, 1)
    })
    test('should set correct current if scale is not full size', () => {
      options.min = 0
      options.max = 80
      options.step = 50
      _.setCurrent(0.8)
      expect(callback).toHaveBeenCalledWith(50, 0.625)
    })
    test('should call callback for extra', () => {
      _.setCurrent(0.8, true)
      expect(callbackExtra).toHaveBeenCalled()
    })

  })




  describe('setPart', () => {
    beforeEach(() => {
      options.min = 10
      options.max = 110
      options.step = 10
      _.bindChangedValues(callback)
    })
    test('should call mock with right params', () => {
      _.setPart(21)
      expect(callback).toHaveBeenCalledWith(20, 0.1)
    })
    test('should filter too big params and call mock', () => {
      _.setPart(200)
      expect(callback).toHaveBeenCalledWith(110, 1)
    })
    test('should filter too small params and call mock', () => {
      _.setPart(-100)
      expect(callback).toHaveBeenCalledWith(10, 0)
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
      expect(_.countScaleElements()).toEqual({"0": "0", "0.25": "13", "0.5": "25", "0.75": "38", "1": "50"})
    })
    test('should set correct part size scale', () => {
      options.min = 0
      options.max = 5
      options.step = 2
      options.scaleSize = 2
      expect(_.countScaleElements()).toEqual({"0": "0", "0.8": "4"})
    })
  })

  describe('update', () => {
    let callback: jest.Mock
    beforeEach(() => {
      callback = jest.fn()
      _.bindChangedOptions(callback)
    })
    test('should call callback', () => {
      
      _.update(options)
      expect(callback).toHaveBeenCalled()
    })
    test('should filter options', () => {
      options.step = 0
      options.min = -1
      options.max = -10
      options.scaleSize = 1
      _.update(options)
      expect(callback).toHaveBeenCalled()
    })
    test('should filter options', () => {
      options.step = -200
      options.min = -1
      options.max = -1
      options.scaleSize = 21
      _.update(options)
      expect(callback).toHaveBeenCalled()
    })
  })
})




