import { IExpression } from "./Expression";

export interface ICallExpression extends IExpression {
  type: "CallExpression";
  callee: IExpression;
  arguments: IExpression[];
}
