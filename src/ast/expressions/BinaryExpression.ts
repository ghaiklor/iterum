import { BinaryOperator } from "../operators/BinaryOperator";
import { IExpression } from "./Expression";

export interface IBinaryExpression extends IExpression {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: IExpression;
  right: IExpression;
}
