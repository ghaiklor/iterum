import { INode } from "../../ast/node/Node";
import { IWhileStatement } from "../../ast/statements/WhileStatement";
import { Visitor } from "../../visitor/Visitor";

export function WhileStatement(n: INode, visitor: Visitor) {
  const node = n as IWhileStatement;

  while (visitor.visit(node.test)) {
    visitor.visit(node.body);
  }
}
