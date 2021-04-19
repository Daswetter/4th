abstract class SubView {
  protected onChanged!: (part: number) => void;
  protected onExtraChanged!: (part: number) => void

  

  protected init = (element: HTMLElement, styleName: string): HTMLElement => {
    element = document.createElement('div')
    element.classList.add(`range-slider__${styleName}`)
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

