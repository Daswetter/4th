import { SubView } from "../SubView"

class Line extends SubView{
  public line!: HTMLElement
  private mouseDownValue!: number 
  private mouseUpValue!: number 

  constructor(){
    super()
    this.initPrimaryElement()
  }

  initPrimaryElement = (): void => {
    this.line = this.init(this.line, 'line')
  }

  public returnAsHTML = (): HTMLElement => {
    return this.line
  }

  private onMouseDown = (vertical: boolean, event: MouseEvent): void => {
    if (vertical){
      this.mouseDownValue = event.clientY
    } else {
      this.mouseDownValue = event.clientX
    }
    
  }
  private onMouseUp = (vertical: boolean, event: MouseEvent): void => {
    if (vertical){
      this.mouseUpValue = event.clientY
    } else {
      this.mouseUpValue = event.clientX
    }
  }

  public setEventListener = (vertical: boolean): void => {

    this.line.onmousedown = this.onMouseDown.bind(null, vertical)
    this.line.onmouseup = this.onMouseUp.bind(null, vertical)
    
    this.line.addEventListener('click', this.setClickListener.bind(null, vertical))
  }
  

  public size = (): {width: number, height: number} => {
    return {
      width: this.line.offsetWidth,
      height: this.line.offsetHeight,
    }
  }

  public side = (): {left: number, bottom: number} => { 
    return {
      left: this.line.offsetLeft,
      bottom: this.line.offsetTop + this.line.offsetHeight
    }
  }

  public setVertical = (): void => {
    const width = this.line.offsetWidth
    const height = this.line.offsetHeight
    this.line.style.width = height + 'px'
    this.line.style.height = width + 'px'
  }


  private setClickListener = (vertical: boolean, event: MouseEvent) : void => {
    if ( this.mouseDownValue === this.mouseUpValue){
      if (vertical){
        this.onClickVertical.call(null, event)
      } else {
        this.onClickHorizontal.call(null, event)
      }
      
    }
  }

  private onClickHorizontal = (event: MouseEvent) : void => {
    let part
    const distFromBeginToClick = event.clientX - this.line.getBoundingClientRect().left
    part = distFromBeginToClick / this.line.offsetWidth

    if (distFromBeginToClick < 0){
      part = 0
    } else if (distFromBeginToClick > this.line.offsetWidth) {
      part = 1
    }
    if (event.clientY <= this.line.offsetTop + this.line.offsetHeight){
      this.onChanged(part)
    }
  }

  private onClickVertical = (event: MouseEvent) : void => {
    let part
    const distFromBeginToClick = - event.clientY + this.line.getBoundingClientRect().bottom
    part = distFromBeginToClick / this.line.offsetHeight

    if (distFromBeginToClick < 0){
      part = 0
    } else if (distFromBeginToClick > this.line.offsetHeight) {
      part = 1
    }
    
    if (event.clientX <= this.line.offsetLeft + this.line.offsetWidth){
      this.onChanged(part)
    }
  }
}

export { Line }