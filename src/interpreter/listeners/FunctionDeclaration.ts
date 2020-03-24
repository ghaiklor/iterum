import { IFunctionDeclaration } from '../../ast/declarations/FunctionDeclaration';
import { INode } from '../../ast/node/Node';
import { FunctionValue } from '../../runtime/functions/FunctionValue';
import { NullValue } from '../../runtime/primitives/NullValue';
import { Value } from '../../runtime/Value';
import { Symbol } from '../../symbols/Symbol';
import { ITraverseContext } from '../../traverser/Traverser';

export function FunctionDeclaration (n: INode, context: ITraverseContext): Value {
  const { scope } = context;
  const node = n as IFunctionDeclaration;
  const name = node.id.name;
  const fn = new FunctionValue(node, scope);

  scope.define(new Symbol(name, fn));
  return new NullValue();
}
