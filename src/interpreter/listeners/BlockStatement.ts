import { INode } from '../../ast/node/Node';
import { IBlockStatement } from '../../ast/statements/BlockStatement';
import { NullValue } from '../../runtime/primitives/NullValue';
import { Value } from '../../runtime/Value';
import { SymbolTable } from '../../symbols/SymbolTable';
import { ITraverseContext } from '../../traverser/Traverser';

export function BlockStatement (n: INode, context: ITraverseContext): Value {
  const { traverser, scope } = context;
  const node = n as IBlockStatement;

  try {
    context.scope = new SymbolTable(scope);
    node.body.forEach((statement) => traverser.traverse(statement, context));
  } finally {
    context.scope = scope;
  }

  return new NullValue();
}
