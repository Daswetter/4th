import { SubView } from "./subviews/SubView"

abstract class IView {
  protected partChanged!: (arg0: number) => void
  protected extraPartChanged!: (arg0: number) => void

  protected valueChanged!: (arg0: number) => void
  protected extraValueChanged!: (arg0: number) => void

  add = (element: SubView, elementName: string, changedValue: string): void => {
    if (elementName === 'primary' && changedValue === 'part'){
      element.bindChangedPosition(this.partChanged)
    }
    if (elementName === 'primary' && changedValue === 'current'){
      element.bindChangedPosition(this.valueChanged)
    }
    if (elementName === 'extra' && changedValue === 'part'){
      element.bindExtraChangedPosition(this.extraPartChanged)
    }
    if (elementName === 'extra' && changedValue === 'current'){
      element.bindExtraChangedPosition(this.extraValueChanged)
    }
    
  }
  
  
  public bindChangedPart(callback: (arg0: number) => void): void {
    this.partChanged = callback;
  }
  public bindChangedExtraPart(callback: (arg0: number) => void): void {
    this.extraPartChanged = callback;
  }

  public bindChangedValue(callback: (arg0: number) => void): void {
    this.valueChanged = callback;
  }
  public bindChangedExtraValue(callback: (arg0: number) => void): void {
    this.extraValueChanged = callback;
  }
}

export { IView }