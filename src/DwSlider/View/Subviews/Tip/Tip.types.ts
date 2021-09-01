import { Side, Size } from '../Subview.types';

type UnitedTipDownEvent = {
  event: MouseEvent,
  lineSize: Size,
  lineSide: Side,
  vertical: boolean
};

export default UnitedTipDownEvent;
