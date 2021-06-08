import { IModel, IView, IOptions } from '../../types';
import { Line } from './../View/Subviews/Line/Line'
import { Model } from '../Model/Model';
import { View } from '../View/View';
import { Presenter } from './Presenter';

describe('Presenter', () => {
  let _: Presenter
  let view: IView
  let model: IModel
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

  describe('constructor', () => {

    test('should call bindChangedPrimaryPart', () => {
      view.bindChangedPrimaryPart = jest.fn()
      _ = new Presenter(view, model)
      expect(view.bindChangedPrimaryPart).toHaveBeenCalled()
    })
    test('should call bindChangedExtraPart', () => {
      view.bindChangedExtraPart = jest.fn()
      _ = new Presenter(view, model)
      expect(view.bindChangedExtraPart).toHaveBeenCalled()
    })
    test('should call bindChangedCurrent', () => {
      view.bindChangedPrimaryCurrent = jest.fn()
      _ = new Presenter(view, model)
      expect(view.bindChangedPrimaryCurrent).toHaveBeenCalled()
    })
    test('should call bindChangedExtraCurrent', () => {
      view.bindChangedExtraCurrent = jest.fn()
      _ = new Presenter(view, model)
      expect(view.bindChangedExtraCurrent).toHaveBeenCalled()
    })

    test('should call notifyPrimary', () => {
      view.notifyPrimary = jest.fn()
      _ = new Presenter(view, model)
      expect(view.notifyPrimary).toHaveBeenCalled()
    })

    test('should call bindChangedPrimaryValues', () => {
      model.bindChangedPrimaryValues = jest.fn()
      _ = new Presenter(view, model)
      expect(model.bindChangedPrimaryValues).toHaveBeenCalled()
    })
    test('should call bindChangedExtraValues', () => {
      model.bindChangedExtraValues = jest.fn()
      _ = new Presenter(view, model)
      expect(model.bindChangedExtraValues).toHaveBeenCalled()
    })
    test('should call bindChangedOptions', () => {
      model.bindChangedOptions = jest.fn()
      _ = new Presenter(view, model)
      expect(model.bindChangedOptions).toHaveBeenCalled()
    }) 

    test('should call initView', () => {
      view.initView = jest.fn()
      _ = new Presenter(view, model)
      expect(view.initView).toHaveBeenCalledTimes(1)
    }) 
  })

  describe('update', () => {
    test('should call model"s and view"s methods', () => {
      const modelUpdate = jest.spyOn(model, 'update')
      _.update(options)
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
      _.returnOptions()
      expect(_.returnOptions()).toEqual(options)
    })
  })
})
