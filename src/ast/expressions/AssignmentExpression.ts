import { AssignmentOperator } from "../miscellaneous/AssignmentOperator";
import { IExpression } from "./Expression";

export interface IAssignmentExpression extends IExpression {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: IExpression;
  right: IExpression;
}
