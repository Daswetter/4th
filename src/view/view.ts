export class View {
  private initElement: HTMLElement
  private line: HTMLElement
  private handle: HTMLElement
  private labels: HTMLElement
  private initialLabel: HTMLElement
  private finalLabel: HTMLElement 
  private input: HTMLElement

  constructor() {
    this.initElement = this.getElement('.js-slider')
    this.line = this.createElement('div', 'range-slider__line')
    this.handle = this.createElement('div', 'range-slider__handle')
    this.labels = this.createElement('div', 'range-slider__labels')
    this.initialLabel = this.createElement('div', 'range-slider__initialLabel')
    this.finalLabel = this.createElement('div', 'range-slider__finalLabel')
    this.input = this.createElement('div')

    this.initialLabel.innerText = '0'
    this.finalLabel.innerText = '100'

    this.initElement.append(this.line)
    this.line.append(this.handle, this.labels)
    this.labels.append(this.initialLabel, this.finalLabel)
    this.labels.after(this.input)
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
  
  testViewMethod(param: Function): void{
    let that = this
    console.log(param);
    
    this.handle.addEventListener('click', function (event) {
      that.handle.classList.add('range-slider__handle_test')
      that.input.innerText = String(param(10))
      
    })
  }


  // this.handle.onmousedown = function(event) {
  //   let shiftX = event.clientX - this.handle.getBoundingClientRect().left
  //   this.handle.style.position = 'absolute';
  //   this.handle.style.zIndex = '100';
  //   document.body.append(this.handle)

  //   function moveAt(pageX) {
  //     console.log('moveAT')
  //     let leftStop = pageX - this.line.getBoundingClientRect().left;
  //     let rightStop = - pageX + this.line.getBoundingClientRect().right;
      

  //     leftStop < 0 ? leftStop = 0 : 
  //     rightStop < 0 ? rightStop = 0 :
  //     this.handle.style.left = pageX - shiftX + 'px';
  //     this.handle.style.top = line.getBoundingClientRect().top - line.getBoundingClientRect().height / 2 + 'px'
  //   }
      


  //   moveAt(event.pageX);
  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  //   function onMouseMove(event) {
  //     moveAt(event.pageX);
  //   }
  //   function onMouseUp(event) {
  //     document.removeEventListener('mousemove', onMouseMove);
  //   }
  // }
}
