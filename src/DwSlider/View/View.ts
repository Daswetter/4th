import { IOptions, ViewData } from '../../types';
import Wrapper from './Subviews/Wrapper/Wrapper';
import Line from './Subviews/Line/Line';
import Thumb from './Subviews/Thumb/Thumb';
import Progress from './Subviews/Progress/Progress';
import Scale from './Subviews/Scale/Scale';
import Tip from './Subviews/Tip/Tip';
import Input from './Subviews/Input/Input';
import BoundaryLabels from './Subviews/BoundaryLabels/BoundaryLabels';
import Publisher from '../Publisher';
import SubviewData from './View.types';

class View extends Publisher<ViewData> {
  public wrapper!: Wrapper;

  public line!: Line;

  public thumb!: Thumb;

  public progress!: Progress;

  public scale!: Scale;

  public tip!: Tip;

  public input!: Input;

  public boundaryLabels!: BoundaryLabels;

  public part!: number;

  public partExtra!: number;

  public current!: number;

  public currentExtra!: number;

  constructor(public initElement: HTMLElement, public options: IOptions) {
    super();
    this.options = options;
    this.initElement = initElement;
  }

  public update = (data: SubviewData): void => {
    if (data.isNearest) {
      this.changePositionForTheNearest(data.value);
    } else {
      this.notify({ value: data.value, isCurrent: data.isCurrent, isExtra: data.isExtra });
    }
  };

  public clearAllView = (): void => {
    this.wrapper.getWrapper().remove();
  };

  public sendDataToSubviews = (current: number, part: number, isExtra = false): void => {
    if (isExtra) {
      this.partExtra = part;
      this.currentExtra = current;
      this.options.to = current;
    } else {
      this.part = part;
      this.current = current;
      this.options.from = current;
    }

    this.thumb.update(part, this.line.getSize(), this.options.isVertical, isExtra);

    if (this.isInputExisting(isExtra)) {
      this.input.update(current, isExtra);
    }
    if (this.options.hasProgress) {
      this.progress.update(part, this.line.getSize(), this.options.isVertical, isExtra);
    }
    if (this.options.hasTip) {
      this.tip.update(
        part,
        current,
        this.line.getSize(),
        this.thumb.getSize(),
        this.options.isVertical,
        this.options.isDouble, isExtra,
      );

      if (this.options.isDouble) {
        this.boundaryLabels.update(
          this.tip.getPrimaryParameters(),
          this.options.isVertical,
          this.tip.getExtraParameters(),
        );
      } else {
        this.boundaryLabels.update(this.tip.getPrimaryParameters(), this.options.isVertical);
      }
    }
  };

  public initView = (scaleElements: Record<string, string>, options = this.options): void => {
    this.options = options;
    this.initWrapper(this.initElement);
    this.initLine(this.wrapper.getWrapper());
    this.initThumb(this.line.getLine());
    this.initBoundaryLabels(this.line.getLine());
    if (this.isInputExisting()) {
      this.initInput();
    }
    if (this.options.hasTip) {
      this.initTip(this.line.getLine());
    }
    if (this.options.hasProgress) {
      this.initProgress(this.line.getLine());
    }
    if (this.options.hasScale) {
      this.initScale(this.line.getLine(), scaleElements);
    }
    this.notify({ value: this.options.from, isCurrent: true, isExtra: false });
    if (this.options.isDouble) {
      this.notify({ value: this.options.to, isCurrent: true, isExtra: true });
    }
  };

  private initWrapper = (initElement: HTMLElement): void => {
    this.wrapper = new Wrapper(initElement);
    this.wrapper.subscribe(this.update);
    this.initElement.append(this.wrapper.getWrapper());
    this.wrapper.setInitialSettings(this.options.isVertical);
  };

