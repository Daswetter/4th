interface IOptions {
  min: number,
  max: number,
  from: number, 
  to?: number, 
  stepSize: number,
  orientation: string,
  thumbType: string,
  satellite: boolean,
  scale: boolean,
  progress: boolean,
  input: boolean
}

export { IOptions }
