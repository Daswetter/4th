import { IOptions } from '../interface/IOptions'
import { Model } from './model'

describe('Model', () => {
  let callback: jest.Mock
  let _: Model
  let options: IOptions
  beforeEach(() => {
    options = {
      min: -1800,
      max: 200,
      initial: [0, 100],
      stepSize: 100,
      progress: true,
      satellite: true,
      scale: true,
      orientation: 'vertical',
      thumbType: 'double',
      input: true
    }
    _ = new Model(options)
    callback = jest.fn()
  })

  describe('setCurrent', () => {
    beforeEach(() => {
      _.bindChangedState('primary', callback)
    })
    test('call mock', () => {
      _.setCurrent('primary', 0.1)
      expect(callback).toHaveBeenCalled()
    })
    test('should round currentValue according to stepSize period nd call mock with correct parameters', () => {
      options.stepSize = 0.2
      _.setCurrent('primary', 0.1)
      expect(callback).toHaveBeenCalledWith(-1600, 0.1)
    })
  })

  describe('setCurrentValueForExtra', () => {
    beforeEach(() => {
      _.bindChangedState('extra', callback)
    })
    test('should call mock with max', () => {
      _.setCurrent('extra', 1)
      expect(callback).toHaveBeenCalledWith(200, 1)
    })
  })



  describe('setPart', () => {
    beforeEach(() => {
      _.bindChangedState('primary', callback)
    })
    test('should call mock', () => {
      _.setPart('primary', 1)
      expect(callback).toHaveBeenCalled()
    })
    test('should call mock with right params', () => {
      _.setPart('primary', 1)
      expect(callback).toHaveBeenCalledWith(1, 0.9005)
    })
    test('should filter too big params and call mock', () => {
      options.min = 10
      options.max = 110
      _.setPart('primary', 200)
      expect(callback).toHaveBeenCalledWith(110, 1)
    })
    test('should filter too small params and call mock', () => {
      options.min = 10
      options.max = 110
      _.setPart('primary', -100)
      expect(callback).toHaveBeenCalledWith(10, 0)
    })
  })

  describe('setPartForExtra', () => {
    beforeEach(() => {
      _.bindChangedState('extra', callback)
    })
    test('should call mock with correct parameters', () => {
      _.setPart('extra', 1)
      expect(callback).toHaveBeenCalledWith(1, 0.9005)
    })
  })



  describe('countScaleElements', () => {
    test('should return a correct array', () => {
      options.min = 0
      options.max = 100
      options.stepSize = 1
      expect(_.countScaleElements()).toEqual([0, 25, 50, 75, 100])
    })
    test('should round correctly', () => {
      options.min = 0
      options.max = 50
      options.stepSize = 1
      expect(_.countScaleElements()).toEqual([0, 13, 25, 38, 50])
    })
  })
})




