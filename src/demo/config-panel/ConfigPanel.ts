import $ from 'jquery'

import { IdwSlider, IOptions } from '../../types'
import './components/toggle/toggle.ts'
import './components/input/input.ts'
import './config-panel.scss'

class ConfigPanel{
  private initElement!: HTMLElement
  private dwSlider!: IdwSlider

  private inputs!: { [key: string]: HTMLInputElement }
  private checkboxes!: { [key: string]: HTMLInputElement }

  private events: { [eventName: string]: Array<(arg0: any) => void> } = {};

  constructor(initElementName: string){
    this.defineInitElement(initElementName)
    this.init()
  }

  private defineInitElement = (initElementName: string): void => {
    this.initElement = document.querySelector(initElementName) as HTMLElement
    this.dwSlider = $(initElementName).data("dwSlider");
  }

  private init = (): void => {
    const inputTitles = ['min', 'max', 'step', 'from', 'to', 'scaleSize']

    inputTitles.forEach(title => this.inputs = { ...this.inputs, [title]: this.initInput(title as keyof IOptions)})   
    
    const checkboxTitles = ['vertical', 'double', 'scale', 'progress', 'tip']

    checkboxTitles.forEach(title => this.checkboxes = { ...this.inputs, [title]: this.initCheckbox(title as keyof IOptions)})

    this.updateCurrentState()

    this.subscribe<{element: HTMLInputElement, optionKey: keyof IOptions}>('input: changed', ({element, optionKey}) => this.handleInputChange({element, optionKey}));

    this.subscribe<{optionKey: keyof IOptions}>('checkbox: changed', ({optionKey}) => this.handleCheckboxChange({optionKey}));

    this.subscribe<null>('checkbox: changed', () => this.isDisable(this.inputs.to, this.dwSlider.returnCurrentOptions().double, this.dwSlider.returnCurrentOptions().to as number))
    this.subscribe<null>('checkbox: changed', () => this.isDisable(this.inputs.scaleSize, this.dwSlider.returnCurrentOptions().scale, this.dwSlider.returnCurrentOptions().scaleSize))
  }
  
  private setEventListener = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', () => this.emit<{element: HTMLInputElement, optionKey: keyof IOptions}>('input: changed', {element, optionKey}))
  }

  private setEventListenerOnCheckbox = (element: HTMLInputElement, optionKey: keyof IOptions): void => {
    element.addEventListener('change', () => this.emit<{element: HTMLInputElement, optionKey: keyof IOptions}>('checkbox: changed', {element, optionKey}))
  }

  private isDisable = (element: HTMLInputElement, condition: boolean, relatedValue: number): void => {
    if (condition){
      element.disabled = false
      element.value = String(relatedValue)
    } else {
      element.disabled = true
      element.value = ''
    }
  }


  private initInput = (optionKey: keyof IOptions): HTMLInputElement => {
    const element = this.initElement.querySelector(`.js-input__field_type_${optionKey}`) as HTMLInputElement
    this.displayInputValue(element, optionKey)
    this.setEventListener(element, optionKey)
    return element
  }

  private displayInputValue = (element: HTMLInputElement, optionKey: keyof IOptions) => {
    element.value = String(this.dwSlider.returnCurrentOptions()[optionKey])
  }

  private displayCheckboxState = (element: HTMLInputElement, optionKey: keyof IOptions) => {
    element.checked = this.dwSlider.returnCurrentOptions()[optionKey] as boolean
  }

  private handleInputChange = (params: {element: HTMLInputElement, optionKey: keyof IOptions}): void => {
    this.dwSlider.update({
      [params.optionKey]: Number(params.element.value)
    })
    this.updateCurrentState()
  }

  private updateCurrentState = (): void => {
    for (let key in this.inputs) {
      this.displayInputValue(this.inputs[key], key as keyof IOptions)
    }

    for (let key in this.checkboxes) {
      this.displayCheckboxState(this.checkboxes[key], key as keyof IOptions)
    }

    this.isDisable(this.inputs.to, this.dwSlider.returnCurrentOptions().double, this.dwSlider.returnCurrentOptions().to as number)
    this.isDisable(this.inputs.scaleSize, this.dwSlider.returnCurrentOptions().scale,  this.dwSlider.returnCurrentOptions().scaleSize)
  }

  private initCheckbox = ( optionKey: keyof IOptions): HTMLInputElement => {
    const element = this.initElement.querySelector(`.js-toggle__input_type_${optionKey}`) as HTMLInputElement
    this.setEventListenerOnCheckbox(element, optionKey)
    this.displayCheckboxState(element, optionKey)
    return element
  }

  private handleCheckboxChange = (params: { optionKey: keyof IOptions }): void => {
    const isCurrentStateTrue = this.dwSlider.returnCurrentOptions()[params.optionKey];
    let newState: boolean
    if (isCurrentStateTrue){
      newState = false
    } else {
      newState = true
    }
    this.dwSlider.update({
      [params.optionKey]: newState
    })
  }

  protected emit<T>(eventName: string, data: T): void{
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        fn.call(null, data);
      });
    }
  }

  protected subscribe<T>(eventName: string, fn: (data: T) => void) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }
}

export default ConfigPanel