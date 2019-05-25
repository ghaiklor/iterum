import { INode } from "../../ast/node/Node";
import { IBlockStatement } from "../../ast/statements/BlockStatement";
import { SymbolTable } from "../../symbols/SymbolTable";
import { Visitor } from "../../visitor/Visitor";

export function BlockStatement(n: INode, visitor: Visitor) {
  const node = n as IBlockStatement;
  const previous = visitor.getScope();

  try {
    visitor.setScope(new SymbolTable(previous));
    node.body.forEach((statement) => visitor.visit(statement));
  } finally {
    visitor.setScope(previous);
  }
}
