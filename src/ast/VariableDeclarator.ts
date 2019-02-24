import { Identifier } from "./Identifier";
import { Node } from "./Node";

export class VariableDeclarator extends Node {
  public id: Identifier;
  public init: Node;
  constructor(id: Identifier, init: Node) {
    super();

    this.id = id;
    this.init = init;
  }
}
