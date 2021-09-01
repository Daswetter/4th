import Subview from '../Subview';
import {
  MouseDownData, MouseMoveData, PositionParams, Side, Size,
} from '../Subview.types';
import UnitedTipDownEvent from './Tip.types';

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

  public initExtra = (initElement: HTMLElement): void => {
    this.extra = this.init(initElement, '__tip');
  };

  public setInitialSettings = (
    lineWidth: number,
    thumbSize: Size,
    vertical: boolean,
    value: number,
    extra = false,
  ): void => {
    const element = this.setElement(extra);
    this.printInnerText(element, value);
    if (vertical) {
      this.setRightToVertical(element, lineWidth, thumbSize.width);
    } else {
      this.setTopToHorizontal(element, thumbSize.height);
    }
  };

  public setEventListener = (
    lineSize: Size,
    lineSide: Side,
    vertical: boolean,
    extra: boolean,
  ): void => {
    const element = this.setElement(extra);
    element.addEventListener('mousedown', (event) => this.emitEvent('tip: mouseDown', {
      element, vertical, lineSize, lineSide, event,
    }));
  };

  public setEventListenerForUnited = (lineSize: Size, lineSide: Side, vertical: boolean): void => {
    this.united.addEventListener('mousedown', (event) => this.emitEvent('unitedTip: mouseDown', {
      event, lineSize, lineSide, vertical,
    }));
  };

  public update = (
    part: number,
    current: number,
    lineSize: Size,
    thumbSize: Size,
    vertical: boolean,
    double: boolean,
    extra: boolean,
  ): void => {
    if (extra) {
      this.currentExtra = current;
    } else {
      this.current = current;
    }
    const element = this.setElement(extra);
    this.printInnerText(element, current);
    this.setPosition(element, part, lineSize, vertical);

    if (double) {
      this.joinTips(lineSize.width, thumbSize.width, vertical);
    }
  };

  public returnPrimaryParameters = (): PositionParams => ({
    width: this.primary.offsetWidth,
    height: this.primary.offsetHeight,
    left: this.primary.offsetLeft,
    top: this.primary.offsetTop,
  });

  public returnExtraParameters = (): PositionParams => ({
    width: this.extra.offsetWidth,
    height: this.extra.offsetHeight,
    left: this.extra.offsetLeft,
    top: this.extra.offsetTop,
  });

  private subscribeToEvents = (): void => {
    this.subscribeToAnEvent<MouseDownData>('tip: mouseDown', ({
      element, vertical, lineSize, lineSide, event,
    }) => this.handleMouseDown({
      element, vertical, lineSize, lineSide, event,
    }));

    this.subscribeToAnEvent<UnitedTipDownEvent>('unitedTip: mouseDown', ({
      event, lineSize, lineSide, vertical,
    }) => this.handleMouseDownForUnited(event, lineSize, lineSide, vertical));

    this.subscribeToAnEvent<MouseMoveData>('tip: mouseMove', ({
      element, vertical, lineSize, lineSide, shift, event,
    }) => this.handleMouseMove({
      element, vertical, lineSize, lineSide, shift, event,
    }));

    this.subscribeToAnEvent<null>('tip: mouseUp', () => this.handleMouseUp());
  };

  private initPrimary = (initElement: HTMLElement): void => {
    this.primary = this.init(initElement, '__tip');
  };

  private printInnerText = (element: HTMLElement, current: number | string): void => {
    element.innerText = String(current);
  };

  private setRightToVertical = (
    element: HTMLElement, lineWidth: number, thumbWidth: number,
  ): void => {
    element.style.right = `${lineWidth + thumbWidth / 3}px`;
  };

  private setTopToHorizontal = (element: HTMLElement, thumbHeight: number): void => {
    element.style.top = `${-element.offsetHeight - thumbHeight / 2}px`;
  };

  private setElement = (extra: boolean): HTMLElement => {
    if (extra) {
      return this.extra;
    }
    return this.primary;
  };

  private wasExtraMoved = (
    event: MouseEvent,
    lineSize: Size,
    lineSide: Side,
    vertical: boolean,
  ): boolean => {
    if (vertical) {
      const halfUnited = this.united.offsetHeight / 2;
      const unitedMiddle = this.united.offsetTop + lineSide.bottom - lineSize.height + halfUnited;
      const primaryIsHigher = this.primary.offsetTop < this.extra.offsetTop;
      const eventIsCloserToExtraBelowTheMiddle = event.pageY > unitedMiddle && primaryIsHigher;

      const extraIsHigher = this.primary.offsetTop >= this.extra.offsetTop;
      const eventIsCloserToExtraAboveTheMiddle = event.pageY <= unitedMiddle && extraIsHigher;

      return eventIsCloserToExtraBelowTheMiddle || eventIsCloserToExtraAboveTheMiddle;
    }
    const unitedMiddle = this.united.offsetLeft + lineSide.left + this.united.offsetWidth / 2;
    const extraIsMoreToTheRight = this.primary.offsetLeft < this.extra.offsetLeft;
    const eventIsCloserToExtraOnTheRight = event.pageX > unitedMiddle && extraIsMoreToTheRight;

    const primaryIsMoreToTheRight = this.primary.offsetLeft >= this.extra.offsetLeft;
    const eventIsCloserToExtraOnTheLeft = event.pageX <= unitedMiddle && primaryIsMoreToTheRight;
    return eventIsCloserToExtraOnTheRight || eventIsCloserToExtraOnTheLeft;
  };

  private handleMouseDownForUnited = (
    event: MouseEvent,
    lineSize: Size,
    lineSide: Side,
    vertical: boolean,
  ): void => {
    const isExtra = this.wasExtraMoved(event, lineSize, lineSide, vertical);
    const element = this.setElement(isExtra);
    this.handleMouseDown({
      element, vertical, lineSize, lineSide, event,
    });
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
    this.mouseMove = (event: MouseEvent) => this.emitEvent<MouseMoveData>('tip: mouseMove', {
      ...params, shift, event,
    });

    this.mouseUp = () => this.emitEvent<null>('tip: mouseUp', null);

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
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
        value: filteredPart, current: false, extra: false, nearest: false,
      });
    } else {
      this.notify({
        value: filteredPart, current: false, extra: true, nearest: false,
      });
    }
  };

  private handleMouseUp = () : void => {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
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
    if (data.vertical) {
      const halfTipSize = data.element.offsetHeight / 2;
      const usingSpot = -(data.event.pageY - data.lineSide.bottom - data.shift + halfTipSize);
      return usingSpot / data.lineSize.height;
    }
    const halfTipSize = data.element.offsetWidth / 2;
    return (data.event.pageX - data.lineSide.left - data.shift + halfTipSize) / data.lineSize.width;
  };

  private setPosition = (
    element: HTMLElement,
    part: number,
    lineSize: Size,
    vertical: boolean,
  ): void => {
    if (vertical) {
      element.style.top = `${lineSize.height - part * lineSize.height - element.offsetHeight / 2}px`;
    } else {
      element.style.left = `${Math.round(part * lineSize.width - element.offsetWidth / 2)}px`;
    }
  };

  private initUnited = (): HTMLElement => {
    const element = document.createElement('div');
    element.classList.add('dw-slider__tip');
    this.primary.after(element);
    element.style.zIndex = '3';
    element.style.display = 'none';
    return element;
  };

  private joinTips = (lineWidth: number, thumbWidth: number, vertical: boolean): void => {
    this.defineContent(vertical);
    this.setPositionToUnited(lineWidth, thumbWidth, vertical);

    if (!vertical) {
      const unitedRight = this.united.offsetLeft + this.united.offsetWidth;
      const lineEdge = unitedRight >= lineWidth;
      const primaryRight = this.primary.offsetLeft + this.primary.offsetWidth;
      const extraRight = this.extra.offsetLeft + this.extra.offsetWidth;
      if (lineEdge || Math.max(primaryRight, extraRight) >= lineWidth) {
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
      this.printInnerText(this.united, `${Math.min(this.current, this.currentExtra)}\xa0—\xa0${Math.max(this.current, this.currentExtra)}`);
    }
  };

  private doTipsTouchEachOther = (vertical: boolean): boolean => {
    if (vertical) {
      const extraBottom = this.extra.offsetTop + this.extra.offsetHeight;
      const primaryBottom = this.primary.offsetTop + this.primary.offsetHeight;
      return this.primary.offsetTop <= extraBottom && primaryBottom >= this.extra.offsetTop;
    }

    const extraRight = this.extra.offsetLeft + this.extra.offsetWidth;
    const primaryRight = this.primary.offsetLeft + this.primary.offsetWidth;
    return this.primary.offsetLeft <= extraRight && primaryRight >= this.extra.offsetLeft;
  };

  private switchElements = (vertical: boolean) => {
    const isTogether = this.doTipsTouchEachOther(vertical);
    this.switchOpacity(isTogether);
  };

  private setPositionToUnited = (
    lineWidth: number, thumbWidth: number, vertical: boolean,
  ): void => {
    if (vertical) {
      this.united.style.right = `${lineWidth + thumbWidth / 3}px`;
      this.united.style.width = `${Math.max(this.primary.offsetWidth, this.extra.offsetWidth)}px`;
      this.united.style.top = `${Math.min(this.primary.offsetTop, this.extra.offsetTop)}px`;
    } else {
      this.united.style.top = `${this.primary.offsetTop}px`;
      this.united.style.left = `${Math.min(this.primary.offsetLeft, this.extra.offsetLeft)}px`;
      this.united.style.right = '';
    }
  };

  private setDisplayProperty = (unitedIsOn: boolean): string => {
    if (unitedIsOn) {
      return 'block';
    }
    return 'none';
  };

  private setOpacity = (unitedIsOn: boolean): string => {
    if (unitedIsOn) {
      return '0';
    }
    return '1';
  };

  private switchOpacity = (unitedIsOn: boolean): void => {
    this.united.style.display = this.setDisplayProperty(unitedIsOn);
    this.primary.style.opacity = this.setOpacity(unitedIsOn);
    this.extra.style.opacity = this.setOpacity(unitedIsOn);
  };
}

export default Tip;
