// import { Presenter } from './presenter'
// import { View } from './../view/view'
// import { Model } from './../model/model'
// import { IModel } from '../interface/IModel';

// const options = {
//   min: 0,
//   max: 100,
//   initial: 50,
//   stepSize: 1,
//   orientation: 'horizontal',
//   thumbType: 'single',
//   underThumbElement: true,
//   scale: true,
//   progressBar: true,
// }

// const mockModel  = jest.mock('./../model/model', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       countInitialPart: jest.fn(),
//       getOptions: jest.fn(),
//       countCurrentValue: jest.fn(),
//       bindCurrentChanged: jest.fn(),
//       bindInitialValue: jest.fn(),
//     };
//   });
// })




// describe('testing presenter', () => {
//   test('called the class constructor', () => {
//     const init: HTMLElement = document.createElement('div') as HTMLElement
//     const presenter = new Presenter(new View(init), new Model(options));
//     expect(presenter.sendPartTo(0.1)).toBeTruthy();
//   });
//   // it('The presenter should be able to call new()', () => {
//   //   const init: HTMLElement = document.createElement('div') as HTMLElement
//   //   const presenter = new Presenter(new View(init), mockModel);
//   //   expect(presenter).toBeTruthy();
//   // });
//   // test('called the class constructor', () => {
//   //   const init: HTMLElement = document.createElement('div') as HTMLElement
//   //   const presenter = new Presenter(new View(init), new Model(options));
//   //   expect(presenter.sendPartTo(0.1)).toBeTruthy();
//   // });
// })
