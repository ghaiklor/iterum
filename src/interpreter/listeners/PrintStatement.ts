import { INode } from '../../ast/node/Node';
import { IPrintStatement } from '../../ast/statements/PrintStatement';
import { NullValue } from '../../runtime/primitives/NullValue';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function PrintStatement (n: INode, context: ITraverseContext): Value {
  const node = n as IPrintStatement;
  const value = context.traverser.traverse(node.expression, context);

  process.stdout.write(`${value.toString()}\n`);
  return new NullValue();
}
