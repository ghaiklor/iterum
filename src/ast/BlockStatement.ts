import { Node } from "./Node";

export class BlockStatement extends Node {
  public body: Node[];
  constructor(body: Node[]) {
    super();

    this.body = body;
  }
}
