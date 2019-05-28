import { ILogicalExpression } from "../../ast/expressions/LogicalExpression";
import { INode } from "../../ast/node/Node";
import { LogicalOperator } from "../../ast/operators/LogicalOperator";
import { ITraverseContext } from "../../traverser/Traverser";

export function LogicalExpression(n: INode, context: ITraverseContext) {
  const { traverser } = context;
  const node = n as ILogicalExpression;
  const left = traverser.traverse(node.left, context);

  if (node.operator === LogicalOperator.AND && !left) {
    return left;
  }

  if (node.operator === LogicalOperator.OR && left) {
    return left;
  }

  return traverser.traverse(node.right, context);
}
