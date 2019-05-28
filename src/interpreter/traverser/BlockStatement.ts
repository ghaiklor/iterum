import { INode } from "../../ast/node/Node";
import { IBlockStatement } from "../../ast/statements/BlockStatement";
import { SymbolTable } from "../../symbols/SymbolTable";
import { ITraverseContext } from "../../traverser/Traverser";

export function BlockStatement(n: INode, context: ITraverseContext) {
  const { traverser, scope } = context;
  const node = n as IBlockStatement;

  try {
    context.scope = new SymbolTable(scope);
    node.body.forEach((statement) => traverser.traverse(statement, context));
  } finally {
    context.scope = scope;
  }
}
