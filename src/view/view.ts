export class View {
  private initElement: HTMLElement;
  private line: HTMLElement;
  private thumb: HTMLElement;
  private form: HTMLElement;

  constructor() {
    this.initElement = this.getElement('.js-slider1')
    this.line = this.createElement('div', 'range-slider__line')
    this.thumb = this.createElement('div', 'range-slider__thumb')
    this.form = this.createElement('div')

    this.initElement.append(this.line)
    this.line.prepend(this.thumb)
    this.line.after(this.form)
    
  }
  getElement(selector: string): HTMLElement{
    const element = document.querySelector(selector) as HTMLElement
    return element
  }

  createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  displayCurrentValue(res:number): void{
    this.form.innerText = res + ''
    
  }
  
  moveThumbByClicking(sendPartToModel: Function): void{
    const that = this
    this.line.onclick = function(event) {
      that.thumb.style.left = event.pageX - that.line.getBoundingClientRect().left - that.thumb.getBoundingClientRect().width / 2 + 'px' 

      const part = (event.pageX - that.line.getBoundingClientRect().left) / that.line.getBoundingClientRect().width
      sendPartToModel(part)      
    }
  }
  moveThumbByDragAndDrop(): void{
    const that = this
    this.thumb.onmousedown = function (event) : void {
      event.preventDefault()

      const shiftX = event.clientX - that.thumb.getBoundingClientRect().left

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(event: MouseEvent): void {
        let leftStop = event.pageX - shiftX - that.line.getBoundingClientRect().left + that.thumb.offsetWidth / 2
        
        const rightStop = that.line.offsetWidth - that.thumb.offsetWidth + that.thumb.offsetWidth 

        if (leftStop < 0) {
          leftStop = 0
        }
        if (leftStop > rightStop) {
          leftStop = rightStop
        }
        that.thumb.style.left = leftStop - that.thumb.offsetWidth / 2 + 'px'
      }

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('mousemove', onMouseMove)
      }
            
    }
  }

  // displayProgressLine(): void {
  //   this.progressLine.style.width = (this.handle.getBoundingClientRect().left - this.line.getBoundingClientRect().left + this.handle.getBoundingClientRect().width / 2) + 'px'
  // }
}

// export class InitElement extends mainView{
//   public initElement: HTMLElement
//   constructor() {
//     super()
//     this.initElement = this.getElement('.js-slider2')
//   }
// }
// const newInitElement = new InitElement()
// export class Line extends mainView{
//   public line: HTMLElement
//   constructor() {
//     super()
//     this.line = this.createElement('div', 'range-slider__line')
//   }
// }

// export class Thumb extends mainView{
//   public thumb: HTMLElement
//   constructor() {
//     super()
//     this.thumb = this.createElement('div', 'range-slider__thumb')
//   }
// }