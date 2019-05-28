import { INode } from "../../ast/node/Node";
import { IWhileStatement } from "../../ast/statements/WhileStatement";
import { Traverser } from "../../traverser/Traverser";

export function WhileStatement(n: INode, traverser: Traverser) {
  const node = n as IWhileStatement;

  while (traverser.traverse(node.test)) {
    traverser.traverse(node.body);
  }
}
