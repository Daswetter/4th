import { Input } from './input'

describe('Input', () => {
  let _: Input
  beforeEach(() => {
    _ = new Input()
  })
  

  describe('constructor', () => {
    test('should create something', () => {
      expect(_.input).toBeTruthy()
    })
    test('should create input', () => {
      expect(_.input.nodeName).toEqual('INPUT')
    })
    test('should set correct class name', () => {
      expect(_.input.className).toEqual('range-slider__input')
    })
    test('should set blur event listener on input', () => {
      const callback = jest.fn();
      _.bindValueWasChanged(callback)
      const blur = new MouseEvent('blur', { bubbles: true});
      _.input.dispatchEvent(blur);
      expect(callback).toBeCalled();
    })
    test('should not set click event listener on input', () => {
      const callback = jest.fn();
      _.bindValueWasChanged(callback)
      const click = new MouseEvent('click', { bubbles: true});
      _.input.dispatchEvent(click);
      expect(callback).not.toBeCalled();
    })
    test('should call onValueWasChanged with input"s value if enter', () => {
      Object.defineProperty(_.input, 'value', {
        value: '0.215'
      })
      const callback = jest.fn();
      _.bindValueWasChanged(callback)
      const enter = new MouseEvent('enter', { bubbles: true});
      _.input.dispatchEvent(enter);
      expect(callback).toBeCalledWith(0.215);
    })
  })

  describe('initInputExtra', () => {
    test(' ', () => {
      _.initInputExtra()
      Object.defineProperty(_.inputExtra, 'value', {
        value: '2658.5'
      })
      const callback = jest.fn();
      _.bindValueExtraWasChanged(callback)
      const blur = new MouseEvent('blur', { bubbles: true});
      _.inputExtra.dispatchEvent(blur);
      expect(callback).toBeCalledWith(2658.5);
    })
  })

  describe('update', () => {
    test('should set value to input', () => {
      _.update(100)
      expect(_.input.value).toBe('100')
    })
    test('should set value to inputExtra', () => {
      _.initInputExtra()
      _.update(0.1, 'extra')
      expect(_.inputExtra.value).toBe('0.1')
    })
    test('should not set value to input if element is extra', () => {
      _.initInputExtra()
      _.update(0.1, 'extra')
      expect(_.input.value).not.toBe('0.1')
    })
  })
  
})