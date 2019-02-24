import { Node } from "./Node";

export class BinaryExpression extends Node {
  public left: Node;
  public operator: string;
  public right: Node;
  constructor(left: Node, operator: string, right: Node) {
    super();

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}
