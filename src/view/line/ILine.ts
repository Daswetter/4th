interface ILine {
  returnAsHTML(): HTMLElement

  setEventListener(orientation: string): void

  
  moveByClicking(client: keyof MouseEvent, side: keyof DOMRect, size: keyof HTMLElement, event: MouseEvent):void

  moveByClickingForVertical(event: MouseEvent) : void
  moveByClickingForHorizontal(event: MouseEvent) : void


  bindLineClicked(callback: (arg0:number) => void): void
}

export { ILine }