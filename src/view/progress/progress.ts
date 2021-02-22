import { Line } from '../line/line'

class Progress{
  public progress: HTMLElement 
  private onThumbChangedPos!: Function;

  constructor(public line: Line) {
    this.progress = document.createElement('div')
    this.progress.classList.add('range-slider__progress')
    this.line.append(this.progress)

    // this.progress.setDefaultStyle()
  }
  setInitialPos = (part: number, lineWidth: number): void => {
    this.progress.style.width =  lineWidth * part + 'px'
  }

  changeWidth = (thumbLeftProp: string): void => {
    this.progress.style.width = thumbLeftProp
  }

  bindThumbChangedPos = (callback: Function): void => {
    this.onThumbChangedPos = callback;
  }
}

export { Progress }