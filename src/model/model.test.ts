import { Model } from './model'

describe('Model', () => {
  let _: Model
  let options: IOptions
  beforeEach(() => {
    options = {
      min: -1800,
      max: 200,
      initial: [0],
      stepSize: 100,
      progress: true,
      satellite: true,
      scale: true,
      orientation: 'vertical',
      thumbType: 'double',
      input: true
    }
    _ = new Model(options)
  })
  
  describe('getOptions', () => {
    test('should return options', () => {
      expect(_.getOptions()).toEqual(options)
    })
    test('should not be undefined', () => {
      expect(_.getOptions()).not.toBeUndefined
    })
  })

  

  // test('should throw error', () => {
  //   const options = {
  //     min: 0,
  //     max: 10,
  //     initial: 150,
  //   }
  //   _ = new Model(options)
  //   expect(_.countInitialPart()).toThrowError
  // })

  describe('Binding', () => {
    test('should return callback', () => {
      const callback = jest.fn()
      _.bindCurrentChanged(callback)
      expect(_.onCurrentChanged).toEqual(callback)
    })
  })

  describe('setCurrentValue', () => {
    beforeEach(() => {
      const callback = jest.fn()
      _.bindCurrentChanged(callback)
    })
    test('should return undefined', () => {
      expect(_.setCurrentValue(0.1)).toBeUndefined
    })
    test('should call onCurrentChanged', () => {
      expect(_.onCurrentChanged).toBeCalled
    })
  })

  describe('countScaleElements', () => {
    test('should return array', () => {
      const options = {
        min: 0,
        max: 100, 
        initial: [0, 1],
        stepSize: 1,
        progress: true,
        satellite: true,
        scale: true,
        orientation: 'vertical',
        thumbType: 'double',
        input: true
      }
      _ = new Model(options)
      const result = [0, 25, 50, 75, 100]
      expect(_.countScaleElements()).toEqual(result)
    })
  })

  describe('roundToDecimal', () => {
    test('should round number to decimal', () => {
      expect(_.roundToDecimal(1.259, 2)).toBe(1.26)
    })
    test('should round number to negative decimal', () => {
      expect(_.roundToDecimal(25651.259, -3)).toBe(26000)
    })
    test('should round number to integer', () => {
      expect(_.roundToDecimal(-651.9, 0)).toBe(-652)
    })
  })

  describe('convertStepSizeToDecimal', () => {
    test('should convert step size 0.01 to -2', () => {
      const options = {
        min: 0,
        max: 100, 
        initial: [0],
        stepSize: 0.01,
        progress: true,
        satellite: true,
        scale: true,
        orientation: 'vertical',
        thumbType: 'double',
        input: true
      }
      _ = new Model(options)
      expect(_.convertStepSizeToDecimal(0.01)).toBe(2)
    })
    test('should convert step size 9000 to 3', () => {
      const options = {
        min: 0,
        max: 100, 
        initial: [0],
        stepSize: 1000,
        progress: true,
        satellite: true,
        scale: true,
        orientation: 'vertical',
        thumbType: 'double',
        input: true
      }
      _ = new Model(options)
      expect(_.convertStepSizeToDecimal(1000)).toBe(-3)
    })
    test('should convert step size 5 to 0', () => {
      const options = {
        min: 0,
        max: 100, 
        initial: [0],
        stepSize: 5,
        progress: true,
        satellite: true,
        scale: true,
        orientation: 'vertical',
        thumbType: 'double',
        input: true
      }
      _ = new Model(options)
      expect(_.convertStepSizeToDecimal(5)).toBeCloseTo(0)
    })
  })
})




