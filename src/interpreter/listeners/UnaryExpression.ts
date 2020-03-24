import { IUnaryExpression } from '../../ast/expressions/UnaryExpression';
import { INode } from '../../ast/node/Node';
import { UnaryOperator } from '../../ast/operators/UnaryOperator';
import { BooleanValue } from '../../runtime/primitives/BooleanValue';
import { NullValue } from '../../runtime/primitives/NullValue';
import { NumberValue } from '../../runtime/primitives/NumberValue';
import { StringValue } from '../../runtime/primitives/StringValue';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function UnaryExpression (n: INode, context: ITraverseContext): Value {
  const { traverser } = context;
  const node = n as IUnaryExpression;

  switch (node.operator) {
    case UnaryOperator.MINUS:
      return new NumberValue(-traverser.traverse(node.argument, context).data);

    case UnaryOperator.PLUS:
      return new NumberValue(+traverser.traverse(node.argument, context).data);

    case UnaryOperator.LOGICAL_NOT:
      return new BooleanValue(!(traverser.traverse(node.argument, context).data as boolean));

    case UnaryOperator.BITWISE_NOT:
      // tslint:disable-next-line: no-bitwise
      return new NumberValue(~traverser.traverse(node.argument, context).data);

    case UnaryOperator.TYPE_OF:
      return new StringValue(traverser.traverse(node.argument, context).typeOf());

    case UnaryOperator.VOID:
      return new NullValue();

    case UnaryOperator.DELETE:
      return new NullValue();
  }
}
