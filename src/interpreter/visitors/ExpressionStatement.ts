import { INode } from "../../ast/node/Node";
import { IExpressionStatement } from "../../ast/statements/ExpressionStatement";
import { Visitor } from "../../visitor/Visitor";

export function ExpressionStatement(node: INode, visitor: Visitor) {
  return visitor.visit((node as IExpressionStatement).expression);
}
