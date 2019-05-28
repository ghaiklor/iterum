import { ISequenceExpression } from "../../ast/expressions/SequenceExpression";
import { INode } from "../../ast/node/Node";
import { Traverser } from "../../traverser/Traverser";

export function SequenceExpression(n: INode, traverser: Traverser) {
  const node = n as ISequenceExpression;

  for (let i = 0; i < node.expressions.length - 1; i++) {
    traverser.traverse(node.expressions[i]);
  }

  return traverser.traverse(node.expressions[node.expressions.length - 1]);
}
