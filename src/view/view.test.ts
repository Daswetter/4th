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
      from: 0,
      to: 100,
      step: 100,
      progress: true,
      satellite: false,
      scale: true,
      scaleSize: 5,
      vertical: true,
      double: true,
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
    let scaleElements: { [key: string]: string }
    beforeEach(() => {
      scaleElements = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
      const input = document.createElement('input')
      initElement.append(input)
      input.classList.add('range-slider__input_from')

      const inputExtra = document.createElement('input')
      initElement.append(inputExtra)
      inputExtra.classList.add('range-slider__input_to')
      _.initView(scaleElements)
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
    
    test('should call mock in initElementsForResized if window was resized', () => {
      const spyThumb = jest.spyOn(_.thumb, 'setEventListener')
      const onResize = new Event('resize')
      window.dispatchEvent(onResize)
      expect(spyThumb).toHaveBeenCalledTimes(2)
    })
    
    test('should not call scale setPosition if window was resized', () => {
      options.scale = false
      _.initView({'0': '0'})
      const spyScale = jest.spyOn(_.scale, 'setPosition')
      const onResize = new Event('resize')
      window.dispatchEvent(onResize)
      expect(spyScale).not.toHaveBeenCalled()
    })

    test('should call mock for extra in initElementsForResized if window was resized', () => {
      
      options.double = false
      _.initView(scaleElements)
      const spyThumb = jest.spyOn(_.thumb, 'setEventListener')
      const onResize = new Event('resize')
      window.dispatchEvent(onResize)
      expect(spyThumb).toHaveBeenCalledTimes(1)
    })
  })


  describe('initView', () => {
    let scaleElements: { [key: string]: string }
    beforeEach(() => {
      scaleElements = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
    })
    test('should create satellite', () => {
      options.satellite = true
      _.initView(scaleElements)
      expect(_.satellite).toBeTruthy()
    })

    describe('should call mock if line was clicked', () => {
      beforeEach(() => {
        options.double = true
        options.vertical = true
        options.step = 1
        
        _.initView(scaleElements)
        _.line.returnAsHTML().getBoundingClientRect = jest.fn(() => ({
          x: 0,
          y: 10,
          width: 300,
          height: 10,
          top: 50,
          right: 730,
          bottom: 100,
          left: 50,
          toJSON: jest.fn(),
        }))
        Object.defineProperty(_.line, 'offsetHeight', {
          value: 500
        })
        
        Object.defineProperty(_.line, 'offsetWidth', {
          value: 500
        })
        
      })

      test('should call mock for extra if line was clicked near extra thumb', () => {
        _.notifyPrimary(-1700, 0.05)
        _.notifyExtra(100, 0.95)
        const event = new MouseEvent('click', {
          clientX: 500,
        })
        Object.defineProperty(event, 'pageX', {
          value: 0
        })
        _.line.returnAsHTML().dispatchEvent(event)
        expect(callbackExtraPart).toHaveBeenCalled()
      })

      test('should call mock for primary if line was clicked near primary thumb', () => {
        _.notifyExtra(-1700, 0.05)
        _.notifyPrimary(100, 0.95)
        const event = new MouseEvent('click', {
          clientX: 500,
        })
        Object.defineProperty(event, 'pageX', {
          value: 0
        })
        _.line.returnAsHTML().dispatchEvent(event)
        expect(callbackPart).toHaveBeenCalled()
      })
    })
    


    test('should not create scale', () => {
      options.scale = false
      _.initView(scaleElements)
      expect(_.scale).not.toBeTruthy()
    })
    test('should not create progress', () => {
      options.progress = false
      _.initView(scaleElements)
      expect(_.progress).not.toBeTruthy()
    })
    test('should not call mock for extra if thumbType is single', () => {
      options.double = false
      _.initView(scaleElements)
      expect(callbackExtraCurrent).not.toHaveBeenCalled()
    })
    test('should not call initExtraElement for single', () => {
      options.double = false
      options.satellite = true
      _.initView(scaleElements)
      expect(_.satellite.extra).not.toBeTruthy()
    })
  })
  
  describe('clearAllView', () => {
    let scaleElements: { [key: string]: string }
    beforeEach(() => {
      scaleElements = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
    })
    test('all view should be destroyed', () => {
      _.initView(scaleElements)
      _.clearAllView()
      expect(document.querySelector('.range-slider__wrapper')).not.toBeTruthy()
    })
  })
  

  describe('notifyPrimary', () => {
    let scaleElements: { [key: string]: string }
    beforeEach(() => {
      scaleElements = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
      _.initView(scaleElements)
    })
    test('should call thumb"s method update', () => {
      const spyThumb = jest.spyOn(_.thumb, 'update');
      _.notifyPrimary(1, 1)
      expect(spyThumb).toHaveBeenCalled();
    })
  })

  describe('notifyExtra', () => {
    let scaleElements: { [key: string]: string }
    beforeEach(() => {
      scaleElements = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
      _.initView(scaleElements)
    })
    test('write part to part extra if element is extra', () => {
      _.notifyExtra(100, 0.11)
      expect(_.partExtra).toEqual(0.11);
    })
    test('should not call update for progress if progress is false', () => {
      options.progress = false
      _.initView(scaleElements)
      const spyProgress = jest.spyOn(_.progress, 'update')
      _.notifyExtra(100, 0.11)
      expect(spyProgress).not.toHaveBeenCalled()
    })
    test('should call update for satellite if it is true', () => {
      options.satellite = true
      _.initView(scaleElements)
      const spySatellite = jest.spyOn(_.satellite, 'update')
      _.notifyExtra(100, 0.11)
      expect(spySatellite).toHaveBeenCalled()
    })
    test('should call update for boundary labels if single', () => {
      options.double = false
      options.satellite = true
      
      _.initView(scaleElements)
      const spyLabels = jest.spyOn(_.boundaryLabels, 'update')
      _.notifyPrimary(100, 0.11)
      expect(spyLabels).toHaveBeenCalled()
    })
    
  })

  describe('update', () => {
    test('should update options', () => {
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
      _.update(options)
      expect(_.options).toEqual(options)
    })
  })
})
