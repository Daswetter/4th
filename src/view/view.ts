class View { 
  public line: Line
  public thumb: Thumb

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement
    this.line = new Line(this.initElement)
    this.thumb = new Thumb(this.line)  
    // this.initElement.append(this.line)
    // this.line.append(this.thumb)
  }

  moveThumbByDragAndDrop(): void{
    this.thumb.onmousedown = (event: MouseEvent) : void => {
      event.preventDefault()
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseMove(event: MouseEvent): void {
    const shiftX = event.clientX - this.thumb.getBoundingClientRect().left
    let leftStop = event.pageX - shiftX - this.line.getBoundingClientRect().left + this.thumb.offsetWidth / 2
    
    const rightStop = this.line.offsetWidth - this.thumb.offsetWidth + this.thumb.offsetWidth 

    if (leftStop < 0) {
      leftStop = 0
    }
    if (leftStop > rightStop) {
      leftStop = rightStop
    }
    this.thumb.style.left = leftStop - this.thumb.offsetWidth / 2 + 'px'
  }

  onMouseUp(): void {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousemove', this.onMouseMove)
  }
  
  displayCurrentValue(res:number): void{
    // this.form.innerText = res + ''
  }
  
  moveThumbByClicking(sendPartToModel: Function): void{
    this.line.onclick = (event: MouseEvent) => {
      this.thumb.style.left = event.pageX - this.line.getBoundingClientRect().left - this.thumb.offsetWidth / 2 + 'px' 

      const part = (event.pageX - this.line.getBoundingClientRect().left) / this.line.offsetWidth
      sendPartToModel(part)      
    }
  }
}
// -----------------

class Line{
  public line: HTMLElement 
  constructor(public initElement: HTMLElement) {
    this.line = document.createElement('div')
    this.line.classList.add('range-slider__line')
  }
  get width(): number {
    return this.line.offsetWidth
  }
  get leftSide(): number {
    return this.line.getBoundingClientRect().left
  }
}

class Thumb{
  public thumb: HTMLElement
  constructor(public line: Line) {
    this.thumb = document.createElement('div')
    this.thumb.classList.add('range-slider__thumb')
  }
  get width(): number {
    return this.thumb.offsetWidth
  }
  get leftSide(): number {
    return this.thumb.getBoundingClientRect().left
  }
  leftStyle(): string {
    return this.thumb.style.left
  }
}

export { View, Line, Thumb }