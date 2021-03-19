import { Presenter } from './presenter'
import { IModel } from '../model/IModel';
import { IView } from '../view/IView';

describe('Presenter', () => {
  let _: Presenter
  let View: IView
  let Model: IModel
  beforeEach(() => {
    View = {
      initView: jest.fn(),
      initWrapper: jest.fn(),
      initLine: jest.fn(),
      initThumb: jest.fn(),
      initSatellite: jest.fn(),
      initScale: jest.fn(),
      initProgress: jest.fn(),
      initInput: jest.fn(),

      currentWasSentFromModel: jest.fn(),
      extraCurrentWasSentFromModel: jest.fn(),

      changePositionForTheNearest: jest.fn(),
      windowWasResized: jest.fn(),

      bindSendPartToModel: jest.fn(),
      bindSendExtraPartToModel: jest.fn(),

      bindSendValueToModel: jest.fn(),
      bindSendExtraValueToModel: jest.fn(),
    }
    
    Model = {
      countCurrentValue: jest.fn(),
      setCurrentValue: jest.fn(),
      setCurrentValueForExtra: jest.fn(),

      countCurrentPart: jest.fn(),
      setCurrentPart: jest.fn(),
      setCurrentPartForExtra: jest.fn(),

      countScaleElements: jest.fn(),
      convertStepSizeToDecimal: jest.fn(),
      roundToDecimal: jest.fn(),

      bindCurrentChanged: jest.fn(),
      bindExtraCurrentChanged: jest.fn(),
    }
    _ = new Presenter(View, Model)
  })

  describe('constructor', () => {

    test('should call bindSendPartToModel with sendPartTo as argument', () => {
      expect(View.bindSendPartToModel).toHaveBeenCalledWith(_.sendPartTo)
    })
    test('should call bindSendExtraPartToModel with sendExtraPartTo as argument', () => {
      expect(View.bindSendExtraPartToModel).toHaveBeenCalledWith(_.sendExtraPartTo)
    })
    test('should call bindSendExtraPartToModel with sendExtraPartTo as argument', () => {
      expect(View.bindSendValueToModel).toHaveBeenCalledWith(_.sendValueTo)
    })
    test('should call bindSendExtraValueToModel with sendExtraValueTo as argument', () => {
      expect(View.bindSendExtraValueToModel).toHaveBeenCalledWith(_.sendExtraValueTo)
    })
    test('should not call currentWasSentFromModel', () => {
      expect(View.currentWasSentFromModel).not.toHaveBeenCalled()
    })

    test('should call bindCurrentChanged with sendResultTo as argument', () => {
      expect(Model.bindCurrentChanged).toHaveBeenCalledWith(_.sendResultTo)
    })
    test('should call bindExtraCurrentChanged with sendExtraResultTo as argument', () => {
      expect(Model.bindExtraCurrentChanged).toHaveBeenCalledWith(_.sendExtraResultTo)
    })
    test('should call bindCurrentChanged with sendResultTo as argument', () => {
      expect(View.initView).toHaveBeenCalled()
    }) 
  })

  describe('sendResultTo', () =>{
    test('should call view"s method', () => {
      _.sendResultTo(1, 100)
      expect(View.currentWasSentFromModel).toHaveBeenCalledWith(1, 100)
    })
  })

  describe('sendExtraResultTo', () =>{
    test('should call view"s method', () => {
      _.sendExtraResultTo(100, 0.5)
      expect(View.extraCurrentWasSentFromModel).toHaveBeenCalledWith(100, 0.5)
    })
  })

  describe('sendPartTo', () =>{
    test('should call model"s method', () => {
      _.sendPartTo(1)
      expect(Model.setCurrentValue).toHaveBeenCalledWith(1)
    })
  })

  describe('sendExtraPartTo', () =>{
    test('should call model"s method', () => {
      _.sendExtraPartTo(0.2)
      expect(Model.setCurrentValueForExtra).toHaveBeenCalledWith(0.2)
    })
  })

  describe('sendValueTo', () =>{
    test('should call model"s method', () => {
      _.sendValueTo(2)
      expect(Model.setCurrentPart).toHaveBeenCalledWith(2)
    })
  })

  describe('sendExtraValueTo', () =>{
    test('should call model"s method', () => {
      _.sendExtraValueTo(0.001)
      expect(Model.setCurrentPartForExtra).toHaveBeenCalledWith(0.001)
    })
  })
})
