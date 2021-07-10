interface IdwSlider {
  update(updatedOptions?: ReducedIOptions): void,
  returnCurrentOptions(): IOptions
  returnCurrentState(): Array<number>
}

abstract class Subview {
  private observers: Observer[] = [];

  protected events: IEvent<any> = {};

  protected init = (
    initElement: HTMLElement,
    element: HTMLElement,
    styleName: string,
  ): HTMLElement => {
    let modifiedElement = element;
    modifiedElement = document.createElement('div');
    modifiedElement.classList.add(`dwSlider${styleName}`);
    initElement.append(modifiedElement);
    return modifiedElement;
  };

  protected emitEvent<T>(eventName: string, data: T): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  protected subscribeToAnEvent<T>(eventName: keyof IEvent<T>, fn: (data: T) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public notify(data: { value: number, current: boolean, extra: boolean, nearest: boolean }): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

abstract class Publisher {
  private observers: Observer[] = [];

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  };

  public notify(data: any, event: string): void {
    for (const observer of this.observers) {
      observer.update({data, event});
    }
  }
}

interface Observer {
  update(arg0: any): void;
}

interface IOptions {
  min: number,
  max: number,
  from: number,
  to?: number,
  step: number,
  vertical: boolean,
  double: boolean,
  tip: boolean,
  scale: boolean,
  scaleSize: number
  progress: boolean,
}

interface ReducedIOptions {
  min?: number,
  max?: number,
  from?: number,
  to?: number,
  step?: number,
  vertical?: boolean,
  double?: boolean,
  tip?: boolean,
  scale?: boolean,
  progress?: boolean,
  input?: boolean
}

interface IEvent<T> {
  [eventName: string]: Array<(arg0: T) => void>
}

type Params = {
  pageName: keyof MouseEvent,
  sideName: keyof HTMLElement,
  sizeName: keyof HTMLElement,
  lineSize: number,
  lineSide: number,
};

export {
  IdwSlider, ReducedIOptions, IOptions, IEvent, Params, Observer, Publisher, Subview,
};
