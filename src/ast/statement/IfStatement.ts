import { Node } from "../Node";
import { BlockStatement } from "./BlockStatement";

export class IfStatement extends Node {
  public test: Node;
  public consequent: BlockStatement;
  public alternate: BlockStatement;
  constructor(test: Node, consequent: BlockStatement, alternate: BlockStatement) {
    super();

    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }
}
