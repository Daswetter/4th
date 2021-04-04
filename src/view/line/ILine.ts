interface ILine {
  returnAsHTML(): HTMLElement

  setEventListener(orientation: string): void

  
  onClick(params: {client: keyof MouseEvent, side: keyof DOMRect, offset: keyof HTMLElement}, event: MouseEvent) : void


  bindLineClicked(callback: (arg0:number) => void): void
}

export { ILine }