import { INode } from "../../ast/node/Node";
import { IPrintStatement } from "../../ast/statements/PrintStatement";
import { Visitor } from "../../visitor/Visitor";

export function PrintStatement(n: INode, visitor: Visitor) {
  const node = n as IPrintStatement;
  const value = visitor.visit(node.expression);
  process.stdout.write(`${value}\n`);

  return value;
}
