import { Value } from "../runtime/Value";

export class Symbol {
  public name: string;
  public value: Value;
  constructor(name: string, value: Value) {
    this.name = name;
    this.value = value;
  }

  public toString() {
    return `Symbol(${this.name}, ${this.value.toString()})`;
  }
}
