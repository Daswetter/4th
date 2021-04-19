import $ from 'jquery'
import './components/toggle/toggle'
import './components/input/input'

import './config-panel.scss'
import { IRangeSlider } from '../../interface/IRangeSlider'
import { IOptions } from '../../interface/IOptions'

class configPanel{
  initElement!: HTMLElement
  initElementName!: string
  rangeSlider!: IRangeSlider
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

  constructor(initElementName: string){
    this.defineInitElement(initElementName)
    this.init()
  }

  defineInitElement = (initElementName: string): void => {
    this.initElementName = initElementName
    this.initElement = document.querySelector(initElementName) as HTMLElement
    this.rangeSlider = $(initElementName).data("customRangeSlider");
  }

  
  init = (): void => {
    this.min = this.initInput(this.min, 'min')
    this.max = this.initInput(this.max, 'max')
    this.step = this.initInput(this.step, 'step')
    this.from = this.initInput(this.from, 'from')
    this.to = this.initInput(this.to, 'to')    

    this.vertical = this.initCheckbox(this.vertical, 'vertical')
    this.double = this.initCheckbox(this.double, 'double')
    this.switchStateForTo(this.to)
    this.scale = this.initCheckbox(this.scale, 'scale')
    this.progress = this.initCheckbox(this.progress, 'progress')
    this.satellite = this.initCheckbox(this.satellite, 'satellite')
  }

  setEventListener = (element: HTMLInputElement, optionKey: string): void => {
    element.addEventListener('change', this.sendElementValue.bind(null, element, optionKey))
  }

  setEventListenerOnCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', this.sendState.bind(null, optionKey))
  }
  switchStateForTo = (element: HTMLInputElement): void => {
    this.isDisable(element)
    this.double.addEventListener('change', this.isDisable.bind(null, element))
  }

  isDisable = (element: HTMLInputElement): void => {
    if (this.rangeSlider.returnCurrentOptions().double){
      element.disabled = false
    } else {
      element.disabled = true
    }
  }

  initInput = (element: HTMLInputElement, optionKey: keyof IOptions): HTMLInputElement => {
    element = this.initElement.querySelector(`.js-config-panel__${optionKey}`) as HTMLInputElement
    this.setInitialSettings(element, optionKey)
    this.setEventListener(element, optionKey)
    return element
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
      element.value = currentState[optionKey]
    }
    
  }

  initCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): HTMLInputElement => {
    element = this.initElement.querySelector(`.js-config-panel__${optionKey}`) as HTMLInputElement
    this.setInitialSettings(element, optionKey, true)
    this.setEventListenerOnCheckbox(element, optionKey)
    return element
  }

  sendState = (optionKey: keyof IOptions): void => {
    const currentState = this.rangeSlider.returnCurrentOptions()[optionKey];

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