import { IBinaryExpression } from "../../ast/expressions/BinaryExpression";
import { INode } from "../../ast/node/Node";
import { BinaryOperator } from "../../ast/operators/BinaryOperator";
import { ITraverseContext } from "../../traverser/Traverser";

export function BinaryExpression(n: INode, context: ITraverseContext) {
  const node = n as IBinaryExpression;
  const left = context.traverser.traverse(node.left, context);
  const right = context.traverser.traverse(node.right, context);
  const operator = node.operator;

  switch (operator) {
    case BinaryOperator.EQUAL:
      // tslint:disable-next-line: triple-equals
      return left == right;
    case BinaryOperator.NOT_EQUAL:
      // tslint:disable-next-line: triple-equals
      return left != right;
    case BinaryOperator.STRICT_EQUAL:
      return left === right;
    case BinaryOperator.NOT_STRICT_EQUAL:
      return left !== right;
    case BinaryOperator.LESS_THAN:
      return left < right;
    case BinaryOperator.LESS_THAN_OR_EQUAL:
      return left <= right;
    case BinaryOperator.GREATER_THAN:
      return left > right;
    case BinaryOperator.GREATER_THAN_OR_EQUAL:
      return left >= right;
    case BinaryOperator.BITWISE_SHIFT_LEFT:
      // tslint:disable-next-line: no-bitwise
      return left << right;
    case BinaryOperator.BITWISE_SHIFT_RIGHT:
      // tslint:disable-next-line: no-bitwise
      return left >> right;
    case BinaryOperator.BITWISE_SHIFT_RIGHT_ZERO:
      // tslint:disable-next-line: no-bitwise
      return left >>> right;
    case BinaryOperator.PLUS:
      return left + right;
    case BinaryOperator.MINUS:
      return left - right;
    case BinaryOperator.MULTIPLY:
      return left * right;
    case BinaryOperator.EXPONENTIATION:
      return Math.pow(left, right);
    case BinaryOperator.DIVIDE:
      return left / right;
    case BinaryOperator.MODULUS:
      return left % right;
    case BinaryOperator.BITWISE_AND:
      // tslint:disable-next-line: no-bitwise
      return left & right;
    case BinaryOperator.BITWISE_OR:
      // tslint:disable-next-line: no-bitwise
      return left | right;
    case BinaryOperator.BITWISE_XOR:
      // tslint:disable-next-line: no-bitwise
      return left ^ right;
    case BinaryOperator.IN:
      return left in right;
    case BinaryOperator.INSTANCE_OF:
      return left instanceof right;
  }
}