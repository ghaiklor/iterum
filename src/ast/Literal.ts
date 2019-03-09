import { Node } from "./Node";

export class Literal extends Node {
  public value: string | number | boolean | null;
  public raw: string;
  constructor(value: string | number | boolean | null, raw: string) {
    super();

    this.value = value;
    this.raw = raw;
  }
}
