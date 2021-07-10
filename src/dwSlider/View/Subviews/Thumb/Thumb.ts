import { Params } from '../../../../types';
import Subview from '../Subview';

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
    this.subscribeToAnEvent<{ element: HTMLElement, params: Params, event: MouseEvent }>('thumb: mouseDown', ({ element, params, event }) => this.handleMouseDown(element, params, event));

    this.subscribeToAnEvent<{ element: HTMLElement, params: Params, shift: number, event: MouseEvent }>('thumb: mouseMove', ({
      element, params, shift, event,
    }) => this.handleMouseMove({
      element, params, shift, event,
    }));

    this.subscribeToAnEvent<null>('thumb: mouseUp', () => this.handleMouseUp());
  };

  private getOrientationParams = (
    vertical: boolean,
    lineSize: { width: number, height: number },
    lineSide: { left: number, bottom: number },
  ): Params => {
    let params: Params = {
      pageName: 'pageX',
      sideName: 'offsetLeft',
      sizeName: 'offsetWidth',
      lineSize: lineSize.width,
      lineSide: lineSide.left,
    };
    if (vertical) {
      params = {
        pageName: 'pageY',
        sideName: 'offsetTop',
        sizeName: 'offsetHeight',
        lineSize: lineSize.height,
        lineSide: lineSide.bottom,
      };
    }
    return params;
  };

  public setEventListener = (
    lineSize: { width: number, height: number },
    lineSide: { left: number, bottom: number },
    vertical = false,
    extra = false,
  ): void => {
    let element = this.primary;

    if (extra) {
      element = this.extra;
    }
    const params = this.getOrientationParams(vertical, lineSize, lineSide);

    element.addEventListener('mousedown', (event) => this.emitEvent('thumb: mouseDown', { element, params, event }));
  };

  private handleMouseDown = (
    element: HTMLElement, params: Params, event: MouseEvent,
  ) : void => {
    event.preventDefault();

    const eventCoodinate = event[params.pageName] as number;
    let shift = eventCoodinate - (element[params.sideName] as number) - params.lineSide;

    if (params.pageName === 'pageY') {
      shift += params.lineSize;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.mouseMoveEvent = (event: MouseEvent) => this.emitEvent<{ element: HTMLElement, params: Params, shift: number, event: MouseEvent }>('thumb: mouseMove', {
      element, params, shift, event,
    });

    this.mouseUpEvent = () => this.emitEvent<null>('thumb: mouseUp', null);

    document.addEventListener('mousemove', this.mouseMoveEvent);
    document.addEventListener('mouseup', this.mouseUpEvent);
  };

  private handleMouseMove = (
    data: { element: HTMLElement, params: Params, shift: number, event: MouseEvent },
  ): void => {
    const eventCoordinate = data.event[data.params.pageName] as number;
    const { lineSide } = { lineSide: data.params.lineSide };
    const halfThumb = data.element[data.params.sizeName] as number;
    let part = (eventCoordinate - lineSide - data.shift + halfThumb) / data.params.lineSize;

    if (data.params.pageName === 'pageY') {
      part = -part;
    }

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

  private changeElementPosition = (
    element: HTMLElement,
    sideName: string,
    part: number,
    lineSize: number,
    elementSizeName: keyof HTMLElement,
  ): void => {
    const side = `${part * lineSize - (element[elementSizeName] as number) / 2}px`;
    element.style.setProperty(`${sideName}`, `${side}`);
  };

  public update = (
    part: number, lineSize: { width: number, height: number }, vertical: boolean, extra: boolean,
  ): void => {
    let element = this.primary;

    if (!vertical && extra) {
      element = this.extra;
    }

    let side = 'left';
    let elementSizeName = 'offsetWidth' as keyof HTMLElement;
    let lineParameter = lineSize.width;

    if (vertical && !extra) {
      side = 'bottom';
      elementSizeName = 'offsetHeight';
      lineParameter = lineSize.height;
    }
    if (vertical && extra) {
      element = this.extra;
      side = 'bottom';
      elementSizeName = 'offsetHeight';
      lineParameter = lineSize.height;
    }
    this.changeElementPosition(element, side, part, lineParameter, elementSizeName);
  };

  private countInitialParameter = (
    element: HTMLElement, lineSize: number, thumbSizeName: keyof HTMLElement,
  ): string => {
    const initParameter = `${(lineSize - (element[thumbSizeName] as number)) / 2}px`;
    return initParameter;
  };

  public setInitialSettings = (
    lineSize: { width: number, height: number }, vertical = false, extra = false,
  ): void => {
    let lineSizeParam = lineSize.height;
    let element = this.primary;
    let thumbSizeName = 'offsetHeight' as keyof HTMLElement;

    if (!vertical) {
      if (extra) {
        element = this.extra;
      }
      element.style.top = this.countInitialParameter(element, lineSizeParam, thumbSizeName);
    }

    if (vertical) {
      lineSizeParam = lineSize.width;
      thumbSizeName = 'offsetWidth';
      if (extra) {
        element = this.extra;
      }
      element.style.top = '';
      element.style.left = this.countInitialParameter(element, lineSizeParam, thumbSizeName);
    }
  };

  public returnSize = (): { width: number, height: number } => ({
    width: this.primary.offsetWidth,
    height: this.primary.offsetHeight,
  });
}

export default Thumb;
