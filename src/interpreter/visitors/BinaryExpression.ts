import { IBinaryExpression } from "../../ast/expressions/BinaryExpression";
import { INode } from "../../ast/node/Node";
import { BinaryOperator } from "../../ast/operators/BinaryOperator";
import { Visitor } from "../../visitor/Visitor";

export function BinaryExpression(n: INode, visitor: Visitor) {
  const node = n as IBinaryExpression;
  const left = visitor.visit(node.left);
  const right = visitor.visit(node.right);
  const operator = node.operator;

  switch (operator) {
    case BinaryOperator.EQUAL:
      return left == right; // tslint:disable-line
    case BinaryOperator.NOT_EQUAL:
      return left != right; // tslint:disable-line
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
      return left << right; // tslint:disable-line
    case BinaryOperator.BITWISE_SHIFT_RIGHT:
      return left >> right; // tslint:disable-line
    case BinaryOperator.BITWISE_SHIFT_RIGHT_ZERO:
      return left >>> right; // tslint:disable-line
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
      return left & right; // tslint:disable-line
    case BinaryOperator.BITWISE_OR:
      return left | right; // tslint:disable-line
    case BinaryOperator.BITWISE_XOR:
      return left ^ right; // tslint:disable-line
    case BinaryOperator.IN:
      return left in right;
    case BinaryOperator.INSTANCE_OF:
      return left instanceof right;
  }
}
