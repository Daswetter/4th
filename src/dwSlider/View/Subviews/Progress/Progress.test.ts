import { Progress } from './Progress'

describe('Progress', () => {
  let _: Progress
  beforeEach(() => {
    const initElement = document.createElement('div')
    _ = new Progress(initElement)
  })
  describe('constructor', () => {
    test('should create div', () => {
      expect(_.progress.nodeName).toBe('DIV')
    })
    test('should add class', () => {
      expect(_.progress.className).toBe('dwSlider__progress')
    })
  })

  describe('setInitialSettings', () => {
    test('set right style.top for horizontal', () => {
      const lineSize = {
        width: 100,
        height: 500
      }
      Object.defineProperty(_.progress, 'offsetHeight', {
        value: '150'
      })
      _.setInitialSettings(lineSize)
      expect(_.progress.style.top).toBe('175px')
    })
    test('set right style for vertical', () => {
      const vertical = true
      const lineSize = {
        width: 260,
        height: 500
      }
      Object.defineProperty(_.progress, 'offsetWidth', {
        value: '150'
      })
      _.setInitialSettings(lineSize, vertical)
      expect(_.progress.style.left).toBe('55px')
      expect(_.progress.style.top).toBe('')
    })
  })

  describe('update', () => {
    test('should set correct style.left and style.right for primary', () => {
      const vertical = false
      const extra = true
      const lineSide = {
        width: 150,
        height: 15
      }
      _.update(0.3, lineSide, vertical, extra)
      _.update(0.1, lineSide, vertical, false)
      expect(_.progress.style.left).toBe('15px')
      expect(_.progress.style.right).toBe('105px')
    })
    

    test('should set correct style.left and style.right for extra', () => {
      const vertical = false
      const extra = true
      const lineSide = {
        width: 150,
        height: 15
      }
      _.update(1, lineSide, vertical, extra)
      _.update(0.5, lineSide, vertical, false)
      expect(_.progress.style.left).toBe('75px')
      expect(_.progress.style.right).toBe('0px')
    })

    test('should set correct style.bottom and style.top for primary', () => {
      const vertical = true
      const extra = true
      const lineSide = {
        width: 10,
        height: 500,
      }
      _.update(0.5, lineSide, vertical, extra)
      _.update(0.6, lineSide, vertical, false)
      expect(_.progress.style.bottom).toBe('250px')
      expect(_.progress.style.top).toBe('200px')
    })

    test('should set correct style.left and style.right for extra', () => {
      const vertical = true
      const extra = true
      const lineSide = {
        width: 5,
        height: 50
      }
      _.update(1, lineSide, vertical, extra)
      _.update(0.5, lineSide, vertical, false)
      expect(_.progress.style.bottom).toBe('25px')
      expect(_.progress.style.top).toBe('0px')
    })
  })
})