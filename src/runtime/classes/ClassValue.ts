import { IClassDeclaration } from "../../ast/classes/ClassDeclaration";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export class ClassValue extends Value {
  private decl: IClassDeclaration;
  constructor(decl: IClassDeclaration) {
    super(ValueKind.CLASS, decl);

    this.decl = decl;
  }

  public toString() {
    return `<class ${this.decl.id.name}>`;
  }
}
