import { Token } from "../token/Token";
import { Node } from "./Node";

export class NumberLiteral extends Node {
  public value: number;

  constructor(token: Token, value: string) {
    super(token);

    this.value = parseFloat(value);
  }
}
