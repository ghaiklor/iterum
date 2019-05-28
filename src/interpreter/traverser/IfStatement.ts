import { INode } from "../../ast/node/Node";
import { IIfStatement } from "../../ast/statements/IfStatement";
import { ITraverseContext } from "../../traverser/Traverser";

export function IfStatement(n: INode, context: ITraverseContext) {
  const { traverser } = context;
  const node = n as IIfStatement;

  if (traverser.traverse(node.test, context)) {
    traverser.traverse(node.consequent, context);
  } else {
    if (node.alternate !== null) {
      traverser.traverse(node.alternate, context);
    }
  }
}
