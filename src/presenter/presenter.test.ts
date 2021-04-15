// import { Presenter } from './presenter'
// import { IModel } from '../model/IModel';
// import { Model } from '../model/model';
// import { IView } from '../view/IView';
// import { View } from '../view/view';
// import { IOptions } from '../interface/IOptions';

// describe('Presenter', () => {
//   let _: Presenter
//   let concreteView: IView
//   let concreteModel: IModel
//   let options: IOptions

//   beforeEach(() => {
//     const initElement = document.createElement('div')
//     options = {
//       min: 0,
//       max: 1,
//       from: 0.2,
//       to: 0.5,
//       stepSize: 0.01,
//       progress: true,
//       satellite: true,
//       scale: true,
//       orientation: 'horizontal',
//       thumbType: 'double',
//       input: true
//     }
//     concreteView = new View(initElement, options)
//     concreteModel = new Model(options)
//     _ = new Presenter(concreteView, concreteModel)
//   })

//   describe('constructor', () => {

//     test('should call bindChangedPart', () => {
//       concreteView.bindChangedPart = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteView.bindChangedPart).toHaveBeenCalled()
//     })
//     test('should call bindChangedExtraPart', () => {
//       concreteView.bindChangedExtraPart = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteView.bindChangedExtraPart).toHaveBeenCalled()
//     })
//     test('should call bindChangedCurrent', () => {
//       concreteView.bindChangedCurrent = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteView.bindChangedCurrent).toHaveBeenCalled()
//     })
//     test('should call bindChangedExtraCurrent', () => {
//       concreteView.bindChangedExtraCurrent = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteView.bindChangedExtraCurrent).toHaveBeenCalled()
//     })

//     test('should call notifyPrimaryElement', () => {
//       concreteView.notifyPrimaryElement = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteView.notifyPrimaryElement).toHaveBeenCalled()
//     })

//     test('should call bindChangedValues', () => {
//       concreteModel.bindChangedValues = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteModel.bindChangedValues).toHaveBeenCalled()
//     })
//     test('should call bindChangedExtraValues', () => {
//       concreteModel.bindChangedExtraValues = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteModel.bindChangedExtraValues).toHaveBeenCalled()
//     })
//     test('should call initView', () => {
//       concreteView.initView = jest.fn()
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteView.initView).toHaveBeenCalled()
//     }) 

//     test('should call setCurrent in Model', () => {
//       concreteModel.setCurrent = jest.fn()
//       const onResize = new Event('resize')
//       window.dispatchEvent(onResize)
//       _ = new Presenter(concreteView, concreteModel)
//       expect(concreteModel.setCurrent).toHaveBeenCalled()
//     }) 
//   })

  
// })
