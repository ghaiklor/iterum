import { INode } from "../../ast/node/Node";
import { IWhileStatement } from "../../ast/statements/WhileStatement";
import { ITraverseContext } from "../../traverser/Traverser";

export function WhileStatement(n: INode, context: ITraverseContext) {
  const { traverser } = context;
  const node = n as IWhileStatement;

  while (traverser.traverse(node.test, context)) {
    traverser.traverse(node.body, context);
  }
}
