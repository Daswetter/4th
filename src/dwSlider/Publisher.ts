abstract class Publisher {
  public updatableMethod!: (arg0: { data: any, event: string }) => void;

  public subscribe(updatableMethod: (arg0: { data: any, event: string }) => void): void {
    this.updatableMethod = updatableMethod;
  }

  public notify(data: any, event: string): void {
    this.updatableMethod({ data, event });
  }
}

export default Publisher;
