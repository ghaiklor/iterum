import { IAssignmentExpression } from "../../ast/expressions/AssignmentExpression";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { AssignmentOperator } from "../../ast/operators/AssignmentOperator";
import { Symbol } from "../../symbols/Symbol";
import { ITraverseContext } from "../../traverser/Traverser";

export function AssignmentExpression(n: INode, context: ITraverseContext): any {
  const { traverser, scope } = context;

  const node = n as IAssignmentExpression;
  const rhsValue = traverser.traverse(node.right, context);
  const lhsName = (node.left as IIdentifier).name;
  const lhsValue = scope.lookup(lhsName).value;

  switch (node.operator) {
    case AssignmentOperator.ASSIGN:
      scope.assign(new Symbol(lhsName, rhsValue));
      break;
    case AssignmentOperator.PLUS_ASSIGN:
      scope.assign(new Symbol(lhsName, lhsValue + rhsValue));
      break;
    case AssignmentOperator.MINUS_ASSIGN:
      scope.assign(new Symbol(lhsName, lhsValue - rhsValue));
      break;
    case AssignmentOperator.MULTIPLY_ASSIGN:
      scope.assign(new Symbol(lhsName, lhsValue * rhsValue));
      break;
    case AssignmentOperator.EXPONENTIATION_ASSIGN:
      scope.assign(new Symbol(lhsName, Math.pow(lhsValue, rhsValue)));
      break;
    case AssignmentOperator.DIVIDE_ASSIGN:
      scope.assign(new Symbol(lhsName, lhsValue / rhsValue));
      break;
    case AssignmentOperator.MODULUS_ASSIGN:
      scope.assign(new Symbol(lhsName, lhsValue % rhsValue));
      break;
    case AssignmentOperator.BITWISE_SHIFT_TO_LEFT_ASSIGN:
      // tslint:disable-next-line: no-bitwise
      scope.assign(new Symbol(lhsName, lhsValue << rhsValue));
      break;
    case AssignmentOperator.BITWISE_SHIFT_TO_RIGHT_ASSIGN:
      // tslint:disable-next-line: no-bitwise
      scope.assign(new Symbol(lhsName, lhsValue >> rhsValue));
      break;
    case AssignmentOperator.BITWISE_LOGICAL_SHIFT_TO_RIGHT_ASSIGN:
      // tslint:disable-next-line: no-bitwise
      scope.assign(new Symbol(lhsName, lhsValue >>> rhsValue));
      break;
    case AssignmentOperator.BITWISE_OR_ASSIGN:
      // tslint:disable-next-line: no-bitwise
      scope.assign(new Symbol(lhsName, lhsValue | rhsValue));
      break;
    case AssignmentOperator.BITWISE_XOR_ASSIGN:
      // tslint:disable-next-line: no-bitwise
      scope.assign(new Symbol(lhsName, lhsValue ^ rhsValue));
      break;
    case AssignmentOperator.BITWISE_AND_ASSIGN:
      // tslint:disable-next-line: no-bitwise
      scope.assign(new Symbol(lhsName, lhsValue & rhsValue));
      break;
  }

  return scope.lookup(lhsName).value;
}