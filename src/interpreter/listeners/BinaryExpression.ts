import { IBinaryExpression } from '../../ast/expressions/BinaryExpression';
import { INode } from '../../ast/node/Node';
import { BinaryOperator } from '../../ast/operators/BinaryOperator';
import { BooleanValue } from '../../runtime/primitives/BooleanValue';
import { NumberValue } from '../../runtime/primitives/NumberValue';
import { Value } from '../../runtime/Value';
import { ITraverseContext } from '../../traverser/Traverser';

export function BinaryExpression (n: INode, context: ITraverseContext): Value {
  const node = n as IBinaryExpression;
  const left = context.traverser.traverse(node.left, context);
  const right = context.traverser.traverse(node.right, context);
  const operator = node.operator;

  switch (operator) {
    case BinaryOperator.EQUAL:
      return new BooleanValue(left.equals(right));
    case BinaryOperator.NOT_EQUAL:
      return new BooleanValue(!left.equals(right));
    case BinaryOperator.STRICT_EQUAL:
      return new BooleanValue(left.strictEquals(right));
    case BinaryOperator.NOT_STRICT_EQUAL:
      return new BooleanValue(!left.strictEquals(right));
    case BinaryOperator.LESS_THAN:
      return new BooleanValue(left.lessThan(right));
    case BinaryOperator.LESS_THAN_OR_EQUAL:
      return new BooleanValue(left.lessThan(right) || left.equals(right));
    case BinaryOperator.GREATER_THAN:
      return new BooleanValue(left.greaterThan(right));
    case BinaryOperator.GREATER_THAN_OR_EQUAL:
      return new BooleanValue(left.greaterThan(right) || left.equals(right));
    case BinaryOperator.BITWISE_SHIFT_LEFT:
      return new NumberValue(left.bitwiseShiftToLeft(right));
    case BinaryOperator.BITWISE_SHIFT_RIGHT:
      return new NumberValue(left.bitwiseShiftToRight(right));
    case BinaryOperator.BITWISE_SHIFT_RIGHT_ZERO:
      return new NumberValue(left.bitwiseLogicalShiftToRight(right));
    case BinaryOperator.PLUS:
      return new NumberValue(left.plus(right));
    case BinaryOperator.MINUS:
      return new NumberValue(left.minus(right));
    case BinaryOperator.MULTIPLY:
      return new NumberValue(left.multiply(right));
    case BinaryOperator.EXPONENTIATION:
      return new NumberValue(left.exponentiation(right));
    case BinaryOperator.DIVIDE:
      return new NumberValue(left.divide(right));
    case BinaryOperator.MODULUS:
      return new NumberValue(left.modulus(right));
    case BinaryOperator.BITWISE_AND:
      return new NumberValue(left.bitwiseAnd(right));
    case BinaryOperator.BITWISE_OR:
      return new NumberValue(left.bitwiseOr(right));
    case BinaryOperator.BITWISE_XOR:
      return new NumberValue(left.bitwiseXor(right));
    case BinaryOperator.IN:
      return new BooleanValue(left.in(right));
    case BinaryOperator.INSTANCE_OF:
      return new BooleanValue(left.instanceOf(right));
  }
}
