import { INode } from '../../ast/node/Node';
import { IWhileStatement } from '../../ast/statements/WhileStatement';
import { NullValue } from '../../runtime/primitives/NullValue';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function WhileStatement (n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as IWhileStatement;

  while (traverser.traverse(node.test, context).isTrue()) {
    traverser.traverse(node.body, context);
  }

  return new NullValue();
}
