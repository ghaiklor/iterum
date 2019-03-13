import { IExpression } from "./Expression";

export interface IThisExpression extends IExpression {
  type: "ThisExpression";
}
