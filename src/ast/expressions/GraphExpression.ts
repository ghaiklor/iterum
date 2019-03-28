import { ILiteral } from "../miscellaneous/Literal";
import { IExpression } from "./Expression";

export interface IGraphExpression extends IExpression {
  type: "GraphExpression";
  index: number;
  expression: ILiteral;
}