  private initLine = (initElement: HTMLElement) : void => {
    this.line = new Line(initElement);
    this.line.subscribe(this.update);
    this.wrapper.getWrapper().append(this.line.getLine());
    this.line.setInitialSettings(this.options.isVertical);
    this.line.setEventListener(this.options.isVertical);
  };

  private initThumb = (initElement: HTMLElement) : void => {
    this.thumb = new Thumb(initElement);
    this.thumb.subscribe(this.update);
    this.thumb.setEventListener(
      this.line.getSize(),
      this.line.getSide(),
      this.options.isVertical,
    );
    this.thumb.setInitialSettings(this.line.getSize(), this.options.isVertical);

    if (this.options.isDouble) {
      this.thumb.initExtra(initElement);
      const isExtra = true;
      this.thumb.setEventListener(
        this.line.getSize(),
        this.line.getSide(),
        this.options.isVertical,
        isExtra,
      );
      this.thumb.setInitialSettings(this.line.getSize(), this.options.isVertical, isExtra);
    }
  };

  private initTip = (initElement: HTMLElement): void => {
    this.tip = new Tip(initElement);
    this.tip.subscribe(this.update);
    this.tip.setInitialSettings(
      this.line.getSize().width,
      this.thumb.getSize(),
      this.options.isVertical,
      this.options.min,
    );
    this.tip.setEventListener(
      this.line.getSize(),
      this.line.getSide(),
      this.options.isVertical,
      false,
    );

    if (this.options.isDouble) {
      this.tip.initExtra(initElement);
      this.tip.setInitialSettings(
        this.line.getSize().width,
        this.thumb.getSize(),
        this.options.isVertical,
        this.options.max,
        true,
      );
      this.tip.setEventListener(
        this.line.getSize(),
        this.line.getSide(),
        this.options.isVertical,
        true,
      );
      this.tip.setEventListenerForUnited(
        this.line.getSize(),
        this.line.getSide(),
        this.options.isVertical,
      );
    }
  };

  private initScale = (
    initElement: HTMLElement,
    scaleElements: Record<string, string>,
  ): void => {
    this.scale = new Scale(initElement);
    this.scale.subscribe(this.update);
    this.scale.initScale(scaleElements, this.line.getSize(), this.options.isVertical);
  };

  private initProgress = (initElement: HTMLElement): void => {
    this.progress = new Progress(initElement);
    this.progress.subscribe(this.update);
    this.progress.setInitialSettings(this.line.getSize(), this.options.isVertical);
  };

  private isInputExisting = (isExtra = false): boolean => {
    const inputClass = isExtra ? '.js-dw-slider__input_to' : '.js-dw-slider__input_from';
    const input: HTMLInputElement | null = this.initElement.querySelector(inputClass);
    return !!input;
  };

  private initInput = (): void => {
    this.input = new Input(this.initElement);
    this.input.subscribe(this.update);
    const isExtra = true;
    if (this.options.isDouble && this.isInputExisting(isExtra)) {
      this.input.initExtra(this.initElement);
    }
  };

  private initBoundaryLabels = (initElement: HTMLElement): void => {
    this.boundaryLabels = new BoundaryLabels(initElement);
    this.boundaryLabels.subscribe(this.update);
    this.boundaryLabels.setInitialSettings(
      this.options.min,
      this.options.max,
      this.line.getSize().width,
      this.thumb.getSize(),
      this.options.isVertical,
    );
  };

  private countDistance = (part: number, isExtra = false): number => {
    if (isExtra) {
      return Math.abs(this.partExtra - part);
    }
    return Math.abs(this.part - part);
  };

  private changePositionForTheNearest = (part: number): void => {
    const distFromActionToPrimary = this.countDistance(part);
    const isExtra = true;
    const distFromActionToExtra = this.countDistance(part, isExtra);
    if (distFromActionToPrimary > distFromActionToExtra) {
      this.notify({ value: part, isCurrent: false, isExtra: true });
    } else {
      this.notify({ value: part, isCurrent: false, isExtra: false });
    }
  };
}

export default View;
