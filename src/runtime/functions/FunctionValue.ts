import { IFunctionDeclaration } from '../../ast/declarations/FunctionDeclaration';
import { IFunctionExpression } from '../../ast/expressions/FunctionExpression';
import { IIdentifier } from '../../ast/miscellaneous/Identifier';
import { RuntimeError } from '../../errors/RuntimeError';
import { Symbol } from '../../symbols/Symbol';
import { SymbolTable } from '../../symbols/SymbolTable';
import { ITraverseContext } from '../../traverser/Traverser';
import { InstanceValue } from '../classes/InstanceValue';
import { ReturnException } from '../exceptions/ReturnException';
import { NullValue } from '../primitives/NullValue';
import { Value } from '../Value';
import { ValueKind } from '../ValueKind';
import { Function } from './Function';

export class FunctionValue extends Function {
  private readonly fn: IFunctionDeclaration | IFunctionExpression;
  private readonly scope: SymbolTable;
  constructor (fn: IFunctionDeclaration | IFunctionExpression, scope: SymbolTable) {
    super(ValueKind.FUNCTION, null);

    this.fn = fn;
    this.scope = scope;
  }

  public call (args: Value[], context: ITraverseContext): Value | never {
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

  public bind (instance: InstanceValue): FunctionValue {
    const scope = new SymbolTable(this.scope);
    scope.define(new Symbol('this', instance));

    return new FunctionValue(this.fn, scope);
  }

  public arity (): number {
    return this.fn.params.length;
  }

  public toString (): string {
    let fnName = 'anonymous';
    if (this.fn.id !== null) {
      fnName = this.fn.id.name;
    }

    return `<function ${fnName}>`;
  }
}
