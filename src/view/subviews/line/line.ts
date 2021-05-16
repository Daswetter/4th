import { SubView } from "../SubView"

class Line extends SubView{
  public line!: HTMLElement
  private mouseDownValue!: number 
  private mouseUpValue!: number 

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.line = this.init(initElement, this.line, 'line')
    this.line.classList.add('range-slider__line_horizontal')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.line
  }

  private handleMouseDown = (vertical: boolean, event: MouseEvent): void => {
    if (vertical){
      this.mouseDownValue = event.clientY
    } else {
      this.mouseDownValue = event.clientX
    }
    
  }
  private handleMouseUp = (vertical: boolean, event: MouseEvent): void => {
    if (vertical){
      this.mouseUpValue = event.clientY
    } else {
      this.mouseUpValue = event.clientX
    }
  }

  public setEventListener = (vertical: boolean): void => {
    this.line.onmousedown = this.handleMouseDown.bind(null, vertical)
    this.line.onmouseup = this.handleMouseUp.bind(null, vertical)

    this.line.addEventListener('click', this.handleClick.bind(null, vertical))
  }
  
  public returnSize = (): {width: number, height: number} => {
    return {
      width: this.line.offsetWidth,
      height: this.line.offsetHeight,
    }
  }

  public returnSide = (): {left: number, bottom: number} => { 
    return {
      left: this.line.offsetLeft,
      bottom: this.line.offsetTop + this.line.offsetHeight
    }
  }

  public setInitialSettings = (vertical: boolean): void => {
    if (vertical) {
      this.line.classList.add('range-slider__line_vertical')
    } else {
      this.line.classList.add('range-slider__line_horizontal')
    }
  }

  private handleClick = (vertical: boolean, event: MouseEvent) : void => {
    if ( this.mouseDownValue === this.mouseUpValue){
      if (vertical){
        this.onClickVertical.call(null, event)
      } else {
        this.onClickHorizontal.call(null, event)
      }
    }
  }

  private onClickHorizontal = (event: MouseEvent) : void => {
    const distFromBeginToClick = event.clientX - this.line.getBoundingClientRect().left
    let part = distFromBeginToClick / this.line.offsetWidth

    if (distFromBeginToClick < 0){
      part = 0
    } else if (distFromBeginToClick > this.line.offsetWidth) {
      part = 1
    }
    const isOnlyLineClicked = event.pageY <= this.line.offsetTop + this.line.offsetHeight && event.pageY >= this.line.offsetTop
    
    if (isOnlyLineClicked) { 
      this.onChanged(part)
    }
  }

  private onClickVertical = (event: MouseEvent) : void => {
    const distFromBeginToClick = - event.clientY + this.line.getBoundingClientRect().bottom
    let part = distFromBeginToClick / this.line.offsetHeight

    if (distFromBeginToClick < 0){
      part = 0
    } else if (distFromBeginToClick > this.line.offsetHeight) {
      part = 1
    }
    
    const isOnlyLineClicked = event.pageX <= this.line.offsetLeft + this.line.offsetWidth && event.pageX >= this.line.offsetLeft

    if (isOnlyLineClicked){
      this.onChanged(part)
    }
  }
}

export { Line }