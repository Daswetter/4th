import { IView } from './IView'
import { View } from './view'

describe('View', () => {
  let _: IView
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
    const initElement: HTMLElement = document.createElement('div')
    _ = new View(initElement, options)
  })

  describe('setCurrentValue', () => {
    beforeEach(() => {
      const callback = jest.fn()
      const callbackExtra = jest.fn()
      _.bindSendValueToModel(callback)
      _.bindSendExtraValueToModel(callbackExtra)
      const scaleElements = [1, 2, 3, 4, 5]
      _.initView(scaleElements)
    })
    test('should call valueChanged', () => {
      const callback = jest.fn()
      _.bindSendValueToModel(callback)
      const scaleElements = [1, 2, 3, 4, 5]
      _.initView(scaleElements)
      expect(callback).toHaveBeenCalled()
    })
  })
})
