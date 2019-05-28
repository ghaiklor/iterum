import { IUnaryExpression } from "../../ast/expressions/UnaryExpression";
import { INode } from "../../ast/node/Node";
import { UnaryOperator } from "../../ast/operators/UnaryOperator";
import { Traverser } from "../../traverser/Traverser";

export function UnaryExpression(n: INode, traverser: Traverser) {
  const node = n as IUnaryExpression;

  switch (node.operator) {
    case UnaryOperator.MINUS:
      return -traverser.traverse(node.argument);

    case UnaryOperator.PLUS:
      return +traverser.traverse(node.argument);

    case UnaryOperator.LOGICAL_NOT:
      return !traverser.traverse(node.argument);

    case UnaryOperator.BITWISE_NOT:
      // tslint:disable-next-line: no-bitwise
      return ~traverser.traverse(node.argument);

    case UnaryOperator.TYPE_OF:
      return typeof traverser.traverse(node.argument);

    case UnaryOperator.VOID:
      return void traverser.traverse(node.argument);

    case UnaryOperator.DELETE:
      //  TODO: make a delete with a property reference
      return null;
  }
}
