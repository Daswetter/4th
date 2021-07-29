import Subview from '../Subview';
import {
  MouseDownData, MouseMoveData, Side, Size,
} from '../Subview.types';

class Thumb extends Subview {
  public primary!: HTMLElement;

  public extra!: HTMLElement;

  private mouseMoveEvent!: (event: MouseEvent) => void;

  private mouseUpEvent!: (event: MouseEvent) => void;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);

    this.subscribeToEvents();
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = this.init(initElement, this.primary, '__thumb');
  };

  public initExtra = (initElement: HTMLElement): void => {
    this.extra = this.init(initElement, this.extra, '__thumb');
  };

  private subscribeToEvents = (): void => {
    this.subscribeToAnEvent<MouseDownData>('thumb: mouseDown', ({
      element, vertical, lineSize, lineSide, event,
    }) => this.handleMouseDown({
      element, vertical, lineSize, lineSide, event,
    }));

    this.subscribeToAnEvent<MouseMoveData>('thumb: mouseMove', ({
      element, vertical, lineSize, lineSide, shift, event,
    }) => this.handleMouseMove({
      element, vertical, lineSize, lineSide, shift, event,
    }));

    this.subscribeToAnEvent<null>('thumb: mouseUp', () => this.handleMouseUp());
  };

  public setEventListener = (
    lineSize: Size,
    lineSide: Side,
    vertical = false,
    extra = false,
  ): void => {
    let element = this.primary;

    if (extra) {
      element = this.extra;
    }

    element.addEventListener('mousedown', (event) => this.emitEvent('thumb: mouseDown', {
      element, vertical, lineSize, lineSide, event,
    }));
  };

  private handleMouseDown = (data: MouseDownData) : void => {
    data.event.preventDefault();

    const shift = this.countShift(data);
    const params = {
      element: data.element,
      vertical: data.vertical,
      lineSide: data.lineSide,
      lineSize: data.lineSize,
    };

    this.mouseMoveEvent = (event: MouseEvent) => this.emitEvent<MouseMoveData>('thumb: mouseMove', {
      ...params, shift, event,
    });

    this.mouseUpEvent = () => this.emitEvent<null>('thumb: mouseUp', null);

    document.addEventListener('mousemove', this.mouseMoveEvent);
    document.addEventListener('mouseup', this.mouseUpEvent);
  };

  private handleMouseMove = (data: MouseMoveData): void => {
    let part = this.countPart(data);
    if (part < 0) {
      part = 0;
    } else if (part > 1) {
      part = 1;
    }

    if (data.element === this.primary) {
      this.notify({
        value: part, current: false, extra: false, nearest: false,
      });
    }
    if (data.element === this.extra) {
      this.notify({
        value: part, current: false, extra: true, nearest: false,
      });
    }
  };

  private handleMouseUp = () : void => {
    document.removeEventListener('mousemove', this.mouseMoveEvent);
    document.removeEventListener('mouseup', this.mouseUpEvent);
  };

  private countShift = (data: MouseDownData): number => {
    if (data.vertical) {
      return (
        data.event.pageY - data.element.offsetTop - data.lineSide.bottom + data.lineSize.height
      );
    }
    return data.event.pageX - data.element.offsetLeft - data.lineSide.left;
  };

  private countPart = (data: MouseMoveData): number => {
    let part: number;
    if (data.vertical) {
      const halfThumbSize = data.element.offsetHeight / 2;
      const movingSpot = -(data.event.pageY - data.lineSide.bottom - data.shift + halfThumbSize);
      part = movingSpot / data.lineSize.height;
      return part;
    }
    const halfThumbSize = data.element.offsetWidth / 2;
    const usingSpot = data.event.pageX - data.lineSide.left - data.shift + halfThumbSize;
    part = usingSpot / data.lineSize.width;
    return part;
  };

  private changeElementPosition = (
    part: number, lineSize: Size, vertical: boolean, element: HTMLElement,
  ): void => {
    if (vertical) {
      const side = `${part * lineSize.height - element.offsetHeight / 2}px`;
      element.style.setProperty('bottom', `${side}`);
    } else {
      const side = `${part * lineSize.width - element.offsetWidth / 2}px`;
      element.style.setProperty('left', `${side}`);
    }
  };

  public update = (
    part: number, lineSize: Size, vertical: boolean, extra: boolean,
  ): void => {
    let element = this.primary;

    if (extra) {
      element = this.extra;
    }

    this.changeElementPosition(part, lineSize, vertical, element);
  };

  private countInitialParameter = (
    element: HTMLElement, lineSize: Size, vertical: boolean,
  ): string => {
    let initParameter = `${(lineSize.height - element.offsetHeight) / 2}px`;
    if (vertical) {
      initParameter = `${(lineSize.width - element.offsetWidth) / 2}px`;
    }
    return initParameter;
  };

  public setInitialSettings = (lineSize: Size, vertical = false, extra = false): void => {
    let element = this.primary;
    if (extra) {
      element = this.extra;
    }

    if (vertical) {
      element.style.top = '';
      element.style.left = this.countInitialParameter(element, lineSize, vertical);
    } else {
      element.style.top = this.countInitialParameter(element, lineSize, vertical);
    }
  };

  public returnSize = (): Size => ({
    width: this.primary.offsetWidth,
    height: this.primary.offsetHeight,
  });
}

export default Thumb;
