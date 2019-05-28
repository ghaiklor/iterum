import { INode } from "../../ast/node/Node";
import { IDoWhileStatement } from "../../ast/statements/DoWhileStatement";
import { Traverser } from "../../traverser/Traverser";

export function DoWhileStatement(n: INode, traverser: Traverser) {
  const node = n as IDoWhileStatement;

  while (traverser.traverse(node.test)) {
    traverser.traverse(node.body);
  }
}
