import { Params } from '../../../../types';
import Subview from '../Subview';

class Tip extends Subview {
  public primary!: HTMLElement;

  public extra!: HTMLElement;

  public united!: HTMLElement;

  private current!: number;

  private currentExtra!: number;

  private mouseMove!: (event: MouseEvent) => void;

  private mouseUp!: () => void;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);
    this.united = this.initUnited();

    this.subscribeToEvents();
  }

  private subscribeToEvents = (): void => {
    this.subscribeToAnEvent<{ element: HTMLElement, params: Params, event: MouseEvent }>('tip: mouseDown', ({ element, params, event }) => this.handleMouseDown(element, params, event));

    this.subscribeToAnEvent<{ event: MouseEvent, lineSize: { width: number, height: number }, lineSide: { left: number, bottom: number }, vertical: boolean }>('unitedTip: mouseDown', ({
      event, lineSize, lineSide, vertical,
    }) => this.handleMouseDownForUnited(event, lineSize, lineSide, vertical));

    this.subscribeToAnEvent<{ element: HTMLElement, params: Params, shift: number, event: MouseEvent }>('tip: mouseMove', ({
      element, params, shift, event,
    }) => this.handleMouseMove({
      element, params, shift, event,
    }));

    this.subscribeToAnEvent<null>('tip: mouseUp', () => this.handleMouseUp());
  };

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = this.init(initElement, this.primary, '__tip');
  };

  public initExtra = (initElement: HTMLElement): void => {
    this.extra = this.init(initElement, this.extra, '__tip');
  };

  private printInnerText = (tip: HTMLElement, current: number | string): void => {
    const element = tip;
    element.innerText = String(current);
  };

  private setRightToVertical = (
    tip: HTMLElement, lineWidth: number, thumbWidth: number,
  ): void => {
    const element = tip;
    element.style.right = `${lineWidth + thumbWidth / 3}px`;
  };

  private setTopToHorizontal = (tip: HTMLElement, thumbHeight: number): void => {
    const element = tip;
    element.style.top = `${-element.offsetHeight - thumbHeight / 2}px`;
  };

  public setInitialSettings = (
    lineWidth: number,
    thumbSize: { width: number, height: number },
    vertical: boolean,
    value: number,
    extra = false,
  ): void => {
    let element: HTMLElement;

    if (extra) {
      element = this.extra;
    } else {
      element = this.primary;
    }
    this.printInnerText(element, value);
    if (vertical) {
      this.setRightToVertical(element, lineWidth, thumbSize.width);
    } else {
      this.setTopToHorizontal(element, thumbSize.height);
    }
  };

  public setEventListener = (
    lineSize: { width: number, height: number },
    lineSide: { left: number, bottom: number },
    vertical: boolean,
    extra: boolean,
  ): void => {
    let element = this.primary;

    if (extra) {
      element = this.extra;
    }
    const params = this.getOrientationParams(vertical, lineSize, lineSide);
    element.addEventListener('mousedown', (event) => this.emitEvent('tip: mouseDown', { element, params, event }));
  };

  public setEventListenerForUnited = (
    lineSize: { width: number, height: number },
    lineSide: { left: number, bottom: number },
    vertical: boolean,
  ): void => {
    this.united.addEventListener('mousedown', (event) => this.emitEvent('unitedTip: mouseDown', {
      event, lineSize, lineSide, vertical,
    }));
  };

  private handleMouseDownForUnited = (
    event: MouseEvent,
    lineSize: { width: number, height: number },
    lineSide: { left: number, bottom: number },
    vertical: boolean,
  ): void => {
    const params = this.getOrientationParams(vertical, lineSize, lineSide);
    let element = this.primary;
    let isExtra;
    let unitedMiddle;
    if (vertical) {
      const halfUnited = this.united.offsetHeight / 2;
      unitedMiddle = this.united.offsetTop + lineSide.bottom - lineSize.height + halfUnited;
      const primaryIsHigher = this.primary.offsetTop < this.extra.offsetTop;
      const eventIsCloserToExtraBelowTheMiddle = event.pageY > unitedMiddle && primaryIsHigher;

      const extraIsHigher = this.primary.offsetTop >= this.extra.offsetTop;
      const eventIsCloserToExtraAboveTheMiddle = event.pageY <= unitedMiddle && extraIsHigher;

      isExtra = eventIsCloserToExtraBelowTheMiddle || eventIsCloserToExtraAboveTheMiddle;
    } else {
      unitedMiddle = this.united.offsetLeft + lineSide.left + this.united.offsetWidth / 2;
      const extraIsMoreToTheRight = this.primary.offsetLeft < this.extra.offsetLeft;
      const eventIsCloserToExtraOnTheRight = event.pageX > unitedMiddle && extraIsMoreToTheRight;

      const primaryIsMoreToTheRight = this.primary.offsetLeft >= this.extra.offsetLeft;
      const eventIsCloserToExtraOnTheLeft = event.pageX <= unitedMiddle && primaryIsMoreToTheRight;
      isExtra = eventIsCloserToExtraOnTheRight || eventIsCloserToExtraOnTheLeft;
    }
    if (isExtra) {
      element = this.extra;
    }

    this.handleMouseDown(element, params, event);
  };

  private handleMouseDown = (
    element: HTMLElement, params: Params, event: MouseEvent,
  ) : void => {
    event.preventDefault();

    const eventCoodinate = (event[params.pageName] as number);
    let shift = eventCoodinate - (element[params.sideName] as number) - params.lineSide;

    if (params.pageName === 'pageY') {
      shift += params.lineSize;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.mouseMove = (event: MouseEvent) => this.emitEvent<{ element: HTMLElement, params: Params, shift: number, event: MouseEvent }>('tip: mouseMove', {
      element, params, shift, event,
    });

    this.mouseUp = () => this.emitEvent<null>('tip: mouseUp', null);

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  private handleMouseMove = (
    data: { element: HTMLElement, params: Params, shift: number, event: MouseEvent },
  ): void => {
    const eventCoodinate = data.event[data.params.pageName] as number;
    const tipSize = (data.element[data.params.sizeName] as number);
    const { lineSide } = { lineSide: data.params.lineSide };
    let part = (eventCoodinate - lineSide - data.shift + tipSize / 2) / data.params.lineSize;

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
    } else {
      this.notify({
        value: part, current: false, extra: true, nearest: false,
      });
    }
  };

  private handleMouseUp = () : void => {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
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

  private setPosition = (
    tip: HTMLElement,
    part: number,
    lineSize: { width: number, height: number },
    vertical: boolean,
  ): void => {
    const element = tip;
    if (vertical) {
      element.style.top = `${lineSize.height - part * lineSize.height - element.offsetHeight / 2}px`;
    } else {
      element.style.left = `${Math.round(part * lineSize.width - element.offsetWidth / 2)}px`;
    }
  };

  private initUnited = (): HTMLElement => {
    const element = document.createElement('div');
    element.classList.add('DwSlider__tip');
    this.primary.after(element);
    element.style.zIndex = '3';
    element.style.display = 'none';
    return element;
  };

  private joinTips = (lineWidth: number, thumbWidth: number, vertical: boolean): void => {
    this.defineContent(vertical);

    this.setPositionToUnited(lineWidth, thumbWidth, vertical);

    if (!vertical) {
      const lineEdge = this.united.offsetLeft + this.united.offsetWidth >= lineWidth;

      if (lineEdge) {
        this.united.style.left = '';
        this.united.style.right = `${-this.primary.offsetWidth / 2}px`;
      } else {
        this.setPositionToUnited(lineWidth, thumbWidth, vertical);
      }
    }
    this.switchElements(vertical);
  };

  private defineContent = (vertical: boolean): void => {
    if (this.current === this.currentExtra) {
      this.printInnerText(this.united, this.current);
    } else if (vertical) {
      this.united.style.textAlign = 'center';
      this.printInnerText(this.united, `${Math.max(this.current, this.currentExtra)} — ${Math.min(this.current, this.currentExtra)}`);
    } else {
      this.printInnerText(this.united, `${Math.min(this.current, this.currentExtra)} — ${Math.max(this.current, this.currentExtra)}`);
    }
  };

  private switchElements = (vertical: boolean) => {
    const extraRight = this.extra.offsetLeft + this.extra.offsetWidth;
    const primaryRight = this.primary.offsetLeft + this.primary.offsetWidth;
    let isTogether = this.primary.offsetLeft <= extraRight && primaryRight >= this.extra.offsetLeft;

    if (vertical) {
      const extraBottom = this.extra.offsetTop + this.extra.offsetHeight;
      const primaryBottom = this.primary.offsetTop + this.primary.offsetHeight;
      isTogether = this.primary.offsetTop <= extraBottom && primaryBottom >= this.extra.offsetTop;
    }
    this.switchOpacity(isTogether);
  };

  private setPositionToUnited = (
    lineWidth: number, thumbWidth: number, vertical: boolean,
  ): void => {
    if (vertical) {
      this.united.style.right = `${lineWidth + thumbWidth / 3}px`;
      this.united.style.width = `${Math.min(this.primary.offsetWidth, this.extra.offsetWidth)}px`;
      this.united.style.top = `${Math.min(this.primary.offsetTop, this.extra.offsetTop)}px`;
    } else {
      this.united.style.top = `${this.primary.offsetTop}px`;
      this.united.style.left = `${Math.min(this.primary.offsetLeft, this.extra.offsetLeft)}px`;
      this.united.style.right = '';
    }
  };

  private switchOpacity = (unitedIsOn: boolean): void => {
    let displayProperty = 'none';
    let opacity = '1';
    if (unitedIsOn) {
      displayProperty = 'block';
      opacity = '0';
    }
    this.united.style.display = displayProperty;
    this.primary.style.opacity = opacity;
    this.extra.style.opacity = opacity;
  };

  public update = (
    part: number,
    current: number,
    lineSize: { width: number, height: number },
    thumbSize: { width: number, height: number },
    vertical: boolean,
    double: boolean,
    extra: boolean,
  ): void => {
    let element = this.primary;

    if (extra) {
      element = this.extra;
      this.currentExtra = current;
    } else {
      this.current = current;
    }

    this.printInnerText(element, current);
    this.setPosition(element, part, lineSize, vertical);

    if (double) {
      this.joinTips(lineSize.width, thumbSize.width, vertical);
    }
  };

  public returnPrimaryParameters = (): {
    width: number, height: number, left: number, top: number
  } => ({
    width: this.primary.offsetWidth,
    height: this.primary.offsetHeight,
    left: this.primary.offsetLeft,
    top: this.primary.offsetTop,
  });

  public returnExtraParameters = (): {
    width: number, height: number, left: number, top: number
  } => ({
    width: this.extra.offsetWidth,
    height: this.extra.offsetHeight,
    left: this.extra.offsetLeft,
    top: this.extra.offsetTop,
  });
}

export default Tip;
