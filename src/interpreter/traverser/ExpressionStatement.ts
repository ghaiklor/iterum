import { INode } from "../../ast/node/Node";
import { IExpressionStatement } from "../../ast/statements/ExpressionStatement";
import { Traverser } from "../../traverser/Traverser";

export function ExpressionStatement(node: INode, traverser: Traverser) {
  return traverser.traverse((node as IExpressionStatement).expression);
}
