import { Input } from './Input'

describe('Input', () => {
  let _: Input
  beforeEach(() => {
    const initElement = document.createElement('input')
    const inputFrom = document.createElement('input')
    inputFrom.classList.add('dwSlider__input_from')
    initElement.append(inputFrom)
    const inputTo = document.createElement('div')
    inputTo.classList.add('dwSlider__input_to')
    initElement.append(inputTo)
    _ = new Input(initElement)
  })
  

  describe('constructor', () => {
    test('should find something', () => {
      expect(_.primary).toBeTruthy()
    })
    test('should find input', () => {
      expect(_.primary.nodeName).toEqual('INPUT')
    })
    test('should set change event listener on input', () => {
      const callback = jest.fn();
      _.bindChangedState(callback)
      const change = new MouseEvent('change');
      _.primary.dispatchEvent(change);
      expect(callback).toBeCalled();
    })
    test('should not set click event listener on input', () => {
      const callback = jest.fn();
      _.bindChangedState(callback)
      const click = new MouseEvent('click');
      _.primary.dispatchEvent(click);
      expect(callback).not.toBeCalled();
    })
    test('should call callback with input"s value if change', () => {
      Object.defineProperty(_.primary, 'value', {
        value: '0.215'
      })
      const callback = jest.fn();
      _.bindChangedState(callback)
      const change = new MouseEvent('change');
      _.primary.dispatchEvent(change);
      expect(callback).toBeCalledWith(0.215);
    })
  })

  describe('initExtra', () => {
    test(' ', () => {
      _.initExtra()
      Object.defineProperty(_.extra, 'value', {
        value: '2658.5'
      })
      const callback = jest.fn();
      _.bindExtraChangedState(callback)
      const change = new MouseEvent('change');
      _.extra.dispatchEvent(change);
      expect(callback).toBeCalledWith(2658.5);
    })
  })


  describe('update', () => {
    test('should set value to input', () => {
      _.update(100, false)
      expect(_.primary.value).toBe('100')
    })
    test('should set value to inputExtra', () => {
      _.initExtra()
      _.update(0.1, true)
      expect(_.extra.value).toBe('0.1')
    })
    test('should not set value to input if element is extra', () => {
      _.initExtra()
      _.update(0.1, true)
      expect(_.primary.value).not.toBe('0.1')
    })
  })
  
})