import { AssignmentOperator } from "../miscellaneous/AssignmentOperator";
import { IPattern } from "../patterns/Pattern";
import { IExpression } from "./Expression";

export interface IAssignmentExpression extends IExpression {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: IPattern;
  right: IExpression;
}
