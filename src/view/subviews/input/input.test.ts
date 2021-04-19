import { Input } from './input'

describe('Input', () => {
  let _: Input
  beforeEach(() => {
    const initElement = document.createElement('input')
    const inputFrom = document.createElement('input')
    inputFrom.classList.add('range-slider__input_from')
    initElement.append(inputFrom)
    const inputTo = document.createElement('div')
    inputTo.classList.add('range-slider__input_to')
    initElement.append(inputTo)
    _ = new Input(initElement)
  })
  

  describe('constructor', () => {
    test('should find something', () => {
      expect(_.input).toBeTruthy()
    })
    test('should find input', () => {
      expect(_.input.nodeName).toEqual('INPUT')
    })
    test('should set change event listener on input', () => {
      const callback = jest.fn();
      _.bindChangedState(callback)
      const change = new MouseEvent('change');
      _.input.dispatchEvent(change);
      expect(callback).toBeCalled();
    })
    test('should not set click event listener on input', () => {
      const callback = jest.fn();
      _.bindChangedState(callback)
      const click = new MouseEvent('click');
      _.input.dispatchEvent(click);
      expect(callback).not.toBeCalled();
    })
    test('should call callback with input"s value if change', () => {
      Object.defineProperty(_.input, 'value', {
        value: '0.215'
      })
      const callback = jest.fn();
      _.bindChangedState(callback)
      const change = new MouseEvent('change');
      _.input.dispatchEvent(change);
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
      _.bindExtraChangedState(callback)
      const change = new MouseEvent('change');
      _.inputExtra.dispatchEvent(change);
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