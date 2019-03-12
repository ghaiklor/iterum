import { ClassBody } from "./ClassBody";
import { Identifier } from "./Identifier";
import { Node } from "./Node";

export class ClassDeclaration extends Node {
  public id: Identifier;
  public body: ClassBody;
  constructor(id: Identifier, body: ClassBody) {
    super();

    this.id = id;
    this.body = body;
  }
}
