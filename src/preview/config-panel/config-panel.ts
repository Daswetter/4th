import $ from 'jquery'
import './components/toggle/toggle'
import './components/input/input'

import './config-panel.scss'

class configPanel{
  initElement: string
  inputMin = document.querySelector('.js-config-panel__min') as HTMLInputElement
  inputMax = document.querySelector('.js-config-panel__max') as HTMLInputElement
  inputStep = document.querySelector('.js-config-panel__step') as HTMLInputElement
  inputFrom = document.querySelector('.js-config-panel__from') as HTMLInputElement
  inputTo = document.querySelector('.js-config-panel__to') as HTMLInputElement

  checkboxOrientation = document.querySelector('.js-config-panel__orientation') as HTMLInputElement
  checkboxThumbType = document.querySelector('.js-config-panel__thumbType') as HTMLInputElement
  checkboxScale = document.querySelector('.js-config-panel__scale') as HTMLInputElement
  checkboxProgress = document.querySelector('.js-config-panel__progress') as HTMLInputElement
  checkboxSatellite = document.querySelector('.js-config-panel__satellite') as HTMLInputElement

  constructor(initElement: string){
    this.initElement = initElement
    this.init()
  }

  init = (): void => {
    this.inputMin.addEventListener('change', this.setEventListener.bind(null, this.inputMin, 'min'))
    this.inputMax.addEventListener('change', this.setEventListener.bind(null, this.inputMax, 'max'))
    this.inputStep.addEventListener('change', this.setEventListener.bind(null, this.inputStep, 'stepSize'))
    this.inputFrom.addEventListener('change', this.setEventListener.bind(null, this.inputFrom, 'from'))
    this.inputTo.addEventListener('change', this.setEventListener.bind(null, this.inputTo, 'to'))

    this.initCheckboxOrientation()
    this.initCheckboxThumbType()
    this.initCheckboxScale()
    this.initCheckboxProgress()
    this.initCheckboxSatellite()


  }

  setEventListener = (element: HTMLInputElement, optionKey: string): void => {
    const my_range = $(this.initElement).data("customRangeSlider");
    my_range.update({
      [optionKey]: Number(element.value)
    })
  }

  initCheckboxOrientation = (): void => {
    this.checkboxOrientation.addEventListener('change', this.setEventListenerForCheckbox.bind(null, this.checkboxOrientation, 'orientation', 'vertical', 'horizontal'))
  }

  initCheckboxThumbType = (): void => {
    this.checkboxThumbType.addEventListener('change', this.setEventListenerForCheckbox.bind(null, this.checkboxThumbType, 'thumbType', 'double', 'single'))
  }
  initCheckboxScale = (): void => {
    this.checkboxScale.addEventListener('change', this.setEventListenerForCheckboxBoolean.bind(null, this.checkboxScale, 'scale'))
  }
  initCheckboxProgress = (): void => {
    this.checkboxProgress.addEventListener('change', this.setEventListenerForCheckboxBoolean.bind(null, this.checkboxProgress, 'progress'))
  }
  initCheckboxSatellite = (): void => {
    this.checkboxSatellite.addEventListener('change', this.setEventListenerForCheckboxBoolean.bind(null, this.checkboxSatellite, 'satellite'))
  }



  setEventListenerForCheckboxBoolean = (element: HTMLInputElement, optionKey: string): void => {
    const range = $(this.initElement).data("customRangeSlider");
    if (element.checked){
      range.update({
        [optionKey]: true
      })
    } else {
      range.update({
        [optionKey]: false
      })
    }
  }
  setEventListenerForCheckbox = (element: HTMLInputElement, optionKey: string, checked: string, unchecked: string): void => {
    const range = $(this.initElement).data("customRangeSlider");
    if (element.checked){
      range.update({
        [optionKey]: checked
      })
    } else {
      range.update({
        [optionKey]: unchecked
      })
    }
  }

  
}

export { configPanel }