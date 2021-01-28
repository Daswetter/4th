class View { 
  public line: Line
  public thumb: Thumb

  constructor(public initElement: HTMLElement) {
    this.initElement = initElement
    this.line = new Line(this.initElement)
    this.thumb = new Thumb(this.line)  
    
  }

  displayCurrentValue(res:number): void{
    // this.form.innerText = res + ''
  }
  
  // moveThumbByClicking(sendPartToModel: Function): void{
  //   this.line.onclick = (event: MouseEvent) => {
  //     this.thumb.style.left = event.pageX - this.line.getBoundingClientRect().left - this.thumb.offsetWidth / 2 + 'px' 

  //     const part = (event.pageX - this.line.getBoundingClientRect().left) / this.line.offsetWidth
  //     sendPartToModel(part)      
  //   }
  // }
}
// -----------------

class Line{
  public line: HTMLElement 
  constructor(public initElement: HTMLElement) {
    this.line = document.createElement('div')
    this.line.classList.add('range-slider__line')
    this.initElement.append(this.line)
  }
  get width(): number {
    return this.line.offsetWidth
  }
  get leftSide(): number {
    return this.line.getBoundingClientRect().left
  }
  append(element: HTMLElement): void {
    this.line.append(element)
  }
}

class Thumb{
  public thumb: HTMLElement
  public _shiftXValue = 0;
  constructor(public line: Line) {
    this.thumb = document.createElement('div')
    this.thumb.classList.add('range-slider__thumb')
    this.line.append(this.thumb)


    this.onMouseDown()
  }

  onMouseDown(): void{
    this.thumb.onmousedown = (event: MouseEvent) : void => {
      const shiftX = event.clientX - this.thumb.getBoundingClientRect().left 

      this.setShiftX(shiftX)

      event.preventDefault()
      document.onmousemove = this.onMouseMove;
      document.onmouseup = this.onMouseUp;
    }
  }
  get shiftX(): number {
    return this._shiftXValue
  }
  setShiftX(value: number): void{
    this._shiftXValue = value
  } 
  get leftSide(): number {
    return this.thumb.getBoundingClientRect().x
  }
  onMouseMove = (event: MouseEvent) : void => {
    
    console.log(
      'this.shiftX',
      this.shiftX
    );
    
    let leftStop = event.pageX - this.shiftX - this.line.leftSide + this.thumb.offsetWidth / 2
    

    const rightStop = this.line.width - this.thumb.offsetWidth + this.thumb.offsetWidth 
    
    if (leftStop < 0) {
      leftStop = 0
    } else if (leftStop > rightStop) {
      leftStop = rightStop
    }
    this.thumb.style.left = leftStop - this.thumb.offsetWidth / 2 + 'px'
  }
  onMouseUp(): void {
    console.log('on mouse up');
    document.removeEventListener('mouseup', this.test.bind(Thumb))
    document.removeEventListener('mousemove', this.onMouseMove)
  }
  test(): void{
    console.log(this);
    console.log('on remove');
    
  }
}

export { View, Line, Thumb }