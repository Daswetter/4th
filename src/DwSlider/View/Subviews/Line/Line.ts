import Subview from '../Subview';
import { Side, Size } from '../Subview.types';
import LineEvent from './Line.types';

class Line extends Subview {
  public line!: HTMLElement;

  private mouseDownValue!: number;

  private mouseUpValue!: number;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);

    this.subscribeToEvents();
  }

  public getLine = (): HTMLElement => this.line;

  public setEventListener = (isVertical: boolean): void => {
    this.line.addEventListener('mousedown', (event) => this.emitEvent('line: mouseDown', { isVertical, event }));
    this.line.addEventListener('mouseup', (event) => this.emitEvent('line: mouseUp', { isVertical, event }));
    this.line.addEventListener('click', (event) => this.emitEvent('line: clicked', { isVertical, event }));
  };

  public getSize = (): Size => ({
    width: this.line.offsetWidth,
    height: this.line.offsetHeight,
  });

  public getSide = (): Side => ({
    left: this.line.offsetLeft,
    bottom: this.line.offsetTop + this.line.offsetHeight,
  });

  public setInitialSettings = (isVertical: boolean): void => {
    if (isVertical) {
      this.line.classList.add('dw-slider__line_vertical');
    } else {
      this.line.classList.add('dw-slider__line_horizontal');
    }
  };

  private initPrimary = (initElement: HTMLElement): void => {
    this.line = this.init(initElement, '__line');
    this.line.classList.add('dw-slider__line_horizontal');
  };

  private subscribeToEvents = (): void => {
    this.subscribeToAnEvent<LineEvent>('line: clicked', ({ isVertical, event }) => this.handleClick(isVertical, event));

    this.subscribeToAnEvent<LineEvent>('line: mouseDown', ({ isVertical, event }) => this.handleMouseDown(isVertical, event));

    this.subscribeToAnEvent<LineEvent>('line: mouseUp', ({ isVertical, event }) => this.handleMouseUp(isVertical, event));
  };

  private handleMouseDown = (isVertical: boolean, event: MouseEvent): void => {
    if (isVertical) {
      this.mouseDownValue = event.clientY;
    } else {
      this.mouseDownValue = event.clientX;
    }
  };

  private handleMouseUp = (isVertical: boolean, event: MouseEvent): void => {
    if (isVertical) {
      this.mouseUpValue = event.clientY;
    } else {
      this.mouseUpValue = event.clientX;
    }
  };

  private handleClick = (isVertical: boolean, event: MouseEvent) : void => {
    if (this.mouseDownValue === this.mouseUpValue) {
      if (isVertical) {
        this.onClickVertical.call(null, event);
      } else {
        this.onClickHorizontal.call(null, event);
      }
    }
  };

  private filterPart = (part: number, distFromBeginToClick: number, size: number): number => {
    if (distFromBeginToClick < 0) {
      return 0;
    }
    if (distFromBeginToClick > size) {
      return 1;
    }
    return part;
  };

  private onClickHorizontal = (event: MouseEvent) : void => {
    const distFromBeginToClick = event.clientX - this.line.getBoundingClientRect().left;
    const part = distFromBeginToClick / this.line.offsetWidth;
    const filteredPart = this.filterPart(part, distFromBeginToClick, this.line.offsetWidth);

    const belowLineTop = event.pageY <= this.line.offsetTop + this.line.offsetHeight;
    const aboveLineBottom = event.pageY >= this.line.offsetTop;
    const isOnlyLineClicked = belowLineTop && aboveLineBottom;

    if (isOnlyLineClicked) {
      this.notify({
        value: filteredPart, isCurrent: false, isExtra: false, isNearest: true,
      });
    }
  };

  private onClickVertical = (event: MouseEvent) : void => {
    const distFromBeginToClick = -event.clientY + this.line.getBoundingClientRect().bottom;
    const part = distFromBeginToClick / this.line.offsetHeight;
    const filteredPart = this.filterPart(part, distFromBeginToClick, this.line.offsetHeight);

    const toTheLeftOfTheLineRight = event.pageX <= this.line.offsetLeft + this.line.offsetWidth;
    const toTheRightOfTheLineLeft = event.pageX >= this.line.offsetLeft;
    const isOnlyLineClicked = toTheLeftOfTheLineRight && toTheRightOfTheLineLeft;

    if (isOnlyLineClicked) {
      this.notify({
        value: filteredPart, isCurrent: false, isExtra: false, isNearest: true,
      });
    }
  };
}

export default Line;
