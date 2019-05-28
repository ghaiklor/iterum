import { ISequenceExpression } from "../../ast/expressions/SequenceExpression";
import { INode } from "../../ast/node/Node";
import { Visitor } from "../../visitor/Visitor";

export function SequenceExpression(n: INode, visitor: Visitor) {
  const node = n as ISequenceExpression;

  for (let i = 0; i < node.expressions.length - 1; i++) {
    visitor.visit(node.expressions[i]);
  }

  return visitor.visit(node.expressions[node.expressions.length - 1]);
}
