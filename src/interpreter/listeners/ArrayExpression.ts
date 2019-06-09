import { IArrayExpression } from "../../ast/expressions/ArrayExpression";
import { INode } from "../../ast/node/Node";
import { ArrayValue } from "../../runtime/objects/ArrayValue";
import { ITraverseContext } from "../../traverser/Traverser";

export function ArrayExpression(n: INode, context: ITraverseContext): ArrayValue {
  const node = n as IArrayExpression;
  const elements = [];

  for (const element of node.elements) {
    if (element === null) {
      elements.push(null);
      continue;
    }

    const value = context.traverser.traverse(element, context).data;
    elements.push(value);
  }

  return new ArrayValue(elements);
}
