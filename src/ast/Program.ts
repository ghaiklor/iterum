import { Node } from "./Node";

export class Program extends Node {
  public body: Node[];
  constructor(body: Node[]) {
    super();

    this.body = body;
  }
}