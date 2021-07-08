import { IOptions } from '../../types';
import { Line } from './../View/Subviews/Line/Line'
import { Model } from '../Model/Model';
import { View } from '../View/View';
import { Presenter } from './Presenter';

describe('Presenter', () => {
  let _: Presenter
  let view: View
  let model: Model
  let options: IOptions

  beforeEach(() => {
    const initElement = document.createElement('div')
    options = {
      min: 0,
      max: 1,
      from: 0.2,
      to: 0.5,
      step: 0.01,
      progress: true,
      tip: true,
      scale: true,
      scaleSize: 5,
      vertical: false,
      double: true,
    }
    const inputFrom = document.createElement('input')
    initElement.append(inputFrom)
    inputFrom.classList.add('dwSlider__input_from')

    const inputTo = document.createElement('input')
    initElement.append(inputTo)
    inputTo.classList.add('dwSlider__input_to')
    view = new View(initElement, options)
    model = new Model(options)
    _ = new Presenter(view, model)
  })

  describe('update', () => {
    test('should call model"s and view"s methods', () => {
      const modelUpdate = jest.spyOn(model, 'refreshAll')
      _.refreshAll(options)
      expect(modelUpdate).toHaveBeenCalledWith(options)
    })
  })

  describe('returnCurrentValues', () => {
    test('should return array with current from view', () => {
      expect(_.returnCurrentValues()).toHaveLength(2)
    })
  })
  describe('returnOptions', () => {
    test('should return array with current from view', () => {
      expect(_.returnOptions()).toEqual(options)
    })
  })

  describe('notify', () => {
    test('should call setCurrent', () => {
      const modelUpdate = jest.spyOn(model, 'setCurrent')
      _.update({data: {value: 1, current: false, extra: false}, event: 'data were sent from View'})
      expect(modelUpdate).toBeCalledWith(1, false)
    })
  })
})
