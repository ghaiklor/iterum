import { IExpression } from "../expressions/Expression";
import { IPattern } from "../patterns/Pattern";
import { IStatement } from "./Statement";

export interface ILetStatement extends IStatement {
  type: "LetStatement";
  head: Array<{ id: IPattern, init: IExpression | null }>;
  body: IStatement;
}
