import { IConditionalExpression } from "../../ast/expressions/ConditionalExpression";
import { INode } from "../../ast/node/Node";
import { Visitor } from "../../visitor/Visitor";

export function ConditionalExpression(n: INode, visitor: Visitor) {
  const node = n as IConditionalExpression;
  const condition = visitor.visit(node.test);

  if (condition) {
    return visitor.visit(node.consequent);
  } else {
    return visitor.visit(node.alternate);
  }
}
