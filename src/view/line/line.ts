import { ILine } from './ILine'
class Line implements ILine{
  public line!: HTMLElement
  private onLineClicked!: (arg0:number) => void;

  constructor() {
    this.init()
  }

  private init = () : void => {
    this.line = document.createElement('div')
    this.line.style.position = 'relative'
    this.line.style.cursor = 'pointer'
    this.line.classList.add('range-slider__line')
  }

  returnAsHTML = (): HTMLElement => {
    return this.line
  }

  private setClickListener = (callback: (event: MouseEvent) => void): void => {
    this.line.onclick = callback
  }

  setEventListener = (orientation: string): void => {
    if (orientation === 'horizontal'){
      this.setClickListener(this.moveByClickingForHorizontal)
    } 
    if (orientation === 'vertical'){
      this.setClickListener(this.moveByClickingForVertical)
    } 
  }

  size = (): {width: number, height: number} => {
    return {
      width: this.line.offsetWidth,
      height: this.line.offsetHeight,
    }
  }

  side = (): {left: number, bottom: number} => {
    return {
      left: this.line.getBoundingClientRect().left + document.documentElement.scrollLeft,
      bottom: this.line.getBoundingClientRect().bottom + document.documentElement.scrollTop
    }
  }
  
  moveByClicking = (client: keyof MouseEvent, side: keyof DOMRect, size: keyof HTMLElement, event: MouseEvent) : void => {
    let part
    let distFromBeginToClick = (event[client] as number) - (this.line.getBoundingClientRect()[side] as number)

    if (side === 'bottom'){
      distFromBeginToClick = - distFromBeginToClick
    }
    
    if (distFromBeginToClick < 0){
      part = 0
    } else if (distFromBeginToClick > (this.line[size] as number)) {
      part = 1
    } else{
      part = distFromBeginToClick / (this.line[size] as number)
      this.onLineClicked(part)
    }
  }

  moveByClickingForVertical = (event: MouseEvent) : void => {
    this.moveByClicking.call(null, 'clientY', 'bottom', 'offsetHeight', event)
  }

  moveByClickingForHorizontal = (event: MouseEvent) : void => {
    this.moveByClicking.call(null, 'clientX', 'left', 'offsetWidth', event)
  }


  bindLineClicked(callback: (arg0:number) => void): void {
    this.onLineClicked = callback;
  }
}

export { Line }