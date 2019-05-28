import { IUnaryExpression } from "../../ast/expressions/UnaryExpression";
import { INode } from "../../ast/node/Node";
import { UnaryOperator } from "../../ast/operators/UnaryOperator";
import { Visitor } from "../../visitor/Visitor";

export function UnaryExpression(n: INode, visitor: Visitor) {
  const node = n as IUnaryExpression;

  switch (node.operator) {
    case UnaryOperator.MINUS:
      return -visitor.visit(node.argument);

    case UnaryOperator.PLUS:
      return +visitor.visit(node.argument);

    case UnaryOperator.LOGICAL_NOT:
      return !visitor.visit(node.argument);

    case UnaryOperator.BITWISE_NOT:
      // tslint:disable-next-line: no-bitwise
      return ~visitor.visit(node.argument);

    case UnaryOperator.TYPE_OF:
      return typeof visitor.visit(node.argument);

    case UnaryOperator.VOID:
      return void visitor.visit(node.argument);

    case UnaryOperator.DELETE:
      //  TODO: make a delete with a property reference
      return null;
  }
}
