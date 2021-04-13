import { IOptions } from '../interface/IOptions'
import { View } from './view'


describe('View', () => {
  let _: View
  let options: IOptions
  
  const callbackCurrent = jest.fn()
  const callbackExtraCurrent = jest.fn()

  const callbackPart = jest.fn()
  const callbackExtraPart = jest.fn()
  
  const initElement: HTMLElement = document.createElement('div')

  beforeEach(() => {
    options = {
      min: -1800,
      max: 200,
      initial: [0, 100],
      stepSize: 100,
      progress: true,
      satellite: false,
      scale: true,
      orientation: 'vertical',
      thumbType: 'double',
      input: true
    }

    _ = new View(initElement, options)
    _.bindChangedCurrent(callbackCurrent)
    _.bindChangedExtraCurrent(callbackExtraCurrent)

    _.bindChangedPart(callbackPart)
    _.bindChangedExtraPart(callbackExtraPart)
    
    callbackCurrent.mockClear()
    callbackExtraCurrent.mockClear()
    callbackPart.mockClear()
    callbackExtraPart.mockClear()
    
  })


  describe('initView', () => {
    beforeEach(() => {
      _.initView([1, 2, 3, 4, 5])
    })
    test('should create wrapper', () => {
      expect(_.wrapper).toBeTruthy()
    })
    test('should create line', () => {
      expect(_.line).toBeTruthy()
    })
    test('should create thumb', () => {
      expect(_.thumb).toBeTruthy()
    })
    test('should not create satellite', () => {
      expect(_.satellite).not.toBeTruthy()
    })
    test('should create scale', () => {
      expect(_.scale).toBeTruthy()
    })
    test('should create progress', () => {
      expect(_.progress).toBeTruthy()
    })
    test('should create input', () => {
      expect(_.input).toBeTruthy()
    })
    
    test('should call mock in initElementsForResized if window was resized', () => {
      const spyThumb = jest.spyOn(_.thumb, 'setEventListener')
      const onResize = new Event('resize')
      window.dispatchEvent(onResize)
      expect(spyThumb).toHaveBeenCalledTimes(2)
    })
    test('should call mock for extra in initElementsForResized if window was resized', () => {
      
      options.thumbType = 'single'
      _.initView([1, 2, 3, 4, 5])
      const spyThumb = jest.spyOn(_.thumb, 'setEventListener')
      const onResize = new Event('resize')
      window.dispatchEvent(onResize)
      expect(spyThumb).toHaveBeenCalledTimes(1)
    })
  })

  describe('initView', () => {
    
    test('should create satellite', () => {
      options.satellite = true
      _.initView([1, 2, 5, 8, 9])
      expect(_.satellite).toBeTruthy()
    })

    test('should call mock if line was clicked', () => {
      options.thumbType = 'double'
      _.initView([1, 2, 5, 8, 9])
      const event = new MouseEvent('click')
      _.line.returnAsHTML().dispatchEvent(event)
      expect(callbackPart).toHaveBeenCalled()
    })
    test('should call mock for extra if line was clicked near extra thumb', () => {
      options.thumbType = 'double'
      options.orientation = 'horizontal'
      _.initView([-1800, -1400, -800, -200, 200])
      _.notifyPrimaryElement(-1700, 0.05)
      _.notifyExtraElement(100, 0.95)
      Object.defineProperty(_.line, 'offsetWidth', {
        value: 500
      })
      const event = new MouseEvent('click', {
        clientX: 500,
      })
      _.line.returnAsHTML().dispatchEvent(event)
      expect(callbackExtraPart).toHaveBeenCalled()
    })
    test('should not create scale', () => {
      options.scale = false
      _.initView([1, 2, 3, 4, 5])
      expect(_.scale).not.toBeTruthy()
    })
    test('should not create progress', () => {
      options.progress = false
      _.initView([1, 2, 3, 4, 5])
      expect(_.progress).not.toBeTruthy()
    })
    test('should not create input', () => {
      options.input = false
      _.initView([1, 2, 3, 4, 5])
      expect(_.input).not.toBeTruthy()
    })
    test('should not call mock for extra if thumbType is single', () => {
      options.thumbType = 'single'
      _.initView([1, 2, 3, 4, 5])
      expect(callbackExtraCurrent).not.toHaveBeenCalled()
    })
    test('should not call initExtraElement for single', () => {
      options.thumbType = 'single'
      options.satellite = true
      _.initView([1, 2, 3, 4, 5])
      expect(_.satellite.satelliteExtra).not.toBeTruthy()
    })
    
  })
  
  

  describe('notifyPrimaryElement', () => {
    beforeEach(() => {
      _.initView([1, 2, 5, 8, 9])
    })
    test('should call thumb"s method update', () => {
      const spyThumb = jest.spyOn(_.thumb, 'update');
      _.notifyPrimaryElement(1, 1)
      expect(spyThumb).toHaveBeenCalled();
    })
  })

  describe('notifyExtraElement', () => {
    beforeEach(() => {
      _.initView([1, 2, 5, 8, 9])
    })
    test('write part to part extra if element is extra', () => {
      _.notifyExtraElement(100, 0.11)
      expect(_.partExtra).toEqual(0.11);
    })
    test('should not call update for input if input is false', () => {
      options.input = false
      _.initView([1, 2, 5, 8, 9])
      const spyInput = jest.spyOn(_.input, 'update')
      _.notifyExtraElement(100, 0.11)
      expect(spyInput).not.toHaveBeenCalled()
    })
    test('should not call update for progress if progress is false', () => {
      options.progress = false
      _.initView([1, 2, 5, 8, 9])
      const spyProgress = jest.spyOn(_.progress, 'update')
      _.notifyExtraElement(100, 0.11)
      expect(spyProgress).not.toHaveBeenCalled()
    })
    test('should call update for satellite if it is true', () => {
      options.satellite = true
      _.initView([1, 2, 5, 8, 9])
      const spySatellite = jest.spyOn(_.satellite, 'update')
      _.notifyExtraElement(100, 0.11)
      expect(spySatellite).toHaveBeenCalled()
    })
  })
})
