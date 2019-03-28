import { IExpression } from "./Expression";

export interface IGraphIndexExpression extends IExpression {
  type: "GraphIndexExpression";
  index: number;
}
