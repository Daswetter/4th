import Subview from '../Subview';
import { Side, Size } from '../Subview.types';
import { LineEvent } from './Line.types';

class Line extends Subview {
  public line!: HTMLElement;

  private mouseDownValue!: number;

  private mouseUpValue!: number;

  constructor(public initElement: HTMLElement) {
    super();
    this.initPrimary(initElement);

    this.subscribeToEvents();
  }

  private initPrimary = (initElement: HTMLElement): void => {
    this.line = this.init(initElement, '__line');
    this.line.classList.add('dw-slider__line_horizontal');
  };

  public returnAsHTML = (): HTMLElement => this.line;

  private subscribeToEvents = (): void => {
    this.subscribeToAnEvent<LineEvent>('line: clicked', ({ vertical, event }) => this.handleClick(vertical, event));

    this.subscribeToAnEvent<LineEvent>('line: mouseDown', ({ vertical, event }) => this.handleMouseDown(vertical, event));

    this.subscribeToAnEvent<LineEvent>('line: mouseUp', ({ vertical, event }) => this.handleMouseUp(vertical, event));
  };

  private handleMouseDown = (vertical: boolean, event: MouseEvent): void => {
    if (vertical) {
      this.mouseDownValue = event.clientY;
    } else {
      this.mouseDownValue = event.clientX;
    }
  };

  private handleMouseUp = (vertical: boolean, event: MouseEvent): void => {
    if (vertical) {
      this.mouseUpValue = event.clientY;
    } else {
      this.mouseUpValue = event.clientX;
    }
  };

  public setEventListener = (vertical: boolean): void => {
    this.line.addEventListener('mousedown', (event) => this.emitEvent('line: mouseDown', { vertical, event }));
    this.line.addEventListener('mouseup', (event) => this.emitEvent('line: mouseUp', { vertical, event }));
    this.line.addEventListener('click', (event) => this.emitEvent('line: clicked', { vertical, event }));
  };

  public returnSize = (): Size => ({
    width: this.line.offsetWidth,
    height: this.line.offsetHeight,
  });

  public returnSide = (): Side => ({
    left: this.line.offsetLeft,
    bottom: this.line.offsetTop + this.line.offsetHeight,
  });

  public setInitialSettings = (vertical: boolean): void => {
    if (vertical) {
      this.line.classList.add('dw-slider__line_vertical');
    } else {
      this.line.classList.add('dw-slider__line_horizontal');
    }
  };

  private handleClick = (vertical: boolean, event: MouseEvent) : void => {
    if (this.mouseDownValue === this.mouseUpValue) {
      if (vertical) {
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
        value: filteredPart, current: false, extra: false, nearest: true,
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
        value: filteredPart, current: false, extra: false, nearest: true,
      });
    }
  };
}

export default Line;
