import { INode } from "../../ast/node/Node";
import { IBlockStatement } from "../../ast/statements/BlockStatement";
import { SymbolTable } from "../../symbols/SymbolTable";
import { Traverser } from "../../traverser/Traverser";

export function BlockStatement(n: INode, traverser: Traverser) {
  const node = n as IBlockStatement;
  const previous = traverser.getScope();

  try {
    traverser.setScope(new SymbolTable(previous));
    node.body.forEach((statement) => traverser.traverse(statement));
  } finally {
    traverser.setScope(previous);
  }
}
