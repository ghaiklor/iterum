import { IClassDeclaration } from "../../ast/classes/ClassDeclaration";
import { ITraverseContext } from "../../traverser/Traverser";
import { Function } from "../functions/Function";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";
import { InstanceValue } from "./InstanceValue";

export class ClassValue extends Function {
  private decl: IClassDeclaration;
  constructor(decl: IClassDeclaration) {
    super(ValueKind.CLASS, null);

    this.decl = decl;
  }

  public call(_: Value[], __: ITraverseContext): Value {
    // TODO: implement support for constructor and arguments here
    return new InstanceValue(this);
  }

  public arity(): number {
    // TODO: when constructor will be supported, make arity based on constructor arguments
    return 0;
  }

  public toString() {
    return `<class ${this.decl.id.name}>`;
  }
}
