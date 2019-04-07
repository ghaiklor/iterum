import { ILiteral } from "../literals/Literal";
import { IExpression } from "./Expression";

export interface IGraphExpression extends IExpression {
  type: "GraphExpression";
  index: number;
  expression: ILiteral;
}
