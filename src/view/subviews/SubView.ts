abstract class SubView {
  protected onChanged!: (part: number) => void;
  protected onExtraChanged!: (part: number) => void

  protected init = (initElement: HTMLElement, element: HTMLElement, styleName: string): HTMLElement => {
    element = document.createElement('div')
    element.classList.add(`dwSlider__${styleName}`)
    initElement.append(element)
    return element
  }

  public bindChangedState(callback: (arg0: number) => void ): void {
    this.onChanged = callback;
  }
  public bindExtraChangedState(callback: (arg0: number) => void ): void {
    this.onExtraChanged = callback;
  }
}

export { SubView }

