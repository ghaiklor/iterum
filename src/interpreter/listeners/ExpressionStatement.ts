import { INode } from "../../ast/node/Node";
import { IExpressionStatement } from "../../ast/statements/ExpressionStatement";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function ExpressionStatement(node: INode, context: ITraverseContext): Value {
  return context.traverser.traverse((node as IExpressionStatement).expression, context);
}
