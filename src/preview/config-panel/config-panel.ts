import $ from 'jquery'

import { IdwSlider } from '../../interface/IdwSlider'
import { IOptions } from '../../interface/IOptions'
import './components/toggle/toggle.ts'
import './components/input/input.ts'
import './config-panel.scss'


class configPanel{
  private initElement!: HTMLElement
  private initElementName!: string
  private dwSlider!: IdwSlider
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
    this.dwSlider = $(initElementName).data("dwSlider");
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
    element.addEventListener('change', this.handleInputChange.bind(null, element, optionKey))
  }

  private setEventListenerOnCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', this.handleCheckboxInput.bind(null, optionKey))
  }
  private switchStateForTo = (element: HTMLInputElement): void => {
    this.isDisable(element)
    this.double.addEventListener('change', this.isDisable.bind(null, element))
  }

  private isDisable = (element: HTMLInputElement): void => {
    if (this.dwSlider.returnCurrentOptions().double){
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

  private handleInputChange = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    this.dwSlider.update({
      [optionKey]: Number(element.value)
    })
    this.displayCurrentState(element, optionKey)
  }

  private displayCurrentState = (element: HTMLInputElement, optionKey: keyof IOptions, checkbox = false): void => {
    const currentState = $(this.initElementName).data("dwSlider").returnCurrentOptions();
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

  private handleCheckboxInput = (optionKey: keyof IOptions): void => {
    const isCurrentStateTrue = this.dwSlider.returnCurrentOptions()[optionKey];
    let newState: boolean
    if (isCurrentStateTrue){
      newState = false
    } else {
      newState = true
    }
    this.dwSlider.update({
      [optionKey]: newState
    })
  }
}

export { configPanel }