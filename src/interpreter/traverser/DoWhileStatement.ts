import { INode } from "../../ast/node/Node";
import { IDoWhileStatement } from "../../ast/statements/DoWhileStatement";
import { ITraverseContext } from "../../traverser/Traverser";

export function DoWhileStatement(n: INode, context: ITraverseContext) {
  const { traverser } = context;
  const node = n as IDoWhileStatement;

  while (traverser.traverse(node.test, context)) {
    traverser.traverse(node.body, context);
  }
}
