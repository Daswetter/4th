import { Subview } from "../Subview"

class Line extends Subview{
  public line!: HTMLElement
  private mouseDownValue!: number 
  private mouseUpValue!: number 

  constructor(initElement: HTMLElement){
    super()
    this.initPrimary(initElement)
    
    this.subscribeEvent<{vertical: boolean, event: MouseEvent}>('line: clicked', ({vertical, event}) => this.handleClick(vertical, event))

    this.subscribeEvent<{vertical: boolean, event: MouseEvent}>('line: mouseDown', ({vertical, event}) => this.handleMouseDown(vertical, event))

    this.subscribeEvent<{vertical: boolean, event: MouseEvent}>('line: mouseUp', ({vertical, event}) => this.handleMouseUp(vertical, event))
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.line = this.init(initElement, this.line, 'line')
    this.line.classList.add('dwSlider__line_horizontal')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.line
  }

  private handleMouseDown = (vertical: boolean, event: MouseEvent): void => {
    console.log('down');
    
    if (vertical){
      this.mouseDownValue = event.clientY
    } else {
      this.mouseDownValue = event.clientX
    }
    
  }
  private handleMouseUp = (vertical: boolean, event: MouseEvent): void => {
    console.log('up');
    
    if (vertical){
      this.mouseUpValue = event.clientY
    } else {
      this.mouseUpValue = event.clientX
    }
  }

  public setEventListener = (vertical: boolean): void => {
    this.line.addEventListener('mousedown', (event) => this.emitEvent('line: mouseDown', {vertical, event}))
    this.line.addEventListener('mouseup', (event) => this.emitEvent('line: mouseUp', {vertical, event}))
    this.line.addEventListener('click', (event) => this.emitEvent('line: clicked', {vertical, event}))
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
      this.line.classList.add('dwSlider__line_vertical')
    } else {
      this.line.classList.add('dwSlider__line_horizontal')
    }
  }

  private handleClick = (vertical: boolean, event: MouseEvent) : void => {
    console.log('clicked');
    console.log(this.mouseDownValue);
    console.log(this.mouseUpValue);
    
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