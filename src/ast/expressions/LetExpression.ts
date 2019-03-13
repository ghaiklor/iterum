import { IPattern } from "../patterns/Pattern";
import { IExpression } from "./Expression";

export interface ILetExpression extends IExpression {
  type: "LetExpression";
  head: Array<{ id: IPattern, init: IExpression | null }>;
  body: IExpression;
}
