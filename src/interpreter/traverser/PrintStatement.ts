import { INode } from "../../ast/node/Node";
import { IPrintStatement } from "../../ast/statements/PrintStatement";
import { ITraverseContext } from "../../traverser/Traverser";

export function PrintStatement(n: INode, context: ITraverseContext) {
  const node = n as IPrintStatement;
  const value = context.traverser.traverse(node.expression, context);

  process.stdout.write(`${value}\n`);
}
