import { IFunctionDeclaration } from "../../ast/declarations/FunctionDeclaration";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { RuntimeError } from "../../errors/RuntimeError";
import { Symbol } from "../../symbols/Symbol";
import { SymbolTable } from "../../symbols/SymbolTable";
import { ITraverseContext } from "../../traverser/Traverser";
import { ReturnException } from "../exceptions/ReturnException";
import { NullValue } from "../primitives/NullValue";
import { Value } from "../Value";
import { ValueKind } from "../ValueKind";

export interface ICallable {
  call(args: Value[], context: ITraverseContext): Value;
}

export class FunctionValue extends Value implements ICallable {
  private fn: IFunctionDeclaration;
  private scope: SymbolTable;
  constructor(fn: IFunctionDeclaration, scope: SymbolTable) {
    super(ValueKind.FUNCTION, fn);

    this.fn = fn;
    this.scope = scope;
  }

  public call(args: Value[], context: ITraverseContext): Value | never {
    const { traverser } = context;
    const calleeScope = new SymbolTable(this.scope);

    for (let i = 0; i < args.length; i++) {
      const name = (this.fn.params[i] as IIdentifier).name;
      const value = args[i];

      calleeScope.define(new Symbol(name, value));
    }

    try {
      traverser.traverse(this.fn.body, { ...context, scope: calleeScope });
    } catch (error) {
      if (error instanceof ReturnException) {
        return error.value;
      }

      throw new RuntimeError(RuntimeError.UNKNOWN_RUNTIME_ERROR);
    }

    return new NullValue();
  }

  public toString() {
    return `<function ${this.fn.id.name}>`;
  }
}
