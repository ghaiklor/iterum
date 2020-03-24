import { IIdentifier } from '../../ast/miscellaneous/Identifier';
import { INode } from '../../ast/node/Node';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function Identifier (n: INode, context: ITraverseContext): Value {
  const { scope } = context;
  const node = n as IIdentifier;
  const value = scope.lookup(node.name);

  return value.value;
}
