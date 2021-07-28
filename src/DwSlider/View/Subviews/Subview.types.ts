import { Params } from '../../../types';

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

type MouseDownEvent = {
  element: HTMLElement,
  params: Params,
  event: MouseEvent
};

type MouseMoveEvent = {
  element: HTMLElement,
  params: Params,
  shift: number,
  event: MouseEvent
};

export {
  Size, Side, PositionParams, MouseDownEvent, MouseMoveEvent,
};
