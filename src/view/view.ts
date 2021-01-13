export class View {
  private initElement: HTMLElement
  private line: HTMLElement
  private handle: HTMLElement
  private labels: HTMLElement
  private initialLabel: HTMLElement
  private finalLabel: HTMLElement 
  private progressLine: HTMLElement

  constructor() {
    this.initElement = this.getElement('.js-slider2')
    this.line = this.createElement('div', 'range-slider__line')
    this.handle = this.createElement('div', 'range-slider__handle')
    this.labels = this.createElement('div', 'range-slider__labels')
    this.initialLabel = this.createElement('div', 'range-slider__initialLabel')
    this.finalLabel = this.createElement('div', 'range-slider__finalLabel')
    this.progressLine = this.createElement('div', 'range-slider__progress-line')

    this.initialLabel.innerText = '0'
    this.finalLabel.innerText = '100'

    this.initElement.append(this.line)
    this.line.append (this.labels)
    this.line.prepend (this.progressLine)
    this.progressLine.prepend (this.handle)
    this.labels.append (this.initialLabel, this.finalLabel)
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
  
  displayMovingHandle(value: Function): void{
    let that = this
    this.handle.onmousedown = function (event) : void {
      const handleWidth = that.handle.getBoundingClientRect().width
      const handleLeft = that.handle.getBoundingClientRect().left
      const lineWidth = that.line.getBoundingClientRect().width
      const lineLeft = that.line.getBoundingClientRect().left
       
      const handleRelativePosition = (handleLeft + handleWidth / 2 - lineLeft) / lineWidth

      const shiftX = event.clientX - that.handle.getBoundingClientRect().left

      that.handle.style.position = 'absolute'
      that.handle.style.zIndex = '100'
      document.body.append(that.handle)

      function moveAt(pageX: number): void {
        let leftStop = pageX - that.line.getBoundingClientRect().left;
        let rightStop = - pageX + that.line.getBoundingClientRect().right;
        

        leftStop < 0 ? leftStop = 0 : 
        rightStop < 0 ? rightStop = 0 :
        that.handle.style.left = pageX - shiftX + 'px';
        that.handle.style.top = that.line.getBoundingClientRect().top - that.line.getBoundingClientRect().height / 2 + 'px'

        that.displayProgressLine()
      }

      moveAt(event.pageX);
      
      document.onmousemove = function (event) {
        moveAt(event.pageX);
      };
      document.onmouseup = function (event) {
        document.removeEventListener('mousemove', function (event) {
          moveAt(event.pageX);
        });
      };
      
      
    }
  }

  displayProgressLine(): void {
    this.progressLine.style.width = (this.handle.getBoundingClientRect().left - this.line.getBoundingClientRect().left + this.handle.getBoundingClientRect().width / 2) + 'px'
  }
}
