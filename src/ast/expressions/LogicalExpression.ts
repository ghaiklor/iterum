import { LogicalOperator } from "../operators/LogicalOperator";
import { IExpression } from "./Expression";

export interface ILogicalExpression extends IExpression {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: IExpression;
  right: IExpression;
}
