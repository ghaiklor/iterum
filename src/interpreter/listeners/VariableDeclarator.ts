import { IVariableDeclarator } from '../../ast/declarations/VariableDeclarator';
import { IIdentifier } from '../../ast/miscellaneous/Identifier';
import { INode } from '../../ast/node/Node';
import { NullValue } from '../../runtime/primitives/NullValue';
import { Value } from '../../runtime/Value';
import { Symbol } from '../../symbols/Symbol';
import { ITraverseContext } from '../../traverser/Traverser';

export function VariableDeclarator (n: INode, context: ITraverseContext): Value {
  const { traverser, scope } = context;
  const node = n as IVariableDeclarator;
  const name = (node.id as IIdentifier).name;

  let value = new NullValue();
  if (node.init !== null) {
    value = traverser.traverse(node.init, context);
  }

  const symbol = new Symbol(name, value);
  scope.define(symbol);

  return new NullValue();
}
