import { ILiteral } from "../../ast/literals/Literal";
import { INode } from "../../ast/node/Node";
import { IForStatement } from "../../ast/statements/ForStatement";
import { Traverser } from "../../traverser/Traverser";

export function ForStatement(n: INode, traverser: Traverser) {
  const node = n as IForStatement;

  if (node.init !== null) {
    traverser.traverse(node.init);
  }

  if (node.test === null) {
    node.test = { type: "Literal", value: true } as ILiteral;
  }

  while (traverser.traverse(node.test)) {
    traverser.traverse(node.body);

    if (node.update !== null) {
      traverser.traverse(node.update);
    }
  }
}
