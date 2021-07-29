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
import { SubviewData } from './View.types';

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

  public initView = (scaleElements: Record<string, string>, options = this.options): void => {
    this.options = options;
    this.initWrapper(this.initElement);
    this.initLine(this.wrapper.returnAsHTML());
    this.initThumb(this.line.returnAsHTML());
    this.initBoundaryLabels(this.line.returnAsHTML());
    if (this.doesInputExist()) {
      this.initInput();
    }
    if (this.options.tip) {
      this.initTip(this.line.returnAsHTML());
    }
    if (this.options.progress) {
      this.initProgress(this.line.returnAsHTML());
    }
    if (this.options.scale) {
      this.initScale(this.line.returnAsHTML(), scaleElements);
    }
    this.notify({ value: this.options.from, current: true, extra: false });
    if (this.options.double) {
      this.notify({ value: this.options.to, current: true, extra: true });
    }
  };

  private initWrapper = (initElement: HTMLElement): void => {
    this.wrapper = new Wrapper(initElement);
    this.wrapper.subscribe(this.update);
    this.initElement.append(this.wrapper.returnAsHTML());
    this.wrapper.setInitialSettings(this.options.vertical);
  };

  private initLine = (initElement: HTMLElement) : void => {
    this.line = new Line(initElement);
    this.line.subscribe(this.update);
    this.wrapper.returnAsHTML().append(this.line.returnAsHTML());
    this.line.setInitialSettings(this.options.vertical);
    this.line.setEventListener(this.options.vertical);
  };

  private initThumb = (initElement: HTMLElement) : void => {
    this.thumb = new Thumb(initElement);
    this.thumb.subscribe(this.update);
    this.thumb.setEventListener(
      this.line.returnSize(),
      this.line.returnSide(),
      this.options.vertical,
    );
    this.thumb.setInitialSettings(this.line.returnSize(), this.options.vertical);

    if (this.options.double) {
      this.thumb.initExtra(initElement);
      const extra = true;
      this.thumb.setEventListener(
        this.line.returnSize(),
        this.line.returnSide(),
        this.options.vertical,
        extra,
      );
      this.thumb.setInitialSettings(this.line.returnSize(), this.options.vertical, extra);
    }
  };

  private initTip = (initElement: HTMLElement): void => {
    this.tip = new Tip(initElement);
    this.tip.subscribe(this.update);
    this.tip.setInitialSettings(
      this.line.returnSize().width,
      this.thumb.returnSize(),
      this.options.vertical,
      this.options.min,
    );

    let extra = false;
    this.tip.setEventListener(
      this.line.returnSize(),
      this.line.returnSide(),
      this.options.vertical,
      extra,
    );

    if (this.options.double) {
      this.tip.initExtra(initElement);
      extra = true;
      this.tip.setInitialSettings(
        this.line.returnSize().width,
        this.thumb.returnSize(),
        this.options.vertical,
        this.options.max,
        extra,
      );
      this.tip.setEventListener(
        this.line.returnSize(),
        this.line.returnSide(),
        this.options.vertical,
        extra,
      );
      this.tip.setEventListenerForUnited(
        this.line.returnSize(),
        this.line.returnSide(),
        this.options.vertical,
      );
    }
  };

  private initScale = (
    initElement: HTMLElement,
    scaleElements: Record<string, string>,
  ): void => {
    this.scale = new Scale(initElement);
    this.scale.subscribe(this.update);
    this.scale.initScale(scaleElements, this.line.returnSize(), this.options.vertical);
  };

  private initProgress = (initElement: HTMLElement): void => {
    this.progress = new Progress(initElement);
    this.progress.subscribe(this.update);
    this.progress.setInitialSettings(this.line.returnSize(), this.options.vertical);
  };

  private doesInputExist = (extra = false): boolean => {
    let inputClass = '.js-dw-slider__input_from';
    if (extra) {
      inputClass = '.js-dw-slider__input_to';
    }
    const input: HTMLInputElement | null = this.initElement.querySelector(inputClass);
    if (input) {
      return true;
    }
    return false;
  };

  private initInput = (): void => {
    this.input = new Input(this.initElement);
    this.input.subscribe(this.update);
    const extra = true;
    if (this.options.double && this.doesInputExist(extra)) {
      this.input.initExtra(this.initElement);
    }
  };

  private initBoundaryLabels = (initElement: HTMLElement): void => {
    this.boundaryLabels = new BoundaryLabels(initElement);
    this.boundaryLabels.subscribe(this.update);
    this.boundaryLabels.setInitialSettings(
      this.options.min,
      this.options.max,
      this.line.returnSize().width,
      this.thumb.returnSize(),
      this.options.vertical,
    );
  };

  public clearAllView = (): void => {
    this.wrapper.returnAsHTML().remove();
  };

  public sendDataToSubviews = (current: number, part: number, extra = false): void => {
    if (extra) {
      this.partExtra = part;
      this.currentExtra = current;
      this.options.to = current;
    } else {
      this.part = part;
      this.current = current;
      this.options.from = current;
    }

    this.thumb.update(part, this.line.returnSize(), this.options.vertical, extra);

    const doesExtraInputExist = extra && this.doesInputExist(extra);
    const doesPrimaryInputExist = !extra && this.doesInputExist();

    const anyOfInputsExist = doesExtraInputExist || doesPrimaryInputExist;
    if (anyOfInputsExist) {
      this.input.update(current, extra);
    }
    if (this.options.progress) {
      this.progress.update(part, this.line.returnSize(), this.options.vertical, extra);
    }
    if (this.options.tip) {
      this.tip.update(
        part,
        current,
        this.line.returnSize(),
        this.thumb.returnSize(),
        this.options.vertical,
        this.options.double, extra,
      );

      if (this.options.double) {
        this.boundaryLabels.update(
          this.tip.returnPrimaryParameters(),
          this.options.vertical,
          this.tip.returnExtraParameters(),
        );
      } else {
        this.boundaryLabels.update(this.tip.returnPrimaryParameters(), this.options.vertical);
      }
    }
  };

  private countDistance = (part: number, extra = false): number => {
    let currentPart = this.part;
    if (extra) {
      currentPart = this.partExtra;
    }
    const dist = Math.abs(currentPart - part);
    return dist;
  };

  private changePositionForTheNearest = (part: number): void => {
    const distFromActionToPrimary = this.countDistance(part);
    const extra = true;
    const distFromActionToExtra = this.countDistance(part, extra);
    if (distFromActionToPrimary > distFromActionToExtra) {
      this.notify({ value: part, current: false, extra: true });
    } else {
      this.notify({ value: part, current: false, extra: false });
    }
  };

  public update = (data: SubviewData): void => {
    if (data.nearest) {
      this.changePositionForTheNearest(data.value);
    } else {
      this.notify({ value: data.value, current: data.current, extra: data.extra });
    }
  };
}

export default View;
