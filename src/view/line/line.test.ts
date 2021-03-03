// import { Line } from './line'

// describe('Line', () => {
//   let _: Line
//   beforeEach(() => {
//     const init = {
//       append: jest.fn(),
//       setOrientation: jest.fn()
//     } 
//     _ = new Line(init, 'horizontal')
//     // _.getBoundingClientRect = jest.fn(() => ({
//     //   x: 7
//     //   y: 5
//     // }) 
//     Object.defineProperty(_, 'offsetWidth', {value: 150})
//   })
//   describe('width', () => {
//     test('should return right value', () => {
//       console.log('_.width', _.width());
      
//       expect( _.width()).toEqual(150);
//     });
//   })
// })