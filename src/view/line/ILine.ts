interface ILine {
  init() : void
  returnAsHTML(): HTMLElement

  setClickListenerForVertical(): void
  setClickListenerForHorizontal(): void

  width(): number
  height(): number
  left(): number
  bottom(): number
 
  
  moveByClicking(client: keyof MouseEvent, side: keyof DOMRect, size: keyof HTMLElement, event: MouseEvent):void

  moveByClickingForVertical(event: MouseEvent) : void
  moveByClickingForHorizontal(event: MouseEvent) : void

  setVertical(): void

  bindLineClicked(callback: (arg0:number) => void): void
}

export { ILine }