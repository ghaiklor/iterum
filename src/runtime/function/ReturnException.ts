export class ReturnException extends Error {
  public value: any;
  constructor(value: any) {
    super();

    this.value = value;
  }
}
