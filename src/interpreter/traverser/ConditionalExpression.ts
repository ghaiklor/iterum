import { IConditionalExpression } from "../../ast/expressions/ConditionalExpression";
import { INode } from "../../ast/node/Node";
import { Traverser } from "../../traverser/Traverser";

export function ConditionalExpression(n: INode, traverser: Traverser) {
  const node = n as IConditionalExpression;
  const condition = traverser.traverse(node.test);

  if (condition) {
    return traverser.traverse(node.consequent);
  } else {
    return traverser.traverse(node.alternate);
  }
}
