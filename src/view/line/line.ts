class Line{
  public line!: HTMLElement
  private mouseDownValue!: number 
  private mouseUpValue!: number 
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

  public returnAsHTML = (): HTMLElement => {
    return this.line
  }

  private onMouseDown = (client: keyof MouseEvent, event: MouseEvent): void => {
    this.mouseDownValue = (event[client] as number)
  }
  private onMouseUp = (client: keyof MouseEvent, event: MouseEvent): void => {
    this.mouseUpValue = (event[client] as number)
  }

  public setEventListener = (orientation: string): void => {
    let params = {
      client: 'clientX' as keyof MouseEvent,
      side: 'left' as keyof DOMRect,
      offset: 'offsetWidth' as keyof HTMLElement
    }
    if (orientation === 'vertical'){
      params = {
        client: 'clientY',
        side: 'bottom',
        offset: 'offsetHeight',
      }
    } 

    this.line.onmousedown = this.onMouseDown.bind(null, params.client)
    this.line.onmouseup = this.onMouseUp.bind(null, params.client)

    this.line.addEventListener('click', this.onClick.bind(null, params))
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
  
  private onClick = (params: {client: keyof MouseEvent, side: keyof DOMRect, offset: keyof HTMLElement}, event: MouseEvent) : void => {
    if ( this.mouseDownValue === this.mouseUpValue){
      let part
      let distFromBeginToClick = (event[params.client] as number) - (this.line.getBoundingClientRect()[params.side] as number)
      
      if (params.client === 'clientY'){
        distFromBeginToClick = - distFromBeginToClick
      }
      
      if (distFromBeginToClick < 0){
        part = 0
      } else if (distFromBeginToClick > (this.line[params.offset] as number)) {
        part = 1
      } else{
        part = distFromBeginToClick / (this.line[params.offset] as number)
        
      }
      this.onLineClicked(part)
    }
  }

  


  public bindLineClicked(callback: (arg0:number) => void): void {
    this.onLineClicked = callback;
  }
}

export { Line }