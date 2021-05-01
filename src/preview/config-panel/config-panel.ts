import $ from 'jquery'
import './components/toggle/toggle'
import './components/input/input'

import './config-panel.scss'
import { IRangeSlider } from '../../interface/IRangeSlider'
import { IOptions } from '../../interface/IOptions'

class configPanel{
  private initElement!: HTMLElement
  private initElementName!: string
  private rangeSlider!: IRangeSlider
  private min!: HTMLInputElement
  private max!: HTMLInputElement
  private step!: HTMLInputElement
  private from!: HTMLInputElement
  private to!: HTMLInputElement
  private scaleSize!: HTMLInputElement

  private vertical!: HTMLInputElement
  private double!: HTMLInputElement
  private scale!: HTMLInputElement
  private progress!: HTMLInputElement
  private satellite!: HTMLInputElement

  constructor(initElementName: string){
    this.defineInitElement(initElementName)
    this.init()
  }

  private defineInitElement = (initElementName: string): void => {
    this.initElementName = initElementName
    this.initElement = document.querySelector(initElementName) as HTMLElement
    this.rangeSlider = $(initElementName).data("customRangeSlider");
  }

  
  private init = (): void => {
    this.min = this.initInput(this.min, 'min')
    this.max = this.initInput(this.max, 'max')
    this.step = this.initInput(this.step, 'step')
    this.from = this.initInput(this.from, 'from')
    this.to = this.initInput(this.to, 'to')    
    this.scaleSize = this.initInput(this.scaleSize, 'scaleSize')    

    this.vertical = this.initCheckbox(this.vertical, 'vertical')
    this.double = this.initCheckbox(this.double, 'double')
    this.switchStateForTo(this.to)
    this.scale = this.initCheckbox(this.scale, 'scale')
    this.progress = this.initCheckbox(this.progress, 'progress')
    this.satellite = this.initCheckbox(this.satellite, 'satellite')
  }

  private setEventListener = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', this.sendElementValue.bind(null, element, optionKey))
  }

  private setEventListenerOnCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', this.sendState.bind(null, optionKey))
  }
  private switchStateForTo = (element: HTMLInputElement): void => {
    this.isDisable(element)
    this.double.addEventListener('change', this.isDisable.bind(null, element))
  }

  private isDisable = (element: HTMLInputElement): void => {
    if (this.rangeSlider.returnCurrentOptions().double){
      element.disabled = false
    } else {
      element.disabled = true
      element.value = ''
    }
  }

  private initInput = (element: HTMLInputElement, optionKey: keyof IOptions): HTMLInputElement => {
    element = this.initElement.querySelector(`.js-config-panel__${optionKey}`) as HTMLInputElement
    this.displayCurrentState(element, optionKey)
    this.setEventListener(element, optionKey)
    return element
  }

  private sendElementValue = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    this.rangeSlider.update({
      [optionKey]: Number(element.value)
    })
    this.displayCurrentState(element, optionKey)
  }

  private displayCurrentState = (element: HTMLInputElement, optionKey: keyof IOptions, checkbox = false): void => {
    const currentState = $(this.initElementName).data("customRangeSlider").returnCurrentOptions();
    if (checkbox){
      element.checked = currentState[optionKey]
    } else {
      element.value = currentState[optionKey]
      if (element === this.min) {
        this.max.value = currentState.max
      }
    }
    
  }

  private initCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): HTMLInputElement => {
    element = this.initElement.querySelector(`.js-config-panel__${optionKey}`) as HTMLInputElement
    this.displayCurrentState(element, optionKey, true)
    this.setEventListenerOnCheckbox(element, optionKey)
    return element
  }

  private sendState = (optionKey: keyof IOptions): void => {
    const isCurrentStateTrue = this.rangeSlider.returnCurrentOptions()[optionKey];
    let newState: boolean
    if (isCurrentStateTrue){
      newState = false
    } else {
      newState = true
    }
    this.rangeSlider.update({
      [optionKey]: newState
    })
  }
}

export { configPanel }