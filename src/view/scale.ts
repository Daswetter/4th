import { Line } from './line'

class Scale{
  public scale: HTMLElement 
//   private onThumbChangedPos!: Function;

  constructor(public line: Line) {
    this.scale = document.createElement('div')
    this.scale.classList.add('range-slider__scale')
    this.line.after(this.scale)


    // this.progress.setDefaultStyle()
  }
//   changeWidth = (thumbLeftProp: string): void => {
//     this.progress.style.width = thumbLeftProp
//   }

//   bindThumbChangedPos = (callback: Function): void => {
//     this.onThumbChangedPos = callback;
//   }
}


export { Scale }