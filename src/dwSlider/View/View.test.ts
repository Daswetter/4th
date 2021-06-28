import { IOptions } from '../../types'
import { View } from './View'

describe('View', () => {
  let _: View
  let options: IOptions
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
    _.mediator = {
      notify: jest.fn()
    }
  })
  afterEach(() => {
    jest.clearAllMocks()
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
    afterEach(() => {
      _.initElement.innerHTML = ''
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
    test('should create tip', () => {
      options.tip = true
      options.scale = false
      _.initView(scaleElements)
      expect(_.tip).toBeTruthy()
    })

    test('should find input', () => {
      options.double = false
      const input = document.createElement('input')
      input.classList.add('js-dwSlider__input_from')
      _.initElement.append(input)
      _.initView(scaleElements)
      expect(_.input).toBeTruthy()
    })
    test('should find extra input', () => {
      const input = document.createElement('input')
      input.classList.add('js-dwSlider__input_from')
      input.classList.add('js-dwSlider__input_to')
      _.initElement.append(input)
      _.initView(scaleElements)
      expect(_.input).toBeTruthy()
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
      expect(document.querySelector('.dwSlider')).not.toBeTruthy()
    })
  })

  describe('sendDataToSubviews', () => {
    afterEach(() => {
      _.initElement.innerHTML = ''
    })
    test('should send data to progress', () => {
      _.initView({'0': '0', '1': '1'})
      const spyOnProgress = jest.spyOn(_.progress, 'update')
      _.sendDataToSubviews(1, 1)
      expect(spyOnProgress).toHaveBeenCalled()
    })
    test('should send data to tip', () => {
      const input = document.createElement('input')
      input.classList.add('js-dwSlider__input_from')
      input.classList.add('js-dwSlider__input_to')
      _.initElement.append(input)
      options.tip = true
      _.initView({'0': '0', '1': '1'})
      const spyOnTip = jest.spyOn(_.tip, 'update')
      _.sendDataToSubviews(1, 1, true)
      expect(spyOnTip).toHaveBeenCalled()
    })
    test('should send data to tip', () => {
      options.progress = false
      options.tip = true
      options.double = false
      _.initView({'0': '0', '1': '1'})
      const spyOnTip = jest.spyOn(_.tip, 'update')
      _.sendDataToSubviews(1, 1)
      expect(spyOnTip).toHaveBeenCalled()
    })
  })

  describe('notify', () => {
    test('should call notify mediator for extra', () => {
      _.notify({value: 1, current: true, extra: true, nearest: true})
      expect(_.mediator.notify).toHaveBeenCalled()
    })
    test('should call notify mediator for primary', () => {
      _.part = 0
      _.partExtra = 0.1
      _.notify({value: 1, current: false, extra: false, nearest: true})
      expect(_.mediator.notify).toHaveBeenCalled()
    })
    test('should call notify in mediator', () => {
      _.notify({value: 1, current: true, extra: true, nearest: false})
      expect(_.mediator.notify).toHaveBeenCalledTimes(1)
    })
  })

  describe('setMediator', () => {
    test('should add mediator', () => {
      const testMediator = {
        notify: jest.fn()
      }
      _.setMediator(testMediator)
      expect(_.mediator).toEqual(testMediator)
    })
  })
})
