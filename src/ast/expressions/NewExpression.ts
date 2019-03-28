import { IExpression } from "./Expression";

export interface INewExpression extends IExpression {
  type: "NewExpression";
  callee: IExpression;
  arguments: IExpression[];
}
