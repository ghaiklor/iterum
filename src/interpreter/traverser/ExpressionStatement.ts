import { INode } from "../../ast/node/Node";
import { IExpressionStatement } from "../../ast/statements/ExpressionStatement";
import { ITraverseContext } from "../../traverser/Traverser";

export function ExpressionStatement(node: INode, context: ITraverseContext) {
  return context.traverser.traverse((node as IExpressionStatement).expression, context);
}
