import { Identifier } from "./Identifier";
import { Node } from "./Node";

export class CallExpression extends Node {
  public callee: Identifier;
  public arguments: Node[];
  constructor(callee: Identifier, args: Node[]) {
    super();

    this.callee = callee;
    this.arguments = args;
  }
}
