interface IOptions {
  min: number,
  max: number,
  from: number, 
  to?: number, 
  step: number,
  vertical: boolean,
  double: boolean,
  satellite: boolean,
  scale: boolean,
  progress: boolean,
  input: boolean
}

export { IOptions }
