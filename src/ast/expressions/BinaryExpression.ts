import { BinaryOperator } from "../miscellaneous/BinaryOperator";
import { IExpression } from "./Expression";

export interface IBinaryExpression extends IExpression {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: IExpression;
  right: IExpression;
}
