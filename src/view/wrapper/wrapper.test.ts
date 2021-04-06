import { Wrapper } from './wrapper'

describe('Wrapper', () => {
  let _: Wrapper
  beforeEach(() => {
    const initElement: HTMLElement = document.createElement('div')
    _ = new Wrapper(initElement)
  })
  
  describe('Wrapper"s method', () => {
  test('onResize should call wrapper was resized', () => {
    const callback = jest.fn()
    _.bindWrapperWasResized(callback)
    _.onResize()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
})
