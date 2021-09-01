type Size = {
  width: number,
  height: number,
};

type Side = {
  left: number,
  bottom: number
};

type PositionParams = {
  width: number,
  height: number,
  left: number,
  top: number
};

type MouseDownData = {
  element: HTMLElement,
  vertical: boolean,
  lineSize: Size,
  lineSide: Side,
  event: MouseEvent
};

type MouseMoveData = {
  element: HTMLElement,
  vertical: boolean,
  lineSize: Size,
  lineSide: Side,
  shift: number,
  event: MouseEvent
};

export {
  Size, Side, PositionParams, MouseDownData, MouseMoveData,
};
