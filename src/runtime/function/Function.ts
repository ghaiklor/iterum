import { IFunctionDeclaration } from "../../ast/declarations/FunctionDeclaration";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { Symbol } from "../../symbols/Symbol";
import { SymbolTable } from "../../symbols/SymbolTable";
import { ITraverseContext } from "../../traverser/Traverser";
import { ICallable } from "./Callable";
import { ReturnException } from "./ReturnException";

export class Function implements ICallable {
  private fn: IFunctionDeclaration;
  constructor(fn: IFunctionDeclaration) {
    this.fn = fn;
  }

  public call(args: any[], context: ITraverseContext) {
    const { traverser, scope } = context;
    const calleeScope = new SymbolTable(scope);

    for (let i = 0; i < args.length; i++) {
      calleeScope.define(new Symbol((this.fn.params[i] as IIdentifier).name, args[i]));
    }

    try {
      traverser.traverse(this.fn.body, { ...context, scope: calleeScope });
    } catch (e) {
      if (e instanceof ReturnException) {
        return (e as ReturnException).value;
      }

      // TODO: introduce error classes?
      throw e;
    }
  }

  public toString() {
    return `<function ${this.fn.id.name}>`;
  }
}
