import { IArrayExpression } from "../../ast/expressions/ArrayExpression";
import { INode } from "../../ast/node/Node";
import { ITraverseContext } from "../../traverser/Traverser";

export function ArrayExpression(n: INode, context: ITraverseContext): any[] {
  const node = n as IArrayExpression;
  const elements = [];

  for (const element of node.elements) {
    if (!element) {
      continue;
    }

    elements.push(context.traverser.traverse(element, context));
  }

  return elements;
}
