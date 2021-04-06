import { Input } from './input'

describe('Input', () => {
  let _: Input
  beforeEach(() => {
    _ = new Input()
  })
  
  describe('sendValue', () => {
  test('should call onValueWasChanged with set value', () => {
    const callback = jest.fn()
    _.bindValueWasChanged(callback)
    const element = document.createElement('input')
    element.value = '100'
    _.sendValue(element)
    expect(callback).toHaveBeenCalledWith(100)
  })

  describe('sendValueForExtra', () => {
  test('should call onValueExtraWasChanged with set value', () => {
    const callback = jest.fn()
    _.bindValueExtraWasChanged(callback)
    const element = document.createElement('input')
    element.value = '500'
    _.sendValueForExtra(element)
    expect(callback).toHaveBeenCalledWith(500)
  })
})
})