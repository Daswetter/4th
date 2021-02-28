import { Model } from './model'

const options = {
  min: 0,
  max: 100,
  initial: 50,
  stepSize: 1,
  orientation: 'horizontal',
  thumbType: 'single',
  satellite: true,
  scale: true,
  progress: true,
}
const _ = new Model(options)


describe('get options', () => {
  beforeEach(() => {
    const _ = new Model(options)
  })
  test('should return options', () => {
    expect(_.getOptions()).toEqual(options)
  })
})


describe('Initial part', () => {
  beforeEach(() => {
    const _ = new Model(options)
  })
  test('should be called', () => {
    expect(_.countInitialPart()).not.toBeFalsy()
  })
  test('should return right part', () => {
    expect(_.countInitialPart()).toBe(0.5)
  })
  test('should throw error', () => {
    const options = {
      min: 0,
      max: 10,
      initial: 150,
    }
    console.log(_.countInitialPart());
    
    expect(_.countInitialPart()).toThrow('throw error')
  })
})

describe('Binding', () => {
  beforeEach(() => {
    const _ = new Model(options)
  })
  test('should return callback', () => {
    const callback = jest.fn()
    _.bindCurrentChanged(callback)
    expect(_.onCurrentChanged).toEqual(callback)
  })
})

describe('countCurrentValue', () => {
  beforeEach(() => {
    const _ = new Model(options)
    const callback = jest.fn()
    _.bindCurrentChanged(callback)
  })
  test('should return undefined', () => {
    expect(_.countCurrentValue(0.1)).toBeUndefined
  })
  test('should call onCurrentChanged', () => {
    expect(_.onCurrentChanged).toBeCalled
  })
})

describe('countScaleElements', () => {
  beforeEach(() => {
    const _ = new Model(options)
  })
  test('should return array', () => {
    const options = {
      min: 0,
      max: 100, 
    }
    const result = [0, 25, 50, 75, 100]
    expect(_.countScaleElements()).toEqual(result)
  })
})

describe('roundToDecimal', () => {
  beforeEach(() => {
    const _ = new Model(options)
  })
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
  beforeEach(() => {
    const _ = new Model(options)
  })
  test('should convert step size 0.01 to -2', () => {
    const options = {
      stepSize: 0.01
    }
    expect(_.convertStepSizeToDecimal(0.01)).toBe(2)
  })
  test('should convert step size 9000 to 3', () => {
    const options = {
      stepSize: 1000
    }
    expect(_.convertStepSizeToDecimal(1000)).toBe(-3)
  })
  test('should convert step size 5 to 0', () => {
    const options = {
      stepSize: 5
    }
    expect(_.convertStepSizeToDecimal(5)).toBeCloseTo(0)
  })
})