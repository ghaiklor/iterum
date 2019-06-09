import { INode } from "../../ast/node/Node";
import { IReturnStatement } from "../../ast/statements/ReturnStatement";
import { ReturnException } from "../../runtime/exceptions/ReturnException";
import { ITraverseContext } from "../../traverser/Traverser";

export function ReturnStatement(n: INode, context: ITraverseContext) {
  const node = n as IReturnStatement;

  let value = null;
  if (node.argument !== null) {
    value = context.traverser.traverse(node.argument, context);
  }

  throw new ReturnException(value);
}
