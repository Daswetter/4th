import { IOptions } from '../../types'
import { View } from './View'


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
      tip: false,
      scale: true,
      scaleSize: 5,
      vertical: true,
      double: true,
    }

    _ = new View(initElement, options)
    _.bindChangedPrimaryCurrent(callbackCurrent)
    _.bindChangedExtraCurrent(callbackExtraCurrent)

    _.bindChangedPrimaryPart(callbackPart)
    _.bindChangedExtraPart(callbackExtraPart)
    
    callbackCurrent.mockClear()
    callbackExtraCurrent.mockClear()
    callbackPart.mockClear()
    callbackExtraPart.mockClear()
    
  })

  describe('initView', () => {
    test('should not fail if primary input do not exist', () => {
      const scaleElements = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
      _.initView(scaleElements)
      expect(_.input).not.toBeTruthy()
    })
    test('should not fail if extra input do not exist', () => {
      const input = document.createElement('input')
      initElement.append(input)
      input.classList.add('dwSlider__input_from')
      options.double = true
      const scaleElements = {
        '0': '0',
        '0.25': '0.25',
        '0.5': '0.5',
        '0.75': '0.75',
        '1': '1',
      }
      _.initView(scaleElements)
      expect(_.input).toBeTruthy()
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
    test('should not create tip', () => {
      expect(_.tip).not.toBeTruthy()
    })
    test('should create scale', () => {
      expect(_.scale).toBeTruthy()
    })
    test('should create progress', () => {
      expect(_.progress).toBeTruthy()
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
    test('should create tip', () => {
      options.tip = true
      _.initView(scaleElements)
      expect(_.tip).toBeTruthy()
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
      options.tip = true
      _.initView(scaleElements)
      expect(_.tip.extra).not.toBeTruthy()
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
      expect(document.querySelector('.dwSlider__wrapper')).not.toBeTruthy()
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
    test('should call update for boundary labels if single', () => {
      options.double = false
      options.tip = true
      
      _.initView(scaleElements)
      const spyLabels = jest.spyOn(_.boundaryLabels, 'update')
      _.notifyPrimary(100, 0.11)
      expect(spyLabels).toHaveBeenCalled()
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
    test('should call update for tip if it is true', () => {
      options.tip = true
      _.initView(scaleElements)
      const spyTip = jest.spyOn(_.tip, 'update')
      _.notifyExtra(100, 0.11)
      expect(spyTip).toHaveBeenCalled()
    })
    test('should not call update for input if input does not exist', () => {      
      _.initView(scaleElements)
      const spyInputs = jest.spyOn(_.input, 'update')
      _.notifyExtra(100, 0.11)
      expect(spyInputs).not.toHaveBeenCalled()
    })
    
  })
})
