import { UnaryOperator } from "../operators/UnaryOperator";
import { IExpression } from "./Expression";

export interface IUnaryExpression extends IExpression {
  type: "UnaryExpression";
  operator: UnaryOperator;
  prefix: boolean;
  argument: IExpression;
}
