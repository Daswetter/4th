import { Side, Size } from '../Subview.types';

type UnitedTipDownEvent = {
  event: MouseEvent,
  lineSize: Size,
  lineSide: Side,
  vertical: boolean
};

// eslint-disable-next-line import/prefer-default-export
export { UnitedTipDownEvent };
