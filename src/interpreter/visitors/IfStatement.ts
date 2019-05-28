import { INode } from "../../ast/node/Node";
import { IIfStatement } from "../../ast/statements/IfStatement";
import { Visitor } from "../../visitor/Visitor";

export function IfStatement(n: INode, visitor: Visitor) {
  const node = n as IIfStatement;

  if (visitor.visit(node.test)) {
    visitor.visit(node.consequent);
  } else {
    if (node.alternate !== null) {
      visitor.visit(node.alternate);
    }
  }
}
