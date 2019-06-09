import { Value } from "../Value";
import { RuntimeException } from "./RuntimeException";

export class ReturnException extends RuntimeException {
  public value: Value;
  constructor(value: Value) {
    super("ReturnException");

    this.value = value;
  }
}
