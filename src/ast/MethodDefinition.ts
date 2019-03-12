import { FunctionDeclaration } from "./FunctionDeclaration";
import { Identifier } from "./Identifier";
import { Literal } from "./Literal";
import { Node } from "./Node";

export class MethodDefinition extends Node {
  public key: Identifier | Literal;
  public value: FunctionDeclaration;
  public kind: string;
  constructor(key: Identifier | Literal, value: FunctionDeclaration, kind: string) {
    super();

    this.key = key;
    this.value = value;
    this.kind = kind;
  }
}
