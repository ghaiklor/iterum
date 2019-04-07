import { IExpression } from "../expressions/Expression";
import { IPattern } from "./Pattern";

export interface IAssignmentPattern extends IPattern {
  type: "AssignmentPattern";
  left: IPattern;
  right: IExpression;
}
