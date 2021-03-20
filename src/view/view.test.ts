import { IView } from './IView'
import { View } from './view'
import { IWrapper } from './wrapper/IWrapper'

describe('View', () => {
  let _: IView
  let options: IOptions
  let wrapper: HTMLElement
  let line: HTMLElement
  let thumb: HTMLElement
  let satellite: HTMLElement
  let progress: HTMLElement
  let input: HTMLElement
  let scale: HTMLElement
  let part: number
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
    const callback = jest.fn()
    const callbackExtra = jest.fn()
    _.bindSendValueToModel(callback)
    _.bindSendExtraValueToModel(callbackExtra)
    const scaleElements = [1, 2, 3, 4, 5]
    
    _.initView(scaleElements)
    
    wrapper = initElement.querySelector('.range-slider__wrapper') as HTMLElement
    line = initElement.querySelector('.range-slider__line') as HTMLElement
    thumb = initElement.querySelector('.range-slider__thumb') as HTMLElement
    satellite = initElement.querySelector('.range-slider__satellite') as HTMLElement
    progress = initElement.querySelector('.range-slider__progress') as HTMLElement
    input = initElement.querySelector('.range-slider__input') as HTMLElement
    scale = initElement.querySelector('.range-slider__scale') as HTMLElement
    
  })

  describe('initView', () => {
    test('should create elements', () => {
      expect(wrapper).toBeTruthy()
      expect(line).toBeTruthy()
      expect(thumb).toBeTruthy()
      expect(satellite).toBeTruthy()
      expect(progress).toBeTruthy()
      expect(input).toBeTruthy()
      expect(scale).toBeTruthy()
    })
    test('should not create elements according to options', () => {
      options = {
        min: -1800,
        max: 200,
        initial: [0, 100],
        stepSize: 100,
        progress: false,
        satellite: false,
        scale: false,
        orientation: 'vertical',
        thumbType: 'single',
        input: false
      }
      const initElement: HTMLElement = document.createElement('div')
      _ = new View(initElement, options)
      const callback = jest.fn()
      const callbackExtra = jest.fn()
      _.bindSendValueToModel(callback)
      _.bindSendExtraValueToModel(callbackExtra)
      const scaleElements = [1, 2, 3, 4, 5]
      _.initView(scaleElements)

      wrapper = initElement.querySelector('.range-slider__wrapper') as HTMLElement
      line = initElement.querySelector('.range-slider__line') as HTMLElement
      thumb = initElement.querySelector('.range-slider__thumb') as HTMLElement
      satellite = initElement.querySelector('.range-slider__satellite') as HTMLElement
      progress = initElement.querySelector('.range-slider__progress') as HTMLElement
      input = initElement.querySelector('.range-slider__input') as HTMLElement
      scale = initElement.querySelector('.range-slider__scale') as HTMLElement

      expect(satellite).not.toBeTruthy()
      expect(progress).not.toBeTruthy()
      expect(input).not.toBeTruthy()
      expect(scale).not.toBeTruthy()
    })
  })

  // describe('currentWasSentFromModel', () => {
  //   beforeEach( () => {
  //     _.currentWasSentFromModel(1, 0.5)
  //   })
  //   test('', () => {
  //     expect(part).toBe(0.5)
  //   })
  // })

})
