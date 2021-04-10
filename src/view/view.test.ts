// import { IOptions } from '../interface/IOptions'
// import { IView } from './IView'
// import { View } from './view'

// describe('View', () => {
//   let _: IView
//   let options: IOptions
//   let wrapper: jest.Mock

//   const callback = jest.fn()
//   const callbackExtra = jest.fn()
//   const initElement: HTMLElement = document.createElement('div')


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
//       input: true
//     }

//     _ = new View(initElement, options)
//     _.bindSendValueToModel(callback)
//     _.bindSendExtraValueToModel(callbackExtra)

//     _.wrapper = jest.mock('./wrapper/wrapper.ts')
//   })

//   describe('initView', () => {
//     test('', () => {
//       _.initView([0, 1, 2, 3, 4])
//       expect()
//     })

//   })


  
// })
