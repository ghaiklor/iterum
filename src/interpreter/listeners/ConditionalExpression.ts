import { IConditionalExpression } from '../../ast/expressions/ConditionalExpression';
import { INode } from '../../ast/node/Node';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function ConditionalExpression (n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as IConditionalExpression;
  const condition = traverser.traverse(node.test, context);

  if (condition.isTrue()) {
    return traverser.traverse(node.consequent, context);
  } else {
    return traverser.traverse(node.alternate, context);
  }
}
