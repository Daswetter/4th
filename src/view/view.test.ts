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
      options.satellite = false
      options.progress = false
      options.input = false
      options.scale = false
      const scaleElements = [1, 2, 3, 4, 6]
      _.initView(scaleElements)

      expect(satellite).not.toBeTruthy()
      expect(progress).not.toBeTruthy()
      expect(input).not.toBeTruthy()
      expect(scale).not.toBeTruthy()
    })
  })

  describe('initWrapper', () => {
    test('', () => {
      _.wrapper.setVertical = jest.fn()
      _.initWrapper()
      expect(_.wrapper.setVertical).toHaveBeenCalled()
    })
  })

  describe('initSatellite', () => {
    test('', () => {
      options.thumbType = 'double'
      _.satellite.initSatelliteExtra = jest.fn()
      _.initSatellite()
      expect(_.satellite.initSatelliteExtra).toHaveBeenCalled()
    })
  })


  describe('currentWasSentFromModel', () => {
    test('should call thumb"s method', () => {
      _.currentWasSentFromModel(1, 0.5)
      expect(_.part).toBe(0.5)
    })
    test('should call thumb"s method', () => {
      _.thumb.setPosition = jest.fn()
      _.currentWasSentFromModel(1, 0.5)
      expect(_.thumb.setPosition).toHaveBeenCalled()
    })
    test('should call input"s method', () => {
      _.input.displayCurrentValue = jest.fn()
      _.currentWasSentFromModel(100, 0.5)
      expect(_.input.displayCurrentValue).toHaveBeenCalledWith(100)
    })
    test('should not call input"s method if input: false', () => {
      options.input = false
      _.input.displayCurrentValue = jest.fn()
      _.currentWasSentFromModel(1, 0.5)
      expect(_.input.displayCurrentValue).not.toHaveBeenCalled()
    })
    test('should call progress"s method', () => {
      _.progress.setPosition = jest.fn()
      _.line.size = jest.fn().mockImplementation(() => ({
        width: 100,
        height: 80
      }))
      const orientation = options.orientation
      const element = 'primary'
      _.currentWasSentFromModel(-2, 0.05)
      expect(_.progress.setPosition).toHaveBeenCalledWith(0.05, {width: 100, height: 80}, orientation, element)
    })
    test('should not call progress"s method', () => {
      options.progress = false
      _.progress.setPosition = jest.fn()
      _.currentWasSentFromModel(-2, 0.05)
      expect(_.progress.setPosition).not.toHaveBeenCalled()
    })
    test('should call satellite"s method', () => {
      _.satellite.setPosition = jest.fn()
      _.currentWasSentFromModel(1, 0.5)
      expect(_.satellite.setPosition).toHaveBeenCalled()
    })
    test('should not call satellite"s method', () => {
      options.satellite = false
      _.satellite.setPosition = jest.fn()
      _.currentWasSentFromModel(1, 0.5)
      expect(_.satellite.setPosition).not.toHaveBeenCalled()
    })
    
  })


  describe('extraCurrentWasSentFromModel', () => {
    test('should call thumb"s method', () => {
      _.extraCurrentWasSentFromModel(1, 0.5)
      expect(_.partExtra).toBe(0.5)
    })
    test('should call thumb"s method', () => {
      _.thumb.setPosition = jest.fn()
      _.extraCurrentWasSentFromModel(1, 0.5)
      expect(_.thumb.setPosition).toHaveBeenCalled()
    })
    test('should call input"s method', () => {
      _.input.displayCurrentValue = jest.fn()
      _.extraCurrentWasSentFromModel(100, 0.5)
      expect(_.input.displayCurrentValue).toHaveBeenCalledWith(100, 'extra')
    })
    test('should not call input"s method', () => {
      options.input = false
      _.input.displayCurrentValue = jest.fn()
      _.extraCurrentWasSentFromModel(100, 0.5)
      expect(_.input.displayCurrentValue).not.toHaveBeenCalled()
    })
    test('should call progress"s method', () => {
      _.progress.setPosition = jest.fn()
      _.line.size = jest.fn().mockImplementation(() => ({
        width: 100,
        height: 80
      }))
      const orientation = options.orientation
      const element = 'extra'
      _.extraCurrentWasSentFromModel(-2, 0.05)
      expect(_.progress.setPosition).toHaveBeenCalledWith(0.05, {width: 100, height: 80}, orientation, element)
    })
    test('should not call progress"s method', () => {
      options.progress = false
      _.progress.setPosition = jest.fn()
      _.extraCurrentWasSentFromModel(-2, 0.05)
      expect(_.progress.setPosition).not.toHaveBeenCalled()
    })
    test('should call satellite"s method', () => {
      _.satellite.setPosition = jest.fn()
      _.extraCurrentWasSentFromModel(1, 0.5)
      expect(_.satellite.setPosition).toHaveBeenCalled()
    })
    test('should not call satellite"s method', () => {
      options.satellite = false
      _.satellite.setPosition = jest.fn()
      _.extraCurrentWasSentFromModel(1, 0.5)
      expect(_.satellite.setPosition).not.toHaveBeenCalled()
    })
  })


  describe('changePositionForTheNearest', () => {
    test('should call thumb"s method', () => {
      const callback = jest.fn()
      const callbackExtra = jest.fn()
      _.bindSendPartToModel(callback)
      _.bindSendExtraPartToModel(callbackExtra)
      _.thumb.countCurrentPart = jest.fn()
      _.changePositionForTheNearest(0.1)
      expect(_.thumb.countCurrentPart).toHaveBeenCalled()
    })
    test('should call extraPartChanged if distFromActionToPrimary is greater than distFromActionToExtra', () => {
      const callback = jest.fn()
      const callbackExtra = jest.fn()
      _.bindSendPartToModel(callback)
      _.bindSendExtraPartToModel(callbackExtra)
      
      _.thumb.countCurrentPart = jest
        .fn()
        .mockImplementationOnce(() => 0.8)
        .mockImplementationOnce(() => 0.6)
      _.changePositionForTheNearest(0.1)
      expect(callbackExtra).toHaveBeenCalled()
      expect(callback).not.toHaveBeenCalled()
    })
  })


  describe('windowWasResized', () => {
    test('should call partChanged', () => {
      options.thumbType = 'single'
      const callback = jest.fn()
      _.bindSendPartToModel(callback)
      _.windowWasResized()
      expect(callback).toHaveBeenCalled()
    })
    test('should call thumb"s method', () => {
      options.thumbType = 'single'
      const callback = jest.fn()
      _.bindSendPartToModel(callback)
      _.thumb.setEventListener = jest.fn()
      _.windowWasResized()
      expect(_.thumb.setEventListener).toHaveBeenCalled()
    })
    test('should call extraPartChanged if double', () => {
      const callback = jest.fn()
      const callbackExtra = jest.fn()
      _.bindSendPartToModel(callback)
      _.bindSendExtraPartToModel(callbackExtra)
      _.thumb.setEventListener = jest.fn()
      _.windowWasResized()
      expect(callbackExtra).toHaveBeenCalled()
    })
  })
})
