import { Side, Size } from '../Subview.types';

type UnitedTipDownEvent = {
  event: MouseEvent,
  lineSize: Size,
  lineSide: Side,
  isVertical: boolean
};

export default UnitedTipDownEvent;
