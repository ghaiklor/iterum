import { INode } from "../../ast/node/Node";
import { IPrintStatement } from "../../ast/statements/PrintStatement";
import { Traverser } from "../../traverser/Traverser";

export function PrintStatement(n: INode, traverser: Traverser) {
  const node = n as IPrintStatement;
  const value = traverser.traverse(node.expression);

  process.stdout.write(`${value}\n`);
}
