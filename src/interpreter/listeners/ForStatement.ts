import { ILiteral } from "../../ast/literals/Literal";
import { INode } from "../../ast/node/Node";
import { IForStatement } from "../../ast/statements/ForStatement";
import { NullValue } from "../../runtime/primitives/NullValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function ForStatement(n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as IForStatement;

  if (node.init !== null) {
    traverser.traverse(node.init, context);
  }

  if (node.test === null) {
    node.test = { type: "Literal", value: true } as ILiteral;
  }

  while (traverser.traverse(node.test, context).isTrue()) {
    traverser.traverse(node.body, context);

    if (node.update !== null) {
      traverser.traverse(node.update, context);
    }
  }

  return new NullValue();
}
