import { ILogicalExpression } from "../../ast/expressions/LogicalExpression";
import { INode } from "../../ast/node/Node";
import { LogicalOperator } from "../../ast/operators/LogicalOperator";
import { Visitor } from "../../visitor/Visitor";

export function LogicalExpression(n: INode, visitor: Visitor) {
  const node = n as ILogicalExpression;
  const left = visitor.visit(node.left);

  if (node.operator === LogicalOperator.AND && !left) {
    return left;
  }

  if (node.operator === LogicalOperator.OR && left) {
    return left;
  }

  return visitor.visit(node.right);
}
