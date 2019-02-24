import { Node } from "./Node";
import { VariableDeclarator } from "./VariableDeclarator";

export class VariableDeclaration extends Node {
  public declarations: VariableDeclarator[];
  constructor(declarations: VariableDeclarator[]) {
    super();

    this.declarations = declarations;
  }
}
