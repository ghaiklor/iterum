import { INode } from "../../ast/node/Node";
import { IDoWhileStatement } from "../../ast/statements/DoWhileStatement";
import { Visitor } from "../../visitor/Visitor";

export function DoWhileStatement(n: INode, visitor: Visitor) {
  const node = n as IDoWhileStatement;

  while (visitor.visit(node.test)) {
    visitor.visit(node.body);
  }
}
