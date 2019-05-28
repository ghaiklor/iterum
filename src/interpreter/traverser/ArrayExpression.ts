import { IArrayExpression } from "../../ast/expressions/ArrayExpression";
import { INode } from "../../ast/node/Node";
import { Traverser } from "../../traverser/Traverser";

export function ArrayExpression(n: INode, traverser: Traverser): any[] {
  const node = n as IArrayExpression;
  const elements = [];

  for (const element of node.elements) {
    if (!element) {
      continue;
    }

    elements.push(traverser.traverse(element));
  }

  return elements;
}
