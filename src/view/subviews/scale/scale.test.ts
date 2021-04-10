import { Scale } from "./scale"

describe('Scale', () => {
  let _: Scale
  beforeEach(() => {
    _ = new Scale()
  })

  describe('constructor', () => {
    test('should create div', () => {
      expect(_.scale.nodeName).toBe('DIV')
    })
    test('should add correct class', () => {
      expect(_.scale.className).toBe('range-slider__scale')
    })
  })

  describe('returnAsHTML', () => {
    test('should return scale as HTMLElement', () => {
      expect(_.returnAsHTML()).toEqual(_.scale)
    })
  })

  describe('setScaleValue', () => {
    let scaleValues: Array<number>
    let idFlags: Array<number>
    const callback = jest.fn()
    beforeEach(() => {
      _.bindChangedPosition(callback)
      scaleValues = [0, 25, 50, 75, 100]
      idFlags = [0, 0.25, 0.5, 0.75, 1]
      _.setScaleValues(scaleValues)
    })
    
    test('should create div 5 times', () => {
      for(let i = 0; i < scaleValues.length; i++){
        expect(_.scale.childNodes[i].nodeName).toBe('DIV')
      }
    })

    test('should create correct class to all divs', () => {
      for(let i = 0; i < scaleValues.length; i++){
        expect((_.scale.childNodes[i] as HTMLElement).classList).toContain('range-slider__scale-number')
      }
    })

    test('should set correct innerText for all divs', () => {
      for(let i = 0; i < scaleValues.length; i++){
        expect((_.scale.childNodes[i] as HTMLElement).innerText).toContain(scaleValues[i])
      }
    })

    test('should set correct id flag', () => {
      for(let i = 0; i < scaleValues.length; i++){
        expect((_.scale.childNodes[i] as HTMLElement).dataset.id).toContain(idFlags[i])
      }
    })

    test('should call event listener', () => {
      for(let i = 0; i < scaleValues.length; i++){
        const click = new MouseEvent('click', {
        bubbles: true,
      });
      _.scale.childNodes[i].dispatchEvent(click);
      expect(callback).toBeCalled()
      }
    })
  })

  describe('setVertical', () => {
    test('should add correct style', () => {
      _.setVertical()
      expect(_.scale.style.flexDirection).toBe('column-reverse')
      expect(_.scale.style.alignSelf).toBe('stretch')
    })
  })

})