abstract class Publisher<Type> {
  public updatableMethod!: (data: Type) => void;

  public subscribe(updatableMethod: (data: Type) => void): void {
    this.updatableMethod = updatableMethod;
  }

  public notify(data: Type): void {
    this.updatableMethod(data);
  }
}

export default Publisher;
