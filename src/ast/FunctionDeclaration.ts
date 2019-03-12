import { Identifier } from "./Identifier";
import { Node } from "./Node";
import { BlockStatement } from "./statement/BlockStatement";

export class FunctionDeclaration extends Node {
  public id: Identifier;
  public params: Identifier[];
  public body: BlockStatement;

  constructor(id: Identifier, params: Identifier[], body: BlockStatement) {
    super();

    this.id = id;
    this.params = params;
    this.body = body;
  }
}
