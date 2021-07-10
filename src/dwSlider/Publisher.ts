import { Observer } from '../types';

abstract class Publisher {
  private observers: Observer[] = [];

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public notify(data: any, event: string): void {
    for (const observer of this.observers) {
      observer.update({ data, event });
    }
  }
}

export default Publisher;
