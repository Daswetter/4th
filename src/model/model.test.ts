import { Model } from './model'

describe('Model', () => {
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
  })
  
  describe('countCurrentValue', () => {
    test('should be called', () => {
      expect(_.countCurrentValue(0.5)).toBe(-800)
    })
    test('should be called', () => {
      options = {
        min: 0,
        max: 1,
        initial: [0, 1],
        stepSize: 0.1,
        progress: true,
        satellite: true,
        scale: true,
        orientation: 'vertical',
        thumbType: 'double',
        input: true
      }
      _ = new Model(options)
      expect(_.countCurrentValue(0.5)).toBe(0.5)
    })
  })

  describe('setCurrentValue', () => {
    test('should be called', () => {
      const callback = jest.fn()
      _.bindCurrentChanged(callback)
      _.setCurrentValue(0.1)
      expect(callback).toHaveBeenCalled()
    })
  })

  describe('setCurrentValueForExtra', () => {
    test('should be called', () => {
      const callback = jest.fn()
      _.bindExtraCurrentChanged(callback)
      _.setCurrentValueForExtra(0.1)
      expect(callback).toHaveBeenCalled()
    })
  })

  describe('countCurrentPart', () => {
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
    })
    test('should return correct part', () => {
      expect(_.countCurrentPart(100)).toBe(0.95)
    })
    test('should return a number', () => {
      expect(_.countCurrentPart(300)).toBe(1)
    })
    test('should return a number', () => {
      expect(_.countCurrentPart(-2000)).toBe(0)
    })
  })



  describe('filterCurrentValue', () => {
    test('', () => {
      expect(_.filterCurrentValue(-2000)).toBe(-1800)
    })
    test('', () => {
      expect(_.filterCurrentValue(3000)).toBe(200)
    })
  })

  describe('setCurrentPart', () => {
    beforeEach(() => {
      options = {
        min: 0,
        max: 200,
        initial: [0, 100],
        stepSize: 1,
        progress: true,
        satellite: true,
        scale: true,
        orientation: 'vertical',
        thumbType: 'double',
        input: true
      }
      _ = new Model(options)
      
    })
    test('', () => {
      const callback = jest.fn()
      _.bindCurrentChanged(callback)
      _.setCurrentPart(1)
      expect(callback).toHaveBeenCalled()
    })
    test('', () => {
      const callback = jest.fn()
      _.bindCurrentChanged(callback)
      _.setCurrentPart(1)
      expect(callback).toHaveBeenCalledWith(1, 0.005)
    })
  })

  describe('setCurrentPartForExtra', () => {
    beforeEach(() => {
      options = {
        min: 0,
        max: 200,
        initial: [0, 100],
        stepSize: 1,
        progress: true,
        satellite: true,
        scale: true,
        orientation: 'vertical',
        thumbType: 'double',
        input: true
      }
      _ = new Model(options)
      
    })
    test('', () => {
      const callback = jest.fn()
      _.bindExtraCurrentChanged(callback)
      _.setCurrentPartForExtra(1)
      expect(callback).toHaveBeenCalled()
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
  
  describe('convertStepSizeToDecimal', () => {
    test('should convert step size 0.01 to -2', () => {
      expect(_.convertStepSizeToDecimal(0.01)).toBe(2)
    })
    test('should convert step size 9000 to 3', () => {
      expect(_.convertStepSizeToDecimal(1000)).toBe(-3)
    })
    test('should convert step size 5 to 0', () => {
      expect(_.convertStepSizeToDecimal(5)).toBeCloseTo(0)
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
    test('should round number to integer', () => {
      expect(_.roundToDecimal(-651.9)).toBe(-652)
    })
  })

  describe('isInteger', () => {
    test('should return same number', () => {
      expect(_.isInteger(2)).toBe(true)
    })
  })

  describe('Binding', () => {
    test('should return callback', () => {
      const callback = jest.fn()
      _.bindCurrentChanged(callback)
      expect(_.onCurrentChanged).toEqual(callback)
    })
  })

  describe('Binding extra', () => {
    test('should return callback', () => {
      const callback = jest.fn()
      _.bindExtraCurrentChanged(callback)
      expect(_.onExtraCurrentChanged).toEqual(callback)
    })
  })
})




