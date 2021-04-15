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

  orientation = document.querySelector('.js-config-panel__orientation') as HTMLInputElement
  thumbType = document.querySelector('.js-config-panel__thumbType') as HTMLInputElement
  scale = document.querySelector('.js-config-panel__scale') as HTMLInputElement
  progress = document.querySelector('.js-config-panel__progress') as HTMLInputElement
  satellite = document.querySelector('.js-config-panel__satellite') as HTMLInputElement

  constructor(initElement: string){
    this.initElement = initElement
    this.rangeSlider = $(this.initElement).data("customRangeSlider");
    this.init()
  }

  init = (): void => {
    this.setEventListener(this.min, 'min')
    this.setEventListener(this.max, 'max')
    this.setEventListener(this.step, 'stepSize')
    this.setEventListener(this.from, 'from')
    this.setEventListener(this.to, 'to')

    this.initOrientation()
    this.initThumbType()
    this.initScale()
    this.initProgress()
    this.initSatellite()


  }
  setEventListener = (element: HTMLInputElement, optionKey: string): void => {
    element.addEventListener('change', this.sendElementValue.bind(null, element, optionKey))
  }

  setEventListenerOnCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions, checked: string | boolean, unchecked: string | boolean): void => {
    element.addEventListener('change', this.sendState.bind(null, element, optionKey, checked, unchecked))
  }



  sendElementValue = (element: HTMLInputElement, optionKey: string): void => {
    this.rangeSlider.update({
      [optionKey]: Number(element.value)
    })
  }

  initOrientation = (): void => {
    this.setEventListenerOnCheckbox(this.orientation, 'orientation', 'vertical', 'horizontal')
  }

  setInitialSettings = (optionKey: keyof IOptions, element: HTMLInputElement): void => {
    const currentState = $(this.initElement).data("customRangeSlider").returnCurrentState();
    if (currentState[optionKey] === 'double'){
      element.checked = true
    } else {
      element.checked = false
    }
  }

  initThumbType = (): void => {
    // this.setInitialSettings()
    
    
    this.setEventListenerOnCheckbox(this.thumbType, 'thumbType', 'double', 'single')
  }
  initScale = (): void => {
    const currentThumbType = $(this.initElement).data("customRangeSlider").returnCurrentState();
    if (currentThumbType.scale){
      this.scale.checked = true
    } else {
      this.scale.checked = false
    }
    this.setEventListenerOnCheckbox(this.scale, 'scale', true, false)
  }
  initProgress = (): void => {
    this.setEventListenerOnCheckbox(this.progress, 'progress', true, false)
  }
  initSatellite = (): void => {
    this.setEventListenerOnCheckbox(this.satellite, 'satellite', true, false)
  }


  sendState = (element: HTMLInputElement, optionKey: keyof IOptions, checked: string | boolean, unchecked: string | boolean): void => {
    const currentState = this.rangeSlider.returnCurrentState()[optionKey];
    console.log(currentState);
    
    if (currentState === checked){
      this.rangeSlider.update({
        [optionKey]: unchecked
      })
    } else {
      this.rangeSlider.update({
        [optionKey]: checked
      })
    }
    // if (element.checked){
    //   this.rangeSlider.update({
    //     [optionKey]: checked
    //   })
    // } else {
    //   this.rangeSlider.update({
    //     [optionKey]: unchecked
    //   })
    // }
  }

  
}

export { configPanel }