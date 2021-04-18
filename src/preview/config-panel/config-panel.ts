import $ from 'jquery'
import './components/toggle/toggle'
import './components/input/input'

import './config-panel.scss'
import { IRangeSlider } from '../../interface/IRangeSlider'
import { IOptions } from '../../interface/IOptions'

class configPanel{
  initElement: HTMLElement
  initElementName: string
  rangeSlider: IRangeSlider
  min!: HTMLInputElement
  max!: HTMLInputElement
  step!: HTMLInputElement
  from!: HTMLInputElement
  to!: HTMLInputElement

  vertical!: HTMLInputElement
  double!: HTMLInputElement
  scale!: HTMLInputElement
  progress!: HTMLInputElement
  satellite!: HTMLInputElement

  constructor(initElement: string){
    this.initElementName = initElement
    this.initElement = document.querySelector(initElement) as HTMLElement
    this.rangeSlider = $(initElement).data("customRangeSlider");
    this.init()
  }

  init = (): void => {
    this.initInput(this.min, 'min')
    this.initInput(this.max, 'max')
    this.initInput(this.step, 'step')
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
    element = this.initElement.querySelector(`.js-config-panel__${optionKey}`) as HTMLInputElement
    this.setInitialSettings(element, optionKey)
    this.setEventListener(element, optionKey)
  }

  sendElementValue = (element: HTMLInputElement, optionKey: string): void => {
    this.rangeSlider.update({
      [optionKey]: Number(element.value)
    })
  }

  setInitialSettings = (element: HTMLInputElement, optionKey: keyof IOptions, checkbox = false): void => {
    const currentState = $(this.initElementName).data("customRangeSlider").returnCurrentOptions();
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
    element = this.initElement.querySelector(`.js-config-panel__${optionKey}`) as HTMLInputElement
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