import { Presenter } from './presenter'
import { IModel } from '../model/IModel';
import { Model } from '../model/model';
import { IView } from '../view/IView';
import { View } from '../view/view';
import { IOptions } from '../interface/IOptions';

describe('Presenter', () => {
  let _: Presenter
  let concreteView: IView
  let concreteModel: IModel
  let options: IOptions

  beforeEach(() => {
    const initElement = document.createElement('div')
    options = {
      min: 0,
      max: 1,
      initial: [0.2, 0.5],
      stepSize: 0.01,
      progress: true,
      satellite: true,
      scale: true,
      orientation: 'horizontal',
      thumbType: 'double',
      input: true
    }
    concreteView = new View(initElement, options)
    concreteModel = new Model(options)
    _ = new Presenter(concreteView, concreteModel)
  })

  describe('constructor', () => {

    test('should call bindSendPartToModel with sendPartTo as argument', () => {
      concreteView.bindSendPartToModel = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteView.bindSendPartToModel).toHaveBeenCalled()
    })
    test('should call bindSendExtraPartToModel with sendExtraPartTo as argument', () => {
      concreteView.bindSendExtraPartToModel = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteView.bindSendExtraPartToModel).toHaveBeenCalledWith(_.sendExtraPartTo)
    })
    test('should call bindSendExtraPartToModel with sendExtraPartTo as argument', () => {
      concreteView.bindSendValueToModel = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteView.bindSendValueToModel).toHaveBeenCalledWith(_.sendValueTo)
    })
    test('should call bindSendExtraValueToModel with sendExtraValueTo as argument', () => {
      concreteView.bindSendExtraValueToModel = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteView.bindSendExtraValueToModel).toHaveBeenCalledWith(_.sendExtraValueTo)
    })
    test('should not call notifyPrimaryElement', () => {
      concreteView.notifyPrimaryElement = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteView.notifyPrimaryElement).toHaveBeenCalled()
    })

    test('should call bindCurrentChanged with sendResultTo as argument', () => {
      concreteModel.bindCurrentChanged = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteModel.bindCurrentChanged).toHaveBeenCalledWith(_.sendResultTo)
    })
    test('should call bindExtraCurrentChanged with sendExtraResultTo as argument', () => {
      concreteModel.bindExtraCurrentChanged = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteModel.bindExtraCurrentChanged).toHaveBeenCalledWith(_.sendExtraResultTo)
    })
    test('should call bindCurrentChanged with sendResultTo as argument', () => {
      concreteView.initView = jest.fn()
      _ = new Presenter(concreteView, concreteModel)
      expect(concreteView.initView).toHaveBeenCalled()
    }) 
  })

  describe('sendResultTo', () =>{
    test('should call view"s method', () => {
      concreteView.notifyPrimaryElement = jest.fn()
      _.sendResultTo(1, 100)
      expect(concreteView.notifyPrimaryElement).toHaveBeenCalledWith(1, 100)
    })
  })

  describe('sendExtraResultTo', () =>{
    test('should call view"s method', () => {
      concreteView.notifyExtraElement = jest.fn()
      _.sendExtraResultTo(100, 0.5)
      expect(concreteView.notifyExtraElement).toHaveBeenCalledWith(100, 0.5)
    })
  })

  describe('sendPartTo', () =>{
    test('should call model"s method', () => {
      concreteModel.setCurrentValue = jest.fn()
      _.sendPartTo(1)
      expect(concreteModel.setCurrentValue).toHaveBeenCalledWith(1)
    })
  })

  describe('sendExtraPartTo', () =>{
    test('should call model"s method', () => {
      concreteModel.setCurrentValueForExtra = jest.fn()
      _.sendExtraPartTo(0.2)
      expect(concreteModel.setCurrentValueForExtra).toHaveBeenCalledWith(0.2)
    })
  })

  describe('sendValueTo', () =>{
    test('should call model"s method', () => {
      concreteModel.setCurrentPart = jest.fn()
      _.sendValueTo(2)
      expect(concreteModel.setCurrentPart).toHaveBeenCalledWith(2)
    })
  })

  describe('sendExtraValueTo', () =>{
    test('should call model"s method', () => {
      concreteModel.setCurrentPartForExtra = jest.fn()
      _.sendExtraValueTo(0.001)
      expect(concreteModel.setCurrentPartForExtra).toHaveBeenCalledWith(0.001)
    })
  })
})
