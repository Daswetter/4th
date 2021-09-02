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

  public initExtra = (initElement: HTMLElement): void => {
    this.extra = this.init(initElement, '__thumb');
  };

  public setEventListener = (
    lineSize: Size,
    lineSide: Side,
    isVertical = false,
    isExtra = false,
  ): void => {
    const element = this.setElement(isExtra);
    element.addEventListener('mousedown', (event) => this.emitEvent('thumb: mouseDown', {
      element, isVertical, lineSize, lineSide, event,
    }));
  };

  public update = (
    part: number, lineSize: Size, isVertical: boolean, isExtra: boolean,
  ): void => {
    const element = this.setElement(isExtra);
    this.changeElementPosition(part, lineSize, isVertical, element);
  };

  public setInitialSettings = (lineSize: Size, isVertical = false, isExtra = false): void => {
    const element = this.setElement(isExtra);
    if (isVertical) {
      element.style.top = '';
      element.style.left = this.countInitialParameter(element, lineSize, isVertical);
    } else {
      element.style.top = this.countInitialParameter(element, lineSize, isVertical);
    }
  };

  public getSize = (): Size => ({
    width: this.primary.offsetWidth,
    height: this.primary.offsetHeight,
  });

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = this.init(initElement, '__thumb');
  };

  private subscribeToEvents = (): void => {
    this.subscribeToAnEvent<MouseDownData>('thumb: mouseDown', ({
      element, isVertical, lineSize, lineSide, event,
    }) => this.handleMouseDown({
      element, isVertical, lineSize, lineSide, event,
    }));

    this.subscribeToAnEvent<MouseMoveData>('thumb: mouseMove', ({
      element, isVertical, lineSize, lineSide, shift, event,
    }) => this.handleMouseMove({
      element, isVertical, lineSize, lineSide, shift, event,
    }));

    this.subscribeToAnEvent<null>('thumb: mouseUp', () => this.handleMouseUp());
  };

  private setElement = (isExtra: boolean): HTMLElement => {
    if (isExtra) {
      return this.extra;
    }
    return this.primary;
  };

  private handleMouseDown = (data: MouseDownData) : void => {
    data.event.preventDefault();

    const shift = this.countShift(data);
    const params = {
      element: data.element,
      isVertical: data.isVertical,
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

  private filterPart = (part: number): number => {
    if (part < 0) {
      return 0;
    }
    if (part > 1) {
      return 1;
    }
    return part;
  };

  private handleMouseMove = (data: MouseMoveData): void => {
    const part = this.countPart(data);
    const filteredPart = this.filterPart(part);
    if (data.element === this.primary) {
      this.notify({
        value: filteredPart, isCurrent: false, isExtra: false, isNearest: false,
      });
    }
    if (data.element === this.extra) {
      this.notify({
        value: filteredPart, isCurrent: false, isExtra: true, isNearest: false,
      });
    }
  };

  private handleMouseUp = () : void => {
    document.removeEventListener('mousemove', this.mouseMoveEvent);
    document.removeEventListener('mouseup', this.mouseUpEvent);
  };

  private countShift = (data: MouseDownData): number => {
    if (data.isVertical) {
      return (
        data.event.pageY - data.element.offsetTop - data.lineSide.bottom + data.lineSize.height
      );
    }
    return data.event.pageX - data.element.offsetLeft - data.lineSide.left;
  };

  private countPart = (data: MouseMoveData): number => {
    if (data.isVertical) {
      const halfThumbSize = data.element.offsetHeight / 2;
      const movingSpot = -(data.event.pageY - data.lineSide.bottom - data.shift + halfThumbSize);
      return movingSpot / data.lineSize.height;
    }
    const halfThumbSize = data.element.offsetWidth / 2;
    const usingSpot = data.event.pageX - data.lineSide.left - data.shift + halfThumbSize;
    return usingSpot / data.lineSize.width;
  };

  private changeElementPosition = (
    part: number, lineSize: Size, isVertical: boolean, element: HTMLElement,
  ): void => {
    if (isVertical) {
      const side = `${part * lineSize.height - element.offsetHeight / 2}px`;
      element.style.setProperty('bottom', `${side}`);
    } else {
      const side = `${part * lineSize.width - element.offsetWidth / 2}px`;
      element.style.setProperty('left', `${side}`);
    }
  };

  private countInitialParameter = (
    element: HTMLElement, lineSize: Size, isVertical: boolean,
  ): string => {
    if (isVertical) {
      return `${(lineSize.width - element.offsetWidth) / 2}px`;
    }
    return `${(lineSize.height - element.offsetHeight) / 2}px`;
  };
}

export default Thumb;
