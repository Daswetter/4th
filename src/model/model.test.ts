import { Model } from './model'

// const Model = require("./model");


// jest.mock('./model', () => {
//   return {
//     Model: jest.fn().mockImplementation(() => {
//       return {setCurrentValue: () => {}};
//     }),
//   };
// });

describe('model bla', () => {
  test('bls should return string bla', () => {
    const options = {
      min: 0,
      max: 100,
      initial: 50,
      stepSize: 1,
      orientation: 'horizontal',
      thumbType: 'single',
      underThumbElement: true,
      scale: true,
      progressBar: true,
    }
    const _ = new Model(options)
    expect(_.bla()).toEqual('bla')
  })
})

describe('model countNothing', () => {
  const options = {
    min: 0,
    max: 100,
    initial: 50,
    stepSize: 1,
    orientation: 'horizontal',
    thumbType: 'single',
    underThumbElement: true,
    scale: true,
    progressBar: true,
  }
  let _ = new Model(options)
  beforeEach(() => {
    const _ = new Model(options)
  })
  test('bls should return twice bigger', () => {
    expect(_.countNothing(0.2)).toEqual(0.4)
    expect(_.countNothing(2)).toEqual(4)
    expect(_.countNothing(-1)).toEqual(-2)
  })
  test('bls should not return undefined', () => {
    expect(_.countNothing(0.2)).not.toEqual(0.5)
  })
})