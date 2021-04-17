import $ from 'jquery'
import './components/toggle/toggle'
import './components/input/input'

import './config-panel.scss'
import { IRangeSlider } from '../../interface/IRangeSlider'
import { IOptions } from '../../interface/IOptions'

class configPanel{
  initElement: string
  rangeSlider: IRangeSlider
  min = document.querySelector('.js-config-panel__min') as HTMLInputElement
  max = document.querySelector('.js-config-panel__max') as HTMLInputElement
  step = document.querySelector('.js-config-panel__step') as HTMLInputElement
  from = document.querySelector('.js-config-panel__from') as HTMLInputElement
  to = document.querySelector('.js-config-panel__to') as HTMLInputElement

  vertical = document.querySelector('.js-config-panel__vertical') as HTMLInputElement
  double = document.querySelector('.js-config-panel__double') as HTMLInputElement
  scale = document.querySelector('.js-config-panel__scale') as HTMLInputElement
  progress = document.querySelector('.js-config-panel__progress') as HTMLInputElement
  satellite = document.querySelector('.js-config-panel__satellite') as HTMLInputElement

  constructor(initElement: string){
    this.initElement = initElement
    this.rangeSlider = $(this.initElement).data("customRangeSlider");
    this.init()
  }

  init = (): void => {
    this.initInput(this.min, 'min')
    this.initInput(this.max, 'max')
    this.initInput(this.step, 'stepSize')
    this.initInput(this.from, 'from')
    this.initInput(this.to, 'to')
    

    this.initCheckbox(this.vertical, 'vertical')
    this.initCheckbox(this.double, 'double')
    this.initCheckbox(this.scale, 'scale')
    this.initCheckbox(this.progress, 'progress')
    this.initCheckbox(this.satellite, 'satellite')
  }
  setEventListener = (element: HTMLInputElement, optionKey: string): void => {
    element.addEventListener('change', this.sendElementValue.bind(null, element, optionKey))
  }

  setEventListenerOnCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', this.sendState.bind(null, optionKey))
  }

  initInput = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    this.setInitialSettings(element, optionKey)
    this.setEventListener(element, optionKey)
  }

  sendElementValue = (element: HTMLInputElement, optionKey: string): void => {
    this.rangeSlider.update({
      [optionKey]: Number(element.value)
    })
  }

  setInitialSettings = (element: HTMLInputElement, optionKey: keyof IOptions, checkbox = false): void => {
    const currentState = $(this.initElement).data("customRangeSlider").returnCurrentOptions();
    if (checkbox){
      element.checked = currentState[optionKey]
    } else {

      if (optionKey === 'to' && !this.rangeSlider.returnCurrentOptions().double){
        element.disabled = true
      }

      element.value = currentState[optionKey]
    }
    
  }

  initCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    this.setInitialSettings(element, optionKey, true)
    this.setEventListenerOnCheckbox(element, optionKey)
  }


  sendState = (optionKey: keyof IOptions): void => {
    const currentState = this.rangeSlider.returnCurrentOptions()[optionKey];
    if(optionKey === 'double'){
      if (this.rangeSlider.returnCurrentOptions().double){
        this.to.disabled = true
      } else {
        this.to.disabled = false
      }
    }

    if (currentState){
      this.rangeSlider.update({
        [optionKey]: false
      })
    } else {
      this.rangeSlider.update({
        [optionKey]: true
      })
    }
  }

  
}

export { configPanel }