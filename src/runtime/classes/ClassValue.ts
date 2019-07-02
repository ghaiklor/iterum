import { IClassDeclaration } from "../../ast/classes/ClassDeclaration";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { Symbol } from "../../symbols/Symbol";
import { SymbolTable } from "../../symbols/SymbolTable";
import { ITraverseContext } from "../../traverser/Traverser";
import { Function } from "../functions/Function";
import { FunctionValue } from "../functions/FunctionValue";
import { NullValue } from "../primitives/NullValue";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";
import { InstanceValue } from "./InstanceValue";

export class ClassValue extends Function {
  private decl: IClassDeclaration;
  private methods: Map<string, FunctionValue> = new Map();
  private scope: SymbolTable;
  private superClass: ClassValue | null = null;
  constructor(decl: IClassDeclaration, scope: SymbolTable, superClass: ClassValue | null) {
    super(ValueKind.CLASS, null);

    this.decl = decl;
    this.scope = scope;

    this.superClass = superClass;
    if (this.superClass !== null) {
      this.scope.define(new Symbol("super", this.superClass));
    }

    for (const method of this.decl.body.body) {
      const fn = new FunctionValue(method.value, this.scope);
      this.methods.set((method.key as IIdentifier).name, fn);
    }
  }

  public call(args: Value[], context: ITraverseContext): InstanceValue {
    const instance = new InstanceValue(this);
    const initializer = this.getMethod("constructor");
    if (!(initializer instanceof NullValue)) {
      initializer.bind(instance).call(args, context);
    }

    return instance;
  }

  public arity(): number {
    const initializer = this.getMethod("constructor");
    if (initializer instanceof NullValue) {
      return 0;
    }

    return initializer.arity();
  }

  public getMethod(key: string): FunctionValue | NullValue {
    const method = this.methods.get(key);
    if (method !== undefined) {
      return method;
    }

    if (this.superClass !== null) {
      return this.superClass.getMethod(key);
    }

    return new NullValue();
  }

  public toString() {
    return `<class ${this.decl.id.name}>`;
  }
}
