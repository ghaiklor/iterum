import { Node } from "./Node";

export class ExpressionStatement extends Node {
  public expression: Node;
  constructor(expression: Node) {
    super();

    this.expression = expression;
  }
}
