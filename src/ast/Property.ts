import { Expression } from "./expression/Expression";
import { Identifier } from "./Identifier";
import { Literal } from "./Literal";
import { Node } from "./Node";

export class Property extends Node {
  public key: Identifier | Literal;
  public value: Expression;
  constructor(key: Identifier | Literal, value: Expression) {
    super();

    this.key = key;
    this.value = value;
  }
}
