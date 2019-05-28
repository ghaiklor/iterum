import { ILogicalExpression } from "../../ast/expressions/LogicalExpression";
import { INode } from "../../ast/node/Node";
import { LogicalOperator } from "../../ast/operators/LogicalOperator";
import { Traverser } from "../../traverser/Traverser";

export function LogicalExpression(n: INode, traverser: Traverser) {
  const node = n as ILogicalExpression;
  const left = traverser.traverse(node.left);

  if (node.operator === LogicalOperator.AND && !left) {
    return left;
  }

  if (node.operator === LogicalOperator.OR && left) {
    return left;
  }

  return traverser.traverse(node.right);
}
