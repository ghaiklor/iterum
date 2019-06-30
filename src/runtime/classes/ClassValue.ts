import { IClassDeclaration } from "../../ast/classes/ClassDeclaration";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { SymbolTable } from "../../symbols/SymbolTable";
import { ITraverseContext } from "../../traverser/Traverser";
import { Function } from "../functions/Function";
import { FunctionValue } from "../functions/FunctionValue";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";
import { InstanceValue } from "./InstanceValue";

export class ClassValue extends Function {
  private decl: IClassDeclaration;
  private methods: Map<string, FunctionValue> = new Map();
  private scope: SymbolTable;
  constructor(decl: IClassDeclaration, scope: SymbolTable) {
    super(ValueKind.CLASS, null);

    this.decl = decl;
    this.scope = scope;

    for (const method of this.decl.body.body) {
      // TODO: implement a support for constructor/set/get/etc ?
      const fn = new FunctionValue(method.value, this.scope);
      this.methods.set((method.key as IIdentifier).name, fn);
    }
  }

  public call(_: Value[], __: ITraverseContext): Value {
    // TODO: implement support for constructor and arguments here
    return new InstanceValue(this);
  }

  public arity(): number {
    // TODO: when constructor will be supported, make arity based on constructor arguments
    return 0;
  }

  public getMethod(key: string): FunctionValue | null {
    const method = this.methods.get(key);
    if (method === undefined) {
      return null;
    }

    return method;
  }

  public toString() {
    return `<class ${this.decl.id.name}>`;
  }
}
