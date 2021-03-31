import { ILine } from './ILine'
class Line implements ILine{
  public line!: HTMLElement
  private onLineClicked!: (arg0:number) => void;

  constructor() {
    this.init()
  }

  init = () : void => {
    this.line = document.createElement('div')
    this.line.style.position = 'relative'
    this.line.style.cursor = 'pointer'
    this.line.classList.add('range-slider__line')
  }

  returnAsHTML = (): HTMLElement => {
    return this.line
  }

  setClickListener = (callback: (event: MouseEvent) => void): void => {
    this.line.onclick = callback
  }

  setClickListenerForVertical = (): void => {
    this.setClickListener(this.moveByClickingForVertical)
  }
  setClickListenerForHorizontal = (): void => {
    this.setClickListener(this.moveByClickingForHorizontal)
  }

  width(): number {
    return this.line.offsetWidth
  }
  
  height(): number {
    return this.line.offsetHeight
  }

  left(): number {
    const left = this.line.getBoundingClientRect().left
    return left
  }
  bottom(): number {
    const bottom = this.line.getBoundingClientRect().bottom + document.documentElement.scrollTop
    return bottom
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