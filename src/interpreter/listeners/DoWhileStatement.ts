import { INode } from "../../ast/node/Node";
import { IDoWhileStatement } from "../../ast/statements/DoWhileStatement";
import { NullValue } from "../../runtime/primitives/NullValue";
import { Value } from "../../runtime/Value";
import { ITraverseContext } from "../../traverser/Traverser";

export function DoWhileStatement(n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as IDoWhileStatement;

  while (traverser.traverse(node.test, context).isTrue()) {
    traverser.traverse(node.body, context);
  }

  return new NullValue();
}
