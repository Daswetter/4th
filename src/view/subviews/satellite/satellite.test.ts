// import { Satellite } from "./satellite"

// describe('Satellite', () => {
//   let _: Satellite
//   beforeEach(() => {
//     _ = new Satellite()
//   })
//   describe('constructor', () => {
//     test('should create div', () => {
//       expect(_.satellite.nodeName).toBe('DIV')
//     })
//     test('should create correct class', () => {
//       expect(_.satellite.className).toBe('range-slider__satellite')
//     })
//   })

//   describe('initSatelliteExtra', () => {
//     beforeEach(() => {
//       _.initExtraElement()
//     })
//     test('should create div', () => {
//       expect(_.satelliteExtra.nodeName).toBe('DIV')
//     })
//     test('should create correct class', () => {
//       expect(_.satelliteExtra.className).toBe('range-slider__satellite')
//     })
//   })

//   describe('returnAsHTML', () => {
//     test('should return satellite', () => {
//       expect(_.returnAsHTML()).toBe(_.satellite)
//     })
    
//   })

//   describe('returnExtraAsHTML', () => {
//     test('returnExtraAsHTML', () => {
//       _.initExtraElement()
//       expect(_.returnExtraAsHTML()).toBe(_.satelliteExtra)
//     })
    
//   })

//   describe('update', () => {
//     type ISize = {
//       width: number
//       height: number
//     }
//     let lineSize: ISize
//     let thumbSize: ISize

//     beforeEach(() => {
//       lineSize = {
//         width: 150,
//         height: 9,
//       }
//       thumbSize = {
//         width: 30,
//         height: 10,
//       }
//       Object.defineProperty(_.satellite, 'offsetWidth', {
//         value: '30'
//       })
//       Object.defineProperty(_.satellite, 'offsetHeight', {
//         value: '20'
//       })
//       _.initExtraElement()
//       Object.defineProperty(_.satelliteExtra, 'offsetWidth', {
//         value: '30'
//       })
//       Object.defineProperty(_.satelliteExtra, 'offsetHeight', {
//         value: '20'
//       })
//     })
    
//     test('should set position for primary satellite and horizontal mod', () => {
//       _.update(0.1, 5, lineSize, thumbSize)
//       expect(_.satellite.innerText).toBe('5')
//       expect(_.satellite.style.left).toBe('0px')
//       expect(_.satellite.style.top).toBe('-25px')
//     })

//     test('should set position for extra satellite and horizontal mod', () => {
//       const vertical = false
//       lineSize = {
//         width: 150,
//         height: 20
//       }
//       _.update(0.5, 500, lineSize, thumbSize, vertical, 'extra')
//       expect(_.satelliteExtra.innerText).toBe('500')
//       expect(_.satelliteExtra.style.left).toBe('60px')
//       expect(_.satelliteExtra.style.top).toBe('-40px')
//     })

//     test('should set position for primary satellite and vertical mod', () => {
//       const vertical = true
//       lineSize = {
//         width: 10,
//         height: 300,
//       }
//       thumbSize = {
//         width: 20,
//         height: 20,
//       }
//       _.update(1, 125, lineSize, thumbSize, vertical)
//       expect(_.satellite.innerText).toBe('125')
//       expect(_.satellite.style.left).toBe('-41px')
//       expect(_.satellite.style.top).toBe('-10px')
//     })

//     test('should set position for extra satellite and horizontal mod', () => {
//       const vertical = true
//       _.update(0.1, 170, lineSize, thumbSize, vertical, 'extra')
//       expect(_.satelliteExtra.innerText).toBe('170')
//       expect(_.satelliteExtra.style.left).toBe('-36px')
//     })
//   })
// })