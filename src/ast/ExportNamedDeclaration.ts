import { Node } from "./Node";

export class ExportNamedDeclaration extends Node {
  public declaration: Node;
  constructor(declaration: Node) {
    super();

    this.declaration = declaration;
  }
}
