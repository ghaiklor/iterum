import { IAssignmentExpression } from "../../ast/expressions/AssignmentExpression";
import { IMemberExpression } from "../../ast/expressions/MemberExpression";
import { IIdentifier } from "../../ast/miscellaneous/Identifier";
import { INode } from "../../ast/node/Node";
import { AssignmentOperator } from "../../ast/operators/AssignmentOperator";
import { RuntimeError } from "../../errors/RuntimeError";
import { InstanceValue } from "../../runtime/classes/InstanceValue";
import { NullValue } from "../../runtime/primitives/NullValue";
import { NumberValue } from "../../runtime/primitives/NumberValue";
import { Value } from "../../runtime/Value";
import { Symbol } from "../../symbols/Symbol";
import { ITraverseContext } from "../../traverser/Traverser";

export function AssignmentExpression(n: INode, context: ITraverseContext): Value {
  const { traverser, scope } = context;
  const node = n as IAssignmentExpression;

  let lValue: Value;
  switch (node.left.type) {
    case "Identifier":
      lValue = scope.lookup((node.left as IIdentifier).name).value;
      break;
    case "MemberExpression":
      lValue = traverser.traverse(node.left, context);
      break;
    default:
      throw new RuntimeError(RuntimeError.ASSIGNMENT_IS_NOT_SUPPORTED, `${node.left.type}`);
  }

  let rValue = traverser.traverse(node.right, context);
  switch (node.operator) {
    case AssignmentOperator.ASSIGN:
      rValue = rValue;
      break;
    case AssignmentOperator.PLUS_ASSIGN:
      rValue = new NumberValue(lValue.plus(rValue));
      break;
    case AssignmentOperator.MINUS_ASSIGN:
      rValue = new NumberValue(lValue.minus(rValue));
      break;
    case AssignmentOperator.MULTIPLY_ASSIGN:
      rValue = new NumberValue(lValue.multiply(rValue));
      break;
    case AssignmentOperator.EXPONENTIATION_ASSIGN:
      rValue = new NumberValue(lValue.exponentiation(rValue));
      break;
    case AssignmentOperator.DIVIDE_ASSIGN:
      rValue = new NumberValue(lValue.divide(rValue));
      break;
    case AssignmentOperator.MODULUS_ASSIGN:
      rValue = new NumberValue(lValue.modulus(rValue));
      break;
    case AssignmentOperator.BITWISE_SHIFT_TO_LEFT_ASSIGN:
      rValue = new NumberValue(lValue.bitwiseShiftToLeft(rValue));
      break;
    case AssignmentOperator.BITWISE_SHIFT_TO_RIGHT_ASSIGN:
      rValue = new NumberValue(lValue.bitwiseShiftToRight(rValue));
      break;
    case AssignmentOperator.BITWISE_LOGICAL_SHIFT_TO_RIGHT_ASSIGN:
      rValue = new NumberValue(lValue.bitwiseLogicalShiftToRight(rValue));
      break;
    case AssignmentOperator.BITWISE_OR_ASSIGN:
      rValue = new NumberValue(lValue.bitwiseOr(rValue));
      break;
    case AssignmentOperator.BITWISE_XOR_ASSIGN:
      rValue = new NumberValue(lValue.bitwiseXor(rValue));
      break;
    case AssignmentOperator.BITWISE_AND_ASSIGN:
      rValue = new NumberValue(lValue.bitwiseAnd(rValue));
      break;
  }

  switch (node.left.type) {
    case "Identifier":
      const lName = (node.left as IIdentifier).name;
      scope.assign(new Symbol(lName, rValue));
      break;
    case "MemberExpression":
      // TODO: implement other ways for property, i.e. foo.bar[3]
      const property = ((node.left as IMemberExpression).property as IIdentifier).name;
      const object = traverser.traverse((node.left as IMemberExpression).object, context);
      if (!(object instanceof InstanceValue)) {
        throw new RuntimeError(RuntimeError.ASSIGNMENT_IS_NOT_SUPPORTED, object.toString());
      }

      object.setField(property, rValue);
      break;
  }

  return new NullValue();
}
