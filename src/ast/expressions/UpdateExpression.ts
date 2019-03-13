import { UpdateOperator } from "../miscellaneous/UpdateOperator";
import { IExpression } from "./Expression";

export interface IUpdateExpression extends IExpression {
  type: "UpdateExpression";
  operator: UpdateOperator;
  argument: IExpression;
  prefix: boolean;
}
