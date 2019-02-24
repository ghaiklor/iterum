import { Node } from "./Node";

export class Literal extends Node {
  public value: string | number;
  public raw: string;
  constructor(value: string | number, raw: string) {
    super();

    this.value = value;
    this.raw = raw;
  }
}
