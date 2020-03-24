import { INode } from '../../ast/node/Node';
import { IIfStatement } from '../../ast/statements/IfStatement';
import { NullValue } from '../../runtime/primitives/NullValue';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function IfStatement (n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as IIfStatement;

  if (traverser.traverse(node.test, context).isTrue()) {
    traverser.traverse(node.consequent, context);
  } else {
    if (node.alternate !== null) {
      traverser.traverse(node.alternate, context);
    }
  }

  return new NullValue();
}
