import { IExpression } from "./Expression";

export interface IArrayExpression extends IExpression {
  type: "ArrayExpression";
  elements: Array<IExpression | null>;
}
