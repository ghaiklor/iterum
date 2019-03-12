import { Node } from "../Node";

export class ReturnStatement extends Node {
  public argument: Node;
  constructor(argument: Node) {
    super();

    this.argument = argument;
  }
}
