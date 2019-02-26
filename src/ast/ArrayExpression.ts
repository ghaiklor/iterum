import { Node } from "./Node";

export class ArrayExpression extends Node {
  public elements: Node[];
  constructor(elements: Node[]) {
    super();

    this.elements = elements;
  }
}
