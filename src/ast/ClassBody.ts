import { Node } from "./Node";

export class ClassBody extends Node {
  public body: Node[];
  constructor(body: Node[]) {
    super();

    this.body = body;
  }
}
