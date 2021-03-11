// import { Presenter } from './presenter'
// import { IModel } from '../model/IModel';

// describe('Presenter', () => {
//   let _: Presenter
//   let options: IOptions
//   beforeEach(() => {
//     options = {
//       min: -1800,
//       max: 200,
//       initial: [0, 100],
//       stepSize: 100,
//       progress: true,
//       satellite: true,
//       scale: true,
//       orientation: 'vertical',
//       thumbType: 'double',
//     }

//     const mockView = {
//       initView: jest.fn(),
//       initWrapper: jest.fn(),
//       initLine: jest.fn(),
//       initThumb: jest.fn(),
//       initSatellite: jest.fn(),
//       initScale: jest.fn(),
//       initProgress: jest.fn(),
//       sendLineParamsToThumb: jest.fn(),
//       scaleElements: jest.fn(),
//       setInitialPos: jest.fn(),
//       setExtraInitialPos: jest.fn(),
//       thumbPosWasChanged: jest.fn(),
//       extraThumbPosWasChanged: jest.fn(),
//       currentWasSentFromModel: jest.fn(),
//       extraCurrentWasSentFromModel: jest.fn(),
//       changeThumbPosition: jest.fn(),
//       scaleWasClicked: jest.fn(),


//       bindSendPartToModel: jest.fn(),
//       bindSendExtraPartToModel: jest.fn(),
//     }
    
//     const mockModel = {
//       setCurrentValue: jest.fn(),
//       countCurrentValue: jest.fn(),
//       setCurrentValueForExtra: jest.fn(),

//       countInitialPart: jest.fn(),
//       setInitialPart: jest.fn(),
//       setInitialPartForExtra: jest.fn(),

//       countExtraInitialPart: jest.fn(),
//       countScaleElements: jest.fn(),
//       bindCurrentChanged: jest.fn(),
//       bindExtraCurrentChanged: jest.fn(),
    
//       getOptions: jest.fn(),
//     }
//     // _ = new Presenter(mockView, mockModel)
//   })

//   describe('sendResultTo', () => {
//     test('should return undefined', () => {
//       expect( _.sendResultTo(0.1)).toBeUndefined;
//     });
//   })

//   describe('sendPartTo', () => {
//     test('should return undefined', () => {
//       expect(_.sendPartTo(0.1)).toBeUndefined
//     })
//   })
// })