import { ISequenceExpression } from '../../ast/expressions/SequenceExpression';
import { INode } from '../../ast/node/Node';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function SequenceExpression (n: INode, context: ITraverseContext): Value {
  const node = n as ISequenceExpression;

  for (let i = 0; i < node.expressions.length - 1; i++) {
    context.traverser.traverse(node.expressions[i], context);
  }

  return context.traverser.traverse(node.expressions[node.expressions.length - 1], context);
}
