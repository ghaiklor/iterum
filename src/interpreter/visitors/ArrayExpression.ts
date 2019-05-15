import { IArrayExpression } from "../../ast/expressions/ArrayExpression";
import { INode } from "../../ast/node/Node";
import { Visitor } from "../../visitor/Visitor";

export function ArrayExpression(n: INode, visitor: Visitor) {
  const node = n as IArrayExpression;
  const elements = [];

  for (const element of node.elements) {
    if (!element) {
      continue;
    }

    elements.push(visitor.visit(element));
  }

  return elements;
}
