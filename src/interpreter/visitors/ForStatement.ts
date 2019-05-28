import { ILiteral } from "../../ast/literals/Literal";
import { INode } from "../../ast/node/Node";
import { IForStatement } from "../../ast/statements/ForStatement";
import { Visitor } from "../../visitor/Visitor";

export function ForStatement(n: INode, visitor: Visitor) {
  const node = n as IForStatement;

  if (node.init !== null) {
    visitor.visit(node.init);
  }

  if (node.test === null) {
    node.test = { type: "Literal", value: true } as ILiteral;
  }

  while (visitor.visit(node.test)) {
    visitor.visit(node.body);

    if (node.update !== null) {
      visitor.visit(node.update);
    }
  }
}
