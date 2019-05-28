import { INode } from "../../ast/node/Node";
import { IIfStatement } from "../../ast/statements/IfStatement";
import { Traverser } from "../../traverser/Traverser";

export function IfStatement(n: INode, traverser: Traverser) {
  const node = n as IIfStatement;

  if (traverser.traverse(node.test)) {
    traverser.traverse(node.consequent);
  } else {
    if (node.alternate !== null) {
      traverser.traverse(node.alternate);
    }
  }
}
