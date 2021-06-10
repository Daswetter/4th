import { Input } from './Input'

describe('Input', () => {
  let _: Input
  const initElement = document.createElement('div')
  const inputFrom = document.createElement('input')
  inputFrom.classList.add('js-dwSlider__input_from')
  initElement.append(inputFrom)
  const inputTo = document.createElement('div')
  inputTo.classList.add('js-dwSlider__input_to')
  initElement.append(inputTo)
  beforeEach(() => {
    _ = new Input(initElement)
    _.mediator = {
      current: 1,
      currentExtra: 1,
      setMediator: jest.fn(),
      initView: jest.fn(),
      sendDataToSubviews: jest.fn(),
      clearAllView: jest.fn(),
      notify: jest.fn()
    }
  })
  describe('constructor', () => {
    test('should set event listener', () => {
      const change = new MouseEvent('change')
      inputFrom.dispatchEvent(change)
      expect(_.mediator.notify).toHaveBeenCalled()
    })
  })
  describe('initExtra', () => {
    test('should set change listener', () => {
      _.initExtra()
      const change = new MouseEvent('change')
      inputTo.dispatchEvent(change)
      expect(_.mediator.notify).toHaveBeenCalled()
    })
  })
  describe('update', () => {
    test('should print value', () => {
      _.update(1, false)
      expect(_.primary.value).toBe('1')
    })
  })
})