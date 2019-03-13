import { IExpression } from "./Expression";

export interface ICallExpression extends IExpression {
  type: "CallExpression";
  callee: IExpression;
  arguments: Array<IExpression | null>;
}
